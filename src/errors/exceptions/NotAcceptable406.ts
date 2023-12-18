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
export class BannedRightsInvalid extends NotAcceptable {
  id: string = 'BANNED_RIGHTS_INVALID';
  message: string = 'You provided some invalid flags in the banned rights.';
}
export class CallProtocolCompatLayerInvalid extends NotAcceptable {
  id: string = 'CALL_PROTOCOL_COMPAT_LAYER_INVALID';
  message: string =
    'The other side of the call does not support any of the VoIP protocols supported by the local client, as specified by the protocol.layer and protocol.library_versions fields.';
}
export class ChannelPrivate extends NotAcceptable {
  id: string = 'CHANNEL_PRIVATE';
  message: string = 'The channel/supergroup is not accessible';
}
export class ChannelTooLarge extends NotAcceptable {
  id: string = 'CHANNEL_TOO_LARGE';
  message: string =
    'Channel is too large to be deleted; this error is issued when trying to delete channels with more than 1000 members (subject to change).';
}
export class ChatForwardsRestricted extends NotAcceptable {
  id: string = 'CHAT_FORWARDS_RESTRICTED';
  message: string = "You can't forward messages from a protected chat.";
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
export class GiftcodeNotAllowed extends NotAcceptable {
  id: string = 'GIFTCODE_NOT_ALLOWED';
  message: string = '';
}
export class InviteHashExpired extends NotAcceptable {
  id: string = 'INVITE_HASH_EXPIRED';
  message: string = 'The invite link has expired.';
}
export class PaymentUnsupported extends NotAcceptable {
  id: string = 'PAYMENT_UNSUPPORTED';
  message: string =
    'A detailed description of the error will be received separately as described here ».';
}
export class PhoneNumberInvalid extends NotAcceptable {
  id: string = 'PHONE_NUMBER_INVALID';
  message: string = 'The phone number is invalid';
}
export class PhonePasswordFlood extends NotAcceptable {
  id: string = 'PHONE_PASSWORD_FLOOD';
  message: string = 'You have tried to log-in too many times';
}
export class PreviousChatImportActiveWaitmin extends NotAcceptable {
  id: string = 'PREVIOUS_CHAT_IMPORT_ACTIVE_WAIT_XMIN';
  message: string =
    'Import for this chat is already in progress, wait {value} minutes before starting a new one.';
}
export class SendCodeUnavailable extends NotAcceptable {
  id: string = 'SEND_CODE_UNAVAILABLE';
  message: string =
    'Returned when all available options for this type of number were already used (e.g. flash-call, then SMS, then this error might be returned to trigger a second resend).';
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
export class TopicClosed extends NotAcceptable {
  id: string = 'TOPIC_CLOSED';
  message: string = "This topic was closed, you can't send messages to it anymore.";
}
export class TopicDeleted extends NotAcceptable {
  id: string = 'TOPIC_DELETED';
  message: string = 'The specified topic was deleted.';
}
export class UserpicPrivacyRequired extends NotAcceptable {
  id: string = 'USERPIC_PRIVACY_REQUIRED';
  message: string =
    'You need to disable privacy settings for your profile picture in order to make your geolocation public.';
}
export class UserpicUploadRequired extends NotAcceptable {
  id: string = 'USERPIC_UPLOAD_REQUIRED';
  message: string = 'You must have a profile picture to publish your geolocation';
}
export class UserRestricted extends NotAcceptable {
  id: string = 'USER_RESTRICTED';
  message: string = "You are limited/restricted. You can't perform this action";
}
