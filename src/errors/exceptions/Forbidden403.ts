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
  message: string =
    'Sorry, anonymous administrators cannot leave reactions or participate in polls.';
}
export class BroadcastForbidden extends Forbidden {
  id: string = 'BROADCAST_FORBIDDEN';
  message: string =
    'Channel poll voters and reactions cannot be fetched to prevent deanonymization.';
}
export class ChannelPublicGroupNa extends Forbidden {
  id: string = 'CHANNEL_PUBLIC_GROUP_NA';
  message: string = 'channel/supergroup not available.';
}
export class ChatAdminInviteRequired extends Forbidden {
  id: string = 'CHAT_ADMIN_INVITE_REQUIRED';
  message: string = 'You do not have the rights to do this.';
}
export class ChatAdminRequired extends Forbidden {
  id: string = 'CHAT_ADMIN_REQUIRED';
  message: string = 'You must be an admin in this chat to do this.';
}
export class ChatForbidden extends Forbidden {
  id: string = 'CHAT_FORBIDDEN';
  message: string = 'This chat is not available to the current user.';
}
export class ChatGuestSendForbidden extends Forbidden {
  id: string = 'CHAT_GUEST_SEND_FORBIDDEN';
  message: string =
    'You join the discussion group before commenting, see [here &raquo;](https://core.telegram.org/api/discussion#requiring-users-to-join-the-group) for more info.';
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
  message: string = "You can't send gifs in this chat.";
}
export class ChatSendInlineForbidden extends Forbidden {
  id: string = 'CHAT_SEND_INLINE_FORBIDDEN';
  message: string = "You can't send inline messages in this group.";
}
export class ChatSendMediaForbidden extends Forbidden {
  id: string = 'CHAT_SEND_MEDIA_FORBIDDEN';
  message: string = "You can't send media in this chat.";
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
  message: string = "You can't send polls in this chat.";
}
export class ChatSendRoundvideosForbidden extends Forbidden {
  id: string = 'CHAT_SEND_ROUNDVIDEOS_FORBIDDEN';
  message: string = "You can't send round videos to this chat.";
}
export class ChatSendStickersForbidden extends Forbidden {
  id: string = 'CHAT_SEND_STICKERS_FORBIDDEN';
  message: string = "You can't send stickers in this chat.";
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
  message: string = "You can't write in this chat.";
}
export class EditBotInviteForbidden extends Forbidden {
  id: string = 'EDIT_BOT_INVITE_FORBIDDEN';
  message: string = "Normal users can't edit invites that were created by bots.";
}
export class GroupcallAlreadyStarted extends Forbidden {
  id: string = 'GROUPCALL_ALREADY_STARTED';
  message: string =
    'The groupcall has already started, you can join directly using [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall).';
}
export class GroupcallForbidden extends Forbidden {
  id: string = 'GROUPCALL_FORBIDDEN';
  message: string = 'The group call has already ended.';
}
export class InlineBotRequired extends Forbidden {
  id: string = 'INLINE_BOT_REQUIRED';
  message: string = 'Only the inline bot can edit message.';
}
export class MessageAuthorRequired extends Forbidden {
  id: string = 'MESSAGE_AUTHOR_REQUIRED';
  message: string = 'Message author required.';
}
export class MessageDeleteForbidden extends Forbidden {
  id: string = 'MESSAGE_DELETE_FORBIDDEN';
  message: string =
    "You can't delete one of the messages you tried to delete, most likely because it is a service message.";
}
export class NotEligible extends Forbidden {
  id: string = 'NOT_ELIGIBLE';
  message: string = 'The current user is not eligible to join the Peer-to-Peer Login Program.';
}
export class ParticipantJoinMissing extends Forbidden {
  id: string = 'PARTICIPANT_JOIN_MISSING';
  message: string =
    "Trying to enable a presentation, when the user hasn't joined the Video Chat with [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall).";
}
export class PollVoteRequired extends Forbidden {
  id: string = 'POLL_VOTE_REQUIRED';
  message: string = 'Cast a vote in the poll before calling this method.';
}
export class PremiumAccountRequired extends Forbidden {
  id: string = 'PREMIUM_ACCOUNT_REQUIRED';
  message: string = 'A premium account is required to execute this action.';
}
export class PrivacyPremiumRequired extends Forbidden {
  id: string = 'PRIVACY_PREMIUM_REQUIRED';
  message: string =
    'You need a [Telegram Premium subscription](https://core.telegram.org/api/premium) to send a message to this user.';
}
export class PublicChannelMissing extends Forbidden {
  id: string = 'PUBLIC_CHANNEL_MISSING';
  message: string = 'You can only export group call invite links for public chats or channels.';
}
export class RightForbidden extends Forbidden {
  id: string = 'RIGHT_FORBIDDEN';
  message: string = 'Your admin rights do not allow you to do this.';
}
export class SensitiveChangeForbidden extends Forbidden {
  id: string = 'SENSITIVE_CHANGE_FORBIDDEN';
  message: string = "You can't change your sensitive content settings.";
}
export class TakeoutRequired extends Forbidden {
  id: string = 'TAKEOUT_REQUIRED';
  message: string =
    'A [takeout](https://core.telegram.org/api/takeout) session needs to be initialized first, [see here &raquo; for more info](https://core.telegram.org/api/takeout).';
}
export class UserBotInvalid extends Forbidden {
  id: string = 'USER_BOT_INVALID';
  message: string =
    'User accounts must provide the `bot` method parameter when calling this method. If there is no such method parameter, this method can only be invoked by bot accounts.';
}
export class UserChannelsTooMuch extends Forbidden {
  id: string = 'USER_CHANNELS_TOO_MUCH';
  message: string =
    'One of the users you tried to add is already in too many channels/supergroups.';
}
export class UserDeleted extends Forbidden {
  id: string = 'USER_DELETED';
  message: string =
    "You can't send this secret message because the other participant deleted their account.";
}
export class UserInvalid extends Forbidden {
  id: string = 'USER_INVALID';
  message: string = 'Invalid user provided.';
}
export class UserIsBlocked extends Forbidden {
  id: string = 'USER_IS_BLOCKED';
  message: string = 'You were blocked by this user.';
}
export class UserNotMutualContact extends Forbidden {
  id: string = 'USER_NOT_MUTUAL_CONTACT';
  message: string = 'The provided user is not a mutual contact.';
}
export class UserPrivacyRestricted extends Forbidden {
  id: string = 'USER_PRIVACY_RESTRICTED';
  message: string = "The user's privacy settings do not allow you to do this.";
}
export class UserRestricted extends Forbidden {
  id: string = 'USER_RESTRICTED';
  message: string = "You're spamreported, you can't create channels or chats.";
}
export class VoiceMessagesForbidden extends Forbidden {
  id: string = 'VOICE_MESSAGES_FORBIDDEN';
  message: string = "This user's privacy settings forbid you from sending voice messages.";
}
