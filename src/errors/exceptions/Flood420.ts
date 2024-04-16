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

export class Flood extends RPCError {
  code: number = 420;
  name: string = 'FLOOD';
}
export class TwoFaConfirmWait extends Flood {
  id: string = '2FA_CONFIRM_WAIT_X';
  message: string =
    "Since this account is active and protected by a 2FA password, we will delete it in 1 week for security purposes. You can cancel this process at any time, you'll be able to reset your account in {value} seconds.";
}
export class FloodTestPhoneWait extends Flood {
  id: string = 'FLOOD_TEST_PHONE_WAIT_X';
  message: string = 'A wait of {value} seconds is required in the test servers';
}
export class FloodWait extends Flood {
  id: string = 'FLOOD_WAIT_X';
  message: string = 'A wait of {value} seconds is required';
}
export class PremiumSubActiveUntil extends Flood {
  id: string = 'PREMIUM_SUB_ACTIVE_UNTIL_X';
  message: string = 'You already have a premium subscription active until unixtime {value} .';
}
export class SlowmodeWait extends Flood {
  id: string = 'SLOWMODE_WAIT_X';
  message: string =
    'Slowmode is enabled in this chat: wait {value} seconds before sending another message to this chat.';
}
export class TakeoutInitDelay extends Flood {
  id: string = 'TAKEOUT_INIT_DELAY_X';
  message: string =
    "Sorry, for security reasons, you will be able to begin downloading your data in {value} seconds. We have notified all your devices about the export request to make sure it's authorized and to give you time to react if it's not.";
}
