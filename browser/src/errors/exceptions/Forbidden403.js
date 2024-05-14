import { RPCError } from '../RpcError.js';
class Forbidden extends RPCError {
  code = 403;
  name = 'FORBIDDEN';
}
class AnonymousReactionsDisabled extends Forbidden {
  id = 'ANONYMOUS_REACTIONS_DISABLED';
  message = 'Sorry, anonymous administrators cannot leave reactions or participate in polls.';
}
class BroadcastForbidden extends Forbidden {
  id = 'BROADCAST_FORBIDDEN';
  message = 'Channel poll voters and reactions cannot be fetched to prevent deanonymization.';
}
class ChannelPublicGroupNa extends Forbidden {
  id = 'CHANNEL_PUBLIC_GROUP_NA';
  message = 'channel/supergroup not available.';
}
class ChatAdminInviteRequired extends Forbidden {
  id = 'CHAT_ADMIN_INVITE_REQUIRED';
  message = 'You do not have the rights to do this.';
}
class ChatAdminRequired extends Forbidden {
  id = 'CHAT_ADMIN_REQUIRED';
  message = 'You must be an admin in this chat to do this.';
}
class ChatForbidden extends Forbidden {
  id = 'CHAT_FORBIDDEN';
  message = 'You cannot write in this chat';
}
class ChatGuestSendForbidden extends Forbidden {
  id = 'CHAT_GUEST_SEND_FORBIDDEN';
  message =
    'You join the discussion group before commenting, see [here &raquo;](https://core.telegram.org/api/discussion#requiring-users-to-join-the-group) for more info.';
}
class ChatSendAudiosForbidden extends Forbidden {
  id = 'CHAT_SEND_AUDIOS_FORBIDDEN';
  message = "You can't send audio messages in this chat.";
}
class ChatSendDocsForbidden extends Forbidden {
  id = 'CHAT_SEND_DOCS_FORBIDDEN';
  message = "You can't send documents in this chat.";
}
class ChatSendGameForbidden extends Forbidden {
  id = 'CHAT_SEND_GAME_FORBIDDEN';
  message = "You can't send a game to this chat.";
}
class ChatSendGifsForbidden extends Forbidden {
  id = 'CHAT_SEND_GIFS_FORBIDDEN';
  message = "You can't send gifs in this chat.";
}
class ChatSendInlineForbidden extends Forbidden {
  id = 'CHAT_SEND_INLINE_FORBIDDEN';
  message = "You can't send inline messages in this group.";
}
class ChatSendMediaForbidden extends Forbidden {
  id = 'CHAT_SEND_MEDIA_FORBIDDEN';
  message = "You can't send media in this chat.";
}
class ChatSendPhotosForbidden extends Forbidden {
  id = 'CHAT_SEND_PHOTOS_FORBIDDEN';
  message = "You can't send photos in this chat.";
}
class ChatSendPlainForbidden extends Forbidden {
  id = 'CHAT_SEND_PLAIN_FORBIDDEN';
  message = "You can't send non-media (text) messages in this chat.";
}
class ChatSendPollForbidden extends Forbidden {
  id = 'CHAT_SEND_POLL_FORBIDDEN';
  message = "You can't send polls in this chat.";
}
class ChatSendStickersForbidden extends Forbidden {
  id = 'CHAT_SEND_STICKERS_FORBIDDEN';
  message = "You can't send stickers in this chat.";
}
class ChatSendVideosForbidden extends Forbidden {
  id = 'CHAT_SEND_VIDEOS_FORBIDDEN';
  message = "You can't send videos in this chat.";
}
class ChatSendVoicesForbidden extends Forbidden {
  id = 'CHAT_SEND_VOICES_FORBIDDEN';
  message = "You can't send voice recordings in this chat.";
}
class ChatWriteForbidden extends Forbidden {
  id = 'CHAT_WRITE_FORBIDDEN';
  message = "You can't write in this chat.";
}
class EditBotInviteForbidden extends Forbidden {
  id = 'EDIT_BOT_INVITE_FORBIDDEN';
  message = "Normal users can't edit invites that were created by bots.";
}
class GroupcallAlreadyStarted extends Forbidden {
  id = 'GROUPCALL_ALREADY_STARTED';
  message =
    'The groupcall has already started, you can join directly using [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall).';
}
class GroupcallForbidden extends Forbidden {
  id = 'GROUPCALL_FORBIDDEN';
  message = 'The group call has already ended.';
}
class InlineBotRequired extends Forbidden {
  id = 'INLINE_BOT_REQUIRED';
  message = 'Only the inline bot can edit message.';
}
class MessageAuthorRequired extends Forbidden {
  id = 'MESSAGE_AUTHOR_REQUIRED';
  message = 'Message author required.';
}
class MessageDeleteForbidden extends Forbidden {
  id = 'MESSAGE_DELETE_FORBIDDEN';
  message =
    "You can't delete one of the messages you tried to delete, most likely because it is a service message.";
}
class ParticipantJoinMissing extends Forbidden {
  id = 'PARTICIPANT_JOIN_MISSING';
  message =
    "Trying to enable a presentation, when the user hasn't joined the Video Chat with [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall).";
}
class PollVoteRequired extends Forbidden {
  id = 'POLL_VOTE_REQUIRED';
  message = 'Cast a vote in the poll before calling this method.';
}
class PremiumAccountRequired extends Forbidden {
  id = 'PREMIUM_ACCOUNT_REQUIRED';
  message = 'A premium account is required to execute this action.';
}
class PrivacyPremiumRequired extends Forbidden {
  id = 'PRIVACY_PREMIUM_REQUIRED';
  message =
    'You need a [Telegram Premium subscription](https://core.telegram.org/api/premium) to send a message to this user.';
}
class PublicChannelMissing extends Forbidden {
  id = 'PUBLIC_CHANNEL_MISSING';
  message = 'You can only export group call invite links for public chats or channels.';
}
class RightForbidden extends Forbidden {
  id = 'RIGHT_FORBIDDEN';
  message = 'Your admin rights do not allow you to do this.';
}
class SensitiveChangeForbidden extends Forbidden {
  id = 'SENSITIVE_CHANGE_FORBIDDEN';
  message = "You can't change your sensitive content settings.";
}
class TakeoutRequired extends Forbidden {
  id = 'TAKEOUT_REQUIRED';
  message =
    'A [takeout](https://core.telegram.org/api/takeout) session needs to be initialized first, [see here &raquo; for more info](https://core.telegram.org/api/takeout).';
}
class UserBotInvalid extends Forbidden {
  id = 'USER_BOT_INVALID';
  message =
    'User accounts must provide the `bot` method parameter when calling this method. If there is no such method parameter, this method can only be invoked by bot accounts.';
}
class UserChannelsTooMuch extends Forbidden {
  id = 'USER_CHANNELS_TOO_MUCH';
  message = 'One of the users you tried to add is already in too many channels/supergroups.';
}
class UserDeleted extends Forbidden {
  id = 'USER_DELETED';
  message =
    "You can't send this secret message because the other participant deleted their account.";
}
class UserInvalid extends Forbidden {
  id = 'USER_INVALID';
  message = 'Invalid user provided.';
}
class UserIsBlocked extends Forbidden {
  id = 'USER_IS_BLOCKED';
  message = 'You were blocked by this user.';
}
class UserNotMutualContact extends Forbidden {
  id = 'USER_NOT_MUTUAL_CONTACT';
  message = 'The provided user is not a mutual contact.';
}
class UserPrivacyRestricted extends Forbidden {
  id = 'USER_PRIVACY_RESTRICTED';
  message = "The user's privacy settings do not allow you to do this.";
}
class UserRestricted extends Forbidden {
  id = 'USER_RESTRICTED';
  message = "You're spamreported, you can't create channels or chats.";
}
class VoiceMessagesForbidden extends Forbidden {
  id = 'VOICE_MESSAGES_FORBIDDEN';
  message = "This user's privacy settings forbid you from sending voice messages.";
}
export {
  AnonymousReactionsDisabled,
  BroadcastForbidden,
  ChannelPublicGroupNa,
  ChatAdminInviteRequired,
  ChatAdminRequired,
  ChatForbidden,
  ChatGuestSendForbidden,
  ChatSendAudiosForbidden,
  ChatSendDocsForbidden,
  ChatSendGameForbidden,
  ChatSendGifsForbidden,
  ChatSendInlineForbidden,
  ChatSendMediaForbidden,
  ChatSendPhotosForbidden,
  ChatSendPlainForbidden,
  ChatSendPollForbidden,
  ChatSendStickersForbidden,
  ChatSendVideosForbidden,
  ChatSendVoicesForbidden,
  ChatWriteForbidden,
  EditBotInviteForbidden,
  Forbidden,
  GroupcallAlreadyStarted,
  GroupcallForbidden,
  InlineBotRequired,
  MessageAuthorRequired,
  MessageDeleteForbidden,
  ParticipantJoinMissing,
  PollVoteRequired,
  PremiumAccountRequired,
  PrivacyPremiumRequired,
  PublicChannelMissing,
  RightForbidden,
  SensitiveChangeForbidden,
  TakeoutRequired,
  UserBotInvalid,
  UserChannelsTooMuch,
  UserDeleted,
  UserInvalid,
  UserIsBlocked,
  UserNotMutualContact,
  UserPrivacyRestricted,
  UserRestricted,
  VoiceMessagesForbidden,
};
