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
  message: string =
    'Your IP address is associated to DC {value}, please re-send the query to that DC.';
}
export class PhoneMigrate extends SeeOther {
  id: string = 'PHONE_MIGRATE_X';
  message: string =
    'Your phone number is associated to DC {value}, please re-send the query to that DC.';
}
export class StatsMigrate extends SeeOther {
  id: string = 'STATS_MIGRATE_X';
  message: string =
    'Channel statistics for the specified channel are stored on DC {value}, please re-send the query to that DC.';
}
export class UserMigrate extends SeeOther {
  id: string = 'USER_MIGRATE_X';
  message: string =
    'Your account is associated to DC {value}, please re-send the query to that DC.';
}
