/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import type { Client } from './Client.ts';
import { Raw } from '../raw/index.ts';
import { Session, Auth, DataCenter } from '../session/index.ts';
import { computePasswordCheck } from '../crypto/Password.ts';
import { Logger } from '../Logger.ts';
import * as Errors from '../errors/index.ts';
export interface SigInBot {
  /**
   * Bot token from bot father.
   */
  botToken: string | Promise<string>;
}
export interface SigInUser {
  /**
   * The phone number for login as user.
   */
  phoneNumber: { (): Promise<string> };
  /**
   * The 2FA password.
   */
  password?: { (hint: string): Promise<string> };
  /**
   * Fill client when you forgot 2FA password, it will be automatic send recovery code to connected email.
   */
  recoveryCode?: { (): Promise<string> };
  /**
   * The OTP code.
   */
  code: { (): Promise<string> };
  /**
   * Firstname to be used for created account.
   */
  firstname?: { (): Promise<string> };
  /**
   * Lastname to be used for created account.
   */
  lastname?: { (): Promise<string> };
  /**
   * When error BadRequest attempt, what should do.
   */
  authError?: { (error: Errors.Exceptions.BadRequest.BadRequest): any };
}
/**
 * Sigin as bot.
 * @param {Client} client - Telegram client.
 * @param {String} botToken - Bot token from bot father.
 */
export async function siginBot(client: Client, botToken: string): Promise<Raw.User | undefined> {
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
    } catch (error: any) {
      if (error instanceof Errors.Exceptions.SeeOther.UserMigrate) {
        error as Errors.Exceptions.SeeOther.UserMigrate;
        await client._session.stop();
        const [ip, port] = await DataCenter.DataCenter(
          error.value as unknown as number,
          client._testMode,
          client._ipv6,
          false,
        );
        const auth = new Auth(error.value as unknown as number, client._testMode, client._ipv6);
        client._storage.setAddress(error.value as unknown as number, ip, port, client._testMode);
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
/**
 * Sigin as user.
 * @param {Client} client - Telegram client.
 * @param {Client} auth - The required parameter to be used for creating account or login.
 */
export async function siginUser(client: Client, auth: SigInUser): Promise<Raw.User | undefined> {
  let _phoneNumber;
  let _sendCode;
  let _signedIn;
  let _signedUp;
  while (true) {
    try {
      _phoneNumber = await auth.phoneNumber();
      _sendCode = await sendCode(client, _phoneNumber);
      break;
    } catch (error: any) {
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
      // @ts-ignore
      _signedIn = await sigin(client, _phoneNumber, _sendCode.phoneCodeHash, code);
      break;
    } catch (error: any) {
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
                  } catch (error: any) {
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
              } else {
                // do something soon
                break;
              }
            }
          } catch (error: any) {
            if (error instanceof Errors.Exceptions.BadRequest.BadRequest) {
              Logger.error(error);
              if (auth.authError) {
                await auth.authError(error);
              }
              trying++;
            } else {
              throw error;
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
    } catch (error: any) {
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
    Logger.info(`\n${_signedIn.text}\n`);
    //@ts-ignore
    await acceptTOS(client, _signedIn.id.data);
  }
  return _signedUp;
}
/**
 * Sending telegram OTP code.
 * @param {Client} client - Telegram client.
 * @param {String} phoneNumber - The phone number will be using to receive a OTP code.
 */
export async function sendCode(
  client: Client,
  phoneNumber: string,
): Promise<Raw.auth.TypeSentCode> {
  phoneNumber = phoneNumber.replace(/\+/g, '').trim();
  while (true) {
    try {
      let r = await client.invoke(
        new Raw.auth.SendCode({
          phoneNumber: phoneNumber,
          apiId: client._apiId,
          apiHash: client._apiHash,
          settings: new Raw.CodeSettings({}),
        }),
        0,
      );
      return r;
    } catch (error: any) {
      if (
        error instanceof Errors.Exceptions.SeeOther.NetworkMigrate ||
        error instanceof Errors.Exceptions.SeeOther.PhoneMigrate
      ) {
        await client._session.stop();
        const [ip, port] = await DataCenter.DataCenter(
          error.value as unknown as number,
          client._testMode,
          client._ipv6,
          false,
        );
        const auth = new Auth(error.value as unknown as number, client._testMode, client._ipv6);
        client._storage.setAddress(error.value as unknown as number, ip, port, client._testMode);
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
/**
 * Authorize a user in Telegram with a valid confirmation code.
 * @param {Client} client - Telegram client.
 * @param {String} phoneNumber - Phone number in international format (includes the country prefix).
 * @param {String} phoneCodeHash - Code identifier taken from the result of sendCode.
 * @param {String} phoneCode - The valid confirmation code you received (either as Telegram message or as SMS in your phone number).
 */
export async function sigin(
  client: Client,
  phoneNumber: string,
  phoneCodeHash: string,
  phoneCode: string,
): Promise<Raw.User | Raw.help.TermsOfService | boolean> {
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
/**
 * Recover your password with recovery code and login.
 * @param {Client} client - Telegram client.
 * @param {String} code - The recovery code has been send in connected email with 2FA.
 */
export async function recoverPassword(client: Client, code: string): Promise<Raw.User | undefined> {
  let r = await client.invoke(
    new Raw.auth.RecoverPassword({
      code: code,
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
/**
 * Send the recovery code to cennected email to reset the 2FA.
 * @param {Client} client - Telegram client.
 */
export async function sendRecoveryCode(client: Client): Promise<string> {
  let r = await client.invoke(new Raw.auth.RequestPasswordRecovery(), 0);
  return r.emailPattern;
}
/**
 * Check the givens password is correct or not.
 * @param {Client} client - Telegram client
 * @param {String} password - Password will be check.
 */
export async function checkPassword(
  client: Client,
  password: string,
): Promise<Raw.User | undefined> {
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
/**
 * Accepting Terms Of Service for creating a account.
 * @param {Client} client - Telegram client.
 * @param {String} id - TOS Id,The terms of service identifier.
 */
export async function acceptTOS(client: Client, id: string): Promise<boolean> {
  let r = await client.invoke(
    new Raw.help.AcceptTermsOfService({
      id: new Raw.DataJSON({
        data: id,
      }),
    }),
  );
  return Boolean(r);
}
/**
 * Get hint of 2FA password.
 * @param {Client} client - Telegram client
 */
export async function getPasswordHint(client: Client): Promise<string> {
  let r = await client.invoke(new Raw.account.GetPassword(), 0);
  return r.hint ?? '';
}
/**
 * Sigin and create a new fresh account.
 * @param {Client} client - Telegram client.
 * @param {String} phoneNumber - Phone number in international format (includes the country prefix).
 * @param {String} phoneCodeHash - Code identifier taken from the result of sendCode.
 * @param {String} firstname - New user firstname.
 * @param {String} lastname - New user lastname.
 */
export async function signup(
  client: Client,
  phoneNumber: string,
  phoneCodeHash: string,
  firstname: string,
  lastname: string = '',
): Promise<Raw.User | undefined> {
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
/**
 * Getting info about self.
 */
export async function getMe(client: Client): Promise<Raw.users.UserFull> {
  return await client.invoke(
    new Raw.users.GetFullUser({
      id: new Raw.InputUserSelf(),
    }),
  );
}
