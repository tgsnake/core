import { RPCError } from '../RpcError.js';
class NotAcceptable extends RPCError {
  code = 406;
  name = 'NOT_ACCEPTABLE';
}
class AuthKeyDuplicated extends NotAcceptable {
  id = 'AUTH_KEY_DUPLICATED';
  message =
    'The same authorization key (session file) was used in more than one place simultaneously. You must delete your session file and log in again with your phone number or bot token';
}
class BannedRightsInvalid extends NotAcceptable {
  id = 'BANNED_RIGHTS_INVALID';
  message = 'You provided some invalid flags in the banned rights.';
}
class CallProtocolCompatLayerInvalid extends NotAcceptable {
  id = 'CALL_PROTOCOL_COMPAT_LAYER_INVALID';
  message =
    'The other side of the call does not support any of the VoIP protocols supported by the local client, as specified by the `protocol.layer` and `protocol.library_versions` fields.';
}
class ChannelPrivate extends NotAcceptable {
  id = 'CHANNEL_PRIVATE';
  message = "You haven't joined this channel/supergroup.";
}
class ChannelTooLarge extends NotAcceptable {
  id = 'CHANNEL_TOO_LARGE';
  message =
    'Channel is too large to be deleted; this error is issued when trying to delete channels with more than 1000 members (subject to change).';
}
class ChatForwardsRestricted extends NotAcceptable {
  id = 'CHAT_FORWARDS_RESTRICTED';
  message = "You can't forward messages from a protected chat.";
}
class FilerefUpgradeNeeded extends NotAcceptable {
  id = 'FILEREF_UPGRADE_NEEDED';
  message =
    'The client has to be updated in order to support [file references](https://core.telegram.org/api/file_reference).';
}
class FreshChangeAdminsForbidden extends NotAcceptable {
  id = 'FRESH_CHANGE_ADMINS_FORBIDDEN';
  message = "You were just elected admin, you can't add or modify other admins yet.";
}
class FreshChangePhoneForbidden extends NotAcceptable {
  id = 'FRESH_CHANGE_PHONE_FORBIDDEN';
  message = "You can't change phone number right after logging in, please wait at least 24 hours.";
}
class FreshResetAuthorisationForbidden extends NotAcceptable {
  id = 'FRESH_RESET_AUTHORISATION_FORBIDDEN';
  message =
    "You can't logout other sessions if less than 24 hours have passed since you logged on the current session.";
}
class GiftcodeNotAllowed extends NotAcceptable {
  id = 'GIFTCODE_NOT_ALLOWED';
  message = '';
}
class InviteHashExpired extends NotAcceptable {
  id = 'INVITE_HASH_EXPIRED';
  message = 'The invite link has expired.';
}
class PaymentUnsupported extends NotAcceptable {
  id = 'PAYMENT_UNSUPPORTED';
  message =
    'A detailed description of the error will be received separately as described [here &raquo;](https://core.telegram.org/api/errors#406-not-acceptable).';
}
class PhoneNumberInvalid extends NotAcceptable {
  id = 'PHONE_NUMBER_INVALID';
  message = 'The phone number is invalid.';
}
class PhonePasswordFlood extends NotAcceptable {
  id = 'PHONE_PASSWORD_FLOOD';
  message = 'You have tried logging in too many times.';
}
class PreviousChatImportActiveWaitmin extends NotAcceptable {
  id = 'PREVIOUS_CHAT_IMPORT_ACTIVE_WAIT_XMIN';
  message =
    'Import for this chat is already in progress, wait {value} minutes before starting a new one.';
}
class PrivacyPremiumRequired extends NotAcceptable {
  id = 'PRIVACY_PREMIUM_REQUIRED';
  message =
    'You need a [Telegram Premium subscription](https://core.telegram.org/api/premium) to send a message to this user.';
}
class SendCodeUnavailable extends NotAcceptable {
  id = 'SEND_CODE_UNAVAILABLE';
  message =
    'Returned when all available options for this type of number were already used (e.g. flash-call, then SMS, then this error might be returned to trigger a second resend).';
}
class StickersetInvalid extends NotAcceptable {
  id = 'STICKERSET_INVALID';
  message = 'The provided sticker set is invalid.';
}
class StickersetOwnerAnonymous extends NotAcceptable {
  id = 'STICKERSET_OWNER_ANONYMOUS';
  message =
    "Provided stickerset can't be installed as group stickerset to prevent admin deanonymization.";
}
class TopicClosed extends NotAcceptable {
  id = 'TOPIC_CLOSED';
  message = "This topic was closed, you can't send messages to it anymore.";
}
class TopicDeleted extends NotAcceptable {
  id = 'TOPIC_DELETED';
  message = 'The specified topic was deleted.';
}
class UserpicPrivacyRequired extends NotAcceptable {
  id = 'USERPIC_PRIVACY_REQUIRED';
  message =
    'You need to disable privacy settings for your profile picture in order to make your geolocation public.';
}
class UserpicUploadRequired extends NotAcceptable {
  id = 'USERPIC_UPLOAD_REQUIRED';
  message = 'You must have a profile picture to publish your geolocation.';
}
class UserRestricted extends NotAcceptable {
  id = 'USER_RESTRICTED';
  message = "You're spamreported, you can't create channels or chats.";
}
export {
  AuthKeyDuplicated,
  BannedRightsInvalid,
  CallProtocolCompatLayerInvalid,
  ChannelPrivate,
  ChannelTooLarge,
  ChatForwardsRestricted,
  FilerefUpgradeNeeded,
  FreshChangeAdminsForbidden,
  FreshChangePhoneForbidden,
  FreshResetAuthorisationForbidden,
  GiftcodeNotAllowed,
  InviteHashExpired,
  NotAcceptable,
  PaymentUnsupported,
  PhoneNumberInvalid,
  PhonePasswordFlood,
  PreviousChatImportActiveWaitmin,
  PrivacyPremiumRequired,
  SendCodeUnavailable,
  StickersetInvalid,
  StickersetOwnerAnonymous,
  TopicClosed,
  TopicDeleted,
  UserRestricted,
  UserpicPrivacyRequired,
  UserpicUploadRequired,
};
