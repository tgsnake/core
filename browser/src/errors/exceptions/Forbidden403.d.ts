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
export declare class Forbidden extends RPCError {
  code: number;
  name: string;
}
export declare class AnonymousReactionsDisabled extends Forbidden {
  id: string;
  message: string;
}
export declare class BroadcastForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChannelPublicGroupNa extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatAdminInviteRequired extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatAdminRequired extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatGuestSendForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatSendAudiosForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatSendDocsForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatSendGameForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatSendGifsForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatSendInlineForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatSendMediaForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatSendPhotosForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatSendPlainForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatSendPollForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatSendStickersForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatSendVideosForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatSendVoicesForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ChatWriteForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class EditBotInviteForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class GroupcallAlreadyStarted extends Forbidden {
  id: string;
  message: string;
}
export declare class GroupcallForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class InlineBotRequired extends Forbidden {
  id: string;
  message: string;
}
export declare class MessageAuthorRequired extends Forbidden {
  id: string;
  message: string;
}
export declare class MessageDeleteForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class ParticipantJoinMissing extends Forbidden {
  id: string;
  message: string;
}
export declare class PollVoteRequired extends Forbidden {
  id: string;
  message: string;
}
export declare class PremiumAccountRequired extends Forbidden {
  id: string;
  message: string;
}
export declare class PrivacyPremiumRequired extends Forbidden {
  id: string;
  message: string;
}
export declare class PublicChannelMissing extends Forbidden {
  id: string;
  message: string;
}
export declare class RightForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class SensitiveChangeForbidden extends Forbidden {
  id: string;
  message: string;
}
export declare class TakeoutRequired extends Forbidden {
  id: string;
  message: string;
}
export declare class UserBotInvalid extends Forbidden {
  id: string;
  message: string;
}
export declare class UserChannelsTooMuch extends Forbidden {
  id: string;
  message: string;
}
export declare class UserDeleted extends Forbidden {
  id: string;
  message: string;
}
export declare class UserInvalid extends Forbidden {
  id: string;
  message: string;
}
export declare class UserIsBlocked extends Forbidden {
  id: string;
  message: string;
}
export declare class UserNotMutualContact extends Forbidden {
  id: string;
  message: string;
}
export declare class UserPrivacyRestricted extends Forbidden {
  id: string;
  message: string;
}
export declare class UserRestricted extends Forbidden {
  id: string;
  message: string;
}
export declare class VoiceMessagesForbidden extends Forbidden {
  id: string;
  message: string;
}
