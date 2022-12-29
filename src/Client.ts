/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2022 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { Raw, TLObject } from './raw';
import { Auth, Session, DataCenter } from './session';
import { AbstractSession } from './storage';
import * as Errors from './errors';
import * as os from 'os';
import { Logger } from './Logger';
import * as Version from './Version';
import * as helpers from './helpers';
import { computePasswordCheck } from './crypto/Password';

export interface ClientInterface {
  /**
   * Connecting to telegram test server.
   */
  testMode?: boolean;
  /**
   * Connecting using ipv6.
   */
  ipv6?: boolean;
  /**
   * The device model which is using for login.
   */
  deviceModel?: string;
  /**
   * The system version which is using for login.
   */
  systemVersion?: string;
  /**
   * The App version which is using for login.
   */
  appVersion?: string;
  /**
   * What language is used by the system.
   */
  systemLangCode?: string;
  /**
   * What language do you use.
   */
  langCode?: string;
  /**
   * Sleep treshold when flood wait reached.
   */
  sleepTreshold?: number;
  /**
   * Max retries when execution is fail.
   */
  maxRetries?: number;
  /**
   * Connenting to cdn telegram server.
   */
  isCdn?: boolean;
  /**
   * Pass true to disable incoming updates.<br/>
   * When updates are disabled the client can't receive messages or other updates.<br/>
   * Useful for batch programs that don't need to deal with updates.
   */
  noUpdates?: boolean;
  /**
   * Pass true to let the client use a takeout session instead of a normal one, implies `noUpdates : true`.<br/>
   * Useful for exporting Telegram data. Methods invoked inside a takeout session (such as get_chat_history,download_media, ...) are less prone to throw FloodWait exceptions.<br/>
   * Only available for users, bots will ignore this parameter.
   */
  takeout?: boolean;
}
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
   * Fill this when you forgot 2FA password, it will be automatic send recovery code to connected email.
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

export class Client {
  /** @hidden */
  _apiId!: number;
  /** @hidden */
  _apiHash!: string;
  /** @hidden */
  _storage!: AbstractSession;
  /** @hidden */
  _testMode!: boolean;
  /** @hidden */
  _ipv6!: boolean;
  /** @hidden */
  _deviceModel!: string;
  /** @hidden */
  _systemVersion!: string;
  /** @hidden */
  _appVersion!: string;
  /** @hidden */
  _systemLangCode!: string;
  /** @hidden */
  _langCode!: string;
  /** @hidden */
  _maxRetries!: number;
  /** @hidden */
  _isCdn!: boolean;
  /** @hidden */
  _sleepTreshold!: number;
  /** @hidden */
  _takeout!: boolean;
  /** @hidden */
  _noUpdates!: boolean;
  /** @hidden */
  _takeoutId!: bigint;
  /** @hidden */
  _dcId!: string;
  /** @hidden */
  _session!: Session;
  /** @hidden */
  _isConnected!: boolean;
  /** @hidden */
  _connectionMode: number = 2;
  /** @hidden */
  private _handler: Array<{ (update: Raw.TypeUpdates): any }> = [];
  /**
   * Client Constructor.
   * @param {Object} session - What the session will be used for login to telegram.
   * @param {String} apiHash - Your api hash, got it from my.telegram.org.
   * @param {Number} apiId - Your api id, got it from my.telegram.org.
   * @param {Object} clientInterface - Client options for initializing client.
   */
  constructor(
    session: AbstractSession,
    apiHash: string,
    apiId?: number,
    clientInterface?: ClientInterface
  ) {
    this._storage = session;
    this._apiHash = apiHash;
    this._apiId = apiId ?? session.apiId;
    this._testMode = clientInterface?.testMode ?? false;
    this._ipv6 = clientInterface?.ipv6 ?? false;
    this._deviceModel = clientInterface?.deviceModel ?? os.type().toString();
    this._systemVersion = clientInterface?.systemVersion ?? os.release().toString();
    this._appVersion = clientInterface?.appVersion ?? Version.version;
    this._systemLangCode = clientInterface?.systemLangCode ?? 'en';
    this._langCode = clientInterface?.langCode ?? this._systemLangCode;
    this._sleepTreshold = clientInterface?.sleepTreshold ?? 10000;
    this._maxRetries = clientInterface?.maxRetries ?? 5;
    this._isCdn = clientInterface?.isCdn ?? false;
    this._noUpdates = clientInterface?.noUpdates ?? false;
    this._takeout = clientInterface?.takeout ?? false;
  }
  /**
   * Load the session.
   */
  private async _loadSession(): Promise<void> {
    await this._storage.load();
    // without authkey, that mean the session is fresh.
    if (!this._storage.authKey) {
      const [ip, port] = await DataCenter.DataCenter(2, this._testMode, this._ipv6, false);
      const auth = new Auth(2, this._testMode, this._ipv6);
      this._storage.setAddress(2, ip, port, this._testMode);
      this._storage.setApiId(this._apiId);
      this._storage.setAuthKey(await auth.create(), 2);
    }
    // migrate from old string session
    if (!this._storage.apiId) {
      this._storage.setApiId(this._apiId);
    }
    if (this._storage.testMode === undefined) {
      this._storage.setAddress(
        this._storage.dcId,
        this._storage.ip,
        this._storage.port,
        this._testMode
      );
    }
  }
  /**
   * Load a session and login to telegram.
   */
  async connect(): Promise<void> {
    if (!this._isConnected) {
      Logger.info(`Using version: ${Version.version} - ${Version.getType()}`);
      await this._loadSession();

      this._session = new Session(
        this,
        this._storage.dcId,
        this._storage.authKey,
        this._storage.testMode
      );
      await this._session.start();
      this._isConnected = true;
    }
  }
  /**
   * Sigin as bot.
   * @param {String} botToken - Bot token from bot father.
   */
  private async _siginBot(botToken: string): Promise<Raw.User> {
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
          0
        );
      } catch (error: any) {
        if (error instanceof Errors.Exceptions.SeeOther.UserMigrate) {
          error as Errors.Exceptions.SeeOther.UserMigrate;
          await this._session.stop();
          const [ip, port] = await DataCenter.DataCenter(
            error.value as unknown as number,
            this._testMode,
            this._ipv6,
            false
          );
          const auth = new Auth(error.value as unknown as number, this._testMode, this._ipv6);
          this._storage.setAddress(error.value as unknown as number, ip, port, this._testMode);
          this._storage.setApiId(this._apiId);
          this._storage.setAuthKey(await auth.create(), this._storage.dcId);
          this._session = new Session(
            this,
            this._storage.dcId,
            this._storage.authKey,
            this._storage.testMode
          );
          await this._session.start();
        } else {
          throw error;
        }
      } finally {
        if (user) {
          await this._storage.setUserId(user.user.id);
          await this._storage.setIsBot(true);
          return user.user;
        }
      }
    }
  }
  /**
   * Sigin as user.
   * @param {Object} auth - The required parameter to be used for creating account or login.
   */
  private async _siginUser(auth: SigInUser): Promise<Raw.User> {
    let phoneNumber;
    let sendCode;
    let signedIn;
    let signedUp;
    while (true) {
      try {
        phoneNumber = await auth.phoneNumber();
        sendCode = await this.sendCode(phoneNumber);
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
    Logger.info('The confirmation code has been sent.');
    while (true) {
      let code = await auth.code();
      try {
        // @ts-ignore
        signedIn = await this.sigin(phoneNumber, sendCode.phoneCodeHash, code);
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
                return await this.checkPassword(await auth.password(await this.getPasswordHint()));
              } else {
                Logger.info('Look you are forgotten the password');
                if (auth.recoveryCode) {
                  let emailPattern = await this.sendRecoveryCode();
                  Logger.info(`The recovery code has been sent to ${emailPattern}`);
                  while (true) {
                    let recoveryCode = await auth.recoveryCode();
                    try {
                      return await this.recoverPassword(recoveryCode);
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
    if (signedIn && signedIn instanceof Raw.User) {
      return signedIn;
    }
    while (true) {
      try {
        signedUp = await this.signup(
          phoneNumber,
          sendCode.phoneCodeHash,
          auth.firstname ? await auth.firstname() : String(Date.now()),
          auth.lastname ? await auth.lastname() : ''
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
    if (signedIn instanceof Raw.help.TermsOfService) {
      Logger.info(`\n${signedIn.text}\n`);
      //@ts-ignore
      await this.acceptTOS(signedIn.id.data);
    }
    return signedUp;
  }
  /**
   * Sending telegram OTP code.
   * @param {String} phoneNumber - The phone number will be using to receive a OTP code.
   */
  async sendCode(phoneNumber: string): Promise<Raw.auth.SentCode> {
    phoneNumber = phoneNumber.replace(/\+/g, '').trim();
    while (true) {
      try {
        let r = await this.invoke(
          new Raw.auth.SendCode({
            phoneNumber: phoneNumber,
            apiId: this._apiId,
            apiHash: this._apiHash,
            settings: new Raw.CodeSettings({}),
          }),
          0
        );
        return r;
      } catch (error: any) {
        if (
          error instanceof Errors.Exceptions.SeeOther.NetworkMigrate ||
          error instanceof Errors.Exceptions.SeeOther.PhoneMigrate
        ) {
          await this._session.stop();
          const [ip, port] = await DataCenter.DataCenter(
            error.value as unknown as number,
            this._testMode,
            this._ipv6,
            false
          );
          const auth = new Auth(error.value as unknown as number, this._testMode, this._ipv6);
          this._storage.setAddress(error.value as unknown as number, ip, port, this._testMode);
          this._storage.setApiId(this._apiId);
          this._storage.setAuthKey(await auth.create(), this._storage.dcId);

          this._session = new Session(
            this,
            this._storage.dcId,
            this._storage.authKey,
            this._storage.testMode
          );
          await this._session.start();
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
  async sigin(
    phoneNumber: string,
    phoneCodeHash: string,
    phoneCode: string
  ): Promise<Raw.User | Raw.help.TermsOfService | boolean> {
    let r = await this.invoke(
      new Raw.auth.SignIn({
        phoneNumber: phoneNumber.replace(/\+/g, '').trim(),
        phoneCodeHash,
        phoneCode,
      }),
      0
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
  async recoverPassword(code: string): Promise<Raw.User> {
    let r = await this.invoke(
      new Raw.auth.RecoverPassword({
        code: code,
      }),
      0
    );
    await this._storage.setUserId(r.user.id);
    await this._storage.setIsBot(false);
    return r.user;
  }
  /**
   * Send the recovery code to cennected email to reset the 2FA.
   */
  async sendRecoveryCode(): Promise<string> {
    let r = await this.invoke(new Raw.auth.RequestPasswordRecovery(), 0);
    return r.emailPattern;
  }
  /**
   * Check the givens password is correct or not.
   * @param {String} password - Password will be check.
   */
  async checkPassword(password: string): Promise<Raw.User> {
    let r = await this.invoke(
      new Raw.auth.CheckPassword({
        password: computePasswordCheck(
          await this.invoke(new Raw.account.GetPassword(), 0),
          password
        ),
      }),
      0
    );
    await this._storage.setUserId(r.user.id);
    await this._storage.setIsBot(false);
    return r.user;
  }
  /**
   * Accepting Terms Of Service for creating a account.
   * @param {String} id - TOS Id,The terms of service identifier.
   */
  async acceptTOS(id: string): Promise<boolean> {
    let r = await this.invoke(
      new Raw.help.AcceptTermsOfService({
        id: new Raw.DataJSON({
          data: id,
        }),
      })
    );
    return Boolean(r);
  }
  /**
   * Get hint of 2FA password.
   */
  async getPasswordHint(): Promise<string> {
    let r = await this.invoke(new Raw.account.GetPassword(), 0);
    return r.hint;
  }
  /**
   * Sigin and create a new fresh account.
   * @param {String} phoneNumber - Phone number in international format (includes the country prefix).
   * @param {String} phoneCodeHash - Code identifier taken from the result of sendCode.
   * @param {String} firstname - New user firstname.
   * @param {String} lastname - New user lastname.
   */
  async signup(
    phoneNumber: string,
    phoneCodeHash: string,
    firstname: string,
    lastname: string = ''
  ): Promise<Raw.User> {
    let r = await this.invoke(
      new Raw.auth.SignUp({
        phoneNumber: phoneNumber.replace(/\+/g, '').trim(),
        phoneCodeHash,
        firstName: firstname,
        lastName: lastname,
      })
    );
    await this._storage.setUserId(r.user.id);
    await this._storage.setIsBot(false);
    return r.user;
  }
  /**
   * Starting client.
   * @param {Object} auth - Do you want to login with the user or with the bot.
   */
  async start(auth?: SigInBot | SigInUser): Promise<Raw.users.UserFull> {
    await this.connect();
    if (auth) {
      // @ts-ignore
      if (auth.botToken) {
        // @ts-ignore
        await this._siginBot(await auth.botToken);
      } else {
        // @ts-ignore
        await this._siginUser({ ...auth });
      }
    }
    if (!this._storage.isBot && this._takeout) {
      let takeout = await this.invoke(new Raw.account.InitTakeoutSession({}));
      this._takeoutId = takeout.id;
      Logger.warning(`Takeout session ${this._takeoutId} initiated.`);
    }
    await this.invoke(new Raw.updates.GetState());
    return await this.getMe();
  }
  /**
   * Logout and kill the client.
   */
  async logout(): Promise<any> {
    await this.invoke(new Raw.auth.LogOut());
    await this._storage.delete();
    Logger.info(`Logged out.`);
    return process.exit(0); // kill the process
  }
  /**
   * Getting info about self.
   */
  async getMe(): Promise<Raw.users.UserFull> {
    return await this.invoke(
      new Raw.users.GetFullUser({
        id: new Raw.InputUserSelf(),
      })
    );
  }
  /**
   * Exporting current session to string.
   */
  async exportSession(): Promise<string> {
    if (!this._storage.userId) {
      const me = await this.getMe();
      this._storage.setUserId(me.fullUser.id);
      // @ts-ignore
      this._storage.setIsBot(Boolean(me.users[0].bot));
    }
    return this._storage.exportString();
  }
  /**
   * Sending request to telegram. <br/>
   * Only telegram method can be invoked.
   * @param {Object} query - Raw class from telegram method.
   * @param {Number} retries - Max retries for invoking. default is same with ClientInterface.maxRetries or 5.
   * @param {Number} timeout - How long to wait for the function to finish. default is 15s.
   * @param {Number} sleepTreshold - Sleep treshold when you got flood wait. default is ClientInterface.sleepTreshold or 10s.
   */
  async invoke(
    query: TLObject,
    retries: number = this._maxRetries,
    timeout?: number,
    sleepTreshold: number = this._sleepTreshold
  ) {
    if (!this._isConnected) {
      throw new Errors.ClientDisconnected();
    }
    if (this._noUpdates) {
      query = new Raw.InvokeWithoutUpdates({ query });
    }
    if (this._takeoutId) {
      query = new Raw.InvokeWithTakeout({ query, takeoutId: this._takeoutId });
    }
    const r = await this._session.invoke(query, retries, timeout, sleepTreshold);
    await this.fetchPeers(r.users ?? []);
    await this.fetchPeers(r.chats ?? []);
    return r;
  }
  /**
   * Handling new updates from telegram.
   */
  async handleUpdate(update: Raw.Updates): Promise<Raw.Updates> {
    if (!this._noUpdates) {
      await this.fetchPeers(update.users ?? []);
      await this.fetchPeers(update.users ?? []);
      this._handler.forEach((callback) => {
        return callback(update);
      });
    }
    return update;
  }
  /**
   * Add handler when update coming.
   */
  async addHandler(callback: { (update: Raw.TypeUpdates): any }): Promise<any> {
    return this._handler.push(callback);
  }
  /**
   * Fetch the peer into session.
   * @param {Array} peers - Peers will be fetched.
   */
  async fetchPeers(peers: Array<Raw.TypeUser | Raw.TypeChat>): Promise<boolean> {
    let isMin = false;
    let parsedPeers: Array<
      [id: bigint, accessHash: bigint, type: string, username?: string, phoneNumber?: string]
    > = [];
    for (let peer of peers) {
      // @ts-ignore
      if (peer.min) {
        isMin = true;
        continue;
      }
      if (peer instanceof Raw.User) {
        peer as Raw.User;
        parsedPeers.push([
          peer.id,
          peer.accessHash ?? BigInt(0),
          peer.bot ? 'bot' : 'user',
          peer.username ? peer.username.toLowerCase() : undefined,
          peer.phone ? peer.phone : undefined,
        ]);
      } else if (peer instanceof Raw.Chat || peer instanceof Raw.ChatForbidden) {
        parsedPeers.push([-peer.id, BigInt(0), 'group', undefined, undefined]);
      } else if (peer instanceof Raw.Channel || peer instanceof Raw.ChannelForbidden) {
        parsedPeers.push([
          helpers.getChannelId(peer.id),
          peer.accessHash ?? BigInt(0),
          // @ts-ignore
          peer.broadcast ? 'channel' : 'supergroup',
          // @ts-ignore
          peer.username ? peer.username.toLowerCase() : undefined,
          undefined,
        ]);
      }
      continue;
    }
    await this._storage.updatePeers(parsedPeers);
    return isMin;
  }
  /**
   * Get the valid peer.
   * @param {String|BigInt} peerId - The provided peer id will be resolve to a valid peer object.
   */
  async resolvePeer(
    peerId: bigint | string
  ): Promise<Raw.InputPeerUser | Raw.InputPeerChat | Raw.InputPeerChannel | Raw.InputUserSelf> {
    if (!this._isConnected) {
      throw new Errors.ClientDisconnected();
    }
    if (typeof peerId === 'bigint') {
      peerId as bigint;
      let peer = await this._storage.getPeerById(peerId);
      if (peer) {
        return peer;
      } else {
        let type = await helpers.getPeerType(peerId);
        if (type === 'user') {
          await this.fetchPeers(
            await this.invoke(
              new Raw.users.GetUsers({
                id: [
                  new Raw.InputUser({
                    userId: peerId,
                    accessHash: BigInt(0),
                  }),
                ],
              })
            )
          );
        } else if (type === 'chat') {
          await this.invoke(
            new Raw.messages.GetChats({
              id: [-peerId],
            })
          );
        } else {
          await this.invoke(
            new Raw.channels.GetChannels({
              id: [
                new Raw.InputChannel({
                  channelId: helpers.getChannelId(peerId),
                  accessHash: BigInt(0),
                }),
              ],
            })
          );
        }
        peer = await this._storage.getPeerById(peerId);
        if (!peer) {
          throw new Errors.Exceptions.BadRequest.PeerIdInvalid();
        }
        return peer;
      }
    } else if (typeof peerId === 'string') {
      peerId as string;
      if (peerId === 'self' || peerId === 'me') {
        return new Raw.InputUserSelf();
      }
      let peer;
      if (peerId.includes('@')) {
        peer = await this._storage.getPeerByUsername(peerId.replace('@', '').trim());
        if (peer) {
          return peer;
        } else {
          await this.invoke(
            new Raw.contacts.ResolveUsername({
              username: peerId.replace('@', '').trim(),
            })
          );
          peer = await this._storage.getPeerByUsername(peerId.replace('@', '').trim());
          if (peer) {
            return peer;
          } else {
            throw new Errors.Exceptions.BadRequest.PeerIdInvalid();
          }
        }
      } else if (!Number.isNaN(peerId)) {
        peer = await this._storage.getPeerById(BigInt(peerId));
        if (peer) {
          return peer;
        } else {
          let type = await helpers.getPeerType(BigInt(peerId));
          if (type === 'user') {
            await this.fetchPeers(
              await this.invoke(
                new Raw.users.GetUsers({
                  id: [
                    new Raw.InputUser({
                      userId: BigInt(peerId),
                      accessHash: BigInt(0),
                    }),
                  ],
                })
              )
            );
          } else if (type === 'chat') {
            await this.invoke(
              new Raw.messages.GetChats({
                id: [-BigInt(peerId)],
              })
            );
          } else {
            await this.invoke(
              new Raw.channels.GetChannels({
                id: [
                  new Raw.InputChannel({
                    channelId: helpers.getChannelId(BigInt(peerId)),
                    accessHash: BigInt(0),
                  }),
                ],
              })
            );
          }
          peer = await this._storage.getPeerById(BigInt(peerId));
          if (!peer) {
            throw new Errors.Exceptions.BadRequest.PeerIdInvalid();
          }
          return peer;
        }
      } else {
        peer = await this._storage.getPeerByPhoneNumber(peerId);
        if (peer) {
          return peer;
        } else {
          throw new Errors.Exceptions.BadRequest.PeerIdInvalid();
        }
      }
    } else {
      throw new Errors.Exceptions.BadRequest.PeerIdInvalid();
    }
  }
  [Symbol.for('nodejs.util.inspect.custom')](): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = value;
        }
      }
    }
    return toPrint;
  }
  toJSON(): { [key: string]: any } {
    const toPrint: { [key: string]: any } = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_')) {
          toPrint[key] = typeof value === 'bigint' ? String(value) : value;
        }
      }
    }
    return toPrint;
  }
  /** @hidden */
  toString(): string {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
