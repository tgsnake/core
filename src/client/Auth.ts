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
  authError?: { (error: Errors.Exceptions.BadRequest.BadRequest): void };
}
/**
 * Sigin as bot.
 * @param {String} botToken - Bot token from bot father.
 */
export async function siginBot(this: Client, botToken: string): Promise<Raw.User | undefined> {
  while (true) {
    let user;
    try {
      user = await this.invoke(
        new Raw.auth.ImportBotAuthorization({
          botAuthToken: botToken,
          apiId: this._apiId,
          apiHash: this._apiHash,
          flags: 0,
        }),
        0,
      );
    } catch (error: unknown) {
      if (error instanceof Errors.Exceptions.SeeOther.UserMigrate) {
        error as Errors.Exceptions.SeeOther.UserMigrate;
        await this._session.stop();
        const [ip, port] = await DataCenter.DataCenter(
          error.value as unknown as number,
          this._testMode,
          this._ipv6,
          false,
        );
        const auth = new Auth(error.value as unknown as number, this._testMode, this._ipv6);
        this._storage.setAddress(error.value as unknown as number, ip, port, this._testMode);
        this._storage.setApiId(this._apiId);
        this._storage.setAuthKey(await auth.create(), this._storage.dcId);
        this._session = new Session(
          this,
          this._storage.dcId,
          this._storage.authKey,
          this._storage.testMode,
        );
        await this._session.start();
      } else {
        throw error;
      }
    } finally {
      if (user && 'user' in user) {
        await this._storage.setUserId(user.user.id);
        await this._storage.setIsBot(true);
      }
    }
    if (user && 'user' in user) {
      return user.user;
    }
  }
}
/**
 * Sigin as user.
 * @param {Client} auth - The required parameter to be used for creating account or login.
 */
export async function siginUser(this: Client, auth: SigInUser): Promise<Raw.User | undefined> {
  let _phoneNumber;
  let _sendCode;
  let _signedIn;
  let _signedUp;
  while (true) {
    try {
      _phoneNumber = await auth.phoneNumber();
      _sendCode = await sendCode.call(this, _phoneNumber);
      break;
    } catch (error: unknown) {
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
    const code = await auth.code();
    try {
      _signedIn = await sigin.call(
        this,
        _phoneNumber,
        (_sendCode as Raw.auth.SentCode).phoneCodeHash,
        code,
      );
      break;
    } catch (error: unknown) {
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
              return await checkPassword.call(
                this,
                await auth.password(await getPasswordHint.call(this)),
              );
            } else {
              Logger.info('[102] Look you are forgotten the password');
              if (auth.recoveryCode) {
                const emailPattern = await sendRecoveryCode.call(this);
                Logger.info(`[103] The recovery code has been sent to ${emailPattern}`);
                while (true) {
                  const recoveryCode = await auth.recoveryCode();
                  try {
                    return await recoverPassword.call(this, recoveryCode);
                  } catch (error: unknown) {
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
          } catch (error: unknown) {
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
      _signedUp = await signup.call(
        this,
        _phoneNumber,
        (_sendCode as Raw.auth.SentCode).phoneCodeHash,
        auth.firstname ? await auth.firstname() : String(Date.now()),
        auth.lastname ? await auth.lastname() : '',
      );
      break;
    } catch (error: unknown) {
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
    await acceptTOS.call(this, _signedIn.id.data);
  }
  return _signedUp;
}
/**
 * Sending telegram OTP code.
 * @param {String} phoneNumber - The phone number will be using to receive a OTP code.
 */
export async function sendCode(this: Client, phoneNumber: string): Promise<Raw.auth.TypeSentCode> {
  phoneNumber = phoneNumber.replace(/\+/g, '').trim();
  while (true) {
    try {
      const r = await this.invoke(
        new Raw.auth.SendCode({
          phoneNumber: phoneNumber,
          apiId: this._apiId,
          apiHash: this._apiHash,
          settings: new Raw.CodeSettings({}),
        }),
        0,
      );
      return r;
    } catch (error: unknown) {
      if (
        error instanceof Errors.Exceptions.SeeOther.NetworkMigrate ||
        error instanceof Errors.Exceptions.SeeOther.PhoneMigrate
      ) {
        await this._session.stop();
        const [ip, port] = await DataCenter.DataCenter(
          error.value as unknown as number,
          this._testMode,
          this._ipv6,
          false,
        );
        const auth = new Auth(error.value as unknown as number, this._testMode, this._ipv6);
        this._storage.setAddress(error.value as unknown as number, ip, port, this._testMode);
        this._storage.setApiId(this._apiId);
        this._storage.setAuthKey(await auth.create(), this._storage.dcId);
        this._session = new Session(
          this,
          this._storage.dcId,
          this._storage.authKey,
          this._storage.testMode,
        );
        await this._session.start();
      } else if (error instanceof Errors.ClientError.ClientDisconnected) {
        await this.connect();
      } else {
        throw error;
      }
    }
  }
}
/**
 * Authorize a user in Telegram with a valid confirmation code.
 * @param {String} phoneNumber - Phone number in international format (includes the country prefix).
 * @param {String} phoneCodeHash - Code identifier taken from the result of sendCode.
 * @param {String} phoneCode - The valid confirmation code you received (either as Telegram message or as SMS in your phone number).
 */
export async function sigin(
  this: Client,
  phoneNumber: string,
  phoneCodeHash: string,
  phoneCode: string,
): Promise<Raw.User | Raw.help.TermsOfService | boolean> {
  const r = await this.invoke(
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
    await this._storage.setUserId(r.user.id);
    await this._storage.setIsBot(false);
    return r.user;
  }
}
/**
 * Recover your password with recovery code and login.
 * @param {String} code - The recovery code has been send in connected email with 2FA.
 */
export async function recoverPassword(this: Client, code: string): Promise<Raw.User | undefined> {
  const r = await this.invoke(
    new Raw.auth.RecoverPassword({
      code: code,
    }),
    0,
  );
  if ('user' in r) {
    await this._storage.setUserId(r.user.id);
    await this._storage.setIsBot(false);
    return r.user;
  }
  return;
}
/**
 * Send the recovery code to cennected email to reset the 2FA.
 */
export async function sendRecoveryCode(this: Client): Promise<string> {
  const r = await this.invoke(new Raw.auth.RequestPasswordRecovery(), 0);
  return r.emailPattern;
}
/**
 * Check the givens password is correct or not.
 * @param {String} password - Password will be check.
 */
export async function checkPassword(this: Client, password: string): Promise<Raw.User | undefined> {
  const r = await this.invoke(
    new Raw.auth.CheckPassword({
      password: computePasswordCheck(await this.invoke(new Raw.account.GetPassword(), 0), password),
    }),
    0,
  );
  if ('user' in r) {
    await this._storage.setUserId(r.user.id);
    await this._storage.setIsBot(false);
    return r.user;
  }
  return;
}
/**
 * Accepting Terms Of Service for creating a account.
 * @param {String} id - TOS Id,The terms of service identifier.
 */
export async function acceptTOS(this: Client, id: string): Promise<boolean> {
  const r = await this.invoke(
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
 */
export async function getPasswordHint(this: Client): Promise<string> {
  const r = await this.invoke(new Raw.account.GetPassword(), 0);
  return r.hint ?? '';
}
/**
 * Sigin and create a new fresh account.
 * @param {String} phoneNumber - Phone number in international format (includes the country prefix).
 * @param {String} phoneCodeHash - Code identifier taken from the result of sendCode.
 * @param {String} firstname - New user firstname.
 * @param {String} lastname - New user lastname.
 */
export async function signup(
  this: Client,
  phoneNumber: string,
  phoneCodeHash: string,
  firstname: string,
  lastname: string = '',
): Promise<Raw.User | undefined> {
  const r = await this.invoke(
    new Raw.auth.SignUp({
      phoneNumber: phoneNumber.replace(/\+/g, '').trim(),
      phoneCodeHash,
      firstName: firstname,
      lastName: lastname,
    }),
  );
  if ('user' in r) {
    await this._storage.setUserId(r.user.id);
    await this._storage.setIsBot(false);
    return r.user;
  }
  return;
}
/**
 * Getting info about self.
 */
export async function getMe(this: Client): Promise<Raw.users.UserFull> {
  return await this.invoke(
    new Raw.users.GetFullUser({
      id: new Raw.InputUserSelf(),
    }),
  );
}
