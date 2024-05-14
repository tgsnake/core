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
export declare class SeeOther extends RPCError {
  code: number;
  name: string;
}
export declare class FileMigrate extends SeeOther {
  id: string;
  message: string;
}
export declare class NetworkMigrate extends SeeOther {
  id: string;
  message: string;
}
export declare class PhoneMigrate extends SeeOther {
  id: string;
  message: string;
}
export declare class StatsMigrate extends SeeOther {
  id: string;
  message: string;
}
export declare class UserMigrate extends SeeOther {
  id: string;
  message: string;
}
