/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */
import type { Client } from './Client.js';
import { Session, Auth, DataCenter } from '../session/index.js';
import { computePasswordCheck } from '../crypto/Password.js';
import { Logger } from '../Logger.js';
import { Skema } from '../deps.js';
/**
 * Authentication configuration interface for signing in as a Bot.
 */
export interface SigInBot {
  /**
   * The bot token generated via Telegram's BotFather.
   * Can be a raw string or a Promise resolving to a string.
   */
  botToken: string | Promise<string>;
}

/**
 * Authentication configuration interface for signing in as a User.
 */
export interface SigInUser {
  /**
   * Asynchronous callback returning the user's phone number in international format.
   */
  phoneNumber: { (): Promise<string> };

  /**
   * Optional asynchronous callback returning the 2-step verification (2FA) password.
   *
   * @param {string} hint - The password hint configured by the user on Telegram.
   */
  password?: { (hint: string): Promise<string> };

  /**
   * Optional asynchronous callback returning the recovery code if the user forgot their 2FA password.
   * Invoking this will automatically trigger sending the recovery code to the associated email.
   */
  recoveryCode?: { (): Promise<string> };

  /**
   * Asynchronous callback returning the one-time registration/login code (OTP) received from Telegram.
   */
  code: { (): Promise<string> };

  /**
   * Optional asynchronous callback returning the first name to be used if registering a new account.
   */
  firstname?: { (): Promise<string> };

  /**
   * Optional asynchronous callback returning the last name to be used if registering a new account.
   */
  lastname?: { (): Promise<string> };

  /**
   * Optional error callback triggered when a `BadRequest` error occurs during authorization.
   *
   * @param {Skema.Exceptions.BadRequest.BadRequest} error - The encountered error instance.
   */
  authError?: { (error: Skema.Exceptions.BadRequest.BadRequest): void };
}

/**
 * Signs in the client as a Telegram bot using a bot token.
 *
 * Automatically handles data center migration if the bot's account is located on another DC.
 *
 * @this Client
 * @param {string} botToken - The bot token obtained from Telegram's BotFather.
 * @returns {Promise<Skema.Raw.User | undefined>} The authenticated bot user object, or `undefined` on failure.
 * @throws {Error} Propagates any unexpected RPC errors during initialization.
 */
export async function siginBot(
  this: Client,
  botToken: string,
): Promise<Skema.Raw.User | undefined> {
  while (true) {
    let user;
    try {
      user = await this.invoke(
        new Skema.Raw.auth.ImportBotAuthorization({
          botAuthToken: botToken,
          apiId: this._apiId,
          apiHash: this._apiHash,
          flags: 0,
        }),
        0,
      );
    } catch (error) {
      if (error instanceof Skema.Exceptions.SeeOther.UserMigrate) {
        const typedError = error as Skema.Exceptions.SeeOther.UserMigrate;
        await this._session.stop();
        const [ip, port] = await DataCenter.DataCenter(
          typedError.value as unknown as number,
          this._testMode,
          this._ipv6,
          false,
        );
        const auth = new Auth(typedError.value as unknown as number, this._testMode, this._ipv6);
        this._storage.setAddress(typedError.value as unknown as number, ip, port, this._testMode);
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
 * Signs in the client as a Telegram user.
 *
 * Coordinates the full user authorization flow:
 * 1. Requests the phone number and sends the OTP code.
 * 2. Asks for the verification code.
 * 3. Handles 2FA passwords, password recovery flows, and new account signup as necessary.
 *
 * @this Client
 * @param {SigInUser} auth - The user credential retrieval callbacks.
 * @returns {Promise<Skema.Raw.User | undefined>} The authenticated user object, or `undefined` on failure.
 * @throws {Error} Thrown if 2FA password is required but the `password` callback is missing.
 */
export async function siginUser(
  this: Client,
  auth: SigInUser,
): Promise<Skema.Raw.User | undefined> {
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
      if (error instanceof Skema.Exceptions.BadRequest.BadRequest) {
        Logger.error(`[1.client.Auth] Got error when trying to send confirmation code:`, error);
        if (auth.authError) {
          await auth.authError(error);
        }
      } else {
        throw error;
      }
    }
  }
  Logger.info('[2.client.Auth] The confirmation code has been sent.');
  while (true) {
    const code = await auth.code();
    try {
      _signedIn = await sigin.call(
        this,
        _phoneNumber,
        (_sendCode as Skema.Raw.auth.SentCode).phoneCodeHash,
        code,
      );
      break;
    } catch (error: unknown) {
      if (error instanceof Skema.Exceptions.BadRequest.BadRequest) {
        Logger.error(`[3.client.Auth] Got error when trying to sign in:`, error);
        if (auth.authError) {
          await auth.authError(error);
        }
      } else if (error instanceof Skema.Exceptions.Unauthorized.SessionPasswordNeeded) {
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
              Logger.info('[4.client.Auth] Look you are forgotten the password');
              if (auth.recoveryCode) {
                const emailPattern = await sendRecoveryCode.call(this);
                Logger.info(`[5.client.Auth] The recovery code has been sent to ${emailPattern}`);
                while (true) {
                  const recoveryCode = await auth.recoveryCode();
                  try {
                    return await recoverPassword.call(this, recoveryCode);
                  } catch (error: unknown) {
                    if (error instanceof Skema.Exceptions.BadRequest.BadRequest) {
                      Logger.error(
                        `[6.client.Auth] Got error when trying to recover password:`,
                        error,
                      );
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
          } catch (error) {
            if (error instanceof Skema.Exceptions.BadRequest.BadRequest) {
              Logger.error(`[7.client.Auth] Got error when trying to recover password:`, error);
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
  if (_signedIn && _signedIn instanceof Skema.Raw.User) {
    return _signedIn;
  }
  while (true) {
    try {
      _signedUp = await signup.call(
        this,
        _phoneNumber,
        (_sendCode as Skema.Raw.auth.SentCode).phoneCodeHash,
        auth.firstname ? await auth.firstname() : String(Date.now()),
        auth.lastname ? await auth.lastname() : '',
      );
      break;
    } catch (error: unknown) {
      if (error instanceof Skema.Exceptions.BadRequest.BadRequest) {
        Logger.error(`[8.client.Auth] Got error when trying to sign up:`, error);
        if (auth.authError) {
          await auth.authError(error);
        }
      } else {
        throw error;
      }
    }
  }
  if (_signedIn && _signedIn instanceof Skema.Raw.help.TermsOfService) {
    Logger.info(`[9.client.Auth] \n${_signedIn.text}\n`);
    await acceptTOS.call(this, _signedIn.id.data);
  }
  return _signedUp;
}

/**
 * Sends a verification code (OTP) to the specified phone number.
 *
 * Automatically handles data center redirection if the phone number belongs to a different DC.
 *
 * @this Client
 * @param {string} phoneNumber - The phone number to receive the OTP code in international format.
 * @returns {Promise<Skema.Raw.auth.TypeSentCode>} Information about the sent code.
 * @throws {Error} Propagates standard Telegram RPC errors.
 */
export async function sendCode(
  this: Client,
  phoneNumber: string,
): Promise<Skema.Raw.auth.TypeSentCode> {
  phoneNumber = phoneNumber.replace(/\+/g, '').trim();
  while (true) {
    try {
      const r = await this.invoke(
        new Skema.Raw.auth.SendCode({
          phoneNumber: phoneNumber,
          apiId: this._apiId,
          apiHash: this._apiHash,
          settings: new Skema.Raw.CodeSettings({}),
        }),
        0,
      );
      return r;
    } catch (error) {
      if (
        error instanceof Skema.Exceptions.SeeOther.NetworkMigrate ||
        error instanceof Skema.Exceptions.SeeOther.PhoneMigrate
      ) {
        await this._session.stop();
        const typedError = error as
          | Skema.Exceptions.SeeOther.NetworkMigrate
          | Skema.Exceptions.SeeOther.PhoneMigrate;
        const [ip, port] = await DataCenter.DataCenter(
          typedError.value as unknown as number,
          this._testMode,
          this._ipv6,
          false,
        );
        const auth = new Auth(typedError.value as unknown as number, this._testMode, this._ipv6);
        this._storage.setAddress(typedError.value as unknown as number, ip, port, this._testMode);
        this._storage.setApiId(this._apiId);
        this._storage.setAuthKey(await auth.create(), this._storage.dcId);
        this._session = new Session(
          this,
          this._storage.dcId,
          this._storage.authKey,
          this._storage.testMode,
        );
        await this._session.start();
      } else if (error instanceof Skema.ClientError.ClientDisconnected) {
        await this.connect();
      } else {
        throw error;
      }
    }
  }
}

/**
 * Authorizes a user in Telegram using a valid confirmation code.
 *
 * @this Client
 * @param {string} phoneNumber - The user's phone number in international format.
 * @param {string} phoneCodeHash - The phone code hash returned by `sendCode`.
 * @param {string} phoneCode - The confirmation OTP code received by the user.
 * @returns {Promise<Skema.Raw.User | Skema.Raw.help.TermsOfService | boolean>} Resolves to user object, TermsOfService if sign-up is required with TOS, or false.
 */
export async function sigin(
  this: Client,
  phoneNumber: string,
  phoneCodeHash: string,
  phoneCode: string,
): Promise<Skema.Raw.User | Skema.Raw.help.TermsOfService | boolean> {
  const r = await this.invoke(
    new Skema.Raw.auth.SignIn({
      phoneNumber: phoneNumber.replace(/\+/g, '').trim(),
      phoneCodeHash,
      phoneCode,
    }),
    0,
  );
  if (r instanceof Skema.Raw.auth.AuthorizationSignUpRequired) {
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
 * Recovers a 2FA-locked account using a recovery code sent to the configured email.
 *
 * @this Client
 * @param {string} code - The recovery code received in the user's email.
 * @returns {Promise<Skema.Raw.User | undefined>} The authenticated user object, or `undefined` if recovery fails.
 */
export async function recoverPassword(
  this: Client,
  code: string,
): Promise<Skema.Raw.User | undefined> {
  const r = await this.invoke(
    new Skema.Raw.auth.RecoverPassword({
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
 * Requests sending a recovery code to the associated 2FA email pattern.
 *
 * @this Client
 * @returns {Promise<string>} The email pattern to which the recovery code was sent.
 */
export async function sendRecoveryCode(this: Client): Promise<string> {
  const r = await this.invoke(new Skema.Raw.auth.RequestPasswordRecovery(), 0);
  return r.emailPattern;
}

/**
 * Submits the 2-step verification (2FA) password to log in.
 *
 * @this Client
 * @param {string} password - The raw 2FA password to submit.
 * @returns {Promise<Skema.Raw.User | undefined>} The authenticated user object, or `undefined` if verification fails.
 */
export async function checkPassword(
  this: Client,
  password: string,
): Promise<Skema.Raw.User | undefined> {
  const r = await this.invoke(
    new Skema.Raw.auth.CheckPassword({
      password: computePasswordCheck(
        await this.invoke(new Skema.Raw.account.GetPassword(), 0),
        password,
      ),
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
 * Accepts the Telegram Terms of Service required during account creation.
 *
 * @this Client
 * @param {string} id - The unique Terms of Service identifier.
 * @returns {Promise<boolean>} Resolves to `true` if accepted successfully.
 */
export async function acceptTOS(this: Client, id: string): Promise<boolean> {
  const r = await this.invoke(
    new Skema.Raw.help.AcceptTermsOfService({
      id: new Skema.Raw.DataJSON({
        data: id,
      }),
    }),
  );
  return Boolean(r);
}

/**
 * Retrieves the configured hint for the 2-step verification (2FA) password.
 *
 * @this Client
 * @returns {Promise<string>} The password hint, or an empty string if none exists.
 */
export async function getPasswordHint(this: Client): Promise<string> {
  const r = await this.invoke(new Skema.Raw.account.GetPassword(), 0);
  return r.hint ?? '';
}

/**
 * Registers a new user account with Telegram.
 *
 * @this Client
 * @param {string} phoneNumber - The user's phone number in international format.
 * @param {string} phoneCodeHash - The phone code hash returned by `sendCode`.
 * @param {string} firstname - The first name for the new account.
 * @param {string} [lastname=''] - The optional last name for the new account.
 * @returns {Promise<Skema.Raw.User | undefined>} The newly registered user object, or `undefined` if signup fails.
 */
export async function signup(
  this: Client,
  phoneNumber: string,
  phoneCodeHash: string,
  firstname: string,
  lastname: string = '',
): Promise<Skema.Raw.User | undefined> {
  const r = await this.invoke(
    new Skema.Raw.auth.SignUp({
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
 * Fetches the full profile details of the current authorized user.
 *
 * @this Client
 * @returns {Promise<Skema.Raw.users.UserFull>} Full user profile details.
 */
export async function getMe(this: Client): Promise<Skema.Raw.users.UserFull> {
  return await this.invoke(
    new Skema.Raw.users.GetFullUser({
      id: new Skema.Raw.InputUserSelf(),
    }),
  );
}
