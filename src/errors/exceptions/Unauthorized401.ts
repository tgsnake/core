/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

/***********************************************************
 *                         Warning!!                        *
 *               This file is auto generate.                *
 *         All change made in this file will be lost!       *
 ***********************************************************/
import { RPCError } from '../RpcError.ts';

export class Unauthorized extends RPCError {
  override code: number = 401;
  override name: string = 'UNAUTHORIZED';
}
export class ActiveUserRequired extends Unauthorized {
  override id: string = 'ACTIVE_USER_REQUIRED';
  override message: string = 'The method is only available to already activated users';
}
export class AuthKeyInvalid extends Unauthorized {
  override id: string = 'AUTH_KEY_INVALID';
  override message: string = 'The specified auth key is invalid.';
}
export class AuthKeyPermEmpty extends Unauthorized {
  override id: string = 'AUTH_KEY_PERM_EMPTY';
  override message: string =
    'The method is unavailable for temporary authorization keys, not bound to a permanent authorization key.';
}
export class AuthKeyUnregistered extends Unauthorized {
  override id: string = 'AUTH_KEY_UNREGISTERED';
  override message: string =
    'The specified authorization key is not registered in the system (for example, a PFS temporary key has expired).';
}
export class SessionExpired extends Unauthorized {
  override id: string = 'SESSION_EXPIRED';
  override message: string = 'The session has expired.';
}
export class SessionPasswordNeeded extends Unauthorized {
  override id: string = 'SESSION_PASSWORD_NEEDED';
  override message: string = '2FA is enabled, use a password to login.';
}
export class SessionRevoked extends Unauthorized {
  override id: string = 'SESSION_REVOKED';
  override message: string = 'The session was revoked by the user.';
}
export class UserDeactivated extends Unauthorized {
  override id: string = 'USER_DEACTIVATED';
  override message: string = 'The current account was deleted by the user.';
}
export class UserDeactivatedBan extends Unauthorized {
  override id: string = 'USER_DEACTIVATED_BAN';
  override message: string =
    "The current account was deleted and banned by Telegram's antispam system.";
}
