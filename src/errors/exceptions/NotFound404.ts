/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

/***********************************************************
 *                         Warning!!                        *
 *               This file is auto generate.                *
 *         All change made in this file will be lost!       *
 ***********************************************************/
import { RPCError } from '../RpcError.ts';

export class NotFound extends RPCError {
  override code: number = 404;
  override name: string = 'NOT_FOUND';
}
export class PeerIdInvalid extends NotFound {
  override id: string = 'PEER_ID_INVALID';
  override message: string = 'The provided peer id is invalid.';
}
