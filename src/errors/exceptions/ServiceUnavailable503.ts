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

export class ServiceUnavailable extends RPCError {
  code: number = 503;
  name: string = 'SERVICE_UNAVAILABLE';
}
export class ApiCallError extends ServiceUnavailable {
  id: string = 'ApiCallError';
  message: string = 'Telegram is having internal problems. Please try again later.';
}
export class Timeout extends ServiceUnavailable {
  id: string = 'Timeout';
  message: string = 'Timeout while fetching data.';
}
