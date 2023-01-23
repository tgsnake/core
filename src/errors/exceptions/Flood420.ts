/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
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

export class Flood extends RPCError {
  code: number = 420;
  name: string = 'FLOOD';
}
export class TwoFaConfirmWait extends Flood {
  id: string = '2FA_CONFIRM_WAIT_X';
  message: string =
    'A wait of {value} seconds is required because this account is active and protected by a 2FA password';
}
export class FloodTestPhoneWait extends Flood {
  id: string = 'FLOOD_TEST_PHONE_WAIT_X';
  message: string = 'A wait of {value} seconds is required in the test servers';
}
export class FloodWait extends Flood {
  id: string = 'FLOOD_WAIT_X';
  message: string = 'A wait of {value} seconds is required';
}
export class SlowmodeWait extends Flood {
  id: string = 'SLOWMODE_WAIT_X';
  message: string = 'A wait of {value} seconds is required to send messages in this chat.';
}
export class TakeoutInitDelay extends Flood {
  id: string = 'TAKEOUT_INIT_DELAY_X';
  message: string =
    'You have to confirm the data export request using one of your mobile devices or wait {value} seconds';
}
