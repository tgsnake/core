import { RPCError } from '../RpcError.js';
class BadRequest extends RPCError {
  code = 400;
  name = 'BAD_REQUEST';
}
class AboutTooLong extends BadRequest {
  id = 'ABOUT_TOO_LONG';
  message = 'About string too long.';
}
class AccessTokenExpired extends BadRequest {
  id = 'ACCESS_TOKEN_EXPIRED';
  message = 'Access token expired.';
}
class AccessTokenInvalid extends BadRequest {
  id = 'ACCESS_TOKEN_INVALID';
  message = 'Access token invalid.';
}
class AddressInvalid extends BadRequest {
  id = 'ADDRESS_INVALID';
  message = 'The specified geopoint address is invalid.';
}
class AdminsTooMuch extends BadRequest {
  id = 'ADMINS_TOO_MUCH';
  message = 'There are too many admins.';
}
class AdminIdInvalid extends BadRequest {
  id = 'ADMIN_ID_INVALID';
  message = 'The specified admin ID is invalid.';
}
class AdminRankEmojiNotAllowed extends BadRequest {
  id = 'ADMIN_RANK_EMOJI_NOT_ALLOWED';
  message = 'An admin rank cannot contain emojis.';
}
class AdminRankInvalid extends BadRequest {
  id = 'ADMIN_RANK_INVALID';
  message = 'The specified admin rank is invalid.';
}
class AdminRightsEmpty extends BadRequest {
  id = 'ADMIN_RIGHTS_EMPTY';
  message =
    'The chatAdminRights constructor passed in keyboardButtonRequestPeer.peer_type.user_admin_rights has no rights set (i.e. flags is 0).';
}
class AlbumPhotosTooMany extends BadRequest {
  id = 'ALBUM_PHOTOS_TOO_MANY';
  message = 'You have uploaded too many profile photos, delete some before retrying.';
}
class ApiIdInvalid extends BadRequest {
  id = 'API_ID_INVALID';
  message = 'API ID invalid.';
}
class ApiIdPublishedFlood extends BadRequest {
  id = 'API_ID_PUBLISHED_FLOOD';
  message = "This API id was published somewhere, you can't use it now.";
}
class ArticleTitleEmpty extends BadRequest {
  id = 'ARTICLE_TITLE_EMPTY';
  message = 'The title of the article is empty.';
}
class AudioContentUrlEmpty extends BadRequest {
  id = 'AUDIO_CONTENT_URL_EMPTY';
  message = 'The remote URL specified in the content field is empty.';
}
class AudioTitleEmpty extends BadRequest {
  id = 'AUDIO_TITLE_EMPTY';
  message = 'An empty audio title was provided.';
}
class AuthBytesInvalid extends BadRequest {
  id = 'AUTH_BYTES_INVALID';
  message = 'The provided authorization is invalid.';
}
class AuthTokenAlreadyAccepted extends BadRequest {
  id = 'AUTH_TOKEN_ALREADY_ACCEPTED';
  message = 'The specified auth token was already accepted.';
}
class AuthTokenException extends BadRequest {
  id = 'AUTH_TOKEN_EXCEPTION';
  message = 'An error occurred while importing the auth token.';
}
class AuthTokenExpired extends BadRequest {
  id = 'AUTH_TOKEN_EXPIRED';
  message = 'The authorization token has expired.';
}
class AuthTokenInvalid extends BadRequest {
  id = 'AUTH_TOKEN_INVALID';
  message = 'The specified auth token is invalid.';
}
class AuthTokenInvalidx extends BadRequest {
  id = 'AUTH_TOKEN_INVALIDX';
  message = 'The specified auth token is invalid.';
}
class AutoarchiveNotAvailable extends BadRequest {
  id = 'AUTOARCHIVE_NOT_AVAILABLE';
  message =
    'The autoarchive setting is not available at this time: please check the value of the [autoarchive_setting_available field in client config &raquo;](https://core.telegram.org/api/config#client-configuration) before calling this method.';
}
class BankCardNumberInvalid extends BadRequest {
  id = 'BANK_CARD_NUMBER_INVALID';
  message = 'The specified card number is invalid.';
}
class BannedRightsInvalid extends BadRequest {
  id = 'BANNED_RIGHTS_INVALID';
  message = 'You provided some invalid flags in the banned rights.';
}
class BasePortLocInvalid extends BadRequest {
  id = 'BASE_PORT_LOC_INVALID';
  message = 'The base port location is invalid';
}
class BoostsEmpty extends BadRequest {
  id = 'BOOSTS_EMPTY';
  message = 'No boost slots were specified.';
}
class BoostsRequired extends BadRequest {
  id = 'BOOSTS_REQUIRED';
  message =
    'The specified channel must first be [boosted by its users](https://core.telegram.org/api/boost) in order to perform this action.';
}
class BoostNotModified extends BadRequest {
  id = 'BOOST_NOT_MODIFIED';
  message = "You're already [boosting](https://core.telegram.org/api/boost) the specified channel.";
}
class BoostPeerInvalid extends BadRequest {
  id = 'BOOST_PEER_INVALID';
  message = 'The specified `boost_peer` is invalid.';
}
class BotsTooMuch extends BadRequest {
  id = 'BOTS_TOO_MUCH';
  message = 'There are too many bots in this chat/channel.';
}
class BotAppInvalid extends BadRequest {
  id = 'BOT_APP_INVALID';
  message = 'The specified bot app is invalid.';
}
class BotAppShortnameInvalid extends BadRequest {
  id = 'BOT_APP_SHORTNAME_INVALID';
  message = 'The specified bot app short name is invalid.';
}
class BotChannelsNa extends BadRequest {
  id = 'BOT_CHANNELS_NA';
  message = "Bots can't edit admin privileges.";
}
class BotCommandDescriptionInvalid extends BadRequest {
  id = 'BOT_COMMAND_DESCRIPTION_INVALID';
  message = 'The specified command description is invalid.';
}
class BotCommandInvalid extends BadRequest {
  id = 'BOT_COMMAND_INVALID';
  message = 'The specified command is invalid.';
}
class BotDomainInvalid extends BadRequest {
  id = 'BOT_DOMAIN_INVALID';
  message = 'Bot domain invalid.';
}
class BotGamesDisabled extends BadRequest {
  id = 'BOT_GAMES_DISABLED';
  message = 'Bot games cannot be used in this type of chat';
}
class BotGroupsBlocked extends BadRequest {
  id = 'BOT_GROUPS_BLOCKED';
  message = "This bot can't be added to groups.";
}
class BotInlineDisabled extends BadRequest {
  id = 'BOT_INLINE_DISABLED';
  message = "This bot can't be used in inline mode.";
}
class BotInvalid extends BadRequest {
  id = 'BOT_INVALID';
  message = 'This is not a valid bot.';
}
class BotMethodInvalid extends BadRequest {
  id = 'BOT_METHOD_INVALID';
  message = "The method can't be used by bots";
}
class BotMissing extends BadRequest {
  id = 'BOT_MISSING';
  message =
    "Only bots can call this method, please use [@stickers](https://t.me/stickers) if you're a user.";
}
class BotOnesideNotAvail extends BadRequest {
  id = 'BOT_ONESIDE_NOT_AVAIL';
  message = "Bots can't pin messages in PM just for themselves.";
}
class BotPaymentsDisabled extends BadRequest {
  id = 'BOT_PAYMENTS_DISABLED';
  message = 'Please enable bot payments in botfather before calling this method.';
}
class BotPollsDisabled extends BadRequest {
  id = 'BOT_POLLS_DISABLED';
  message = 'Sending polls by bots has been disabled';
}
class BotResponseTimeout extends BadRequest {
  id = 'BOT_RESPONSE_TIMEOUT';
  message = 'A timeout occurred while fetching data from the bot.';
}
class BotScoreNotModified extends BadRequest {
  id = 'BOT_SCORE_NOT_MODIFIED';
  message = "The score wasn't modified.";
}
class BotWebviewDisabled extends BadRequest {
  id = 'BOT_WEBVIEW_DISABLED';
  message =
    'A webview cannot be opened in the specified conditions: emitted for example if `from_bot_menu` or `url` are set and `peer` is not the chat with the bot.';
}
class BroadcastIdInvalid extends BadRequest {
  id = 'BROADCAST_ID_INVALID';
  message = 'Broadcast ID invalid.';
}
class BroadcastPublicVotersForbidden extends BadRequest {
  id = 'BROADCAST_PUBLIC_VOTERS_FORBIDDEN';
  message = "You can't forward polls with public voters.";
}
class BroadcastRequired extends BadRequest {
  id = 'BROADCAST_REQUIRED';
  message =
    'This method can only be called on a channel, please use stats.getMegagroupStats for supergroups.';
}
class ButtonDataInvalid extends BadRequest {
  id = 'BUTTON_DATA_INVALID';
  message = 'The data of one or more of the buttons you provided is invalid.';
}
class ButtonTextInvalid extends BadRequest {
  id = 'BUTTON_TEXT_INVALID';
  message = 'The specified button text is invalid.';
}
class ButtonTypeInvalid extends BadRequest {
  id = 'BUTTON_TYPE_INVALID';
  message = 'The type of one or more of the buttons you provided is invalid.';
}
class ButtonUrlInvalid extends BadRequest {
  id = 'BUTTON_URL_INVALID';
  message = 'Button URL invalid.';
}
class ButtonUserInvalid extends BadRequest {
  id = 'BUTTON_USER_INVALID';
  message = 'The user_id passed to inputKeyboardButtonUserProfile is invalid!';
}
class ButtonUserPrivacyRestricted extends BadRequest {
  id = 'BUTTON_USER_PRIVACY_RESTRICTED';
  message =
    'The privacy setting of the user specified in a [inputKeyboardButtonUserProfile](https://core.telegram.org/constructor/inputKeyboardButtonUserProfile) button do not allow creating such a button.';
}
class CallAlreadyAccepted extends BadRequest {
  id = 'CALL_ALREADY_ACCEPTED';
  message = 'The call was already accepted.';
}
class CallAlreadyDeclined extends BadRequest {
  id = 'CALL_ALREADY_DECLINED';
  message = 'The call was already declined.';
}
class CallOccupyFailed extends BadRequest {
  id = 'CALL_OCCUPY_FAILED';
  message = 'The call failed because the user is already making another call.';
}
class CallPeerInvalid extends BadRequest {
  id = 'CALL_PEER_INVALID';
  message = 'The provided call peer object is invalid.';
}
class CallProtocolFlagsInvalid extends BadRequest {
  id = 'CALL_PROTOCOL_FLAGS_INVALID';
  message = 'Call protocol flags invalid.';
}
class CdnMethodInvalid extends BadRequest {
  id = 'CDN_METHOD_INVALID';
  message = "You can't call this method in a CDN DC.";
}
class ChannelsAdminLocatedTooMuch extends BadRequest {
  id = 'CHANNELS_ADMIN_LOCATED_TOO_MUCH';
  message = 'The user has reached the limit of public geogroups.';
}
class ChannelsAdminPublicTooMuch extends BadRequest {
  id = 'CHANNELS_ADMIN_PUBLIC_TOO_MUCH';
  message =
    "You're admin of too many public channels, make some channels private to change the username of this channel.";
}
class ChannelsTooMuch extends BadRequest {
  id = 'CHANNELS_TOO_MUCH';
  message = 'You have joined too many channels/supergroups.';
}
class ChannelAddInvalid extends BadRequest {
  id = 'CHANNEL_ADD_INVALID';
  message = 'Internal error.';
}
class ChannelBanned extends BadRequest {
  id = 'CHANNEL_BANNED';
  message = 'The channel is banned';
}
class ChannelForumMissing extends BadRequest {
  id = 'CHANNEL_FORUM_MISSING';
  message = 'This supergroup is not a forum.';
}
class ChannelIdInvalid extends BadRequest {
  id = 'CHANNEL_ID_INVALID';
  message = 'The specified supergroup ID is invalid.';
}
class ChannelInvalid extends BadRequest {
  id = 'CHANNEL_INVALID';
  message = 'The provided channel is invalid.';
}
class ChannelParicipantMissing extends BadRequest {
  id = 'CHANNEL_PARICIPANT_MISSING';
  message = 'The current user is not in the channel.';
}
class ChannelPrivate extends BadRequest {
  id = 'CHANNEL_PRIVATE';
  message = "You haven't joined this channel/supergroup.";
}
class ChannelTooBig extends BadRequest {
  id = 'CHANNEL_TOO_BIG';
  message = 'This channel has too many participants (>1000) to be deleted.';
}
class ChannelTooLarge extends BadRequest {
  id = 'CHANNEL_TOO_LARGE';
  message =
    'Channel is too large to be deleted; this error is issued when trying to delete channels with more than 1000 members (subject to change).';
}
class ChatlistExcludeInvalid extends BadRequest {
  id = 'CHATLIST_EXCLUDE_INVALID';
  message = 'The specified `exclude_peers` are invalid.';
}
class ChatAboutNotModified extends BadRequest {
  id = 'CHAT_ABOUT_NOT_MODIFIED';
  message = 'About text has not changed.';
}
class ChatAboutTooLong extends BadRequest {
  id = 'CHAT_ABOUT_TOO_LONG';
  message = 'Chat about too long.';
}
class ChatAdminRequired extends BadRequest {
  id = 'CHAT_ADMIN_REQUIRED';
  message = 'You must be an admin in this chat to do this.';
}
class ChatDiscussionUnallowed extends BadRequest {
  id = 'CHAT_DISCUSSION_UNALLOWED';
  message = "You can't enable forum topics in a discussion group linked to a channel.";
}
class ChatForwardsRestricted extends BadRequest {
  id = 'CHAT_FORWARDS_RESTRICTED';
  message = "You can't forward messages from a protected chat.";
}
class ChatIdEmpty extends BadRequest {
  id = 'CHAT_ID_EMPTY';
  message = 'The provided chat ID is empty.';
}
class ChatIdInvalid extends BadRequest {
  id = 'CHAT_ID_INVALID';
  message = 'The provided chat id is invalid.';
}
class ChatInvalid extends BadRequest {
  id = 'CHAT_INVALID';
  message = 'Invalid chat.';
}
class ChatInvitePermanent extends BadRequest {
  id = 'CHAT_INVITE_PERMANENT';
  message = "You can't set an expiration date on permanent invite links.";
}
class ChatLinkExists extends BadRequest {
  id = 'CHAT_LINK_EXISTS';
  message = "The chat is public, you can't hide the history to new users.";
}
class ChatNotModified extends BadRequest {
  id = 'CHAT_NOT_MODIFIED';
  message =
    'No changes were made to chat information because the new information you passed is identical to the current information.';
}
class ChatPublicRequired extends BadRequest {
  id = 'CHAT_PUBLIC_REQUIRED';
  message = 'You can only enable join requests in public groups.';
}
class ChatRestricted extends BadRequest {
  id = 'CHAT_RESTRICTED';
  message = "You can't send messages in this chat, you were restricted.";
}
class ChatRevokeDateUnsupported extends BadRequest {
  id = 'CHAT_REVOKE_DATE_UNSUPPORTED';
  message = '`min_date` and `max_date` are not available for using with non-user peers.';
}
class ChatSendInlineForbidden extends BadRequest {
  id = 'CHAT_SEND_INLINE_FORBIDDEN';
  message = "You can't send inline messages in this group.";
}
class ChatTitleEmpty extends BadRequest {
  id = 'CHAT_TITLE_EMPTY';
  message = 'No chat title provided.';
}
class ChatTooBig extends BadRequest {
  id = 'CHAT_TOO_BIG';
  message =
    'This method is not available for groups with more than `chat_read_mark_size_threshold` members, [see client configuration &raquo;](https://core.telegram.org/api/config#client-configuration).';
}
class CodeEmpty extends BadRequest {
  id = 'CODE_EMPTY';
  message = 'The provided code is empty.';
}
class CodeHashInvalid extends BadRequest {
  id = 'CODE_HASH_INVALID';
  message = 'Code hash invalid.';
}
class CodeInvalid extends BadRequest {
  id = 'CODE_INVALID';
  message = 'Code invalid.';
}
class ColorInvalid extends BadRequest {
  id = 'COLOR_INVALID';
  message = 'The specified color palette ID was invalid.';
}
class ConnectionApiIdInvalid extends BadRequest {
  id = 'CONNECTION_API_ID_INVALID';
  message = 'The provided API id is invalid.';
}
class ConnectionAppVersionEmpty extends BadRequest {
  id = 'CONNECTION_APP_VERSION_EMPTY';
  message = 'App version is empty.';
}
class ConnectionDeviceModelEmpty extends BadRequest {
  id = 'CONNECTION_DEVICE_MODEL_EMPTY';
  message = 'The device model is empty';
}
class ConnectionLangPackInvalid extends BadRequest {
  id = 'CONNECTION_LANG_PACK_INVALID';
  message = 'The specified language pack is not valid';
}
class ConnectionLayerInvalid extends BadRequest {
  id = 'CONNECTION_LAYER_INVALID';
  message = 'Layer invalid.';
}
class ConnectionNotInited extends BadRequest {
  id = 'CONNECTION_NOT_INITED';
  message = 'The connection was not initialized';
}
class ConnectionSystemEmpty extends BadRequest {
  id = 'CONNECTION_SYSTEM_EMPTY';
  message = 'The connection to the system is empty';
}
class ConnectionSystemLangCodeEmpty extends BadRequest {
  id = 'CONNECTION_SYSTEM_LANG_CODE_EMPTY';
  message = 'The system language code is empty';
}
class ContactAddMissing extends BadRequest {
  id = 'CONTACT_ADD_MISSING';
  message = 'Contact to add is missing.';
}
class ContactIdInvalid extends BadRequest {
  id = 'CONTACT_ID_INVALID';
  message = 'The provided contact ID is invalid.';
}
class ContactMissing extends BadRequest {
  id = 'CONTACT_MISSING';
  message = 'The specified user is not a contact.';
}
class ContactNameEmpty extends BadRequest {
  id = 'CONTACT_NAME_EMPTY';
  message = 'Contact name empty.';
}
class ContactReqMissing extends BadRequest {
  id = 'CONTACT_REQ_MISSING';
  message = 'Missing contact request.';
}
class CreateCallFailed extends BadRequest {
  id = 'CREATE_CALL_FAILED';
  message = 'An error occurred while creating the call.';
}
class CurrencyTotalAmountInvalid extends BadRequest {
  id = 'CURRENCY_TOTAL_AMOUNT_INVALID';
  message = 'The total amount of all prices is invalid.';
}
class CustomReactionsTooMany extends BadRequest {
  id = 'CUSTOM_REACTIONS_TOO_MANY';
  message = 'Too many custom reactions were specified.';
}
class DataInvalid extends BadRequest {
  id = 'DATA_INVALID';
  message = 'Encrypted data invalid.';
}
class DataJsonInvalid extends BadRequest {
  id = 'DATA_JSON_INVALID';
  message = 'The provided JSON data is invalid.';
}
class DataTooLong extends BadRequest {
  id = 'DATA_TOO_LONG';
  message = 'Data too long.';
}
class DateEmpty extends BadRequest {
  id = 'DATE_EMPTY';
  message = 'Date empty.';
}
class DcIdInvalid extends BadRequest {
  id = 'DC_ID_INVALID';
  message = 'The provided DC ID is invalid.';
}
class DhGAInvalid extends BadRequest {
  id = 'DH_G_A_INVALID';
  message = 'g_a invalid.';
}
class DocumentInvalid extends BadRequest {
  id = 'DOCUMENT_INVALID';
  message = 'The specified document is invalid.';
}
class EmailHashExpired extends BadRequest {
  id = 'EMAIL_HASH_EXPIRED';
  message = 'Email hash expired.';
}
class EmailInvalid extends BadRequest {
  id = 'EMAIL_INVALID';
  message = 'The specified email is invalid.';
}
class EmailNotSetup extends BadRequest {
  id = 'EMAIL_NOT_SETUP';
  message =
    'In order to change the login email with emailVerifyPurposeLoginChange, an existing login email must already be set using emailVerifyPurposeLoginSetup.';
}
class EmailUnconfirmed extends BadRequest {
  id = 'EMAIL_UNCONFIRMED';
  message = 'Email unconfirmed.';
}
class EmailUnconfirmedX extends BadRequest {
  id = 'EMAIL_UNCONFIRMED_X';
  message =
    "The provided email isn't confirmed, {value} is the length of the verification code that was just sent to the email: use [account.verifyEmail](https://core.telegram.org/method/account.verifyEmail) to enter the received verification code and enable the recovery email.";
}
class EmailVerifyExpired extends BadRequest {
  id = 'EMAIL_VERIFY_EXPIRED';
  message = 'The verification email has expired.';
}
class EmojiInvalid extends BadRequest {
  id = 'EMOJI_INVALID';
  message = 'The specified theme emoji is valid.';
}
class EmojiMarkupInvalid extends BadRequest {
  id = 'EMOJI_MARKUP_INVALID';
  message = 'The specified `video_emoji_markup` was invalid.';
}
class EmojiNotModified extends BadRequest {
  id = 'EMOJI_NOT_MODIFIED';
  message = "The theme wasn't changed.";
}
class EmoticonEmpty extends BadRequest {
  id = 'EMOTICON_EMPTY';
  message = 'The emoji is empty.';
}
class EmoticonInvalid extends BadRequest {
  id = 'EMOTICON_INVALID';
  message = 'The specified emoji is invalid.';
}
class EmoticonStickerpackMissing extends BadRequest {
  id = 'EMOTICON_STICKERPACK_MISSING';
  message = 'inputStickerSetDice.emoji cannot be empty.';
}
class EncryptedMessageInvalid extends BadRequest {
  id = 'ENCRYPTED_MESSAGE_INVALID';
  message = 'Encrypted message invalid.';
}
class EncryptionAlreadyAccepted extends BadRequest {
  id = 'ENCRYPTION_ALREADY_ACCEPTED';
  message = 'Secret chat already accepted.';
}
class EncryptionAlreadyDeclined extends BadRequest {
  id = 'ENCRYPTION_ALREADY_DECLINED';
  message = 'The secret chat was already declined.';
}
class EncryptionDeclined extends BadRequest {
  id = 'ENCRYPTION_DECLINED';
  message = 'The secret chat was declined.';
}
class EncryptionIdInvalid extends BadRequest {
  id = 'ENCRYPTION_ID_INVALID';
  message = 'The provided secret chat ID is invalid.';
}
class EntitiesTooLong extends BadRequest {
  id = 'ENTITIES_TOO_LONG';
  message = 'You provided too many styled message entities.';
}
class EntityBoundsInvalid extends BadRequest {
  id = 'ENTITY_BOUNDS_INVALID';
  message =
    'A specified [entity offset or length](https://core.telegram.org/api/entities#entity-length) is invalid, see [here &raquo;](https://core.telegram.org/api/entities#entity-length) for info on how to properly compute the entity offset/length.';
}
class EntityMentionUserInvalid extends BadRequest {
  id = 'ENTITY_MENTION_USER_INVALID';
  message = 'You mentioned an invalid user.';
}
class ErrorTextEmpty extends BadRequest {
  id = 'ERROR_TEXT_EMPTY';
  message = 'The provided error message is empty.';
}
class ExpireDateInvalid extends BadRequest {
  id = 'EXPIRE_DATE_INVALID';
  message = 'The specified expiration date is invalid.';
}
class ExportCardInvalid extends BadRequest {
  id = 'EXPORT_CARD_INVALID';
  message = 'Provided card is invalid.';
}
class ExternalUrlInvalid extends BadRequest {
  id = 'EXTERNAL_URL_INVALID';
  message = 'External URL invalid.';
}
class FieldNameEmpty extends BadRequest {
  id = 'FIELD_NAME_EMPTY';
  message = 'The field with the name FIELD_NAME is missing';
}
class FieldNameInvalid extends BadRequest {
  id = 'FIELD_NAME_INVALID';
  message = 'The field with the name FIELD_NAME is invalid';
}
class FileContentTypeInvalid extends BadRequest {
  id = 'FILE_CONTENT_TYPE_INVALID';
  message = 'File content-type is invalid.';
}
class FileEmtpy extends BadRequest {
  id = 'FILE_EMTPY';
  message = 'An empty file was provided.';
}
class FileIdInvalid extends BadRequest {
  id = 'FILE_ID_INVALID';
  message = 'The provided file id is invalid.';
}
class FileMigrate extends BadRequest {
  id = 'FILE_MIGRATE_X';
  message = 'The file is in Data Center No. {value}';
}
class FilePartsInvalid extends BadRequest {
  id = 'FILE_PARTS_INVALID';
  message = 'The number of file parts is invalid.';
}
class FilePartEmpty extends BadRequest {
  id = 'FILE_PART_EMPTY';
  message = 'The provided file part is empty.';
}
class FilePartInvalid extends BadRequest {
  id = 'FILE_PART_INVALID';
  message = 'The file part number is invalid.';
}
class FilePartLengthInvalid extends BadRequest {
  id = 'FILE_PART_LENGTH_INVALID';
  message = 'The length of a file part is invalid.';
}
class FilePartSizeChanged extends BadRequest {
  id = 'FILE_PART_SIZE_CHANGED';
  message = 'Provided file part size has changed.';
}
class FilePartSizeInvalid extends BadRequest {
  id = 'FILE_PART_SIZE_INVALID';
  message = 'The provided file part size is invalid.';
}
class FilePartTooBig extends BadRequest {
  id = 'FILE_PART_TOO_BIG';
  message = 'The uploaded file part is too big.';
}
class FilePartMissing extends BadRequest {
  id = 'FILE_PART_X_MISSING';
  message = 'Part {value} of the file is missing from storage';
}
class FileReferenceAny extends BadRequest {
  id = 'FILE_REFERENCE_*';
  message =
    'The file reference expired, it [must be refreshed](https://core.telegram.org/api/file_reference).';
}
class FileReferenceEmpty extends BadRequest {
  id = 'FILE_REFERENCE_EMPTY';
  message =
    'An empty [file reference](https://core.telegram.org/api/file_reference) was specified.';
}
class FileReferenceExpired extends BadRequest {
  id = 'FILE_REFERENCE_EXPIRED';
  message =
    'File reference expired, it must be refetched as described in [the documentation](https://core.telegram.org/api/file_reference).';
}
class FileReferenceInvalid extends BadRequest {
  id = 'FILE_REFERENCE_INVALID';
  message =
    'The specified [file reference](https://core.telegram.org/api/file_reference) is invalid.';
}
class FileTitleEmpty extends BadRequest {
  id = 'FILE_TITLE_EMPTY';
  message = 'An empty file title was specified.';
}
class FileTokenInvalid extends BadRequest {
  id = 'FILE_TOKEN_INVALID';
  message = 'The specified file token is invalid.';
}
class FilterIdInvalid extends BadRequest {
  id = 'FILTER_ID_INVALID';
  message = 'The specified filter ID is invalid.';
}
class FilterIncludeEmpty extends BadRequest {
  id = 'FILTER_INCLUDE_EMPTY';
  message = 'The include_peers vector of the filter is empty.';
}
class FilterNotSupported extends BadRequest {
  id = 'FILTER_NOT_SUPPORTED';
  message = 'The specified filter cannot be used in this context.';
}
class FilterTitleEmpty extends BadRequest {
  id = 'FILTER_TITLE_EMPTY';
  message = 'The title field of the filter is empty.';
}
class FirstnameInvalid extends BadRequest {
  id = 'FIRSTNAME_INVALID';
  message = 'The first name is invalid.';
}
class FolderIdEmpty extends BadRequest {
  id = 'FOLDER_ID_EMPTY';
  message = 'An empty folder ID was specified.';
}
class FolderIdInvalid extends BadRequest {
  id = 'FOLDER_ID_INVALID';
  message = 'Invalid folder ID.';
}
class ForumEnabled extends BadRequest {
  id = 'FORUM_ENABLED';
  message =
    "You can't execute the specified action because the group is a [forum](https://core.telegram.org/api/forum), disable forum functionality to continue.";
}
class FreshChangeAdminsForbidden extends BadRequest {
  id = 'FRESH_CHANGE_ADMINS_FORBIDDEN';
  message = "You were just elected admin, you can't add or modify other admins yet.";
}
class FromMessageBotDisabled extends BadRequest {
  id = 'FROM_MESSAGE_BOT_DISABLED';
  message = "Bots can't use fromMessage min constructors.";
}
class FromPeerInvalid extends BadRequest {
  id = 'FROM_PEER_INVALID';
  message = 'The specified from_id is invalid.';
}
class GameBotInvalid extends BadRequest {
  id = 'GAME_BOT_INVALID';
  message = "Bots can't send another bot's game.";
}
class GeneralModifyIconForbidden extends BadRequest {
  id = 'GENERAL_MODIFY_ICON_FORBIDDEN';
  message = `You can't modify the icon of the "General" topic.`;
}
class GeoPointInvalid extends BadRequest {
  id = 'GEO_POINT_INVALID';
  message = 'Invalid geoposition provided.';
}
class GiftSlugExpired extends BadRequest {
  id = 'GIFT_SLUG_EXPIRED';
  message = 'The specified gift slug has expired.';
}
class GiftSlugInvalid extends BadRequest {
  id = 'GIFT_SLUG_INVALID';
  message = 'The specified slug is invalid.';
}
class GifContentTypeInvalid extends BadRequest {
  id = 'GIF_CONTENT_TYPE_INVALID';
  message = 'GIF content-type invalid.';
}
class GifIdInvalid extends BadRequest {
  id = 'GIF_ID_INVALID';
  message = 'The provided GIF ID is invalid.';
}
class GraphExpiredReload extends BadRequest {
  id = 'GRAPH_EXPIRED_RELOAD';
  message = 'This graph has expired, please obtain a new graph token.';
}
class GraphInvalidReload extends BadRequest {
  id = 'GRAPH_INVALID_RELOAD';
  message = 'Invalid graph token provided, please reload the stats and provide the updated token.';
}
class GraphOutdatedReload extends BadRequest {
  id = 'GRAPH_OUTDATED_RELOAD';
  message = 'The graph is outdated, please get a new async token using stats.getBroadcastStats.';
}
class GroupcallAlreadyDiscarded extends BadRequest {
  id = 'GROUPCALL_ALREADY_DISCARDED';
  message = 'The group call was already discarded.';
}
class GroupcallForbidden extends BadRequest {
  id = 'GROUPCALL_FORBIDDEN';
  message = 'The group call has already ended.';
}
class GroupcallInvalid extends BadRequest {
  id = 'GROUPCALL_INVALID';
  message = 'The specified group call is invalid.';
}
class GroupcallJoinMissing extends BadRequest {
  id = 'GROUPCALL_JOIN_MISSING';
  message = "You haven't joined this group call.";
}
class GroupcallNotModified extends BadRequest {
  id = 'GROUPCALL_NOT_MODIFIED';
  message = "Group call settings weren't modified.";
}
class GroupcallSsrcDuplicateMuch extends BadRequest {
  id = 'GROUPCALL_SSRC_DUPLICATE_MUCH';
  message = 'The app needs to retry joining the group call with a new SSRC value.';
}
class GroupedMediaInvalid extends BadRequest {
  id = 'GROUPED_MEDIA_INVALID';
  message = 'Invalid grouped media.';
}
class GroupCallInvalid extends BadRequest {
  id = 'GROUP_CALL_INVALID';
  message = 'The group call is invalid';
}
class HashInvalid extends BadRequest {
  id = 'HASH_INVALID';
  message = 'The provided hash is invalid.';
}
class HideRequesterMissing extends BadRequest {
  id = 'HIDE_REQUESTER_MISSING';
  message = 'The join request was missing or was already handled.';
}
class ImageProcessFailed extends BadRequest {
  id = 'IMAGE_PROCESS_FAILED';
  message = 'Failure while processing image.';
}
class ImportFileInvalid extends BadRequest {
  id = 'IMPORT_FILE_INVALID';
  message = 'The specified chat export file is invalid.';
}
class ImportFormatUnrecognized extends BadRequest {
  id = 'IMPORT_FORMAT_UNRECOGNIZED';
  message = 'The specified chat export file was exported from an unsupported chat app.';
}
class ImportIdInvalid extends BadRequest {
  id = 'IMPORT_ID_INVALID';
  message = 'The specified import ID is invalid.';
}
class ImportTokenInvalid extends BadRequest {
  id = 'IMPORT_TOKEN_INVALID';
  message = 'The specified token is invalid.';
}
class InlineResultExpired extends BadRequest {
  id = 'INLINE_RESULT_EXPIRED';
  message = 'The inline query expired.';
}
class InputChatlistInvalid extends BadRequest {
  id = 'INPUT_CHATLIST_INVALID';
  message = 'The specified folder is invalid.';
}
class InputConstructorInvalid extends BadRequest {
  id = 'INPUT_CONSTRUCTOR_INVALID';
  message = 'The provided constructor is invalid';
}
class InputFetchError extends BadRequest {
  id = 'INPUT_FETCH_ERROR';
  message = 'An error occurred while deserializing TL parameters';
}
class InputFetchFail extends BadRequest {
  id = 'INPUT_FETCH_FAIL';
  message = 'Failed deserializing TL payload';
}
class InputFilterInvalid extends BadRequest {
  id = 'INPUT_FILTER_INVALID';
  message = 'The specified filter is invalid.';
}
class InputLayerInvalid extends BadRequest {
  id = 'INPUT_LAYER_INVALID';
  message = 'The provided layer is invalid';
}
class InputMethodInvalid extends BadRequest {
  id = 'INPUT_METHOD_INVALID';
  message = 'The method invoked is invalid in the current schema';
}
class InputRequestTooLong extends BadRequest {
  id = 'INPUT_REQUEST_TOO_LONG';
  message = 'The input request is too long';
}
class InputTextEmpty extends BadRequest {
  id = 'INPUT_TEXT_EMPTY';
  message = 'The specified text is empty.';
}
class InputTextTooLong extends BadRequest {
  id = 'INPUT_TEXT_TOO_LONG';
  message = 'The specified text is too long.';
}
class InputUserDeactivated extends BadRequest {
  id = 'INPUT_USER_DEACTIVATED';
  message = 'The specified user was deleted.';
}
class InvitesTooMuch extends BadRequest {
  id = 'INVITES_TOO_MUCH';
  message =
    'The maximum number of per-folder invites specified by the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [client configuration parameters &raquo;](https://core.telegram.org/api/config#chatlist-invites-limit-default) was reached.';
}
class InviteForbiddenWithJoinas extends BadRequest {
  id = 'INVITE_FORBIDDEN_WITH_JOINAS';
  message =
    "If the user has anonymously joined a group call as a channel, they can't invite other users to the group call because that would cause deanonymization, because the invite would be sent using the original user ID, not the anonymized channel ID.";
}
class InviteHashEmpty extends BadRequest {
  id = 'INVITE_HASH_EMPTY';
  message = 'The invite hash is empty.';
}
class InviteHashExpired extends BadRequest {
  id = 'INVITE_HASH_EXPIRED';
  message = 'The invite link has expired.';
}
class InviteHashInvalid extends BadRequest {
  id = 'INVITE_HASH_INVALID';
  message = 'The invite hash is invalid.';
}
class InviteRequestSent extends BadRequest {
  id = 'INVITE_REQUEST_SENT';
  message = 'You have successfully requested to join this chat or channel.';
}
class InviteRevokedMissing extends BadRequest {
  id = 'INVITE_REVOKED_MISSING';
  message = 'The specified invite link was already revoked or is invalid.';
}
class InviteSlugEmpty extends BadRequest {
  id = 'INVITE_SLUG_EMPTY';
  message = 'The specified invite slug is empty.';
}
class InviteSlugExpired extends BadRequest {
  id = 'INVITE_SLUG_EXPIRED';
  message = 'The specified chat folder link has expired.';
}
class InvoicePayloadInvalid extends BadRequest {
  id = 'INVOICE_PAYLOAD_INVALID';
  message = 'The specified invoice payload is invalid.';
}
class JoinAsPeerInvalid extends BadRequest {
  id = 'JOIN_AS_PEER_INVALID';
  message = 'The specified peer cannot be used to join a group call.';
}
class LangCodeInvalid extends BadRequest {
  id = 'LANG_CODE_INVALID';
  message = 'The specified language code is invalid.';
}
class LangCodeNotSupported extends BadRequest {
  id = 'LANG_CODE_NOT_SUPPORTED';
  message = 'The specified language code is not supported.';
}
class LangPackInvalid extends BadRequest {
  id = 'LANG_PACK_INVALID';
  message = 'The provided language pack is invalid.';
}
class LastnameInvalid extends BadRequest {
  id = 'LASTNAME_INVALID';
  message = 'The last name is invalid.';
}
class LimitInvalid extends BadRequest {
  id = 'LIMIT_INVALID';
  message = 'The provided limit is invalid.';
}
class LinkNotModified extends BadRequest {
  id = 'LINK_NOT_MODIFIED';
  message = 'Discussion link not modified.';
}
class LocationInvalid extends BadRequest {
  id = 'LOCATION_INVALID';
  message = 'The provided location is invalid.';
}
class MaxDateInvalid extends BadRequest {
  id = 'MAX_DATE_INVALID';
  message = 'The specified maximum date is invalid.';
}
class MaxIdInvalid extends BadRequest {
  id = 'MAX_ID_INVALID';
  message = 'The provided max ID is invalid.';
}
class MaxQtsInvalid extends BadRequest {
  id = 'MAX_QTS_INVALID';
  message = 'The specified max_qts is invalid.';
}
class Md5ChecksumInvalid extends BadRequest {
  id = 'MD5_CHECKSUM_INVALID';
  message = 'The MD5 checksums do not match.';
}
class MediaCaptionTooLong extends BadRequest {
  id = 'MEDIA_CAPTION_TOO_LONG';
  message = 'The caption is too long.';
}
class MediaEmpty extends BadRequest {
  id = 'MEDIA_EMPTY';
  message = 'The provided media object is invalid.';
}
class MediaFileInvalid extends BadRequest {
  id = 'MEDIA_FILE_INVALID';
  message = 'The specified media file is invalid.';
}
class MediaGroupedInvalid extends BadRequest {
  id = 'MEDIA_GROUPED_INVALID';
  message = 'You tried to send media of different types in an album.';
}
class MediaInvalid extends BadRequest {
  id = 'MEDIA_INVALID';
  message = 'Media invalid.';
}
class MediaNewInvalid extends BadRequest {
  id = 'MEDIA_NEW_INVALID';
  message = 'The new media is invalid.';
}
class MediaPrevInvalid extends BadRequest {
  id = 'MEDIA_PREV_INVALID';
  message = 'Previous media invalid.';
}
class MediaTtlInvalid extends BadRequest {
  id = 'MEDIA_TTL_INVALID';
  message = 'The specified media TTL is invalid.';
}
class MediaTypeInvalid extends BadRequest {
  id = 'MEDIA_TYPE_INVALID';
  message = 'The specified media type cannot be used in stories.';
}
class MediaVideoStoryMissing extends BadRequest {
  id = 'MEDIA_VIDEO_STORY_MISSING';
  message = '';
}
class MegagroupGeoRequired extends BadRequest {
  id = 'MEGAGROUP_GEO_REQUIRED';
  message = 'This method can only be invoked on a geogroup.';
}
class MegagroupIdInvalid extends BadRequest {
  id = 'MEGAGROUP_ID_INVALID';
  message = 'Invalid supergroup ID.';
}
class MegagroupPrehistoryHidden extends BadRequest {
  id = 'MEGAGROUP_PREHISTORY_HIDDEN';
  message = "Group with hidden history for new members can't be set as discussion groups.";
}
class MegagroupRequired extends BadRequest {
  id = 'MEGAGROUP_REQUIRED';
  message = 'You can only use this method on a supergroup.';
}
class MessageEditTimeExpired extends BadRequest {
  id = 'MESSAGE_EDIT_TIME_EXPIRED';
  message = "You can't edit this message anymore, too much time has passed since its creation.";
}
class MessageEmpty extends BadRequest {
  id = 'MESSAGE_EMPTY';
  message = 'The provided message is empty.';
}
class MessageIdsEmpty extends BadRequest {
  id = 'MESSAGE_IDS_EMPTY';
  message = 'No message ids were provided.';
}
class MessageIdInvalid extends BadRequest {
  id = 'MESSAGE_ID_INVALID';
  message = 'The provided message id is invalid.';
}
class MessageNotModified extends BadRequest {
  id = 'MESSAGE_NOT_MODIFIED';
  message =
    "The provided message data is identical to the previous message data, the message wasn't modified.";
}
class MessagePollClosed extends BadRequest {
  id = 'MESSAGE_POLL_CLOSED';
  message = 'Poll closed.';
}
class MessageTooLong extends BadRequest {
  id = 'MESSAGE_TOO_LONG';
  message = 'The provided message is too long.';
}
class MethodInvalid extends BadRequest {
  id = 'METHOD_INVALID';
  message = 'The specified method is invalid.';
}
class MinDateInvalid extends BadRequest {
  id = 'MIN_DATE_INVALID';
  message = 'The specified minimum date is invalid.';
}
class MsgIdInvalid extends BadRequest {
  id = 'MSG_ID_INVALID';
  message = 'Invalid message ID provided.';
}
class MsgTooOld extends BadRequest {
  id = 'MSG_TOO_OLD';
  message =
    '[`chat_read_mark_expire_period` seconds](https://core.telegram.org/api/config#chat-read-mark-expire-period) have passed since the message was sent, read receipts were deleted.';
}
class MsgWaitFailed extends BadRequest {
  id = 'MSG_WAIT_FAILED';
  message = 'A waiting call returned an error.';
}
class MultiMediaTooLong extends BadRequest {
  id = 'MULTI_MEDIA_TOO_LONG';
  message = 'Too many media files for album.';
}
class NewSaltInvalid extends BadRequest {
  id = 'NEW_SALT_INVALID';
  message = 'The new salt is invalid.';
}
class NewSettingsEmpty extends BadRequest {
  id = 'NEW_SETTINGS_EMPTY';
  message =
    'No password is set on the current account, and no new password was specified in `new_settings`.';
}
class NewSettingsInvalid extends BadRequest {
  id = 'NEW_SETTINGS_INVALID';
  message = 'The new password settings are invalid.';
}
class NextOffsetInvalid extends BadRequest {
  id = 'NEXT_OFFSET_INVALID';
  message = 'The specified offset is longer than 64 bytes.';
}
class OffsetInvalid extends BadRequest {
  id = 'OFFSET_INVALID';
  message = 'The provided offset is invalid.';
}
class OffsetPeerIdInvalid extends BadRequest {
  id = 'OFFSET_PEER_ID_INVALID';
  message = 'The provided offset peer is invalid.';
}
class OptionsTooMuch extends BadRequest {
  id = 'OPTIONS_TOO_MUCH';
  message = 'Too many options provided.';
}
class OptionInvalid extends BadRequest {
  id = 'OPTION_INVALID';
  message = 'Invalid option selected.';
}
class OrderInvalid extends BadRequest {
  id = 'ORDER_INVALID';
  message = 'The specified username order is invalid.';
}
class PackShortNameInvalid extends BadRequest {
  id = 'PACK_SHORT_NAME_INVALID';
  message = 'Short pack name invalid.';
}
class PackShortNameOccupied extends BadRequest {
  id = 'PACK_SHORT_NAME_OCCUPIED';
  message = 'A stickerpack with this name already exists.';
}
class PackTitleInvalid extends BadRequest {
  id = 'PACK_TITLE_INVALID';
  message = 'The stickerpack title is invalid.';
}
class ParticipantsTooFew extends BadRequest {
  id = 'PARTICIPANTS_TOO_FEW';
  message = 'Not enough participants.';
}
class ParticipantIdInvalid extends BadRequest {
  id = 'PARTICIPANT_ID_INVALID';
  message = 'The specified participant ID is invalid.';
}
class ParticipantJoinMissing extends BadRequest {
  id = 'PARTICIPANT_JOIN_MISSING';
  message =
    "Trying to enable a presentation, when the user hasn't joined the Video Chat with [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall).";
}
class ParticipantVersionOutdated extends BadRequest {
  id = 'PARTICIPANT_VERSION_OUTDATED';
  message =
    'The other participant does not use an up to date telegram client with support for calls.';
}
class PasswordEmpty extends BadRequest {
  id = 'PASSWORD_EMPTY';
  message = 'The provided password is empty.';
}
class PasswordHashInvalid extends BadRequest {
  id = 'PASSWORD_HASH_INVALID';
  message = 'The provided password hash is invalid.';
}
class PasswordMissing extends BadRequest {
  id = 'PASSWORD_MISSING';
  message = 'You must enable 2FA in order to transfer ownership of a channel.';
}
class PasswordRecoveryExpired extends BadRequest {
  id = 'PASSWORD_RECOVERY_EXPIRED';
  message = 'The recovery code has expired.';
}
class PasswordRecoveryNa extends BadRequest {
  id = 'PASSWORD_RECOVERY_NA';
  message = "No email was set, can't recover password via email.";
}
class PasswordRequired extends BadRequest {
  id = 'PASSWORD_REQUIRED';
  message =
    'A [2FA password](https://core.telegram.org/api/srp) must be configured to use Telegram Passport.';
}
class PasswordTooFresh extends BadRequest {
  id = 'PASSWORD_TOO_FRESH_X';
  message = 'The password was modified less than 24 hours ago, try again in {value} seconds.';
}
class PaymentProviderInvalid extends BadRequest {
  id = 'PAYMENT_PROVIDER_INVALID';
  message = 'The specified payment provider is invalid.';
}
class PeersListEmpty extends BadRequest {
  id = 'PEERS_LIST_EMPTY';
  message = 'The specified list of peers is empty.';
}
class PeerFlood extends BadRequest {
  id = 'PEER_FLOOD';
  message = "The method can't be used because your account is currently limited";
}
class PeerHistoryEmpty extends BadRequest {
  id = 'PEER_HISTORY_EMPTY';
  message = "You can't pin an empty chat with a user.";
}
class PeerIdInvalid extends BadRequest {
  id = 'PEER_ID_INVALID';
  message = 'The provided peer id is invalid.';
}
class PeerIdNotSupported extends BadRequest {
  id = 'PEER_ID_NOT_SUPPORTED';
  message = 'The provided peer ID is not supported.';
}
class PersistentTimestampEmpty extends BadRequest {
  id = 'PERSISTENT_TIMESTAMP_EMPTY';
  message = 'Persistent timestamp empty.';
}
class PersistentTimestampInvalid extends BadRequest {
  id = 'PERSISTENT_TIMESTAMP_INVALID';
  message = 'Persistent timestamp invalid.';
}
class PhoneCodeEmpty extends BadRequest {
  id = 'PHONE_CODE_EMPTY';
  message = 'phone_code is missing.';
}
class PhoneCodeExpired extends BadRequest {
  id = 'PHONE_CODE_EXPIRED';
  message = 'The phone code you provided has expired.';
}
class PhoneCodeHashEmpty extends BadRequest {
  id = 'PHONE_CODE_HASH_EMPTY';
  message = 'phone_code_hash is missing.';
}
class PhoneCodeInvalid extends BadRequest {
  id = 'PHONE_CODE_INVALID';
  message = 'The provided phone code is invalid.';
}
class PhoneHashExpired extends BadRequest {
  id = 'PHONE_HASH_EXPIRED';
  message = 'An invalid or expired `phone_code_hash` was provided.';
}
class PhoneNotOccupied extends BadRequest {
  id = 'PHONE_NOT_OCCUPIED';
  message = 'No user is associated to the specified phone number.';
}
class PhoneNumberAppSignupForbidden extends BadRequest {
  id = 'PHONE_NUMBER_APP_SIGNUP_FORBIDDEN';
  message = "You can't sign up using this app.";
}
class PhoneNumberBanned extends BadRequest {
  id = 'PHONE_NUMBER_BANNED';
  message = 'The provided phone number is banned from telegram.';
}
class PhoneNumberFlood extends BadRequest {
  id = 'PHONE_NUMBER_FLOOD';
  message = 'You asked for the code too many times.';
}
class PhoneNumberInvalid extends BadRequest {
  id = 'PHONE_NUMBER_INVALID';
  message = 'The phone number is invalid.';
}
class PhoneNumberOccupied extends BadRequest {
  id = 'PHONE_NUMBER_OCCUPIED';
  message = 'The phone number is already in use.';
}
class PhoneNumberUnoccupied extends BadRequest {
  id = 'PHONE_NUMBER_UNOCCUPIED';
  message = 'The phone number is not yet being used.';
}
class PhonePasswordProtected extends BadRequest {
  id = 'PHONE_PASSWORD_PROTECTED';
  message = 'This phone is password protected.';
}
class PhotoContentTypeInvalid extends BadRequest {
  id = 'PHOTO_CONTENT_TYPE_INVALID';
  message = 'Photo mime-type invalid.';
}
class PhotoContentUrlEmpty extends BadRequest {
  id = 'PHOTO_CONTENT_URL_EMPTY';
  message = 'Photo URL invalid.';
}
class PhotoCropFileMissing extends BadRequest {
  id = 'PHOTO_CROP_FILE_MISSING';
  message = 'Photo crop file missing.';
}
class PhotoCropSizeSmall extends BadRequest {
  id = 'PHOTO_CROP_SIZE_SMALL';
  message = 'Photo is too small.';
}
class PhotoExtInvalid extends BadRequest {
  id = 'PHOTO_EXT_INVALID';
  message = 'The extension of the photo is invalid.';
}
class PhotoFileMissing extends BadRequest {
  id = 'PHOTO_FILE_MISSING';
  message = 'Profile photo file missing.';
}
class PhotoIdInvalid extends BadRequest {
  id = 'PHOTO_ID_INVALID';
  message = 'Photo ID invalid.';
}
class PhotoInvalid extends BadRequest {
  id = 'PHOTO_INVALID';
  message = 'Photo invalid.';
}
class PhotoInvalidDimensions extends BadRequest {
  id = 'PHOTO_INVALID_DIMENSIONS';
  message = 'The photo dimensions are invalid.';
}
class PhotoSaveFileInvalid extends BadRequest {
  id = 'PHOTO_SAVE_FILE_INVALID';
  message = 'Internal issues, try again later.';
}
class PhotoThumbUrlEmpty extends BadRequest {
  id = 'PHOTO_THUMB_URL_EMPTY';
  message = 'Photo thumbnail URL is empty.';
}
class PhotoThumbUrlInvalid extends BadRequest {
  id = 'PHOTO_THUMB_URL_INVALID';
  message = 'The photo thumb URL is invalid';
}
class PinnedDialogsTooMuch extends BadRequest {
  id = 'PINNED_DIALOGS_TOO_MUCH';
  message = 'Too many pinned dialogs.';
}
class PinRestricted extends BadRequest {
  id = 'PIN_RESTRICTED';
  message = "You can't pin messages.";
}
class PollAnswersInvalid extends BadRequest {
  id = 'POLL_ANSWERS_INVALID';
  message = 'Invalid poll answers were provided.';
}
class PollAnswerInvalid extends BadRequest {
  id = 'POLL_ANSWER_INVALID';
  message = 'One of the poll answers is not acceptable.';
}
class PollOptionDuplicate extends BadRequest {
  id = 'POLL_OPTION_DUPLICATE';
  message = 'Duplicate poll options provided.';
}
class PollOptionInvalid extends BadRequest {
  id = 'POLL_OPTION_INVALID';
  message = 'Invalid poll option provided.';
}
class PollQuestionInvalid extends BadRequest {
  id = 'POLL_QUESTION_INVALID';
  message = 'One of the poll questions is not acceptable.';
}
class PollUnsupported extends BadRequest {
  id = 'POLL_UNSUPPORTED';
  message = 'This layer does not support polls in the invoked method';
}
class PollVoteRequired extends BadRequest {
  id = 'POLL_VOTE_REQUIRED';
  message = 'Cast a vote in the poll before calling this method';
}
class PremiumAccountRequired extends BadRequest {
  id = 'PREMIUM_ACCOUNT_REQUIRED';
  message = 'A premium account is required to execute this action.';
}
class PrivacyKeyInvalid extends BadRequest {
  id = 'PRIVACY_KEY_INVALID';
  message = 'The privacy key is invalid.';
}
class PrivacyTooLong extends BadRequest {
  id = 'PRIVACY_TOO_LONG';
  message = 'Too many privacy rules were specified, the current limit is 1000.';
}
class PrivacyValueInvalid extends BadRequest {
  id = 'PRIVACY_VALUE_INVALID';
  message = 'The specified privacy rule combination is invalid.';
}
class PublicKeyRequired extends BadRequest {
  id = 'PUBLIC_KEY_REQUIRED';
  message = 'A public key is required.';
}
class QueryIdEmpty extends BadRequest {
  id = 'QUERY_ID_EMPTY';
  message = 'The query ID is empty.';
}
class QueryIdInvalid extends BadRequest {
  id = 'QUERY_ID_INVALID';
  message = 'The query ID is invalid.';
}
class QueryTooShort extends BadRequest {
  id = 'QUERY_TOO_SHORT';
  message = 'The query string is too short.';
}
class QuizAnswerMissing extends BadRequest {
  id = 'QUIZ_ANSWER_MISSING';
  message =
    'You can forward a quiz while hiding the original author only after choosing an option in the quiz.';
}
class QuizCorrectAnswersEmpty extends BadRequest {
  id = 'QUIZ_CORRECT_ANSWERS_EMPTY';
  message = 'No correct quiz answer was specified.';
}
class QuizCorrectAnswersTooMuch extends BadRequest {
  id = 'QUIZ_CORRECT_ANSWERS_TOO_MUCH';
  message =
    'You specified too many correct answers in a quiz, quizzes can only have one right answer!';
}
class QuizCorrectAnswerInvalid extends BadRequest {
  id = 'QUIZ_CORRECT_ANSWER_INVALID';
  message = 'An invalid value was provided to the correct_answers field.';
}
class QuizMultipleInvalid extends BadRequest {
  id = 'QUIZ_MULTIPLE_INVALID';
  message = "Quizzes can't have the multiple_choice flag set!";
}
class RandomIdEmpty extends BadRequest {
  id = 'RANDOM_ID_EMPTY';
  message = 'Random ID empty.';
}
class RandomIdInvalid extends BadRequest {
  id = 'RANDOM_ID_INVALID';
  message = 'A provided random ID is invalid.';
}
class RandomLengthInvalid extends BadRequest {
  id = 'RANDOM_LENGTH_INVALID';
  message = 'Random length invalid.';
}
class RangesInvalid extends BadRequest {
  id = 'RANGES_INVALID';
  message = 'Invalid range provided.';
}
class ReactionsTooMany extends BadRequest {
  id = 'REACTIONS_TOO_MANY';
  message =
    "The message already has exactly `reactions_uniq_max` reaction emojis, you can't react with a new emoji, see [the docs for more info &raquo;](https://core.telegram.org/api/config#client-configuration).";
}
class ReactionEmpty extends BadRequest {
  id = 'REACTION_EMPTY';
  message = 'Empty reaction provided.';
}
class ReactionInvalid extends BadRequest {
  id = 'REACTION_INVALID';
  message = 'The specified reaction is invalid.';
}
class ReflectorNotAvailable extends BadRequest {
  id = 'REFLECTOR_NOT_AVAILABLE';
  message = 'The call reflector is not available';
}
class ReplyMarkupBuyEmpty extends BadRequest {
  id = 'REPLY_MARKUP_BUY_EMPTY';
  message = 'Reply markup for buy button empty.';
}
class ReplyMarkupGameEmpty extends BadRequest {
  id = 'REPLY_MARKUP_GAME_EMPTY';
  message = 'The provided reply markup for the game is empty';
}
class ReplyMarkupInvalid extends BadRequest {
  id = 'REPLY_MARKUP_INVALID';
  message = 'The provided reply markup is invalid.';
}
class ReplyMarkupTooLong extends BadRequest {
  id = 'REPLY_MARKUP_TOO_LONG';
  message = 'The specified reply_markup is too long.';
}
class ReplyMessageIdInvalid extends BadRequest {
  id = 'REPLY_MESSAGE_ID_INVALID';
  message = 'The specified reply-to message ID is invalid.';
}
class ReplyToInvalid extends BadRequest {
  id = 'REPLY_TO_INVALID';
  message = 'The specified `reply_to` field is invalid.';
}
class ReplyToUserInvalid extends BadRequest {
  id = 'REPLY_TO_USER_INVALID';
  message = 'The replied-to user is invalid.';
}
class ResetRequestMissing extends BadRequest {
  id = 'RESET_REQUEST_MISSING';
  message = 'No password reset is in progress.';
}
class ResultsTooMuch extends BadRequest {
  id = 'RESULTS_TOO_MUCH';
  message = 'Too many results were provided.';
}
class ResultIdDuplicate extends BadRequest {
  id = 'RESULT_ID_DUPLICATE';
  message = 'You provided a duplicate result ID.';
}
class ResultIdEmpty extends BadRequest {
  id = 'RESULT_ID_EMPTY';
  message = 'Result ID empty.';
}
class ResultIdInvalid extends BadRequest {
  id = 'RESULT_ID_INVALID';
  message = 'One of the specified result IDs is invalid.';
}
class ResultTypeInvalid extends BadRequest {
  id = 'RESULT_TYPE_INVALID';
  message = 'Result type invalid.';
}
class RevoteNotAllowed extends BadRequest {
  id = 'REVOTE_NOT_ALLOWED';
  message = 'You cannot change your vote.';
}
class RightsNotModified extends BadRequest {
  id = 'RIGHTS_NOT_MODIFIED';
  message = 'The new admin rights are equal to the old rights, no change was made.';
}
class RsaDecryptFailed extends BadRequest {
  id = 'RSA_DECRYPT_FAILED';
  message = 'Internal RSA decryption failed.';
}
class ScheduleBotNotAllowed extends BadRequest {
  id = 'SCHEDULE_BOT_NOT_ALLOWED';
  message = 'Bots cannot schedule messages.';
}
class ScheduleDateInvalid extends BadRequest {
  id = 'SCHEDULE_DATE_INVALID';
  message = 'Invalid schedule date provided.';
}
class ScheduleDateTooLate extends BadRequest {
  id = 'SCHEDULE_DATE_TOO_LATE';
  message = "You can't schedule a message this far in the future.";
}
class ScheduleStatusPrivate extends BadRequest {
  id = 'SCHEDULE_STATUS_PRIVATE';
  message =
    "Can't schedule until user is online, if the user's last seen timestamp is hidden by their privacy settings.";
}
class ScheduleTooMuch extends BadRequest {
  id = 'SCHEDULE_TOO_MUCH';
  message = 'There are too many scheduled messages.';
}
class ScoreInvalid extends BadRequest {
  id = 'SCORE_INVALID';
  message = 'The specified game score is invalid.';
}
class SearchQueryEmpty extends BadRequest {
  id = 'SEARCH_QUERY_EMPTY';
  message = 'The search query is empty.';
}
class SearchWithLinkNotSupported extends BadRequest {
  id = 'SEARCH_WITH_LINK_NOT_SUPPORTED';
  message = 'You cannot provide a search query and an invite link at the same time.';
}
class SecondsInvalid extends BadRequest {
  id = 'SECONDS_INVALID';
  message = 'Invalid duration provided.';
}
class SendAsPeerInvalid extends BadRequest {
  id = 'SEND_AS_PEER_INVALID';
  message = "You can't send messages as the specified peer.";
}
class SendMessageMediaInvalid extends BadRequest {
  id = 'SEND_MESSAGE_MEDIA_INVALID';
  message = 'Invalid media provided.';
}
class SendMessageTypeInvalid extends BadRequest {
  id = 'SEND_MESSAGE_TYPE_INVALID';
  message = 'The message type is invalid.';
}
class SessionTooFresh extends BadRequest {
  id = 'SESSION_TOO_FRESH_X';
  message = 'This session was created less than 24 hours ago, try again in {value} seconds.';
}
class SettingsInvalid extends BadRequest {
  id = 'SETTINGS_INVALID';
  message = 'Invalid settings were provided.';
}
class Sha256HashInvalid extends BadRequest {
  id = 'SHA256_HASH_INVALID';
  message = 'The provided SHA256 hash is invalid.';
}
class ShortnameOccupyFailed extends BadRequest {
  id = 'SHORTNAME_OCCUPY_FAILED';
  message =
    'An error occurred when trying to register the short-name used for the sticker pack. Try a different name';
}
class ShortNameInvalid extends BadRequest {
  id = 'SHORT_NAME_INVALID';
  message = 'The specified short name is invalid.';
}
class ShortNameOccupied extends BadRequest {
  id = 'SHORT_NAME_OCCUPIED';
  message = 'The specified short name is already in use.';
}
class SlotsEmpty extends BadRequest {
  id = 'SLOTS_EMPTY';
  message = 'The specified slot list is empty.';
}
class SlowmodeMultiMsgsDisabled extends BadRequest {
  id = 'SLOWMODE_MULTI_MSGS_DISABLED';
  message = 'Slowmode is enabled, you cannot forward multiple messages to this group.';
}
class SlugInvalid extends BadRequest {
  id = 'SLUG_INVALID';
  message = 'The specified invoice slug is invalid.';
}
class SmsCodeCreateFailed extends BadRequest {
  id = 'SMS_CODE_CREATE_FAILED';
  message = 'An error occurred while creating the SMS code.';
}
class SrpIdInvalid extends BadRequest {
  id = 'SRP_ID_INVALID';
  message = 'Invalid SRP ID provided.';
}
class SrpPasswordChanged extends BadRequest {
  id = 'SRP_PASSWORD_CHANGED';
  message = 'Password has changed.';
}
class StartParamEmpty extends BadRequest {
  id = 'START_PARAM_EMPTY';
  message = 'The start parameter is empty.';
}
class StartParamInvalid extends BadRequest {
  id = 'START_PARAM_INVALID';
  message = 'Start parameter invalid.';
}
class StartParamTooLong extends BadRequest {
  id = 'START_PARAM_TOO_LONG';
  message = 'Start parameter is too long.';
}
class StickerpackStickersTooMuch extends BadRequest {
  id = 'STICKERPACK_STICKERS_TOO_MUCH';
  message = "There are too many stickers in this stickerpack, you can't add any more.";
}
class StickersetInvalid extends BadRequest {
  id = 'STICKERSET_INVALID';
  message = 'The provided sticker set is invalid.';
}
class StickersEmpty extends BadRequest {
  id = 'STICKERS_EMPTY';
  message = 'No sticker provided.';
}
class StickersTooMuch extends BadRequest {
  id = 'STICKERS_TOO_MUCH';
  message = "There are too many stickers in this stickerpack, you can't add any more.";
}
class StickerDocumentInvalid extends BadRequest {
  id = 'STICKER_DOCUMENT_INVALID';
  message = 'The specified sticker document is invalid.';
}
class StickerEmojiInvalid extends BadRequest {
  id = 'STICKER_EMOJI_INVALID';
  message = 'Sticker emoji invalid.';
}
class StickerFileInvalid extends BadRequest {
  id = 'STICKER_FILE_INVALID';
  message = 'Sticker file invalid.';
}
class StickerGifDimensions extends BadRequest {
  id = 'STICKER_GIF_DIMENSIONS';
  message = 'The specified video sticker has invalid dimensions.';
}
class StickerIdInvalid extends BadRequest {
  id = 'STICKER_ID_INVALID';
  message = 'The provided sticker ID is invalid.';
}
class StickerInvalid extends BadRequest {
  id = 'STICKER_INVALID';
  message = 'The provided sticker is invalid.';
}
class StickerMimeInvalid extends BadRequest {
  id = 'STICKER_MIME_INVALID';
  message = 'The specified sticker MIME type is invalid.';
}
class StickerPngDimensions extends BadRequest {
  id = 'STICKER_PNG_DIMENSIONS';
  message = 'Sticker png dimensions invalid.';
}
class StickerPngNopng extends BadRequest {
  id = 'STICKER_PNG_NOPNG';
  message = 'One of the specified stickers is not a valid PNG file.';
}
class StickerTgsNodoc extends BadRequest {
  id = 'STICKER_TGS_NODOC';
  message = 'You must send the animated sticker as a document.';
}
class StickerTgsNotgs extends BadRequest {
  id = 'STICKER_TGS_NOTGS';
  message = 'Invalid TGS sticker provided.';
}
class StickerThumbPngNopng extends BadRequest {
  id = 'STICKER_THUMB_PNG_NOPNG';
  message = 'Incorrect stickerset thumb file provided, PNG / WEBP expected.';
}
class StickerThumbTgsNotgs extends BadRequest {
  id = 'STICKER_THUMB_TGS_NOTGS';
  message = 'Incorrect stickerset TGS thumb file provided.';
}
class StickerVideoBig extends BadRequest {
  id = 'STICKER_VIDEO_BIG';
  message = 'The specified video sticker is too big.';
}
class StickerVideoNodoc extends BadRequest {
  id = 'STICKER_VIDEO_NODOC';
  message = 'You must send the video sticker as a document.';
}
class StickerVideoNowebm extends BadRequest {
  id = 'STICKER_VIDEO_NOWEBM';
  message = 'The specified video sticker is not in webm format.';
}
class StoriesNeverCreated extends BadRequest {
  id = 'STORIES_NEVER_CREATED';
  message = "This peer hasn't ever posted any stories.";
}
class StoriesTooMuch extends BadRequest {
  id = 'STORIES_TOO_MUCH';
  message =
    'You have hit the maximum active stories limit as specified by the [`story_expiring_limit_*` client configuration parameters](https://core.telegram.org/api/config#story-expiring-limit-default): you should buy a [Premium](https://core.telegram.org/api/premium) subscription, delete an active story, or wait for the oldest story to expire.';
}
class StoryIdEmpty extends BadRequest {
  id = 'STORY_ID_EMPTY';
  message = 'You specified no story IDs.';
}
class StoryIdInvalid extends BadRequest {
  id = 'STORY_ID_INVALID';
  message = 'The specified story ID is invalid.';
}
class StoryNotModified extends BadRequest {
  id = 'STORY_NOT_MODIFIED';
  message =
    "The new story information you passed is equal to the previous story information, thus it wasn't modified.";
}
class StoryPeriodInvalid extends BadRequest {
  id = 'STORY_PERIOD_INVALID';
  message = 'The specified story period is invalid for this account.';
}
class StorySendFloodMonthly extends BadRequest {
  id = 'STORY_SEND_FLOOD_MONTHLY_X';
  message =
    "You've hit the monthly story limit as specified by the [`stories_sent_monthly_limit_*` client configuration parameters](https://core.telegram.org/api/config#stories-sent-monthly-limit-default): wait for the specified number of seconds before posting a new story.";
}
class StorySendFloodWeekly extends BadRequest {
  id = 'STORY_SEND_FLOOD_WEEKLY_X';
  message =
    "You've hit the weekly story limit as specified by the [`stories_sent_weekly_limit_*` client configuration parameters](https://core.telegram.org/api/config#stories-sent-weekly-limit-default): wait for the specified number of seconds before posting a new story.";
}
class SwitchPmTextEmpty extends BadRequest {
  id = 'SWITCH_PM_TEXT_EMPTY';
  message = 'The switch_pm.text field was empty.';
}
class TakeoutInvalid extends BadRequest {
  id = 'TAKEOUT_INVALID';
  message = 'The specified takeout ID is invalid.';
}
class TakeoutRequired extends BadRequest {
  id = 'TAKEOUT_REQUIRED';
  message =
    'A [takeout](https://core.telegram.org/api/takeout) session needs to be initialized first, [see here &raquo; for more info](https://core.telegram.org/api/takeout).';
}
class TaskAlreadyExists extends BadRequest {
  id = 'TASK_ALREADY_EXISTS';
  message = 'An email reset was already requested.';
}
class TempAuthKeyAlreadyBound extends BadRequest {
  id = 'TEMP_AUTH_KEY_ALREADY_BOUND';
  message = 'The passed temporary key is already bound to another **perm_auth_key_id**.';
}
class TempAuthKeyEmpty extends BadRequest {
  id = 'TEMP_AUTH_KEY_EMPTY';
  message = 'No temporary auth key provided.';
}
class ThemeFileInvalid extends BadRequest {
  id = 'THEME_FILE_INVALID';
  message = 'Invalid theme file provided.';
}
class ThemeFormatInvalid extends BadRequest {
  id = 'THEME_FORMAT_INVALID';
  message = 'Invalid theme format provided.';
}
class ThemeInvalid extends BadRequest {
  id = 'THEME_INVALID';
  message = 'Invalid theme provided.';
}
class ThemeMimeInvalid extends BadRequest {
  id = 'THEME_MIME_INVALID';
  message = "The theme's MIME type is invalid.";
}
class ThemeTitleInvalid extends BadRequest {
  id = 'THEME_TITLE_INVALID';
  message = 'The specified theme title is invalid.';
}
class TitleInvalid extends BadRequest {
  id = 'TITLE_INVALID';
  message = 'The specified stickerpack title is invalid.';
}
class TmpPasswordDisabled extends BadRequest {
  id = 'TMP_PASSWORD_DISABLED';
  message = 'The temporary password is disabled.';
}
class TmpPasswordInvalid extends BadRequest {
  id = 'TMP_PASSWORD_INVALID';
  message = 'The temporary password is invalid';
}
class TokenEmpty extends BadRequest {
  id = 'TOKEN_EMPTY';
  message = 'The specified token is empty.';
}
class TokenInvalid extends BadRequest {
  id = 'TOKEN_INVALID';
  message = 'The provided token is invalid.';
}
class TokenTypeInvalid extends BadRequest {
  id = 'TOKEN_TYPE_INVALID';
  message = 'The specified token type is invalid.';
}
class TopicsEmpty extends BadRequest {
  id = 'TOPICS_EMPTY';
  message = 'You specified no topic IDs.';
}
class TopicClosed extends BadRequest {
  id = 'TOPIC_CLOSED';
  message = "This topic was closed, you can't send messages to it anymore.";
}
class TopicCloseSeparately extends BadRequest {
  id = 'TOPIC_CLOSE_SEPARATELY';
  message = 'The `close` flag cannot be provided together with any of the other flags.';
}
class TopicDeleted extends BadRequest {
  id = 'TOPIC_DELETED';
  message = 'The specified topic was deleted.';
}
class TopicHideSeparately extends BadRequest {
  id = 'TOPIC_HIDE_SEPARATELY';
  message = 'The `hide` flag cannot be provided together with any of the other flags.';
}
class TopicIdInvalid extends BadRequest {
  id = 'TOPIC_ID_INVALID';
  message = 'The specified topic ID is invalid.';
}
class TopicNotModified extends BadRequest {
  id = 'TOPIC_NOT_MODIFIED';
  message = 'The updated topic info is equal to the current topic info, nothing was changed.';
}
class TopicTitleEmpty extends BadRequest {
  id = 'TOPIC_TITLE_EMPTY';
  message = 'The specified topic title is empty.';
}
class ToLangInvalid extends BadRequest {
  id = 'TO_LANG_INVALID';
  message = 'The specified destination language is invalid.';
}
class TranscriptionFailed extends BadRequest {
  id = 'TRANSCRIPTION_FAILED';
  message = 'Audio transcription failed.';
}
class TtlDaysInvalid extends BadRequest {
  id = 'TTL_DAYS_INVALID';
  message = 'The provided TTL is invalid.';
}
class TtlMediaInvalid extends BadRequest {
  id = 'TTL_MEDIA_INVALID';
  message = 'Invalid media Time To Live was provided.';
}
class TtlPeriodInvalid extends BadRequest {
  id = 'TTL_PERIOD_INVALID';
  message = 'The specified TTL period is invalid.';
}
class TypesEmpty extends BadRequest {
  id = 'TYPES_EMPTY';
  message = 'No top peer type was provided.';
}
class TypeConstructorInvalid extends BadRequest {
  id = 'TYPE_CONSTRUCTOR_INVALID';
  message = 'The type constructor is invalid';
}
class UntilDateInvalid extends BadRequest {
  id = 'UNTIL_DATE_INVALID';
  message = 'Invalid until date provided.';
}
class UrlInvalid extends BadRequest {
  id = 'URL_INVALID';
  message = 'Invalid URL provided.';
}
class UsageLimitInvalid extends BadRequest {
  id = 'USAGE_LIMIT_INVALID';
  message = 'The specified usage limit is invalid.';
}
class UsernamesActiveTooMuch extends BadRequest {
  id = 'USERNAMES_ACTIVE_TOO_MUCH';
  message = 'The maximum number of active usernames was reached.';
}
class UsernameInvalid extends BadRequest {
  id = 'USERNAME_INVALID';
  message = 'The provided username is not valid.';
}
class UsernameNotModified extends BadRequest {
  id = 'USERNAME_NOT_MODIFIED';
  message = 'The username was not modified.';
}
class UsernameNotOccupied extends BadRequest {
  id = 'USERNAME_NOT_OCCUPIED';
  message = 'The provided username is not occupied.';
}
class UsernameOccupied extends BadRequest {
  id = 'USERNAME_OCCUPIED';
  message = 'The provided username is already occupied.';
}
class UsernamePurchaseAvailable extends BadRequest {
  id = 'USERNAME_PURCHASE_AVAILABLE';
  message = 'The specified username can be purchased on https://fragment.com.';
}
class UserpicUploadRequired extends BadRequest {
  id = 'USERPIC_UPLOAD_REQUIRED';
  message = 'You must have a profile picture to publish your geolocation.';
}
class UsersTooFew extends BadRequest {
  id = 'USERS_TOO_FEW';
  message = 'Not enough users (to create a chat, for example).';
}
class UsersTooMuch extends BadRequest {
  id = 'USERS_TOO_MUCH';
  message = 'The maximum number of users has been exceeded (to create a chat, for example).';
}
class UserAdminInvalid extends BadRequest {
  id = 'USER_ADMIN_INVALID';
  message = "You're not an admin.";
}
class UserAlreadyInvited extends BadRequest {
  id = 'USER_ALREADY_INVITED';
  message = 'You have already invited this user.';
}
class UserAlreadyParticipant extends BadRequest {
  id = 'USER_ALREADY_PARTICIPANT';
  message = 'The user is already in the group.';
}
class UserBannedInChannel extends BadRequest {
  id = 'USER_BANNED_IN_CHANNEL';
  message = "You're banned from sending messages in supergroups/channels.";
}
class UserBlocked extends BadRequest {
  id = 'USER_BLOCKED';
  message = 'User blocked.';
}
class UserBot extends BadRequest {
  id = 'USER_BOT';
  message = 'Bots can only be admins in channels.';
}
class UserBotInvalid extends BadRequest {
  id = 'USER_BOT_INVALID';
  message =
    'User accounts must provide the `bot` method parameter when calling this method. If there is no such method parameter, this method can only be invoked by bot accounts.';
}
class UserBotRequired extends BadRequest {
  id = 'USER_BOT_REQUIRED';
  message = 'This method can only be called by a bot.';
}
class UserChannelsTooMuch extends BadRequest {
  id = 'USER_CHANNELS_TOO_MUCH';
  message = 'One of the users you tried to add is already in too many channels/supergroups.';
}
class UserCreator extends BadRequest {
  id = 'USER_CREATOR';
  message = "You can't leave this channel, because you're its creator.";
}
class UserIdInvalid extends BadRequest {
  id = 'USER_ID_INVALID';
  message = 'The provided user ID is invalid.';
}
class UserInvalid extends BadRequest {
  id = 'USER_INVALID';
  message = 'Invalid user provided.';
}
class UserIsBlocked extends BadRequest {
  id = 'USER_IS_BLOCKED';
  message = 'You were blocked by this user.';
}
class UserIsBot extends BadRequest {
  id = 'USER_IS_BOT';
  message = "Bots can't send messages to other bots.";
}
class UserKicked extends BadRequest {
  id = 'USER_KICKED';
  message = 'This user was kicked from this supergroup/channel.';
}
class UserNotMutualContact extends BadRequest {
  id = 'USER_NOT_MUTUAL_CONTACT';
  message = 'The provided user is not a mutual contact.';
}
class UserNotParticipant extends BadRequest {
  id = 'USER_NOT_PARTICIPANT';
  message = "You're not a member of this supergroup/channel.";
}
class UserPublicMissing extends BadRequest {
  id = 'USER_PUBLIC_MISSING';
  message = 'Cannot generate a link to stories posted by a peer without a username.';
}
class UserVolumeInvalid extends BadRequest {
  id = 'USER_VOLUME_INVALID';
  message = 'The specified user volume is invalid.';
}
class VenueIdInvalid extends BadRequest {
  id = 'VENUE_ID_INVALID';
  message = 'The specified venue ID is invalid.';
}
class VideoContentTypeInvalid extends BadRequest {
  id = 'VIDEO_CONTENT_TYPE_INVALID';
  message = "The video's content type is invalid.";
}
class VideoFileInvalid extends BadRequest {
  id = 'VIDEO_FILE_INVALID';
  message = 'The specified video file is invalid.';
}
class VideoTitleEmpty extends BadRequest {
  id = 'VIDEO_TITLE_EMPTY';
  message = 'The specified video title is empty.';
}
class VoiceMessagesForbidden extends BadRequest {
  id = 'VOICE_MESSAGES_FORBIDDEN';
  message = "This user's privacy settings forbid you from sending voice messages.";
}
class VolumeLocNotFound extends BadRequest {
  id = 'VOLUME_LOC_NOT_FOUND';
  message = "The volume location can't be found";
}
class WallpaperFileInvalid extends BadRequest {
  id = 'WALLPAPER_FILE_INVALID';
  message = 'The specified wallpaper file is invalid.';
}
class WallpaperInvalid extends BadRequest {
  id = 'WALLPAPER_INVALID';
  message = 'The specified wallpaper is invalid.';
}
class WallpaperMimeInvalid extends BadRequest {
  id = 'WALLPAPER_MIME_INVALID';
  message = 'The specified wallpaper MIME type is invalid.';
}
class WallpaperNotFound extends BadRequest {
  id = 'WALLPAPER_NOT_FOUND';
  message = 'The specified wallpaper could not be found.';
}
class WcConvertUrlInvalid extends BadRequest {
  id = 'WC_CONVERT_URL_INVALID';
  message = 'WC convert URL invalid.';
}
class WebdocumentInvalid extends BadRequest {
  id = 'WEBDOCUMENT_INVALID';
  message = 'Invalid webdocument URL provided.';
}
class WebdocumentMimeInvalid extends BadRequest {
  id = 'WEBDOCUMENT_MIME_INVALID';
  message = 'Invalid webdocument mime type provided.';
}
class WebdocumentSizeTooBig extends BadRequest {
  id = 'WEBDOCUMENT_SIZE_TOO_BIG';
  message = 'Webdocument is too big!';
}
class WebdocumentUrlEmpty extends BadRequest {
  id = 'WEBDOCUMENT_URL_EMPTY';
  message = 'The web document URL is empty';
}
class WebdocumentUrlInvalid extends BadRequest {
  id = 'WEBDOCUMENT_URL_INVALID';
  message = 'The specified webdocument URL is invalid.';
}
class WebpageCurlFailed extends BadRequest {
  id = 'WEBPAGE_CURL_FAILED';
  message = 'Failure while fetching the webpage with cURL.';
}
class WebpageMediaEmpty extends BadRequest {
  id = 'WEBPAGE_MEDIA_EMPTY';
  message = 'Webpage media empty.';
}
class WebpageNotFound extends BadRequest {
  id = 'WEBPAGE_NOT_FOUND';
  message = 'A preview for the specified webpage `url` could not be generated.';
}
class WebpageUrlInvalid extends BadRequest {
  id = 'WEBPAGE_URL_INVALID';
  message = 'The specified webpage `url` is invalid.';
}
class WebpushAuthInvalid extends BadRequest {
  id = 'WEBPUSH_AUTH_INVALID';
  message = 'The specified web push authentication secret is invalid.';
}
class WebpushKeyInvalid extends BadRequest {
  id = 'WEBPUSH_KEY_INVALID';
  message = 'The specified web push elliptic curve Diffie-Hellman public key is invalid.';
}
class WebpushTokenInvalid extends BadRequest {
  id = 'WEBPUSH_TOKEN_INVALID';
  message = 'The specified web push token is invalid.';
}
class YouBlockedUser extends BadRequest {
  id = 'YOU_BLOCKED_USER';
  message = 'You blocked this user.';
}
export {
  AboutTooLong,
  AccessTokenExpired,
  AccessTokenInvalid,
  AddressInvalid,
  AdminIdInvalid,
  AdminRankEmojiNotAllowed,
  AdminRankInvalid,
  AdminRightsEmpty,
  AdminsTooMuch,
  AlbumPhotosTooMany,
  ApiIdInvalid,
  ApiIdPublishedFlood,
  ArticleTitleEmpty,
  AudioContentUrlEmpty,
  AudioTitleEmpty,
  AuthBytesInvalid,
  AuthTokenAlreadyAccepted,
  AuthTokenException,
  AuthTokenExpired,
  AuthTokenInvalid,
  AuthTokenInvalidx,
  AutoarchiveNotAvailable,
  BadRequest,
  BankCardNumberInvalid,
  BannedRightsInvalid,
  BasePortLocInvalid,
  BoostNotModified,
  BoostPeerInvalid,
  BoostsEmpty,
  BoostsRequired,
  BotAppInvalid,
  BotAppShortnameInvalid,
  BotChannelsNa,
  BotCommandDescriptionInvalid,
  BotCommandInvalid,
  BotDomainInvalid,
  BotGamesDisabled,
  BotGroupsBlocked,
  BotInlineDisabled,
  BotInvalid,
  BotMethodInvalid,
  BotMissing,
  BotOnesideNotAvail,
  BotPaymentsDisabled,
  BotPollsDisabled,
  BotResponseTimeout,
  BotScoreNotModified,
  BotWebviewDisabled,
  BotsTooMuch,
  BroadcastIdInvalid,
  BroadcastPublicVotersForbidden,
  BroadcastRequired,
  ButtonDataInvalid,
  ButtonTextInvalid,
  ButtonTypeInvalid,
  ButtonUrlInvalid,
  ButtonUserInvalid,
  ButtonUserPrivacyRestricted,
  CallAlreadyAccepted,
  CallAlreadyDeclined,
  CallOccupyFailed,
  CallPeerInvalid,
  CallProtocolFlagsInvalid,
  CdnMethodInvalid,
  ChannelAddInvalid,
  ChannelBanned,
  ChannelForumMissing,
  ChannelIdInvalid,
  ChannelInvalid,
  ChannelParicipantMissing,
  ChannelPrivate,
  ChannelTooBig,
  ChannelTooLarge,
  ChannelsAdminLocatedTooMuch,
  ChannelsAdminPublicTooMuch,
  ChannelsTooMuch,
  ChatAboutNotModified,
  ChatAboutTooLong,
  ChatAdminRequired,
  ChatDiscussionUnallowed,
  ChatForwardsRestricted,
  ChatIdEmpty,
  ChatIdInvalid,
  ChatInvalid,
  ChatInvitePermanent,
  ChatLinkExists,
  ChatNotModified,
  ChatPublicRequired,
  ChatRestricted,
  ChatRevokeDateUnsupported,
  ChatSendInlineForbidden,
  ChatTitleEmpty,
  ChatTooBig,
  ChatlistExcludeInvalid,
  CodeEmpty,
  CodeHashInvalid,
  CodeInvalid,
  ColorInvalid,
  ConnectionApiIdInvalid,
  ConnectionAppVersionEmpty,
  ConnectionDeviceModelEmpty,
  ConnectionLangPackInvalid,
  ConnectionLayerInvalid,
  ConnectionNotInited,
  ConnectionSystemEmpty,
  ConnectionSystemLangCodeEmpty,
  ContactAddMissing,
  ContactIdInvalid,
  ContactMissing,
  ContactNameEmpty,
  ContactReqMissing,
  CreateCallFailed,
  CurrencyTotalAmountInvalid,
  CustomReactionsTooMany,
  DataInvalid,
  DataJsonInvalid,
  DataTooLong,
  DateEmpty,
  DcIdInvalid,
  DhGAInvalid,
  DocumentInvalid,
  EmailHashExpired,
  EmailInvalid,
  EmailNotSetup,
  EmailUnconfirmed,
  EmailUnconfirmedX,
  EmailVerifyExpired,
  EmojiInvalid,
  EmojiMarkupInvalid,
  EmojiNotModified,
  EmoticonEmpty,
  EmoticonInvalid,
  EmoticonStickerpackMissing,
  EncryptedMessageInvalid,
  EncryptionAlreadyAccepted,
  EncryptionAlreadyDeclined,
  EncryptionDeclined,
  EncryptionIdInvalid,
  EntitiesTooLong,
  EntityBoundsInvalid,
  EntityMentionUserInvalid,
  ErrorTextEmpty,
  ExpireDateInvalid,
  ExportCardInvalid,
  ExternalUrlInvalid,
  FieldNameEmpty,
  FieldNameInvalid,
  FileContentTypeInvalid,
  FileEmtpy,
  FileIdInvalid,
  FileMigrate,
  FilePartEmpty,
  FilePartInvalid,
  FilePartLengthInvalid,
  FilePartMissing,
  FilePartSizeChanged,
  FilePartSizeInvalid,
  FilePartTooBig,
  FilePartsInvalid,
  FileReferenceAny,
  FileReferenceEmpty,
  FileReferenceExpired,
  FileReferenceInvalid,
  FileTitleEmpty,
  FileTokenInvalid,
  FilterIdInvalid,
  FilterIncludeEmpty,
  FilterNotSupported,
  FilterTitleEmpty,
  FirstnameInvalid,
  FolderIdEmpty,
  FolderIdInvalid,
  ForumEnabled,
  FreshChangeAdminsForbidden,
  FromMessageBotDisabled,
  FromPeerInvalid,
  GameBotInvalid,
  GeneralModifyIconForbidden,
  GeoPointInvalid,
  GifContentTypeInvalid,
  GifIdInvalid,
  GiftSlugExpired,
  GiftSlugInvalid,
  GraphExpiredReload,
  GraphInvalidReload,
  GraphOutdatedReload,
  GroupCallInvalid,
  GroupcallAlreadyDiscarded,
  GroupcallForbidden,
  GroupcallInvalid,
  GroupcallJoinMissing,
  GroupcallNotModified,
  GroupcallSsrcDuplicateMuch,
  GroupedMediaInvalid,
  HashInvalid,
  HideRequesterMissing,
  ImageProcessFailed,
  ImportFileInvalid,
  ImportFormatUnrecognized,
  ImportIdInvalid,
  ImportTokenInvalid,
  InlineResultExpired,
  InputChatlistInvalid,
  InputConstructorInvalid,
  InputFetchError,
  InputFetchFail,
  InputFilterInvalid,
  InputLayerInvalid,
  InputMethodInvalid,
  InputRequestTooLong,
  InputTextEmpty,
  InputTextTooLong,
  InputUserDeactivated,
  InviteForbiddenWithJoinas,
  InviteHashEmpty,
  InviteHashExpired,
  InviteHashInvalid,
  InviteRequestSent,
  InviteRevokedMissing,
  InviteSlugEmpty,
  InviteSlugExpired,
  InvitesTooMuch,
  InvoicePayloadInvalid,
  JoinAsPeerInvalid,
  LangCodeInvalid,
  LangCodeNotSupported,
  LangPackInvalid,
  LastnameInvalid,
  LimitInvalid,
  LinkNotModified,
  LocationInvalid,
  MaxDateInvalid,
  MaxIdInvalid,
  MaxQtsInvalid,
  Md5ChecksumInvalid,
  MediaCaptionTooLong,
  MediaEmpty,
  MediaFileInvalid,
  MediaGroupedInvalid,
  MediaInvalid,
  MediaNewInvalid,
  MediaPrevInvalid,
  MediaTtlInvalid,
  MediaTypeInvalid,
  MediaVideoStoryMissing,
  MegagroupGeoRequired,
  MegagroupIdInvalid,
  MegagroupPrehistoryHidden,
  MegagroupRequired,
  MessageEditTimeExpired,
  MessageEmpty,
  MessageIdInvalid,
  MessageIdsEmpty,
  MessageNotModified,
  MessagePollClosed,
  MessageTooLong,
  MethodInvalid,
  MinDateInvalid,
  MsgIdInvalid,
  MsgTooOld,
  MsgWaitFailed,
  MultiMediaTooLong,
  NewSaltInvalid,
  NewSettingsEmpty,
  NewSettingsInvalid,
  NextOffsetInvalid,
  OffsetInvalid,
  OffsetPeerIdInvalid,
  OptionInvalid,
  OptionsTooMuch,
  OrderInvalid,
  PackShortNameInvalid,
  PackShortNameOccupied,
  PackTitleInvalid,
  ParticipantIdInvalid,
  ParticipantJoinMissing,
  ParticipantVersionOutdated,
  ParticipantsTooFew,
  PasswordEmpty,
  PasswordHashInvalid,
  PasswordMissing,
  PasswordRecoveryExpired,
  PasswordRecoveryNa,
  PasswordRequired,
  PasswordTooFresh,
  PaymentProviderInvalid,
  PeerFlood,
  PeerHistoryEmpty,
  PeerIdInvalid,
  PeerIdNotSupported,
  PeersListEmpty,
  PersistentTimestampEmpty,
  PersistentTimestampInvalid,
  PhoneCodeEmpty,
  PhoneCodeExpired,
  PhoneCodeHashEmpty,
  PhoneCodeInvalid,
  PhoneHashExpired,
  PhoneNotOccupied,
  PhoneNumberAppSignupForbidden,
  PhoneNumberBanned,
  PhoneNumberFlood,
  PhoneNumberInvalid,
  PhoneNumberOccupied,
  PhoneNumberUnoccupied,
  PhonePasswordProtected,
  PhotoContentTypeInvalid,
  PhotoContentUrlEmpty,
  PhotoCropFileMissing,
  PhotoCropSizeSmall,
  PhotoExtInvalid,
  PhotoFileMissing,
  PhotoIdInvalid,
  PhotoInvalid,
  PhotoInvalidDimensions,
  PhotoSaveFileInvalid,
  PhotoThumbUrlEmpty,
  PhotoThumbUrlInvalid,
  PinRestricted,
  PinnedDialogsTooMuch,
  PollAnswerInvalid,
  PollAnswersInvalid,
  PollOptionDuplicate,
  PollOptionInvalid,
  PollQuestionInvalid,
  PollUnsupported,
  PollVoteRequired,
  PremiumAccountRequired,
  PrivacyKeyInvalid,
  PrivacyTooLong,
  PrivacyValueInvalid,
  PublicKeyRequired,
  QueryIdEmpty,
  QueryIdInvalid,
  QueryTooShort,
  QuizAnswerMissing,
  QuizCorrectAnswerInvalid,
  QuizCorrectAnswersEmpty,
  QuizCorrectAnswersTooMuch,
  QuizMultipleInvalid,
  RandomIdEmpty,
  RandomIdInvalid,
  RandomLengthInvalid,
  RangesInvalid,
  ReactionEmpty,
  ReactionInvalid,
  ReactionsTooMany,
  ReflectorNotAvailable,
  ReplyMarkupBuyEmpty,
  ReplyMarkupGameEmpty,
  ReplyMarkupInvalid,
  ReplyMarkupTooLong,
  ReplyMessageIdInvalid,
  ReplyToInvalid,
  ReplyToUserInvalid,
  ResetRequestMissing,
  ResultIdDuplicate,
  ResultIdEmpty,
  ResultIdInvalid,
  ResultTypeInvalid,
  ResultsTooMuch,
  RevoteNotAllowed,
  RightsNotModified,
  RsaDecryptFailed,
  ScheduleBotNotAllowed,
  ScheduleDateInvalid,
  ScheduleDateTooLate,
  ScheduleStatusPrivate,
  ScheduleTooMuch,
  ScoreInvalid,
  SearchQueryEmpty,
  SearchWithLinkNotSupported,
  SecondsInvalid,
  SendAsPeerInvalid,
  SendMessageMediaInvalid,
  SendMessageTypeInvalid,
  SessionTooFresh,
  SettingsInvalid,
  Sha256HashInvalid,
  ShortNameInvalid,
  ShortNameOccupied,
  ShortnameOccupyFailed,
  SlotsEmpty,
  SlowmodeMultiMsgsDisabled,
  SlugInvalid,
  SmsCodeCreateFailed,
  SrpIdInvalid,
  SrpPasswordChanged,
  StartParamEmpty,
  StartParamInvalid,
  StartParamTooLong,
  StickerDocumentInvalid,
  StickerEmojiInvalid,
  StickerFileInvalid,
  StickerGifDimensions,
  StickerIdInvalid,
  StickerInvalid,
  StickerMimeInvalid,
  StickerPngDimensions,
  StickerPngNopng,
  StickerTgsNodoc,
  StickerTgsNotgs,
  StickerThumbPngNopng,
  StickerThumbTgsNotgs,
  StickerVideoBig,
  StickerVideoNodoc,
  StickerVideoNowebm,
  StickerpackStickersTooMuch,
  StickersEmpty,
  StickersTooMuch,
  StickersetInvalid,
  StoriesNeverCreated,
  StoriesTooMuch,
  StoryIdEmpty,
  StoryIdInvalid,
  StoryNotModified,
  StoryPeriodInvalid,
  StorySendFloodMonthly,
  StorySendFloodWeekly,
  SwitchPmTextEmpty,
  TakeoutInvalid,
  TakeoutRequired,
  TaskAlreadyExists,
  TempAuthKeyAlreadyBound,
  TempAuthKeyEmpty,
  ThemeFileInvalid,
  ThemeFormatInvalid,
  ThemeInvalid,
  ThemeMimeInvalid,
  ThemeTitleInvalid,
  TitleInvalid,
  TmpPasswordDisabled,
  TmpPasswordInvalid,
  ToLangInvalid,
  TokenEmpty,
  TokenInvalid,
  TokenTypeInvalid,
  TopicCloseSeparately,
  TopicClosed,
  TopicDeleted,
  TopicHideSeparately,
  TopicIdInvalid,
  TopicNotModified,
  TopicTitleEmpty,
  TopicsEmpty,
  TranscriptionFailed,
  TtlDaysInvalid,
  TtlMediaInvalid,
  TtlPeriodInvalid,
  TypeConstructorInvalid,
  TypesEmpty,
  UntilDateInvalid,
  UrlInvalid,
  UsageLimitInvalid,
  UserAdminInvalid,
  UserAlreadyInvited,
  UserAlreadyParticipant,
  UserBannedInChannel,
  UserBlocked,
  UserBot,
  UserBotInvalid,
  UserBotRequired,
  UserChannelsTooMuch,
  UserCreator,
  UserIdInvalid,
  UserInvalid,
  UserIsBlocked,
  UserIsBot,
  UserKicked,
  UserNotMutualContact,
  UserNotParticipant,
  UserPublicMissing,
  UserVolumeInvalid,
  UsernameInvalid,
  UsernameNotModified,
  UsernameNotOccupied,
  UsernameOccupied,
  UsernamePurchaseAvailable,
  UsernamesActiveTooMuch,
  UserpicUploadRequired,
  UsersTooFew,
  UsersTooMuch,
  VenueIdInvalid,
  VideoContentTypeInvalid,
  VideoFileInvalid,
  VideoTitleEmpty,
  VoiceMessagesForbidden,
  VolumeLocNotFound,
  WallpaperFileInvalid,
  WallpaperInvalid,
  WallpaperMimeInvalid,
  WallpaperNotFound,
  WcConvertUrlInvalid,
  WebdocumentInvalid,
  WebdocumentMimeInvalid,
  WebdocumentSizeTooBig,
  WebdocumentUrlEmpty,
  WebdocumentUrlInvalid,
  WebpageCurlFailed,
  WebpageMediaEmpty,
  WebpageNotFound,
  WebpageUrlInvalid,
  WebpushAuthInvalid,
  WebpushKeyInvalid,
  WebpushTokenInvalid,
  YouBlockedUser,
};
