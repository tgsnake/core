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

export class NotAcceptable extends RPCError {
  code: number = 406;
  name: string = 'NOT_ACCEPTABLE';
}
export class AuthKeyDuplicated extends NotAcceptable {
  id: string = 'AUTH_KEY_DUPLICATED';
  message: string =
    'Concurrent usage of the current session from multiple connections was detected, the current session was invalidated by the server for security reasons!';
}
export class BannedRightsInvalid extends NotAcceptable {
  id: string = 'BANNED_RIGHTS_INVALID';
  message: string = 'You provided some invalid flags in the banned rights.';
}
export class BusinessAddressActive extends NotAcceptable {
  id: string = 'BUSINESS_ADDRESS_ACTIVE';
  message: string =
    'The user is currently advertising a [Business Location](https://core.telegram.org/api/business#location), the location may only be changed (or removed) using [account.updateBusinessLocation &raquo;](https://core.telegram.org/method/account.updateBusinessLocation).  .';
}
export class CallProtocolCompatLayerInvalid extends NotAcceptable {
  id: string = 'CALL_PROTOCOL_COMPAT_LAYER_INVALID';
  message: string =
    'The other side of the call does not support any of the VoIP protocols supported by the local client, as specified by the `protocol.layer` and `protocol.library_versions` fields.';
}
export class ChannelPrivate extends NotAcceptable {
  id: string = 'CHANNEL_PRIVATE';
  message: string = "You haven't joined this channel/supergroup.";
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
    'The client has to be updated in order to support [file references](https://core.telegram.org/api/file_reference).';
}
export class FreshChangeAdminsForbidden extends NotAcceptable {
  id: string = 'FRESH_CHANGE_ADMINS_FORBIDDEN';
  message: string = "You were just elected admin, you can't add or modify other admins yet.";
}
export class FreshChangePhoneForbidden extends NotAcceptable {
  id: string = 'FRESH_CHANGE_PHONE_FORBIDDEN';
  message: string =
    "You can't change phone number right after logging in, please wait at least 24 hours.";
}
export class FreshResetAuthorisationForbidden extends NotAcceptable {
  id: string = 'FRESH_RESET_AUTHORISATION_FORBIDDEN';
  message: string =
    "You can't logout other sessions if less than 24 hours have passed since you logged on the current session.";
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
    'A detailed description of the error will be received separately as described [here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable).';
}
export class PhoneNumberInvalid extends NotAcceptable {
  id: string = 'PHONE_NUMBER_INVALID';
  message: string = 'The phone number is invalid.';
}
export class PhonePasswordFlood extends NotAcceptable {
  id: string = 'PHONE_PASSWORD_FLOOD';
  message: string = 'You have tried logging in too many times.';
}
export class PreviousChatImportActiveWaitmin extends NotAcceptable {
  id: string = 'PREVIOUS_CHAT_IMPORT_ACTIVE_WAIT_XMIN';
  message: string =
    'Import for this chat is already in progress, wait {value} minutes before starting a new one.';
}
export class PrivacyPremiumRequired extends NotAcceptable {
  id: string = 'PRIVACY_PREMIUM_REQUIRED';
  message: string =
    'You need a [Telegram Premium subscription](https://core.telegram.org/api/premium) to send a message to this user.';
}
export class SendCodeUnavailable extends NotAcceptable {
  id: string = 'SEND_CODE_UNAVAILABLE';
  message: string =
    'Returned when all available options for this type of number were already used (e.g. flash-call, then SMS, then this error might be returned to trigger a second resend).';
}
export class StickersetInvalid extends NotAcceptable {
  id: string = 'STICKERSET_INVALID';
  message: string = 'The provided sticker set is invalid.';
}
export class StickersetOwnerAnonymous extends NotAcceptable {
  id: string = 'STICKERSET_OWNER_ANONYMOUS';
  message: string =
    "Provided stickerset can't be installed as group stickerset to prevent admin deanonymization.";
}
export class TopicClosed extends NotAcceptable {
  id: string = 'TOPIC_CLOSED';
  message: string = "This topic was closed, you can't send messages to it anymore.";
}
export class TopicDeleted extends NotAcceptable {
  id: string = 'TOPIC_DELETED';
  message: string = 'The specified topic was deleted.';
}
export class UpdateAppToLogin extends NotAcceptable {
  id: string = 'UPDATE_APP_TO_LOGIN';
  message: string = 'Please update to the latest version of tgsnake to login.';
}
export class UserpicPrivacyRequired extends NotAcceptable {
  id: string = 'USERPIC_PRIVACY_REQUIRED';
  message: string =
    'You need to disable privacy settings for your profile picture in order to make your geolocation public.';
}
export class UserpicUploadRequired extends NotAcceptable {
  id: string = 'USERPIC_UPLOAD_REQUIRED';
  message: string = 'You must have a profile picture to publish your geolocation.';
}
export class UserRestricted extends NotAcceptable {
  id: string = 'USER_RESTRICTED';
  message: string = "You're spamreported, you can't create channels or chats.";
}
