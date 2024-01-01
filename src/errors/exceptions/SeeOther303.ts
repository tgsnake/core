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

export class SeeOther extends RPCError {
  code: number = 303;
  name: string = 'SEE_OTHER';
}
export class FileMigrate extends SeeOther {
  id: string = 'FILE_MIGRATE_X';
  message: string = 'The file to be accessed is currently stored in DC{value}';
}
export class NetworkMigrate extends SeeOther {
  id: string = 'NETWORK_MIGRATE_X';
  message: string = 'The source IP address is associated with DC{value} (for registration)';
}
export class PhoneMigrate extends SeeOther {
  id: string = 'PHONE_MIGRATE_X';
  message: string =
    'The phone number a user is trying to use for authorization is associated with DC{value}';
}
export class StatsMigrate extends SeeOther {
  id: string = 'STATS_MIGRATE_X';
  message: string = 'The statistics of the group/channel are stored in DC{value}';
}
export class UserMigrate extends SeeOther {
  id: string = 'USER_MIGRATE_X';
  message: string =
    'The user whose identity is being used to execute queries is associated with DC{value} (for registration)';
}
