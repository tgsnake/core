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
  code: number = 401;
  name: string = 'UNAUTHORIZED';
}
export class ActiveUserRequired extends Unauthorized {
  id: string = 'ACTIVE_USER_REQUIRED';
  message: string = 'The method is only available to already activated users';
}
export class AuthKeyInvalid extends Unauthorized {
  id: string = 'AUTH_KEY_INVALID';
  message: string = 'The key is invalid';
}
export class AuthKeyPermEmpty extends Unauthorized {
  id: string = 'AUTH_KEY_PERM_EMPTY';
  message: string =
    'The method is unavailable for temporary authorization key, not bound to permanent';
}
export class AuthKeyUnregistered extends Unauthorized {
  id: string = 'AUTH_KEY_UNREGISTERED';
  message: string =
    'The key is not registered in the system. Delete your session file and login again';
}
export class SessionExpired extends Unauthorized {
  id: string = 'SESSION_EXPIRED';
  message: string = 'The authorization has expired';
}
export class SessionPasswordNeeded extends Unauthorized {
  id: string = 'SESSION_PASSWORD_NEEDED';
  message: string = 'The two-step verification is enabled and a password is required';
}
export class SessionRevoked extends Unauthorized {
  id: string = 'SESSION_REVOKED';
  message: string =
    'The authorization has been invalidated, because of the user terminating all sessions';
}
export class UserDeactivated extends Unauthorized {
  id: string = 'USER_DEACTIVATED';
  message: string = 'The user has been deleted/deactivated';
}
export class UserDeactivatedBan extends Unauthorized {
  id: string = 'USER_DEACTIVATED_BAN';
  message: string = 'The user has been deleted/deactivated';
}
