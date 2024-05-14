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
export declare class NotAcceptable extends RPCError {
  code: number;
  name: string;
}
export declare class AuthKeyDuplicated extends NotAcceptable {
  id: string;
  message: string;
}
export declare class BannedRightsInvalid extends NotAcceptable {
  id: string;
  message: string;
}
export declare class CallProtocolCompatLayerInvalid extends NotAcceptable {
  id: string;
  message: string;
}
export declare class ChannelPrivate extends NotAcceptable {
  id: string;
  message: string;
}
export declare class ChannelTooLarge extends NotAcceptable {
  id: string;
  message: string;
}
export declare class ChatForwardsRestricted extends NotAcceptable {
  id: string;
  message: string;
}
export declare class FilerefUpgradeNeeded extends NotAcceptable {
  id: string;
  message: string;
}
export declare class FreshChangeAdminsForbidden extends NotAcceptable {
  id: string;
  message: string;
}
export declare class FreshChangePhoneForbidden extends NotAcceptable {
  id: string;
  message: string;
}
export declare class FreshResetAuthorisationForbidden extends NotAcceptable {
  id: string;
  message: string;
}
export declare class GiftcodeNotAllowed extends NotAcceptable {
  id: string;
  message: string;
}
export declare class InviteHashExpired extends NotAcceptable {
  id: string;
  message: string;
}
export declare class PaymentUnsupported extends NotAcceptable {
  id: string;
  message: string;
}
export declare class PhoneNumberInvalid extends NotAcceptable {
  id: string;
  message: string;
}
export declare class PhonePasswordFlood extends NotAcceptable {
  id: string;
  message: string;
}
export declare class PreviousChatImportActiveWaitmin extends NotAcceptable {
  id: string;
  message: string;
}
export declare class PrivacyPremiumRequired extends NotAcceptable {
  id: string;
  message: string;
}
export declare class SendCodeUnavailable extends NotAcceptable {
  id: string;
  message: string;
}
export declare class StickersetInvalid extends NotAcceptable {
  id: string;
  message: string;
}
export declare class StickersetOwnerAnonymous extends NotAcceptable {
  id: string;
  message: string;
}
export declare class TopicClosed extends NotAcceptable {
  id: string;
  message: string;
}
export declare class TopicDeleted extends NotAcceptable {
  id: string;
  message: string;
}
export declare class UserpicPrivacyRequired extends NotAcceptable {
  id: string;
  message: string;
}
export declare class UserpicUploadRequired extends NotAcceptable {
  id: string;
  message: string;
}
export declare class UserRestricted extends NotAcceptable {
  id: string;
  message: string;
}
