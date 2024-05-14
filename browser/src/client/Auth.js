import { Raw } from '../raw/index.js';
import { Session, Auth, DataCenter } from '../session/index.js';
import { computePasswordCheck } from '../crypto/Password.js';
import { Logger } from '../Logger.js';
import * as Errors from '../errors/index.js';
async function siginBot(client, botToken) {
  while (true) {
    let user;
    try {
      user = await client.invoke(
        new Raw.auth.ImportBotAuthorization({
          botAuthToken: botToken,
          apiId: client._apiId,
          apiHash: client._apiHash,
          flags: 0,
        }),
        0,
      );
    } catch (error) {
      if (error instanceof Errors.Exceptions.SeeOther.UserMigrate) {
        error;
        await client._session.stop();
        const [ip, port] = await DataCenter.DataCenter(
          error.value,
          client._testMode,
          client._ipv6,
          false,
        );
        const auth = new Auth(error.value, client._testMode, client._ipv6);
        client._storage.setAddress(error.value, ip, port, client._testMode);
        client._storage.setApiId(client._apiId);
        client._storage.setAuthKey(await auth.create(), client._storage.dcId);
        client._session = new Session(
          client,
          client._storage.dcId,
          client._storage.authKey,
          client._storage.testMode,
        );
        await client._session.start();
      } else {
        throw error;
      }
    } finally {
      if (user) {
        await client._storage.setUserId(user.user.id);
        await client._storage.setIsBot(true);
        return user.user;
      }
    }
  }
}
async function siginUser(client, auth) {
  let _phoneNumber;
  let _sendCode;
  let _signedIn;
  let _signedUp;
  while (true) {
    try {
      _phoneNumber = await auth.phoneNumber();
      _sendCode = await sendCode(client, _phoneNumber);
      break;
    } catch (error) {
      if (error instanceof Errors.Exceptions.BadRequest.BadRequest) {
        Logger.error(error);
        if (auth.authError) {
          await auth.authError(error);
        }
      } else {
        throw error;
      }
    }
  }
  Logger.info('[101] The confirmation code has been sent.');
  while (true) {
    let code = await auth.code();
    try {
      _signedIn = await sigin(client, _phoneNumber, _sendCode.phoneCodeHash, code);
      break;
    } catch (error) {
      if (error instanceof Errors.Exceptions.BadRequest.BadRequest) {
        Logger.error(error);
        if (auth.authError) {
          await auth.authError(error);
        }
      } else if (error instanceof Errors.Exceptions.Unauthorized.SessionPasswordNeeded) {
        let trying = 1;
        while (true) {
          try {
            if (trying <= 3) {
              if (!auth.password) {
                throw new Error('2FA password required');
              }
              return await checkPassword(
                client,
                await auth.password(await getPasswordHint(client)),
              );
            } else {
              Logger.info('[102] Look you are forgotten the password');
              if (auth.recoveryCode) {
                let emailPattern = await sendRecoveryCode(client);
                Logger.info(`[103] The recovery code has been sent to ${emailPattern}`);
                while (true) {
                  let recoveryCode = await auth.recoveryCode();
                  try {
                    return await recoverPassword(client, recoveryCode);
                  } catch (error2) {
                    if (error2 instanceof Errors.Exceptions.BadRequest.BadRequest) {
                      Logger.error(error2);
                      if (auth.authError) {
                        await auth.authError(error2);
                      }
                    } else {
                      throw error2;
                    }
                  }
                }
              } else {
                break;
              }
            }
          } catch (error2) {
            if (error2 instanceof Errors.Exceptions.BadRequest.BadRequest) {
              Logger.error(error2);
              if (auth.authError) {
                await auth.authError(error2);
              }
              trying++;
            } else {
              throw error2;
            }
          }
        }
      } else {
        throw error;
      }
    }
  }
  if (_signedIn && _signedIn instanceof Raw.User) {
    return _signedIn;
  }
  while (true) {
    try {
      _signedUp = await signup(
        client,
        _phoneNumber,
        _sendCode.phoneCodeHash,
        auth.firstname ? await auth.firstname() : String(Date.now()),
        auth.lastname ? await auth.lastname() : '',
      );
      break;
    } catch (error) {
      if (error instanceof Errors.Exceptions.BadRequest.BadRequest) {
        Logger.error(error);
        if (auth.authError) {
          await auth.authError(error);
        }
      } else {
        throw error;
      }
    }
  }
  if (_signedIn instanceof Raw.help.TermsOfService) {
    Logger.info(`
${_signedIn.text}
`);
    await acceptTOS(client, _signedIn.id.data);
  }
  return _signedUp;
}
async function sendCode(client, phoneNumber) {
  phoneNumber = phoneNumber.replace(/\+/g, '').trim();
  while (true) {
    try {
      let r = await client.invoke(
        new Raw.auth.SendCode({
          phoneNumber,
          apiId: client._apiId,
          apiHash: client._apiHash,
          settings: new Raw.CodeSettings({}),
        }),
        0,
      );
      return r;
    } catch (error) {
      if (
        error instanceof Errors.Exceptions.SeeOther.NetworkMigrate ||
        error instanceof Errors.Exceptions.SeeOther.PhoneMigrate
      ) {
        await client._session.stop();
        const [ip, port] = await DataCenter.DataCenter(
          error.value,
          client._testMode,
          client._ipv6,
          false,
        );
        const auth = new Auth(error.value, client._testMode, client._ipv6);
        client._storage.setAddress(error.value, ip, port, client._testMode);
        client._storage.setApiId(client._apiId);
        client._storage.setAuthKey(await auth.create(), client._storage.dcId);
        client._session = new Session(
          client,
          client._storage.dcId,
          client._storage.authKey,
          client._storage.testMode,
        );
        await client._session.start();
      } else {
        throw error;
      }
    }
  }
}
async function sigin(client, phoneNumber, phoneCodeHash, phoneCode) {
  let r = await client.invoke(
    new Raw.auth.SignIn({
      phoneNumber: phoneNumber.replace(/\+/g, '').trim(),
      phoneCodeHash,
      phoneCode,
    }),
    0,
  );
  if (r instanceof Raw.auth.AuthorizationSignUpRequired) {
    if (r.termsOfService) {
      return r.termsOfService;
    }
    return false;
  } else {
    await client._storage.setUserId(r.user.id);
    await client._storage.setIsBot(false);
    return r.user;
  }
}
async function recoverPassword(client, code) {
  let r = await client.invoke(
    new Raw.auth.RecoverPassword({
      code,
    }),
    0,
  );
  if ('user' in r) {
    await client._storage.setUserId(r.user.id);
    await client._storage.setIsBot(false);
    return r.user;
  }
  return;
}
async function sendRecoveryCode(client) {
  let r = await client.invoke(new Raw.auth.RequestPasswordRecovery(), 0);
  return r.emailPattern;
}
async function checkPassword(client, password) {
  let r = await client.invoke(
    new Raw.auth.CheckPassword({
      password: computePasswordCheck(
        await client.invoke(new Raw.account.GetPassword(), 0),
        password,
      ),
    }),
    0,
  );
  if ('user' in r) {
    await client._storage.setUserId(r.user.id);
    await client._storage.setIsBot(false);
    return r.user;
  }
  return;
}
async function acceptTOS(client, id) {
  let r = await client.invoke(
    new Raw.help.AcceptTermsOfService({
      id: new Raw.DataJSON({
        data: id,
      }),
    }),
  );
  return Boolean(r);
}
async function getPasswordHint(client) {
  let r = await client.invoke(new Raw.account.GetPassword(), 0);
  return r.hint ?? '';
}
async function signup(client, phoneNumber, phoneCodeHash, firstname, lastname = '') {
  let r = await client.invoke(
    new Raw.auth.SignUp({
      phoneNumber: phoneNumber.replace(/\+/g, '').trim(),
      phoneCodeHash,
      firstName: firstname,
      lastName: lastname,
    }),
  );
  if ('user' in r) {
    await client._storage.setUserId(r.user.id);
    await client._storage.setIsBot(false);
    return r.user;
  }
  return;
}
async function getMe(client) {
  return await client.invoke(
    new Raw.users.GetFullUser({
      id: new Raw.InputUserSelf(),
    }),
  );
}
export {
  acceptTOS,
  checkPassword,
  getMe,
  getPasswordHint,
  recoverPassword,
  sendCode,
  sendRecoveryCode,
  sigin,
  siginBot,
  siginUser,
  signup,
};
