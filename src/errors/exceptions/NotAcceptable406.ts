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

export class NotAcceptable extends RPCError {
  code: number = 406;
  name: string = 'NOT_ACCEPTABLE';
}
export class AuthKeyDuplicated extends NotAcceptable {
  id: string = 'AUTH_KEY_DUPLICATED';
  message: string =
    'The same authorization key (session file) was used in more than one place simultaneously. You must delete your session file and log in again with your phone number or bot token';
}
export class ChannelPrivate extends NotAcceptable {
  id: string = 'CHANNEL_PRIVATE';
  message: string = 'The channel/supergroup is not accessible';
}
export class FilerefUpgradeNeeded extends NotAcceptable {
  id: string = 'FILEREF_UPGRADE_NEEDED';
  message: string =
    'The file reference has expired and you must use a refreshed one by obtaining the original media message';
}
export class FreshChangeAdminsForbidden extends NotAcceptable {
  id: string = 'FRESH_CHANGE_ADMINS_FORBIDDEN';
  message: string = "You were just elected admin, you can't add or modify other admins yet";
}
export class FreshChangePhoneForbidden extends NotAcceptable {
  id: string = 'FRESH_CHANGE_PHONE_FORBIDDEN';
  message: string =
    "You can't change your phone number because your session was logged-in recently";
}
export class FreshResetAuthorisationForbidden extends NotAcceptable {
  id: string = 'FRESH_RESET_AUTHORISATION_FORBIDDEN';
  message: string =
    "You can't terminate other authorized sessions because the current was logged-in recently";
}
export class PhoneNumberInvalid extends NotAcceptable {
  id: string = 'PHONE_NUMBER_INVALID';
  message: string = 'The phone number is invalid';
}
export class PhonePasswordFlood extends NotAcceptable {
  id: string = 'PHONE_PASSWORD_FLOOD';
  message: string = 'You have tried to log-in too many times';
}
export class StickersetInvalid extends NotAcceptable {
  id: string = 'STICKERSET_INVALID';
  message: string = 'The sticker set is invalid';
}
export class StickersetOwnerAnonymous extends NotAcceptable {
  id: string = 'STICKERSET_OWNER_ANONYMOUS';
  message: string =
    "This sticker set can't be used as the group's sticker set because it was created by one of its anonymous admins";
}
export class UserpicUploadRequired extends NotAcceptable {
  id: string = 'USERPIC_UPLOAD_REQUIRED';
  message: string = 'You must have a profile picture to publish your geolocation';
}
export class UserRestricted extends NotAcceptable {
  id: string = 'USER_RESTRICTED';
  message: string = "You are limited/restricted. You can't perform this action";
}
