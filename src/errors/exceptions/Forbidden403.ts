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
  override code: number = 403;
  override name: string = 'FORBIDDEN';
}
export class AnonymousReactionsDisabled extends Forbidden {
  override id: string = 'ANONYMOUS_REACTIONS_DISABLED';
  override message: string =
    'Sorry, anonymous administrators cannot leave reactions or participate in polls.';
}
export class BroadcastForbidden extends Forbidden {
  override id: string = 'BROADCAST_FORBIDDEN';
  override message: string =
    'Channel poll voters and reactions cannot be fetched to prevent deanonymization.';
}
export class ChannelPublicGroupNa extends Forbidden {
  override id: string = 'CHANNEL_PUBLIC_GROUP_NA';
  override message: string = 'channel/supergroup not available.';
}
export class ChatActionForbidden extends Forbidden {
  override id: string = 'CHAT_ACTION_FORBIDDEN';
  override message: string = 'You cannot execute this action.';
}
export class ChatAdminInviteRequired extends Forbidden {
  override id: string = 'CHAT_ADMIN_INVITE_REQUIRED';
  override message: string = 'You do not have the rights to do this.';
}
export class ChatAdminRequired extends Forbidden {
  override id: string = 'CHAT_ADMIN_REQUIRED';
  override message: string = 'You must be an admin in this chat to do this.';
}
export class ChatForbidden extends Forbidden {
  override id: string = 'CHAT_FORBIDDEN';
  override message: string = 'This chat is not available to the current user.';
}
export class ChatGuestSendForbidden extends Forbidden {
  override id: string = 'CHAT_GUEST_SEND_FORBIDDEN';
  override message: string =
    'You join the discussion group before commenting, see [here &raquo;](https://core.telegram.org/api/discussion#requiring-users-to-join-the-group) for more info.';
}
export class ChatSendAudiosForbidden extends Forbidden {
  override id: string = 'CHAT_SEND_AUDIOS_FORBIDDEN';
  override message: string = "You can't send audio messages in this chat.";
}
export class ChatSendDocsForbidden extends Forbidden {
  override id: string = 'CHAT_SEND_DOCS_FORBIDDEN';
  override message: string = "You can't send documents in this chat.";
}
export class ChatSendGameForbidden extends Forbidden {
  override id: string = 'CHAT_SEND_GAME_FORBIDDEN';
  override message: string = "You can't send a game to this chat.";
}
export class ChatSendGifsForbidden extends Forbidden {
  override id: string = 'CHAT_SEND_GIFS_FORBIDDEN';
  override message: string = "You can't send gifs in this chat.";
}
export class ChatSendInlineForbidden extends Forbidden {
  override id: string = 'CHAT_SEND_INLINE_FORBIDDEN';
  override message: string = "You can't send inline messages in this group.";
}
export class ChatSendMediaForbidden extends Forbidden {
  override id: string = 'CHAT_SEND_MEDIA_FORBIDDEN';
  override message: string = "You can't send media in this chat.";
}
export class ChatSendPhotosForbidden extends Forbidden {
  override id: string = 'CHAT_SEND_PHOTOS_FORBIDDEN';
  override message: string = "You can't send photos in this chat.";
}
export class ChatSendPlainForbidden extends Forbidden {
  override id: string = 'CHAT_SEND_PLAIN_FORBIDDEN';
  override message: string = "You can't send non-media (text) messages in this chat.";
}
export class ChatSendPollForbidden extends Forbidden {
  override id: string = 'CHAT_SEND_POLL_FORBIDDEN';
  override message: string = "You can't send polls in this chat.";
}
export class ChatSendRoundvideosForbidden extends Forbidden {
  override id: string = 'CHAT_SEND_ROUNDVIDEOS_FORBIDDEN';
  override message: string = "You can't send round videos to this chat.";
}
export class ChatSendStickersForbidden extends Forbidden {
  override id: string = 'CHAT_SEND_STICKERS_FORBIDDEN';
  override message: string = "You can't send stickers in this chat.";
}
export class ChatSendVideosForbidden extends Forbidden {
  override id: string = 'CHAT_SEND_VIDEOS_FORBIDDEN';
  override message: string = "You can't send videos in this chat.";
}
export class ChatSendVoicesForbidden extends Forbidden {
  override id: string = 'CHAT_SEND_VOICES_FORBIDDEN';
  override message: string = "You can't send voice recordings in this chat.";
}
export class ChatWriteForbidden extends Forbidden {
  override id: string = 'CHAT_WRITE_FORBIDDEN';
  override message: string = "You can't write in this chat.";
}
export class EditBotInviteForbidden extends Forbidden {
  override id: string = 'EDIT_BOT_INVITE_FORBIDDEN';
  override message: string = "Normal users can't edit invites that were created by bots.";
}
export class GroupcallAlreadyStarted extends Forbidden {
  override id: string = 'GROUPCALL_ALREADY_STARTED';
  override message: string =
    'The groupcall has already started, you can join directly using [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall).';
}
export class GroupcallForbidden extends Forbidden {
  override id: string = 'GROUPCALL_FORBIDDEN';
  override message: string = 'The group call has already ended.';
}
export class InlineBotRequired extends Forbidden {
  override id: string = 'INLINE_BOT_REQUIRED';
  override message: string = 'Only the inline bot can edit message.';
}
export class MessageAuthorRequired extends Forbidden {
  override id: string = 'MESSAGE_AUTHOR_REQUIRED';
  override message: string = 'Message author required.';
}
export class MessageDeleteForbidden extends Forbidden {
  override id: string = 'MESSAGE_DELETE_FORBIDDEN';
  override message: string =
    "You can't delete one of the messages you tried to delete, most likely because it is a service message.";
}
export class NotEligible extends Forbidden {
  override id: string = 'NOT_ELIGIBLE';
  override message: string =
    'The current user is not eligible to join the Peer-to-Peer Login Program.';
}
export class ParticipantJoinMissing extends Forbidden {
  override id: string = 'PARTICIPANT_JOIN_MISSING';
  override message: string =
    "Trying to enable a presentation, when the user hasn't joined the Video Chat with [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall).";
}
export class PollVoteRequired extends Forbidden {
  override id: string = 'POLL_VOTE_REQUIRED';
  override message: string = 'Cast a vote in the poll before calling this method.';
}
export class PremiumAccountRequired extends Forbidden {
  override id: string = 'PREMIUM_ACCOUNT_REQUIRED';
  override message: string = 'A premium account is required to execute this action.';
}
export class PrivacyPremiumRequired extends Forbidden {
  override id: string = 'PRIVACY_PREMIUM_REQUIRED';
  override message: string =
    'You need a [Telegram Premium subscription](https://core.telegram.org/api/premium) to send a message to this user.';
}
export class PublicChannelMissing extends Forbidden {
  override id: string = 'PUBLIC_CHANNEL_MISSING';
  override message: string =
    'You can only export group call invite links for public chats or channels.';
}
export class RightForbidden extends Forbidden {
  override id: string = 'RIGHT_FORBIDDEN';
  override message: string = 'Your admin rights do not allow you to do this.';
}
export class SensitiveChangeForbidden extends Forbidden {
  override id: string = 'SENSITIVE_CHANGE_FORBIDDEN';
  override message: string = "You can't change your sensitive content settings.";
}
export class TakeoutRequired extends Forbidden {
  override id: string = 'TAKEOUT_REQUIRED';
  override message: string =
    'A [takeout](https://core.telegram.org/api/takeout) session needs to be initialized first, [see here &raquo; for more info](https://core.telegram.org/api/takeout).';
}
export class UserBotInvalid extends Forbidden {
  override id: string = 'USER_BOT_INVALID';
  override message: string =
    'User accounts must provide the `bot` method parameter when calling this method. If there is no such method parameter, this method can only be invoked by bot accounts.';
}
export class UserChannelsTooMuch extends Forbidden {
  override id: string = 'USER_CHANNELS_TOO_MUCH';
  override message: string =
    'One of the users you tried to add is already in too many channels/supergroups.';
}
export class UserDeleted extends Forbidden {
  override id: string = 'USER_DELETED';
  override message: string =
    "You can't send this secret message because the other participant deleted their account.";
}
export class UserInvalid extends Forbidden {
  override id: string = 'USER_INVALID';
  override message: string = 'Invalid user provided.';
}
export class UserIsBlocked extends Forbidden {
  override id: string = 'USER_IS_BLOCKED';
  override message: string = 'You were blocked by this user.';
}
export class UserNotMutualContact extends Forbidden {
  override id: string = 'USER_NOT_MUTUAL_CONTACT';
  override message: string = 'The provided user is not a mutual contact.';
}
export class UserNotParticipant extends Forbidden {
  override id: string = 'USER_NOT_PARTICIPANT';
  override message: string = "You're not a member of this supergroup/channel.";
}
export class UserPrivacyRestricted extends Forbidden {
  override id: string = 'USER_PRIVACY_RESTRICTED';
  override message: string = "The user's privacy settings do not allow you to do this.";
}
export class UserRestricted extends Forbidden {
  override id: string = 'USER_RESTRICTED';
  override message: string = "You're spamreported, you can't create channels or chats.";
}
export class VoiceMessagesForbidden extends Forbidden {
  override id: string = 'VOICE_MESSAGES_FORBIDDEN';
  override message: string = "This user's privacy settings forbid you from sending voice messages.";
}
export class YourPrivacyRestricted extends Forbidden {
  override id: string = 'YOUR_PRIVACY_RESTRICTED';
  override message: string =
    'You cannot fetch the read date of this message because you have disallowed other users to do so for *your* messages; to fix, allow other users to see *your* exact last online date OR purchase a [Telegram Premium](https://core.telegram.org/api/premium) subscription.';
}
