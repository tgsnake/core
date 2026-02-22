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

export class Flood extends RPCError {
  override code: number = 420;
  override name: string = 'FLOOD';
}
export class TwoFaConfirmWait extends Flood {
  override id: string = '2FA_CONFIRM_WAIT_X';
  override message: string =
    "Since this account is active and protected by a 2FA password, we will delete it in 1 week for security purposes. You can cancel this process at any time, you'll be able to reset your account in {value} seconds.";
}
export class AddressInvalid extends Flood {
  override id: string = 'ADDRESS_INVALID';
  override message: string = 'The specified geopoint address is invalid.';
}
export class FloodPremiumWait extends Flood {
  override id: string = 'FLOOD_PREMIUM_WAIT_X';
  override message: string =
    'Please wait {value} seconds before repeating the action, or purchase a [Telegram Premium subscription](https://core.telegram.org/api/premium) to remove this rate limit.';
}
export class FloodTestPhoneWait extends Flood {
  override id: string = 'FLOOD_TEST_PHONE_WAIT_X';
  override message: string = 'A wait of {value} seconds is required in the test servers';
}
export class FloodWait extends Flood {
  override id: string = 'FLOOD_WAIT_X';
  override message: string = 'Please wait {value} seconds before repeating the action.';
}
export class PremiumSubActiveUntil extends Flood {
  override id: string = 'PREMIUM_SUB_ACTIVE_UNTIL_X';
  override message: string =
    'You already have a premium subscription active until unixtime {value} .';
}
export class SlowmodeWait extends Flood {
  override id: string = 'SLOWMODE_WAIT_X';
  override message: string =
    'Slowmode is enabled in this chat: wait {value} seconds before sending another message to this chat.';
}
export class TakeoutInitDelay extends Flood {
  override id: string = 'TAKEOUT_INIT_DELAY_X';
  override message: string =
    "Sorry, for security reasons, you will be able to begin downloading your data in {value} seconds. We have notified all your devices about the export request to make sure it's authorized and to give you time to react if it's not.";
}
