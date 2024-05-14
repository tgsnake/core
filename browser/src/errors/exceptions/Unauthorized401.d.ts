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
import { RPCError } from '../RpcError.js';
export declare class Unauthorized extends RPCError {
  code: number;
  name: string;
}
export declare class ActiveUserRequired extends Unauthorized {
  id: string;
  message: string;
}
export declare class AuthKeyInvalid extends Unauthorized {
  id: string;
  message: string;
}
export declare class AuthKeyPermEmpty extends Unauthorized {
  id: string;
  message: string;
}
export declare class AuthKeyUnregistered extends Unauthorized {
  id: string;
  message: string;
}
export declare class SessionExpired extends Unauthorized {
  id: string;
  message: string;
}
export declare class SessionPasswordNeeded extends Unauthorized {
  id: string;
  message: string;
}
export declare class SessionRevoked extends Unauthorized {
  id: string;
  message: string;
}
export declare class UserDeactivated extends Unauthorized {
  id: string;
  message: string;
}
export declare class UserDeactivatedBan extends Unauthorized {
  id: string;
  message: string;
}
