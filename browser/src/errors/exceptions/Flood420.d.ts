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
export declare class Flood extends RPCError {
  code: number;
  name: string;
}
export declare class TwoFaConfirmWait extends Flood {
  id: string;
  message: string;
}
export declare class FloodTestPhoneWait extends Flood {
  id: string;
  message: string;
}
export declare class FloodWait extends Flood {
  id: string;
  message: string;
}
export declare class PremiumSubActiveUntil extends Flood {
  id: string;
  message: string;
}
export declare class SlowmodeWait extends Flood {
  id: string;
  message: string;
}
export declare class TakeoutInitDelay extends Flood {
  id: string;
  message: string;
}
