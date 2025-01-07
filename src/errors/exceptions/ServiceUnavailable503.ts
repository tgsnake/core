/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2025 butthx <https://github.com/butthx>
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

export class ServiceUnavailable extends RPCError {
  override code: number = 503;
  override name: string = 'SERVICE_UNAVAILABLE';
}
export class ApiCallError extends ServiceUnavailable {
  override id: string = 'ApiCallError';
  override message: string = 'Telegram is having internal problems. Please try again later.';
}
export class MsgWaitTimeout extends ServiceUnavailable {
  override id: string = 'MSG_WAIT_TIMEOUT';
  override message: string =
    'Spent too much time waiting for a previous query in the invokeAfterMsg request queue, aborting!';
}
export class Timeout extends ServiceUnavailable {
  override id: string = 'Timeout';
  override message: string = 'Timeout while fetching data.';
}
