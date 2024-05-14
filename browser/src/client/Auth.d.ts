/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import type { Client } from './Client.js';
import { Raw } from '../raw/index.js';
import * as Errors from '../errors/index.js';
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
  phoneNumber: {
    (): Promise<string>;
  };
  /**
   * The 2FA password.
   */
  password?: {
    (hint: string): Promise<string>;
  };
  /**
   * Fill client when you forgot 2FA password, it will be automatic send recovery code to connected email.
   */
  recoveryCode?: {
    (): Promise<string>;
  };
  /**
   * The OTP code.
   */
  code: {
    (): Promise<string>;
  };
  /**
   * Firstname to be used for created account.
   */
  firstname?: {
    (): Promise<string>;
  };
  /**
   * Lastname to be used for created account.
   */
  lastname?: {
    (): Promise<string>;
  };
  /**
   * When error BadRequest attempt, what should do.
   */
  authError?: {
    (error: Errors.Exceptions.BadRequest.BadRequest): any;
  };
}
/**
 * Sigin as bot.
 * @param {Client} client - Telegram client.
 * @param {String} botToken - Bot token from bot father.
 */
export declare function siginBot(client: Client, botToken: string): Promise<Raw.User | undefined>;
/**
 * Sigin as user.
 * @param {Client} client - Telegram client.
 * @param {Client} auth - The required parameter to be used for creating account or login.
 */
export declare function siginUser(client: Client, auth: SigInUser): Promise<Raw.User | undefined>;
/**
 * Sending telegram OTP code.
 * @param {Client} client - Telegram client.
 * @param {String} phoneNumber - The phone number will be using to receive a OTP code.
 */
export declare function sendCode(
  client: Client,
  phoneNumber: string,
): Promise<Raw.auth.TypeSentCode>;
/**
 * Authorize a user in Telegram with a valid confirmation code.
 * @param {Client} client - Telegram client.
 * @param {String} phoneNumber - Phone number in international format (includes the country prefix).
 * @param {String} phoneCodeHash - Code identifier taken from the result of sendCode.
 * @param {String} phoneCode - The valid confirmation code you received (either as Telegram message or as SMS in your phone number).
 */
export declare function sigin(
  client: Client,
  phoneNumber: string,
  phoneCodeHash: string,
  phoneCode: string,
): Promise<Raw.User | Raw.help.TermsOfService | boolean>;
/**
 * Recover your password with recovery code and login.
 * @param {Client} client - Telegram client.
 * @param {String} code - The recovery code has been send in connected email with 2FA.
 */
export declare function recoverPassword(
  client: Client,
  code: string,
): Promise<Raw.User | undefined>;
/**
 * Send the recovery code to cennected email to reset the 2FA.
 * @param {Client} client - Telegram client.
 */
export declare function sendRecoveryCode(client: Client): Promise<string>;
/**
 * Check the givens password is correct or not.
 * @param {Client} client - Telegram client
 * @param {String} password - Password will be check.
 */
export declare function checkPassword(
  client: Client,
  password: string,
): Promise<Raw.User | undefined>;
/**
 * Accepting Terms Of Service for creating a account.
 * @param {Client} client - Telegram client.
 * @param {String} id - TOS Id,The terms of service identifier.
 */
export declare function acceptTOS(client: Client, id: string): Promise<boolean>;
/**
 * Get hint of 2FA password.
 * @param {Client} client - Telegram client
 */
export declare function getPasswordHint(client: Client): Promise<string>;
/**
 * Sigin and create a new fresh account.
 * @param {Client} client - Telegram client.
 * @param {String} phoneNumber - Phone number in international format (includes the country prefix).
 * @param {String} phoneCodeHash - Code identifier taken from the result of sendCode.
 * @param {String} firstname - New user firstname.
 * @param {String} lastname - New user lastname.
 */
export declare function signup(
  client: Client,
  phoneNumber: string,
  phoneCodeHash: string,
  firstname: string,
  lastname?: string,
): Promise<Raw.User | undefined>;
/**
 * Getting info about self.
 */
export declare function getMe(client: Client): Promise<Raw.users.UserFull>;
