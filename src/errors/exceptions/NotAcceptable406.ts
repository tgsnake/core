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

export class NotAcceptable extends RPCError {
  override code: number = 406;
  override name: string = 'NOT_ACCEPTABLE';
}
export class AuthKeyDuplicated extends NotAcceptable {
  override id: string = 'AUTH_KEY_DUPLICATED';
  override message: string =
    'Concurrent usage of the current session from multiple connections was detected, the current session was invalidated by the server for security reasons!';
}
export class BannedRightsInvalid extends NotAcceptable {
  override id: string = 'BANNED_RIGHTS_INVALID';
  override message: string = 'You provided some invalid flags in the banned rights.';
}
export class BusinessAddressActive extends NotAcceptable {
  override id: string = 'BUSINESS_ADDRESS_ACTIVE';
  override message: string =
    'The user is currently advertising a [Business Location](https://core.telegram.org/api/business#location), the location may only be changed (or removed) using [account.updateBusinessLocation &raquo;](https://core.telegram.org/method/account.updateBusinessLocation).  .';
}
export class CallProtocolCompatLayerInvalid extends NotAcceptable {
  override id: string = 'CALL_PROTOCOL_COMPAT_LAYER_INVALID';
  override message: string =
    'The other side of the call does not support any of the VoIP protocols supported by the local client, as specified by the `protocol.layer` and `protocol.library_versions` fields.';
}
export class ChannelPrivate extends NotAcceptable {
  override id: string = 'CHANNEL_PRIVATE';
  override message: string = "You haven't joined this channel/supergroup.";
}
export class ChannelTooLarge extends NotAcceptable {
  override id: string = 'CHANNEL_TOO_LARGE';
  override message: string =
    'Channel is too large to be deleted; this error is issued when trying to delete channels with more than 1000 members (subject to change).';
}
export class ChatForwardsRestricted extends NotAcceptable {
  override id: string = 'CHAT_FORWARDS_RESTRICTED';
  override message: string = "You can't forward messages from a protected chat.";
}
export class FilerefUpgradeNeeded extends NotAcceptable {
  override id: string = 'FILEREF_UPGRADE_NEEDED';
  override message: string =
    'The client has to be updated in order to support [file references](https://core.telegram.org/api/file_reference).';
}
export class FreshChangeAdminsForbidden extends NotAcceptable {
  override id: string = 'FRESH_CHANGE_ADMINS_FORBIDDEN';
  override message: string =
    "You were just elected admin, you can't add or modify other admins yet.";
}
export class FreshChangePhoneForbidden extends NotAcceptable {
  override id: string = 'FRESH_CHANGE_PHONE_FORBIDDEN';
  override message: string =
    "You can't change phone number right after logging in, please wait at least 24 hours.";
}
export class FreshResetAuthorisationForbidden extends NotAcceptable {
  override id: string = 'FRESH_RESET_AUTHORISATION_FORBIDDEN';
  override message: string =
    "You can't logout other sessions if less than 24 hours have passed since you logged on the current session.";
}
export class GiftcodeNotAllowed extends NotAcceptable {
  override id: string = 'GIFTCODE_NOT_ALLOWED';
  override message: string = '';
}
export class InviteHashExpired extends NotAcceptable {
  override id: string = 'INVITE_HASH_EXPIRED';
  override message: string = 'The invite link has expired.';
}
export class PaymentUnsupported extends NotAcceptable {
  override id: string = 'PAYMENT_UNSUPPORTED';
  override message: string =
    'A detailed description of the error will be received separately as described [here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable).';
}
export class PhoneNumberInvalid extends NotAcceptable {
  override id: string = 'PHONE_NUMBER_INVALID';
  override message: string = 'The phone number is invalid.';
}
export class PhonePasswordFlood extends NotAcceptable {
  override id: string = 'PHONE_PASSWORD_FLOOD';
  override message: string = 'You have tried logging in too many times.';
}
export class PremiumCurrentlyUnavailable extends NotAcceptable {
  override id: string = 'PREMIUM_CURRENTLY_UNAVAILABLE';
  override message: string = 'You cannot currently purchase a Premium subscription.';
}
export class PreviousChatImportActiveWaitmin extends NotAcceptable {
  override id: string = 'PREVIOUS_CHAT_IMPORT_ACTIVE_WAIT_XMIN';
  override message: string =
    'Import for this chat is already in progress, wait {value} minutes before starting a new one.';
}
export class PrivacyPremiumRequired extends NotAcceptable {
  override id: string = 'PRIVACY_PREMIUM_REQUIRED';
  override message: string =
    'You need a [Telegram Premium subscription](https://core.telegram.org/api/premium) to send a message to this user.';
}
export class SendCodeUnavailable extends NotAcceptable {
  override id: string = 'SEND_CODE_UNAVAILABLE';
  override message: string =
    'Returned when all available options for this type of number were already used (e.g. flash-call, then SMS, then this error might be returned to trigger a second resend).';
}
export class StickersetInvalid extends NotAcceptable {
  override id: string = 'STICKERSET_INVALID';
  override message: string = 'The provided sticker set is invalid.';
}
export class StickersetOwnerAnonymous extends NotAcceptable {
  override id: string = 'STICKERSET_OWNER_ANONYMOUS';
  override message: string =
    "Provided stickerset can't be installed as group stickerset to prevent admin deanonymization.";
}
export class TopicClosed extends NotAcceptable {
  override id: string = 'TOPIC_CLOSED';
  override message: string = "This topic was closed, you can't send messages to it anymore.";
}
export class TopicDeleted extends NotAcceptable {
  override id: string = 'TOPIC_DELETED';
  override message: string = 'The specified topic was deleted.';
}
export class UpdateAppToLogin extends NotAcceptable {
  override id: string = 'UPDATE_APP_TO_LOGIN';
  override message: string = 'Please update your client to login.';
}
export class UserpicPrivacyRequired extends NotAcceptable {
  override id: string = 'USERPIC_PRIVACY_REQUIRED';
  override message: string =
    'You need to disable privacy settings for your profile picture in order to make your geolocation public.';
}
export class UserpicUploadRequired extends NotAcceptable {
  override id: string = 'USERPIC_UPLOAD_REQUIRED';
  override message: string = 'You must have a profile picture to publish your geolocation.';
}
export class UserRestricted extends NotAcceptable {
  override id: string = 'USER_RESTRICTED';
  override message: string = "You're spamreported, you can't create channels or chats.";
}
