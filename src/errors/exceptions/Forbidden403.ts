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

export class Forbidden extends RPCError {
  code: number = 403;
  name: string = 'FORBIDDEN';
}
export class AnonymousReactionsDisabled extends Forbidden {
  id: string = 'ANONYMOUS_REACTIONS_DISABLED';
  message: string = '';
}
export class BroadcastForbidden extends Forbidden {
  id: string = 'BROADCAST_FORBIDDEN';
  message: string = "The request can't be used in channels";
}
export class ChannelPublicGroupNa extends Forbidden {
  id: string = 'CHANNEL_PUBLIC_GROUP_NA';
  message: string = 'The channel/supergroup is not available';
}
export class ChatAdminInviteRequired extends Forbidden {
  id: string = 'CHAT_ADMIN_INVITE_REQUIRED';
  message: string = "You don't have rights to invite other users";
}
export class ChatAdminRequired extends Forbidden {
  id: string = 'CHAT_ADMIN_REQUIRED';
  message: string = 'The method requires chat admin privileges';
}
export class ChatForbidden extends Forbidden {
  id: string = 'CHAT_FORBIDDEN';
  message: string = 'You cannot write in this chat';
}
export class ChatGuestSendForbidden extends Forbidden {
  id: string = 'CHAT_GUEST_SEND_FORBIDDEN';
  message: string = 'You join the discussion group before commenting, see here » for more info.';
}
export class ChatSendAudiosForbidden extends Forbidden {
  id: string = 'CHAT_SEND_AUDIOS_FORBIDDEN';
  message: string = "You can't send audio messages in this chat.";
}
export class ChatSendDocsForbidden extends Forbidden {
  id: string = 'CHAT_SEND_DOCS_FORBIDDEN';
  message: string = "You can't send documents in this chat.";
}
export class ChatSendGameForbidden extends Forbidden {
  id: string = 'CHAT_SEND_GAME_FORBIDDEN';
  message: string = "You can't send a game to this chat.";
}
export class ChatSendGifsForbidden extends Forbidden {
  id: string = 'CHAT_SEND_GIFS_FORBIDDEN';
  message: string = "You can't send animations in this chat";
}
export class ChatSendInlineForbidden extends Forbidden {
  id: string = 'CHAT_SEND_INLINE_FORBIDDEN';
  message: string = 'You cannot use inline bots to send messages in this chat';
}
export class ChatSendMediaForbidden extends Forbidden {
  id: string = 'CHAT_SEND_MEDIA_FORBIDDEN';
  message: string = "You can't send media messages in this chat";
}
export class ChatSendPhotosForbidden extends Forbidden {
  id: string = 'CHAT_SEND_PHOTOS_FORBIDDEN';
  message: string = "You can't send photos in this chat.";
}
export class ChatSendPlainForbidden extends Forbidden {
  id: string = 'CHAT_SEND_PLAIN_FORBIDDEN';
  message: string = "You can't send non-media (text) messages in this chat.";
}
export class ChatSendPollForbidden extends Forbidden {
  id: string = 'CHAT_SEND_POLL_FORBIDDEN';
  message: string = "You can't send polls in this chat";
}
export class ChatSendStickersForbidden extends Forbidden {
  id: string = 'CHAT_SEND_STICKERS_FORBIDDEN';
  message: string = "You can't send stickers in this chat";
}
export class ChatSendVideosForbidden extends Forbidden {
  id: string = 'CHAT_SEND_VIDEOS_FORBIDDEN';
  message: string = "You can't send videos in this chat.";
}
export class ChatSendVoicesForbidden extends Forbidden {
  id: string = 'CHAT_SEND_VOICES_FORBIDDEN';
  message: string = "You can't send voice recordings in this chat.";
}
export class ChatWriteForbidden extends Forbidden {
  id: string = 'CHAT_WRITE_FORBIDDEN';
  message: string = "You don't have rights to send messages in this chat";
}
export class EditBotInviteForbidden extends Forbidden {
  id: string = 'EDIT_BOT_INVITE_FORBIDDEN';
  message: string = "Bots' chat invite links can't be edited";
}
export class GroupcallAlreadyStarted extends Forbidden {
  id: string = 'GROUPCALL_ALREADY_STARTED';
  message: string =
    'The groupcall has already started, you can join directly using phone.joinGroupCall.';
}
export class GroupcallForbidden extends Forbidden {
  id: string = 'GROUPCALL_FORBIDDEN';
  message: string = 'The group call has already ended.';
}
export class InlineBotRequired extends Forbidden {
  id: string = 'INLINE_BOT_REQUIRED';
  message: string = 'The action must be performed through an inline bot callback';
}
export class MessageAuthorRequired extends Forbidden {
  id: string = 'MESSAGE_AUTHOR_REQUIRED';
  message: string = 'You are not the author of this message';
}
export class MessageDeleteForbidden extends Forbidden {
  id: string = 'MESSAGE_DELETE_FORBIDDEN';
  message: string =
    "You don't have rights to delete messages in this chat, most likely because you are not the author of them";
}
export class ParticipantJoinMissing extends Forbidden {
  id: string = 'PARTICIPANT_JOIN_MISSING';
  message: string =
    "Trying to enable a presentation, when the user hasn't joined the Video Chat with phone.joinGroupCall.";
}
export class PollVoteRequired extends Forbidden {
  id: string = 'POLL_VOTE_REQUIRED';
  message: string = 'Cast a vote in the poll before calling this method';
}
export class PremiumAccountRequired extends Forbidden {
  id: string = 'PREMIUM_ACCOUNT_REQUIRED';
  message: string = 'This action requires a premium account';
}
export class PublicChannelMissing extends Forbidden {
  id: string = 'PUBLIC_CHANNEL_MISSING';
  message: string = 'You can only export group call invite links for public chats or channels.';
}
export class RightForbidden extends Forbidden {
  id: string = 'RIGHT_FORBIDDEN';
  message: string =
    "You don't have enough rights for this action, or you tried to set one or more admin rights that can't be applied to this kind of chat (channel or supergroup)";
}
export class SensitiveChangeForbidden extends Forbidden {
  id: string = 'SENSITIVE_CHANGE_FORBIDDEN';
  message: string = "Your sensitive content settings can't be changed at this time";
}
export class TakeoutRequired extends Forbidden {
  id: string = 'TAKEOUT_REQUIRED';
  message: string = 'The method must be invoked inside a takeout session';
}
export class UserBotInvalid extends Forbidden {
  id: string = 'USER_BOT_INVALID';
  message: string = 'This method can only be called by a bot';
}
export class UserChannelsTooMuch extends Forbidden {
  id: string = 'USER_CHANNELS_TOO_MUCH';
  message: string = 'One of the users you tried to add is already in too many channels/supergroups';
}
export class UserDeleted extends Forbidden {
  id: string = 'USER_DELETED';
  message: string =
    "You can't send this secret message because the other participant deleted their account.";
}
export class UserInvalid extends Forbidden {
  id: string = 'USER_INVALID';
  message: string = 'The provided user is invalid';
}
export class UserIsBlocked extends Forbidden {
  id: string = 'USER_IS_BLOCKED';
  message: string = 'The user is blocked';
}
export class UserNotMutualContact extends Forbidden {
  id: string = 'USER_NOT_MUTUAL_CONTACT';
  message: string = 'The provided user is not a mutual contact';
}
export class UserPrivacyRestricted extends Forbidden {
  id: string = 'USER_PRIVACY_RESTRICTED';
  message: string = "The user's privacy settings is preventing you to perform this action";
}
export class UserRestricted extends Forbidden {
  id: string = 'USER_RESTRICTED';
  message: string = "You are limited/restricted. You can't perform this action";
}
export class VoiceMessagesForbidden extends Forbidden {
  id: string = 'VOICE_MESSAGES_FORBIDDEN';
  message: string = "This user's privacy settings forbid you from sending voice messages.";
}
