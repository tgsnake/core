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

export class BadRequest extends RPCError {
  code: number = 400;
  name: string = 'BAD_REQUEST';
}
export class AboutTooLong extends BadRequest {
  id: string = 'ABOUT_TOO_LONG';
  message: string = 'About string too long.';
}
export class AccessTokenExpired extends BadRequest {
  id: string = 'ACCESS_TOKEN_EXPIRED';
  message: string = 'Access token expired.';
}
export class AccessTokenInvalid extends BadRequest {
  id: string = 'ACCESS_TOKEN_INVALID';
  message: string = 'Access token invalid.';
}
export class AddressInvalid extends BadRequest {
  id: string = 'ADDRESS_INVALID';
  message: string = 'The specified geopoint address is invalid.';
}
export class AdminsTooMuch extends BadRequest {
  id: string = 'ADMINS_TOO_MUCH';
  message: string = 'There are too many admins.';
}
export class AdminIdInvalid extends BadRequest {
  id: string = 'ADMIN_ID_INVALID';
  message: string = 'The specified admin ID is invalid.';
}
export class AdminRankEmojiNotAllowed extends BadRequest {
  id: string = 'ADMIN_RANK_EMOJI_NOT_ALLOWED';
  message: string = 'An admin rank cannot contain emojis.';
}
export class AdminRankInvalid extends BadRequest {
  id: string = 'ADMIN_RANK_INVALID';
  message: string = 'The specified admin rank is invalid.';
}
export class AdminRightsEmpty extends BadRequest {
  id: string = 'ADMIN_RIGHTS_EMPTY';
  message: string =
    'The chatAdminRights constructor passed in keyboardButtonRequestPeer.peer_type.user_admin_rights has no rights set (i.e. flags is 0).';
}
export class AlbumPhotosTooMany extends BadRequest {
  id: string = 'ALBUM_PHOTOS_TOO_MANY';
  message: string = 'You have uploaded too many profile photos, delete some before retrying.';
}
export class ApiIdInvalid extends BadRequest {
  id: string = 'API_ID_INVALID';
  message: string = 'API ID invalid.';
}
export class ApiIdPublishedFlood extends BadRequest {
  id: string = 'API_ID_PUBLISHED_FLOOD';
  message: string = "This API id was published somewhere, you can't use it now.";
}
export class ArticleTitleEmpty extends BadRequest {
  id: string = 'ARTICLE_TITLE_EMPTY';
  message: string = 'The title of the article is empty.';
}
export class AudioContentUrlEmpty extends BadRequest {
  id: string = 'AUDIO_CONTENT_URL_EMPTY';
  message: string = 'The remote URL specified in the content field is empty.';
}
export class AudioTitleEmpty extends BadRequest {
  id: string = 'AUDIO_TITLE_EMPTY';
  message: string = 'An empty audio title was provided.';
}
export class AuthBytesInvalid extends BadRequest {
  id: string = 'AUTH_BYTES_INVALID';
  message: string = 'The provided authorization is invalid.';
}
export class AuthTokenAlreadyAccepted extends BadRequest {
  id: string = 'AUTH_TOKEN_ALREADY_ACCEPTED';
  message: string = 'The specified auth token was already accepted.';
}
export class AuthTokenException extends BadRequest {
  id: string = 'AUTH_TOKEN_EXCEPTION';
  message: string = 'An error occurred while importing the auth token.';
}
export class AuthTokenExpired extends BadRequest {
  id: string = 'AUTH_TOKEN_EXPIRED';
  message: string = 'The authorization token has expired.';
}
export class AuthTokenInvalid extends BadRequest {
  id: string = 'AUTH_TOKEN_INVALID';
  message: string = 'The specified auth token is invalid.';
}
export class AuthTokenInvalidx extends BadRequest {
  id: string = 'AUTH_TOKEN_INVALIDX';
  message: string = 'The specified auth token is invalid.';
}
export class AutoarchiveNotAvailable extends BadRequest {
  id: string = 'AUTOARCHIVE_NOT_AVAILABLE';
  message: string =
    'The autoarchive setting is not available at this time: please check the value of the [autoarchive_setting_available field in client config &raquo;](https://core.telegram.org/api/config#client-configuration) before calling this method.';
}
export class BankCardNumberInvalid extends BadRequest {
  id: string = 'BANK_CARD_NUMBER_INVALID';
  message: string = 'The specified card number is invalid.';
}
export class BannedRightsInvalid extends BadRequest {
  id: string = 'BANNED_RIGHTS_INVALID';
  message: string = 'You provided some invalid flags in the banned rights.';
}
export class BasePortLocInvalid extends BadRequest {
  id: string = 'BASE_PORT_LOC_INVALID';
  message: string = 'The base port location is invalid';
}
export class BoostsEmpty extends BadRequest {
  id: string = 'BOOSTS_EMPTY';
  message: string = 'No boost slots were specified.';
}
export class BoostsRequired extends BadRequest {
  id: string = 'BOOSTS_REQUIRED';
  message: string =
    'The specified channel must first be [boosted by its users](https://core.telegram.org/api/boost) in order to perform this action.';
}
export class BoostNotModified extends BadRequest {
  id: string = 'BOOST_NOT_MODIFIED';
  message: string =
    "You're already [boosting](https://core.telegram.org/api/boost) the specified channel.";
}
export class BoostPeerInvalid extends BadRequest {
  id: string = 'BOOST_PEER_INVALID';
  message: string = 'The specified `boost_peer` is invalid.';
}
export class BotsTooMuch extends BadRequest {
  id: string = 'BOTS_TOO_MUCH';
  message: string = 'There are too many bots in this chat/channel.';
}
export class BotAppInvalid extends BadRequest {
  id: string = 'BOT_APP_INVALID';
  message: string = 'The specified bot app is invalid.';
}
export class BotAppShortnameInvalid extends BadRequest {
  id: string = 'BOT_APP_SHORTNAME_INVALID';
  message: string = 'The specified bot app short name is invalid.';
}
export class BotChannelsNa extends BadRequest {
  id: string = 'BOT_CHANNELS_NA';
  message: string = "Bots can't edit admin privileges.";
}
export class BotCommandDescriptionInvalid extends BadRequest {
  id: string = 'BOT_COMMAND_DESCRIPTION_INVALID';
  message: string = 'The specified command description is invalid.';
}
export class BotCommandInvalid extends BadRequest {
  id: string = 'BOT_COMMAND_INVALID';
  message: string = 'The specified command is invalid.';
}
export class BotDomainInvalid extends BadRequest {
  id: string = 'BOT_DOMAIN_INVALID';
  message: string = 'Bot domain invalid.';
}
export class BotGamesDisabled extends BadRequest {
  id: string = 'BOT_GAMES_DISABLED';
  message: string = 'Bot games cannot be used in this type of chat';
}
export class BotGroupsBlocked extends BadRequest {
  id: string = 'BOT_GROUPS_BLOCKED';
  message: string = "This bot can't be added to groups.";
}
export class BotInlineDisabled extends BadRequest {
  id: string = 'BOT_INLINE_DISABLED';
  message: string = "This bot can't be used in inline mode.";
}
export class BotInvalid extends BadRequest {
  id: string = 'BOT_INVALID';
  message: string = 'This is not a valid bot.';
}
export class BotMethodInvalid extends BadRequest {
  id: string = 'BOT_METHOD_INVALID';
  message: string = "The method can't be used by bots";
}
export class BotMissing extends BadRequest {
  id: string = 'BOT_MISSING';
  message: string =
    "Only bots can call this method, please use [@stickers](https://t.me/stickers) if you're a user.";
}
export class BotOnesideNotAvail extends BadRequest {
  id: string = 'BOT_ONESIDE_NOT_AVAIL';
  message: string = "Bots can't pin messages in PM just for themselves.";
}
export class BotPaymentsDisabled extends BadRequest {
  id: string = 'BOT_PAYMENTS_DISABLED';
  message: string = 'Please enable bot payments in botfather before calling this method.';
}
export class BotPollsDisabled extends BadRequest {
  id: string = 'BOT_POLLS_DISABLED';
  message: string = 'Sending polls by bots has been disabled';
}
export class BotResponseTimeout extends BadRequest {
  id: string = 'BOT_RESPONSE_TIMEOUT';
  message: string = 'A timeout occurred while fetching data from the bot.';
}
export class BotScoreNotModified extends BadRequest {
  id: string = 'BOT_SCORE_NOT_MODIFIED';
  message: string = "The score wasn't modified.";
}
export class BotWebviewDisabled extends BadRequest {
  id: string = 'BOT_WEBVIEW_DISABLED';
  message: string =
    'A webview cannot be opened in the specified conditions: emitted for example if `from_bot_menu` or `url` are set and `peer` is not the chat with the bot.';
}
export class BroadcastIdInvalid extends BadRequest {
  id: string = 'BROADCAST_ID_INVALID';
  message: string = 'Broadcast ID invalid.';
}
export class BroadcastPublicVotersForbidden extends BadRequest {
  id: string = 'BROADCAST_PUBLIC_VOTERS_FORBIDDEN';
  message: string = "You can't forward polls with public voters.";
}
export class BroadcastRequired extends BadRequest {
  id: string = 'BROADCAST_REQUIRED';
  message: string =
    'This method can only be called on a channel, please use stats.getMegagroupStats for supergroups.';
}
export class ButtonDataInvalid extends BadRequest {
  id: string = 'BUTTON_DATA_INVALID';
  message: string = 'The data of one or more of the buttons you provided is invalid.';
}
export class ButtonTextInvalid extends BadRequest {
  id: string = 'BUTTON_TEXT_INVALID';
  message: string = 'The specified button text is invalid.';
}
export class ButtonTypeInvalid extends BadRequest {
  id: string = 'BUTTON_TYPE_INVALID';
  message: string = 'The type of one or more of the buttons you provided is invalid.';
}
export class ButtonUrlInvalid extends BadRequest {
  id: string = 'BUTTON_URL_INVALID';
  message: string = 'Button URL invalid.';
}
export class ButtonUserInvalid extends BadRequest {
  id: string = 'BUTTON_USER_INVALID';
  message: string = 'The user_id passed to inputKeyboardButtonUserProfile is invalid!';
}
export class ButtonUserPrivacyRestricted extends BadRequest {
  id: string = 'BUTTON_USER_PRIVACY_RESTRICTED';
  message: string =
    'The privacy setting of the user specified in a [inputKeyboardButtonUserProfile](/constructor/inputKeyboardButtonUserProfile) button do not allow creating such a button.';
}
export class CallAlreadyAccepted extends BadRequest {
  id: string = 'CALL_ALREADY_ACCEPTED';
  message: string = 'The call was already accepted.';
}
export class CallAlreadyDeclined extends BadRequest {
  id: string = 'CALL_ALREADY_DECLINED';
  message: string = 'The call was already declined.';
}
export class CallOccupyFailed extends BadRequest {
  id: string = 'CALL_OCCUPY_FAILED';
  message: string = 'The call failed because the user is already making another call.';
}
export class CallPeerInvalid extends BadRequest {
  id: string = 'CALL_PEER_INVALID';
  message: string = 'The provided call peer object is invalid.';
}
export class CallProtocolFlagsInvalid extends BadRequest {
  id: string = 'CALL_PROTOCOL_FLAGS_INVALID';
  message: string = 'Call protocol flags invalid.';
}
export class CdnMethodInvalid extends BadRequest {
  id: string = 'CDN_METHOD_INVALID';
  message: string = "You can't call this method in a CDN DC.";
}
export class ChannelsAdminLocatedTooMuch extends BadRequest {
  id: string = 'CHANNELS_ADMIN_LOCATED_TOO_MUCH';
  message: string = 'The user has reached the limit of public geogroups.';
}
export class ChannelsAdminPublicTooMuch extends BadRequest {
  id: string = 'CHANNELS_ADMIN_PUBLIC_TOO_MUCH';
  message: string =
    "You're admin of too many public channels, make some channels private to change the username of this channel.";
}
export class ChannelsTooMuch extends BadRequest {
  id: string = 'CHANNELS_TOO_MUCH';
  message: string = 'You have joined too many channels/supergroups.';
}
export class ChannelAddInvalid extends BadRequest {
  id: string = 'CHANNEL_ADD_INVALID';
  message: string = 'Internal error.';
}
export class ChannelBanned extends BadRequest {
  id: string = 'CHANNEL_BANNED';
  message: string = 'The channel is banned';
}
export class ChannelForumMissing extends BadRequest {
  id: string = 'CHANNEL_FORUM_MISSING';
  message: string = 'This supergroup is not a forum.';
}
export class ChannelIdInvalid extends BadRequest {
  id: string = 'CHANNEL_ID_INVALID';
  message: string = 'The specified supergroup ID is invalid.';
}
export class ChannelInvalid extends BadRequest {
  id: string = 'CHANNEL_INVALID';
  message: string = 'The provided channel is invalid.';
}
export class ChannelParicipantMissing extends BadRequest {
  id: string = 'CHANNEL_PARICIPANT_MISSING';
  message: string = 'The current user is not in the channel.';
}
export class ChannelPrivate extends BadRequest {
  id: string = 'CHANNEL_PRIVATE';
  message: string = "You haven't joined this channel/supergroup.";
}
export class ChannelTooBig extends BadRequest {
  id: string = 'CHANNEL_TOO_BIG';
  message: string = 'This channel has too many participants (>1000) to be deleted.';
}
export class ChannelTooLarge extends BadRequest {
  id: string = 'CHANNEL_TOO_LARGE';
  message: string =
    'Channel is too large to be deleted; this error is issued when trying to delete channels with more than 1000 members (subject to change).';
}
export class ChatlistExcludeInvalid extends BadRequest {
  id: string = 'CHATLIST_EXCLUDE_INVALID';
  message: string = 'The specified `exclude_peers` are invalid.';
}
export class ChatAboutNotModified extends BadRequest {
  id: string = 'CHAT_ABOUT_NOT_MODIFIED';
  message: string = 'About text has not changed.';
}
export class ChatAboutTooLong extends BadRequest {
  id: string = 'CHAT_ABOUT_TOO_LONG';
  message: string = 'Chat about too long.';
}
export class ChatAdminRequired extends BadRequest {
  id: string = 'CHAT_ADMIN_REQUIRED';
  message: string = 'You must be an admin in this chat to do this.';
}
export class ChatDiscussionUnallowed extends BadRequest {
  id: string = 'CHAT_DISCUSSION_UNALLOWED';
  message: string = "You can't enable forum topics in a discussion group linked to a channel.";
}
export class ChatForwardsRestricted extends BadRequest {
  id: string = 'CHAT_FORWARDS_RESTRICTED';
  message: string = "You can't forward messages from a protected chat.";
}
export class ChatIdEmpty extends BadRequest {
  id: string = 'CHAT_ID_EMPTY';
  message: string = 'The provided chat ID is empty.';
}
export class ChatIdInvalid extends BadRequest {
  id: string = 'CHAT_ID_INVALID';
  message: string = 'The provided chat id is invalid.';
}
export class ChatInvalid extends BadRequest {
  id: string = 'CHAT_INVALID';
  message: string = 'Invalid chat.';
}
export class ChatInvitePermanent extends BadRequest {
  id: string = 'CHAT_INVITE_PERMANENT';
  message: string = "You can't set an expiration date on permanent invite links.";
}
export class ChatLinkExists extends BadRequest {
  id: string = 'CHAT_LINK_EXISTS';
  message: string = "The chat is public, you can't hide the history to new users.";
}
export class ChatNotModified extends BadRequest {
  id: string = 'CHAT_NOT_MODIFIED';
  message: string =
    'No changes were made to chat information because the new information you passed is identical to the current information.';
}
export class ChatPublicRequired extends BadRequest {
  id: string = 'CHAT_PUBLIC_REQUIRED';
  message: string = 'You can only enable join requests in public groups.';
}
export class ChatRestricted extends BadRequest {
  id: string = 'CHAT_RESTRICTED';
  message: string = "You can't send messages in this chat, you were restricted.";
}
export class ChatRevokeDateUnsupported extends BadRequest {
  id: string = 'CHAT_REVOKE_DATE_UNSUPPORTED';
  message: string = '`min_date` and `max_date` are not available for using with non-user peers.';
}
export class ChatSendInlineForbidden extends BadRequest {
  id: string = 'CHAT_SEND_INLINE_FORBIDDEN';
  message: string = "You can't send inline messages in this group.";
}
export class ChatTitleEmpty extends BadRequest {
  id: string = 'CHAT_TITLE_EMPTY';
  message: string = 'No chat title provided.';
}
export class ChatTooBig extends BadRequest {
  id: string = 'CHAT_TOO_BIG';
  message: string =
    'This method is not available for groups with more than `chat_read_mark_size_threshold` members, [see client configuration &raquo;](https://core.telegram.org/api/config#client-configuration).';
}
export class CodeEmpty extends BadRequest {
  id: string = 'CODE_EMPTY';
  message: string = 'The provided code is empty.';
}
export class CodeHashInvalid extends BadRequest {
  id: string = 'CODE_HASH_INVALID';
  message: string = 'Code hash invalid.';
}
export class CodeInvalid extends BadRequest {
  id: string = 'CODE_INVALID';
  message: string = 'Code invalid.';
}
export class ColorInvalid extends BadRequest {
  id: string = 'COLOR_INVALID';
  message: string = 'The specified color palette ID was invalid.';
}
export class ConnectionApiIdInvalid extends BadRequest {
  id: string = 'CONNECTION_API_ID_INVALID';
  message: string = 'The provided API id is invalid.';
}
export class ConnectionAppVersionEmpty extends BadRequest {
  id: string = 'CONNECTION_APP_VERSION_EMPTY';
  message: string = 'App version is empty.';
}
export class ConnectionDeviceModelEmpty extends BadRequest {
  id: string = 'CONNECTION_DEVICE_MODEL_EMPTY';
  message: string = 'The device model is empty';
}
export class ConnectionLangPackInvalid extends BadRequest {
  id: string = 'CONNECTION_LANG_PACK_INVALID';
  message: string = 'The specified language pack is not valid';
}
export class ConnectionLayerInvalid extends BadRequest {
  id: string = 'CONNECTION_LAYER_INVALID';
  message: string = 'Layer invalid.';
}
export class ConnectionNotInited extends BadRequest {
  id: string = 'CONNECTION_NOT_INITED';
  message: string = 'The connection was not initialized';
}
export class ConnectionSystemEmpty extends BadRequest {
  id: string = 'CONNECTION_SYSTEM_EMPTY';
  message: string = 'The connection to the system is empty';
}
export class ConnectionSystemLangCodeEmpty extends BadRequest {
  id: string = 'CONNECTION_SYSTEM_LANG_CODE_EMPTY';
  message: string = 'The system language code is empty';
}
export class ContactAddMissing extends BadRequest {
  id: string = 'CONTACT_ADD_MISSING';
  message: string = 'Contact to add is missing.';
}
export class ContactIdInvalid extends BadRequest {
  id: string = 'CONTACT_ID_INVALID';
  message: string = 'The provided contact ID is invalid.';
}
export class ContactMissing extends BadRequest {
  id: string = 'CONTACT_MISSING';
  message: string = 'The specified user is not a contact.';
}
export class ContactNameEmpty extends BadRequest {
  id: string = 'CONTACT_NAME_EMPTY';
  message: string = 'Contact name empty.';
}
export class ContactReqMissing extends BadRequest {
  id: string = 'CONTACT_REQ_MISSING';
  message: string = 'Missing contact request.';
}
export class CreateCallFailed extends BadRequest {
  id: string = 'CREATE_CALL_FAILED';
  message: string = 'An error occurred while creating the call.';
}
export class CurrencyTotalAmountInvalid extends BadRequest {
  id: string = 'CURRENCY_TOTAL_AMOUNT_INVALID';
  message: string = 'The total amount of all prices is invalid.';
}
export class CustomReactionsTooMany extends BadRequest {
  id: string = 'CUSTOM_REACTIONS_TOO_MANY';
  message: string = 'Too many custom reactions were specified.';
}
export class DataInvalid extends BadRequest {
  id: string = 'DATA_INVALID';
  message: string = 'Encrypted data invalid.';
}
export class DataJsonInvalid extends BadRequest {
  id: string = 'DATA_JSON_INVALID';
  message: string = 'The provided JSON data is invalid.';
}
export class DataTooLong extends BadRequest {
  id: string = 'DATA_TOO_LONG';
  message: string = 'Data too long.';
}
export class DateEmpty extends BadRequest {
  id: string = 'DATE_EMPTY';
  message: string = 'Date empty.';
}
export class DcIdInvalid extends BadRequest {
  id: string = 'DC_ID_INVALID';
  message: string = 'The provided DC ID is invalid.';
}
export class DhGAInvalid extends BadRequest {
  id: string = 'DH_G_A_INVALID';
  message: string = 'g_a invalid.';
}
export class DocumentInvalid extends BadRequest {
  id: string = 'DOCUMENT_INVALID';
  message: string = 'The specified document is invalid.';
}
export class EmailHashExpired extends BadRequest {
  id: string = 'EMAIL_HASH_EXPIRED';
  message: string = 'Email hash expired.';
}
export class EmailInvalid extends BadRequest {
  id: string = 'EMAIL_INVALID';
  message: string = 'The specified email is invalid.';
}
export class EmailNotSetup extends BadRequest {
  id: string = 'EMAIL_NOT_SETUP';
  message: string =
    'In order to change the login email with emailVerifyPurposeLoginChange, an existing login email must already be set using emailVerifyPurposeLoginSetup.';
}
export class EmailUnconfirmed extends BadRequest {
  id: string = 'EMAIL_UNCONFIRMED';
  message: string = 'Email unconfirmed.';
}
export class EmailUnconfirmedX extends BadRequest {
  id: string = 'EMAIL_UNCONFIRMED_X';
  message: string =
    "The provided email isn't confirmed, {value} is the length of the verification code that was just sent to the email: use [account.verifyEmail](https://core.telegram.org/method/account.verifyEmail) to enter the received verification code and enable the recovery email.";
}
export class EmailVerifyExpired extends BadRequest {
  id: string = 'EMAIL_VERIFY_EXPIRED';
  message: string = 'The verification email has expired.';
}
export class EmojiInvalid extends BadRequest {
  id: string = 'EMOJI_INVALID';
  message: string = 'The specified theme emoji is valid.';
}
export class EmojiMarkupInvalid extends BadRequest {
  id: string = 'EMOJI_MARKUP_INVALID';
  message: string = 'The specified `video_emoji_markup` was invalid.';
}
export class EmojiNotModified extends BadRequest {
  id: string = 'EMOJI_NOT_MODIFIED';
  message: string = "The theme wasn't changed.";
}
export class EmoticonEmpty extends BadRequest {
  id: string = 'EMOTICON_EMPTY';
  message: string = 'The emoji is empty.';
}
export class EmoticonInvalid extends BadRequest {
  id: string = 'EMOTICON_INVALID';
  message: string = 'The specified emoji is invalid.';
}
export class EmoticonStickerpackMissing extends BadRequest {
  id: string = 'EMOTICON_STICKERPACK_MISSING';
  message: string = 'inputStickerSetDice.emoji cannot be empty.';
}
export class EncryptedMessageInvalid extends BadRequest {
  id: string = 'ENCRYPTED_MESSAGE_INVALID';
  message: string = 'Encrypted message invalid.';
}
export class EncryptionAlreadyAccepted extends BadRequest {
  id: string = 'ENCRYPTION_ALREADY_ACCEPTED';
  message: string = 'Secret chat already accepted.';
}
export class EncryptionAlreadyDeclined extends BadRequest {
  id: string = 'ENCRYPTION_ALREADY_DECLINED';
  message: string = 'The secret chat was already declined.';
}
export class EncryptionDeclined extends BadRequest {
  id: string = 'ENCRYPTION_DECLINED';
  message: string = 'The secret chat was declined.';
}
export class EncryptionIdInvalid extends BadRequest {
  id: string = 'ENCRYPTION_ID_INVALID';
  message: string = 'The provided secret chat ID is invalid.';
}
export class EntitiesTooLong extends BadRequest {
  id: string = 'ENTITIES_TOO_LONG';
  message: string = 'You provided too many styled message entities.';
}
export class EntityBoundsInvalid extends BadRequest {
  id: string = 'ENTITY_BOUNDS_INVALID';
  message: string =
    'A specified [entity offset or length](/api/entities#entity-length) is invalid, see [here &raquo;](/api/entities#entity-length) for info on how to properly compute the entity offset/length.';
}
export class EntityMentionUserInvalid extends BadRequest {
  id: string = 'ENTITY_MENTION_USER_INVALID';
  message: string = 'You mentioned an invalid user.';
}
export class ErrorTextEmpty extends BadRequest {
  id: string = 'ERROR_TEXT_EMPTY';
  message: string = 'The provided error message is empty.';
}
export class ExpireDateInvalid extends BadRequest {
  id: string = 'EXPIRE_DATE_INVALID';
  message: string = 'The specified expiration date is invalid.';
}
export class ExportCardInvalid extends BadRequest {
  id: string = 'EXPORT_CARD_INVALID';
  message: string = 'Provided card is invalid.';
}
export class ExternalUrlInvalid extends BadRequest {
  id: string = 'EXTERNAL_URL_INVALID';
  message: string = 'External URL invalid.';
}
export class FieldNameEmpty extends BadRequest {
  id: string = 'FIELD_NAME_EMPTY';
  message: string = 'The field with the name FIELD_NAME is missing';
}
export class FieldNameInvalid extends BadRequest {
  id: string = 'FIELD_NAME_INVALID';
  message: string = 'The field with the name FIELD_NAME is invalid';
}
export class FileContentTypeInvalid extends BadRequest {
  id: string = 'FILE_CONTENT_TYPE_INVALID';
  message: string = 'File content-type is invalid.';
}
export class FileEmtpy extends BadRequest {
  id: string = 'FILE_EMTPY';
  message: string = 'An empty file was provided.';
}
export class FileIdInvalid extends BadRequest {
  id: string = 'FILE_ID_INVALID';
  message: string = 'The provided file id is invalid.';
}
export class FileMigrate extends BadRequest {
  id: string = 'FILE_MIGRATE_X';
  message: string = 'The file is in Data Center No. {value}';
}
export class FilePartsInvalid extends BadRequest {
  id: string = 'FILE_PARTS_INVALID';
  message: string = 'The number of file parts is invalid.';
}
export class FilePartEmpty extends BadRequest {
  id: string = 'FILE_PART_EMPTY';
  message: string = 'The provided file part is empty.';
}
export class FilePartInvalid extends BadRequest {
  id: string = 'FILE_PART_INVALID';
  message: string = 'The file part number is invalid.';
}
export class FilePartLengthInvalid extends BadRequest {
  id: string = 'FILE_PART_LENGTH_INVALID';
  message: string = 'The length of a file part is invalid.';
}
export class FilePartSizeChanged extends BadRequest {
  id: string = 'FILE_PART_SIZE_CHANGED';
  message: string = 'Provided file part size has changed.';
}
export class FilePartSizeInvalid extends BadRequest {
  id: string = 'FILE_PART_SIZE_INVALID';
  message: string = 'The provided file part size is invalid.';
}
export class FilePartTooBig extends BadRequest {
  id: string = 'FILE_PART_TOO_BIG';
  message: string = 'The uploaded file part is too big.';
}
export class FilePartMissing extends BadRequest {
  id: string = 'FILE_PART_X_MISSING';
  message: string = 'Part {value} of the file is missing from storage';
}
export class FileReferenceAny extends BadRequest {
  id: string = 'FILE_REFERENCE_*';
  message: string =
    'The file reference expired, it [must be refreshed](https://core.telegram.org/api/file_reference).';
}
export class FileReferenceEmpty extends BadRequest {
  id: string = 'FILE_REFERENCE_EMPTY';
  message: string =
    'An empty [file reference](https://core.telegram.org/api/file_reference) was specified.';
}
export class FileReferenceExpired extends BadRequest {
  id: string = 'FILE_REFERENCE_EXPIRED';
  message: string =
    'File reference expired, it must be refetched as described in [the documentation](https://core.telegram.org/api/file_reference).';
}
export class FileReferenceInvalid extends BadRequest {
  id: string = 'FILE_REFERENCE_INVALID';
  message: string =
    'The specified [file reference](https://core.telegram.org/api/file_reference) is invalid.';
}
export class FileTitleEmpty extends BadRequest {
  id: string = 'FILE_TITLE_EMPTY';
  message: string = 'An empty file title was specified.';
}
export class FileTokenInvalid extends BadRequest {
  id: string = 'FILE_TOKEN_INVALID';
  message: string = 'The specified file token is invalid.';
}
export class FilterIdInvalid extends BadRequest {
  id: string = 'FILTER_ID_INVALID';
  message: string = 'The specified filter ID is invalid.';
}
export class FilterIncludeEmpty extends BadRequest {
  id: string = 'FILTER_INCLUDE_EMPTY';
  message: string = 'The include_peers vector of the filter is empty.';
}
export class FilterNotSupported extends BadRequest {
  id: string = 'FILTER_NOT_SUPPORTED';
  message: string = 'The specified filter cannot be used in this context.';
}
export class FilterTitleEmpty extends BadRequest {
  id: string = 'FILTER_TITLE_EMPTY';
  message: string = 'The title field of the filter is empty.';
}
export class FirstnameInvalid extends BadRequest {
  id: string = 'FIRSTNAME_INVALID';
  message: string = 'The first name is invalid.';
}
export class FolderIdEmpty extends BadRequest {
  id: string = 'FOLDER_ID_EMPTY';
  message: string = 'An empty folder ID was specified.';
}
export class FolderIdInvalid extends BadRequest {
  id: string = 'FOLDER_ID_INVALID';
  message: string = 'Invalid folder ID.';
}
export class ForumEnabled extends BadRequest {
  id: string = 'FORUM_ENABLED';
  message: string =
    "You can't execute the specified action because the group is a [forum](https://core.telegram.org/api/forum), disable forum functionality to continue.";
}
export class FreshChangeAdminsForbidden extends BadRequest {
  id: string = 'FRESH_CHANGE_ADMINS_FORBIDDEN';
  message: string = "You were just elected admin, you can't add or modify other admins yet.";
}
export class FromMessageBotDisabled extends BadRequest {
  id: string = 'FROM_MESSAGE_BOT_DISABLED';
  message: string = "Bots can't use fromMessage min constructors.";
}
export class FromPeerInvalid extends BadRequest {
  id: string = 'FROM_PEER_INVALID';
  message: string = 'The specified from_id is invalid.';
}
export class GameBotInvalid extends BadRequest {
  id: string = 'GAME_BOT_INVALID';
  message: string = "Bots can't send another bot's game.";
}
export class GeneralModifyIconForbidden extends BadRequest {
  id: string = 'GENERAL_MODIFY_ICON_FORBIDDEN';
  message: string = 'You can\'t modify the icon of the "General" topic.';
}
export class GeoPointInvalid extends BadRequest {
  id: string = 'GEO_POINT_INVALID';
  message: string = 'Invalid geoposition provided.';
}
export class GiftSlugExpired extends BadRequest {
  id: string = 'GIFT_SLUG_EXPIRED';
  message: string = 'The specified gift slug has expired.';
}
export class GiftSlugInvalid extends BadRequest {
  id: string = 'GIFT_SLUG_INVALID';
  message: string = 'The specified slug is invalid.';
}
export class GifContentTypeInvalid extends BadRequest {
  id: string = 'GIF_CONTENT_TYPE_INVALID';
  message: string = 'GIF content-type invalid.';
}
export class GifIdInvalid extends BadRequest {
  id: string = 'GIF_ID_INVALID';
  message: string = 'The provided GIF ID is invalid.';
}
export class GraphExpiredReload extends BadRequest {
  id: string = 'GRAPH_EXPIRED_RELOAD';
  message: string = 'This graph has expired, please obtain a new graph token.';
}
export class GraphInvalidReload extends BadRequest {
  id: string = 'GRAPH_INVALID_RELOAD';
  message: string =
    'Invalid graph token provided, please reload the stats and provide the updated token.';
}
export class GraphOutdatedReload extends BadRequest {
  id: string = 'GRAPH_OUTDATED_RELOAD';
  message: string =
    'The graph is outdated, please get a new async token using stats.getBroadcastStats.';
}
export class GroupcallAlreadyDiscarded extends BadRequest {
  id: string = 'GROUPCALL_ALREADY_DISCARDED';
  message: string = 'The group call was already discarded.';
}
export class GroupcallForbidden extends BadRequest {
  id: string = 'GROUPCALL_FORBIDDEN';
  message: string = 'The group call has already ended.';
}
export class GroupcallInvalid extends BadRequest {
  id: string = 'GROUPCALL_INVALID';
  message: string = 'The specified group call is invalid.';
}
export class GroupcallJoinMissing extends BadRequest {
  id: string = 'GROUPCALL_JOIN_MISSING';
  message: string = "You haven't joined this group call.";
}
export class GroupcallNotModified extends BadRequest {
  id: string = 'GROUPCALL_NOT_MODIFIED';
  message: string = "Group call settings weren't modified.";
}
export class GroupcallSsrcDuplicateMuch extends BadRequest {
  id: string = 'GROUPCALL_SSRC_DUPLICATE_MUCH';
  message: string = 'The app needs to retry joining the group call with a new SSRC value.';
}
export class GroupedMediaInvalid extends BadRequest {
  id: string = 'GROUPED_MEDIA_INVALID';
  message: string = 'Invalid grouped media.';
}
export class GroupCallInvalid extends BadRequest {
  id: string = 'GROUP_CALL_INVALID';
  message: string = 'The group call is invalid';
}
export class HashInvalid extends BadRequest {
  id: string = 'HASH_INVALID';
  message: string = 'The provided hash is invalid.';
}
export class HideRequesterMissing extends BadRequest {
  id: string = 'HIDE_REQUESTER_MISSING';
  message: string = 'The join request was missing or was already handled.';
}
export class ImageProcessFailed extends BadRequest {
  id: string = 'IMAGE_PROCESS_FAILED';
  message: string = 'Failure while processing image.';
}
export class ImportFileInvalid extends BadRequest {
  id: string = 'IMPORT_FILE_INVALID';
  message: string = 'The specified chat export file is invalid.';
}
export class ImportFormatUnrecognized extends BadRequest {
  id: string = 'IMPORT_FORMAT_UNRECOGNIZED';
  message: string = 'The specified chat export file was exported from an unsupported chat app.';
}
export class ImportIdInvalid extends BadRequest {
  id: string = 'IMPORT_ID_INVALID';
  message: string = 'The specified import ID is invalid.';
}
export class ImportTokenInvalid extends BadRequest {
  id: string = 'IMPORT_TOKEN_INVALID';
  message: string = 'The specified token is invalid.';
}
export class InlineResultExpired extends BadRequest {
  id: string = 'INLINE_RESULT_EXPIRED';
  message: string = 'The inline query expired.';
}
export class InputChatlistInvalid extends BadRequest {
  id: string = 'INPUT_CHATLIST_INVALID';
  message: string = 'The specified folder is invalid.';
}
export class InputConstructorInvalid extends BadRequest {
  id: string = 'INPUT_CONSTRUCTOR_INVALID';
  message: string = 'The provided constructor is invalid';
}
export class InputFetchError extends BadRequest {
  id: string = 'INPUT_FETCH_ERROR';
  message: string = 'An error occurred while deserializing TL parameters';
}
export class InputFetchFail extends BadRequest {
  id: string = 'INPUT_FETCH_FAIL';
  message: string = 'Failed deserializing TL payload';
}
export class InputFilterInvalid extends BadRequest {
  id: string = 'INPUT_FILTER_INVALID';
  message: string = 'The specified filter is invalid.';
}
export class InputLayerInvalid extends BadRequest {
  id: string = 'INPUT_LAYER_INVALID';
  message: string = 'The provided layer is invalid';
}
export class InputMethodInvalid extends BadRequest {
  id: string = 'INPUT_METHOD_INVALID';
  message: string = 'The method invoked is invalid in the current schema';
}
export class InputRequestTooLong extends BadRequest {
  id: string = 'INPUT_REQUEST_TOO_LONG';
  message: string = 'The input request is too long';
}
export class InputTextEmpty extends BadRequest {
  id: string = 'INPUT_TEXT_EMPTY';
  message: string = 'The specified text is empty.';
}
export class InputTextTooLong extends BadRequest {
  id: string = 'INPUT_TEXT_TOO_LONG';
  message: string = 'The specified text is too long.';
}
export class InputUserDeactivated extends BadRequest {
  id: string = 'INPUT_USER_DEACTIVATED';
  message: string = 'The specified user was deleted.';
}
export class InvitesTooMuch extends BadRequest {
  id: string = 'INVITES_TOO_MUCH';
  message: string =
    'The maximum number of per-folder invites specified by the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [client configuration parameters &raquo;](/api/config#chatlist-invites-limit-default) was reached.';
}
export class InviteForbiddenWithJoinas extends BadRequest {
  id: string = 'INVITE_FORBIDDEN_WITH_JOINAS';
  message: string =
    "If the user has anonymously joined a group call as a channel, they can't invite other users to the group call because that would cause deanonymization, because the invite would be sent using the original user ID, not the anonymized channel ID.";
}
export class InviteHashEmpty extends BadRequest {
  id: string = 'INVITE_HASH_EMPTY';
  message: string = 'The invite hash is empty.';
}
export class InviteHashExpired extends BadRequest {
  id: string = 'INVITE_HASH_EXPIRED';
  message: string = 'The invite link has expired.';
}
export class InviteHashInvalid extends BadRequest {
  id: string = 'INVITE_HASH_INVALID';
  message: string = 'The invite hash is invalid.';
}
export class InviteRequestSent extends BadRequest {
  id: string = 'INVITE_REQUEST_SENT';
  message: string = 'You have successfully requested to join this chat or channel.';
}
export class InviteRevokedMissing extends BadRequest {
  id: string = 'INVITE_REVOKED_MISSING';
  message: string = 'The specified invite link was already revoked or is invalid.';
}
export class InviteSlugEmpty extends BadRequest {
  id: string = 'INVITE_SLUG_EMPTY';
  message: string = 'The specified invite slug is empty.';
}
export class InviteSlugExpired extends BadRequest {
  id: string = 'INVITE_SLUG_EXPIRED';
  message: string = 'The specified chat folder link has expired.';
}
export class InvoicePayloadInvalid extends BadRequest {
  id: string = 'INVOICE_PAYLOAD_INVALID';
  message: string = 'The specified invoice payload is invalid.';
}
export class JoinAsPeerInvalid extends BadRequest {
  id: string = 'JOIN_AS_PEER_INVALID';
  message: string = 'The specified peer cannot be used to join a group call.';
}
export class LangCodeInvalid extends BadRequest {
  id: string = 'LANG_CODE_INVALID';
  message: string = 'The specified language code is invalid.';
}
export class LangCodeNotSupported extends BadRequest {
  id: string = 'LANG_CODE_NOT_SUPPORTED';
  message: string = 'The specified language code is not supported.';
}
export class LangPackInvalid extends BadRequest {
  id: string = 'LANG_PACK_INVALID';
  message: string = 'The provided language pack is invalid.';
}
export class LastnameInvalid extends BadRequest {
  id: string = 'LASTNAME_INVALID';
  message: string = 'The last name is invalid.';
}
export class LimitInvalid extends BadRequest {
  id: string = 'LIMIT_INVALID';
  message: string = 'The provided limit is invalid.';
}
export class LinkNotModified extends BadRequest {
  id: string = 'LINK_NOT_MODIFIED';
  message: string = 'Discussion link not modified.';
}
export class LocationInvalid extends BadRequest {
  id: string = 'LOCATION_INVALID';
  message: string = 'The provided location is invalid.';
}
export class MaxDateInvalid extends BadRequest {
  id: string = 'MAX_DATE_INVALID';
  message: string = 'The specified maximum date is invalid.';
}
export class MaxIdInvalid extends BadRequest {
  id: string = 'MAX_ID_INVALID';
  message: string = 'The provided max ID is invalid.';
}
export class MaxQtsInvalid extends BadRequest {
  id: string = 'MAX_QTS_INVALID';
  message: string = 'The specified max_qts is invalid.';
}
export class Md5ChecksumInvalid extends BadRequest {
  id: string = 'MD5_CHECKSUM_INVALID';
  message: string = 'The MD5 checksums do not match.';
}
export class MediaCaptionTooLong extends BadRequest {
  id: string = 'MEDIA_CAPTION_TOO_LONG';
  message: string = 'The caption is too long.';
}
export class MediaEmpty extends BadRequest {
  id: string = 'MEDIA_EMPTY';
  message: string = 'The provided media object is invalid.';
}
export class MediaFileInvalid extends BadRequest {
  id: string = 'MEDIA_FILE_INVALID';
  message: string = 'The specified media file is invalid.';
}
export class MediaGroupedInvalid extends BadRequest {
  id: string = 'MEDIA_GROUPED_INVALID';
  message: string = 'You tried to send media of different types in an album.';
}
export class MediaInvalid extends BadRequest {
  id: string = 'MEDIA_INVALID';
  message: string = 'Media invalid.';
}
export class MediaNewInvalid extends BadRequest {
  id: string = 'MEDIA_NEW_INVALID';
  message: string = 'The new media is invalid.';
}
export class MediaPrevInvalid extends BadRequest {
  id: string = 'MEDIA_PREV_INVALID';
  message: string = 'Previous media invalid.';
}
export class MediaTtlInvalid extends BadRequest {
  id: string = 'MEDIA_TTL_INVALID';
  message: string = 'The specified media TTL is invalid.';
}
export class MediaTypeInvalid extends BadRequest {
  id: string = 'MEDIA_TYPE_INVALID';
  message: string = 'The specified media type cannot be used in stories.';
}
export class MediaVideoStoryMissing extends BadRequest {
  id: string = 'MEDIA_VIDEO_STORY_MISSING';
  message: string = '';
}
export class MegagroupGeoRequired extends BadRequest {
  id: string = 'MEGAGROUP_GEO_REQUIRED';
  message: string = 'This method can only be invoked on a geogroup.';
}
export class MegagroupIdInvalid extends BadRequest {
  id: string = 'MEGAGROUP_ID_INVALID';
  message: string = 'Invalid supergroup ID.';
}
export class MegagroupPrehistoryHidden extends BadRequest {
  id: string = 'MEGAGROUP_PREHISTORY_HIDDEN';
  message: string = "Group with hidden history for new members can't be set as discussion groups.";
}
export class MegagroupRequired extends BadRequest {
  id: string = 'MEGAGROUP_REQUIRED';
  message: string = 'You can only use this method on a supergroup.';
}
export class MessageEditTimeExpired extends BadRequest {
  id: string = 'MESSAGE_EDIT_TIME_EXPIRED';
  message: string =
    "You can't edit this message anymore, too much time has passed since its creation.";
}
export class MessageEmpty extends BadRequest {
  id: string = 'MESSAGE_EMPTY';
  message: string = 'The provided message is empty.';
}
export class MessageIdsEmpty extends BadRequest {
  id: string = 'MESSAGE_IDS_EMPTY';
  message: string = 'No message ids were provided.';
}
export class MessageIdInvalid extends BadRequest {
  id: string = 'MESSAGE_ID_INVALID';
  message: string = 'The provided message id is invalid.';
}
export class MessageNotModified extends BadRequest {
  id: string = 'MESSAGE_NOT_MODIFIED';
  message: string =
    "The provided message data is identical to the previous message data, the message wasn't modified.";
}
export class MessagePollClosed extends BadRequest {
  id: string = 'MESSAGE_POLL_CLOSED';
  message: string = 'Poll closed.';
}
export class MessageTooLong extends BadRequest {
  id: string = 'MESSAGE_TOO_LONG';
  message: string = 'The provided message is too long.';
}
export class MethodInvalid extends BadRequest {
  id: string = 'METHOD_INVALID';
  message: string = 'The specified method is invalid.';
}
export class MinDateInvalid extends BadRequest {
  id: string = 'MIN_DATE_INVALID';
  message: string = 'The specified minimum date is invalid.';
}
export class MsgIdInvalid extends BadRequest {
  id: string = 'MSG_ID_INVALID';
  message: string = 'Invalid message ID provided.';
}
export class MsgTooOld extends BadRequest {
  id: string = 'MSG_TOO_OLD';
  message: string =
    '[`chat_read_mark_expire_period` seconds](https://core.telegram.org/api/config#chat-read-mark-expire-period) have passed since the message was sent, read receipts were deleted.';
}
export class MsgWaitFailed extends BadRequest {
  id: string = 'MSG_WAIT_FAILED';
  message: string = 'A waiting call returned an error.';
}
export class MultiMediaTooLong extends BadRequest {
  id: string = 'MULTI_MEDIA_TOO_LONG';
  message: string = 'Too many media files for album.';
}
export class NewSaltInvalid extends BadRequest {
  id: string = 'NEW_SALT_INVALID';
  message: string = 'The new salt is invalid.';
}
export class NewSettingsEmpty extends BadRequest {
  id: string = 'NEW_SETTINGS_EMPTY';
  message: string =
    'No password is set on the current account, and no new password was specified in `new_settings`.';
}
export class NewSettingsInvalid extends BadRequest {
  id: string = 'NEW_SETTINGS_INVALID';
  message: string = 'The new password settings are invalid.';
}
export class NextOffsetInvalid extends BadRequest {
  id: string = 'NEXT_OFFSET_INVALID';
  message: string = 'The specified offset is longer than 64 bytes.';
}
export class OffsetInvalid extends BadRequest {
  id: string = 'OFFSET_INVALID';
  message: string = 'The provided offset is invalid.';
}
export class OffsetPeerIdInvalid extends BadRequest {
  id: string = 'OFFSET_PEER_ID_INVALID';
  message: string = 'The provided offset peer is invalid.';
}
export class OptionsTooMuch extends BadRequest {
  id: string = 'OPTIONS_TOO_MUCH';
  message: string = 'Too many options provided.';
}
export class OptionInvalid extends BadRequest {
  id: string = 'OPTION_INVALID';
  message: string = 'Invalid option selected.';
}
export class OrderInvalid extends BadRequest {
  id: string = 'ORDER_INVALID';
  message: string = 'The specified username order is invalid.';
}
export class PackShortNameInvalid extends BadRequest {
  id: string = 'PACK_SHORT_NAME_INVALID';
  message: string = 'Short pack name invalid.';
}
export class PackShortNameOccupied extends BadRequest {
  id: string = 'PACK_SHORT_NAME_OCCUPIED';
  message: string = 'A stickerpack with this name already exists.';
}
export class PackTitleInvalid extends BadRequest {
  id: string = 'PACK_TITLE_INVALID';
  message: string = 'The stickerpack title is invalid.';
}
export class ParticipantsTooFew extends BadRequest {
  id: string = 'PARTICIPANTS_TOO_FEW';
  message: string = 'Not enough participants.';
}
export class ParticipantIdInvalid extends BadRequest {
  id: string = 'PARTICIPANT_ID_INVALID';
  message: string = 'The specified participant ID is invalid.';
}
export class ParticipantJoinMissing extends BadRequest {
  id: string = 'PARTICIPANT_JOIN_MISSING';
  message: string =
    "Trying to enable a presentation, when the user hasn't joined the Video Chat with [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall).";
}
export class ParticipantVersionOutdated extends BadRequest {
  id: string = 'PARTICIPANT_VERSION_OUTDATED';
  message: string =
    'The other participant does not use an up to date telegram client with support for calls.';
}
export class PasswordEmpty extends BadRequest {
  id: string = 'PASSWORD_EMPTY';
  message: string = 'The provided password is empty.';
}
export class PasswordHashInvalid extends BadRequest {
  id: string = 'PASSWORD_HASH_INVALID';
  message: string = 'The provided password hash is invalid.';
}
export class PasswordMissing extends BadRequest {
  id: string = 'PASSWORD_MISSING';
  message: string = 'You must enable 2FA in order to transfer ownership of a channel.';
}
export class PasswordRecoveryExpired extends BadRequest {
  id: string = 'PASSWORD_RECOVERY_EXPIRED';
  message: string = 'The recovery code has expired.';
}
export class PasswordRecoveryNa extends BadRequest {
  id: string = 'PASSWORD_RECOVERY_NA';
  message: string = "No email was set, can't recover password via email.";
}
export class PasswordRequired extends BadRequest {
  id: string = 'PASSWORD_REQUIRED';
  message: string =
    'A [2FA password](https://core.telegram.org/api/srp) must be configured to use Telegram Passport.';
}
export class PasswordTooFresh extends BadRequest {
  id: string = 'PASSWORD_TOO_FRESH_X';
  message: string =
    'The password was modified less than 24 hours ago, try again in {value} seconds.';
}
export class PaymentProviderInvalid extends BadRequest {
  id: string = 'PAYMENT_PROVIDER_INVALID';
  message: string = 'The specified payment provider is invalid.';
}
export class PeersListEmpty extends BadRequest {
  id: string = 'PEERS_LIST_EMPTY';
  message: string = 'The specified list of peers is empty.';
}
export class PeerFlood extends BadRequest {
  id: string = 'PEER_FLOOD';
  message: string = "The method can't be used because your account is currently limited";
}
export class PeerHistoryEmpty extends BadRequest {
  id: string = 'PEER_HISTORY_EMPTY';
  message: string = "You can't pin an empty chat with a user.";
}
export class PeerIdInvalid extends BadRequest {
  id: string = 'PEER_ID_INVALID';
  message: string = 'The provided peer id is invalid.';
}
export class PeerIdNotSupported extends BadRequest {
  id: string = 'PEER_ID_NOT_SUPPORTED';
  message: string = 'The provided peer ID is not supported.';
}
export class PersistentTimestampEmpty extends BadRequest {
  id: string = 'PERSISTENT_TIMESTAMP_EMPTY';
  message: string = 'Persistent timestamp empty.';
}
export class PersistentTimestampInvalid extends BadRequest {
  id: string = 'PERSISTENT_TIMESTAMP_INVALID';
  message: string = 'Persistent timestamp invalid.';
}
export class PhoneCodeEmpty extends BadRequest {
  id: string = 'PHONE_CODE_EMPTY';
  message: string = 'phone_code is missing.';
}
export class PhoneCodeExpired extends BadRequest {
  id: string = 'PHONE_CODE_EXPIRED';
  message: string = 'The phone code you provided has expired.';
}
export class PhoneCodeHashEmpty extends BadRequest {
  id: string = 'PHONE_CODE_HASH_EMPTY';
  message: string = 'phone_code_hash is missing.';
}
export class PhoneCodeInvalid extends BadRequest {
  id: string = 'PHONE_CODE_INVALID';
  message: string = 'The provided phone code is invalid.';
}
export class PhoneHashExpired extends BadRequest {
  id: string = 'PHONE_HASH_EXPIRED';
  message: string = 'An invalid or expired `phone_code_hash` was provided.';
}
export class PhoneNotOccupied extends BadRequest {
  id: string = 'PHONE_NOT_OCCUPIED';
  message: string = 'No user is associated to the specified phone number.';
}
export class PhoneNumberAppSignupForbidden extends BadRequest {
  id: string = 'PHONE_NUMBER_APP_SIGNUP_FORBIDDEN';
  message: string = "You can't sign up using this app.";
}
export class PhoneNumberBanned extends BadRequest {
  id: string = 'PHONE_NUMBER_BANNED';
  message: string = 'The provided phone number is banned from telegram.';
}
export class PhoneNumberFlood extends BadRequest {
  id: string = 'PHONE_NUMBER_FLOOD';
  message: string = 'You asked for the code too many times.';
}
export class PhoneNumberInvalid extends BadRequest {
  id: string = 'PHONE_NUMBER_INVALID';
  message: string = 'The phone number is invalid.';
}
export class PhoneNumberOccupied extends BadRequest {
  id: string = 'PHONE_NUMBER_OCCUPIED';
  message: string = 'The phone number is already in use.';
}
export class PhoneNumberUnoccupied extends BadRequest {
  id: string = 'PHONE_NUMBER_UNOCCUPIED';
  message: string = 'The phone number is not yet being used.';
}
export class PhonePasswordProtected extends BadRequest {
  id: string = 'PHONE_PASSWORD_PROTECTED';
  message: string = 'This phone is password protected.';
}
export class PhotoContentTypeInvalid extends BadRequest {
  id: string = 'PHOTO_CONTENT_TYPE_INVALID';
  message: string = 'Photo mime-type invalid.';
}
export class PhotoContentUrlEmpty extends BadRequest {
  id: string = 'PHOTO_CONTENT_URL_EMPTY';
  message: string = 'Photo URL invalid.';
}
export class PhotoCropFileMissing extends BadRequest {
  id: string = 'PHOTO_CROP_FILE_MISSING';
  message: string = 'Photo crop file missing.';
}
export class PhotoCropSizeSmall extends BadRequest {
  id: string = 'PHOTO_CROP_SIZE_SMALL';
  message: string = 'Photo is too small.';
}
export class PhotoExtInvalid extends BadRequest {
  id: string = 'PHOTO_EXT_INVALID';
  message: string = 'The extension of the photo is invalid.';
}
export class PhotoFileMissing extends BadRequest {
  id: string = 'PHOTO_FILE_MISSING';
  message: string = 'Profile photo file missing.';
}
export class PhotoIdInvalid extends BadRequest {
  id: string = 'PHOTO_ID_INVALID';
  message: string = 'Photo ID invalid.';
}
export class PhotoInvalid extends BadRequest {
  id: string = 'PHOTO_INVALID';
  message: string = 'Photo invalid.';
}
export class PhotoInvalidDimensions extends BadRequest {
  id: string = 'PHOTO_INVALID_DIMENSIONS';
  message: string = 'The photo dimensions are invalid.';
}
export class PhotoSaveFileInvalid extends BadRequest {
  id: string = 'PHOTO_SAVE_FILE_INVALID';
  message: string = 'Internal issues, try again later.';
}
export class PhotoThumbUrlEmpty extends BadRequest {
  id: string = 'PHOTO_THUMB_URL_EMPTY';
  message: string = 'Photo thumbnail URL is empty.';
}
export class PhotoThumbUrlInvalid extends BadRequest {
  id: string = 'PHOTO_THUMB_URL_INVALID';
  message: string = 'The photo thumb URL is invalid';
}
export class PinnedDialogsTooMuch extends BadRequest {
  id: string = 'PINNED_DIALOGS_TOO_MUCH';
  message: string = 'Too many pinned dialogs.';
}
export class PinRestricted extends BadRequest {
  id: string = 'PIN_RESTRICTED';
  message: string = "You can't pin messages.";
}
export class PollAnswersInvalid extends BadRequest {
  id: string = 'POLL_ANSWERS_INVALID';
  message: string = 'Invalid poll answers were provided.';
}
export class PollAnswerInvalid extends BadRequest {
  id: string = 'POLL_ANSWER_INVALID';
  message: string = 'One of the poll answers is not acceptable.';
}
export class PollOptionDuplicate extends BadRequest {
  id: string = 'POLL_OPTION_DUPLICATE';
  message: string = 'Duplicate poll options provided.';
}
export class PollOptionInvalid extends BadRequest {
  id: string = 'POLL_OPTION_INVALID';
  message: string = 'Invalid poll option provided.';
}
export class PollQuestionInvalid extends BadRequest {
  id: string = 'POLL_QUESTION_INVALID';
  message: string = 'One of the poll questions is not acceptable.';
}
export class PollUnsupported extends BadRequest {
  id: string = 'POLL_UNSUPPORTED';
  message: string = 'This layer does not support polls in the invoked method';
}
export class PollVoteRequired extends BadRequest {
  id: string = 'POLL_VOTE_REQUIRED';
  message: string = 'Cast a vote in the poll before calling this method';
}
export class PremiumAccountRequired extends BadRequest {
  id: string = 'PREMIUM_ACCOUNT_REQUIRED';
  message: string = 'A premium account is required to execute this action.';
}
export class PrivacyKeyInvalid extends BadRequest {
  id: string = 'PRIVACY_KEY_INVALID';
  message: string = 'The privacy key is invalid.';
}
export class PrivacyTooLong extends BadRequest {
  id: string = 'PRIVACY_TOO_LONG';
  message: string = 'Too many privacy rules were specified, the current limit is 1000.';
}
export class PrivacyValueInvalid extends BadRequest {
  id: string = 'PRIVACY_VALUE_INVALID';
  message: string = 'The specified privacy rule combination is invalid.';
}
export class PublicKeyRequired extends BadRequest {
  id: string = 'PUBLIC_KEY_REQUIRED';
  message: string = 'A public key is required.';
}
export class QueryIdEmpty extends BadRequest {
  id: string = 'QUERY_ID_EMPTY';
  message: string = 'The query ID is empty.';
}
export class QueryIdInvalid extends BadRequest {
  id: string = 'QUERY_ID_INVALID';
  message: string = 'The query ID is invalid.';
}
export class QueryTooShort extends BadRequest {
  id: string = 'QUERY_TOO_SHORT';
  message: string = 'The query string is too short.';
}
export class QuizAnswerMissing extends BadRequest {
  id: string = 'QUIZ_ANSWER_MISSING';
  message: string =
    'You can forward a quiz while hiding the original author only after choosing an option in the quiz.';
}
export class QuizCorrectAnswersEmpty extends BadRequest {
  id: string = 'QUIZ_CORRECT_ANSWERS_EMPTY';
  message: string = 'No correct quiz answer was specified.';
}
export class QuizCorrectAnswersTooMuch extends BadRequest {
  id: string = 'QUIZ_CORRECT_ANSWERS_TOO_MUCH';
  message: string =
    'You specified too many correct answers in a quiz, quizzes can only have one right answer!';
}
export class QuizCorrectAnswerInvalid extends BadRequest {
  id: string = 'QUIZ_CORRECT_ANSWER_INVALID';
  message: string = 'An invalid value was provided to the correct_answers field.';
}
export class QuizMultipleInvalid extends BadRequest {
  id: string = 'QUIZ_MULTIPLE_INVALID';
  message: string = "Quizzes can't have the multiple_choice flag set!";
}
export class RandomIdEmpty extends BadRequest {
  id: string = 'RANDOM_ID_EMPTY';
  message: string = 'Random ID empty.';
}
export class RandomIdInvalid extends BadRequest {
  id: string = 'RANDOM_ID_INVALID';
  message: string = 'A provided random ID is invalid.';
}
export class RandomLengthInvalid extends BadRequest {
  id: string = 'RANDOM_LENGTH_INVALID';
  message: string = 'Random length invalid.';
}
export class RangesInvalid extends BadRequest {
  id: string = 'RANGES_INVALID';
  message: string = 'Invalid range provided.';
}
export class ReactionsTooMany extends BadRequest {
  id: string = 'REACTIONS_TOO_MANY';
  message: string =
    "The message already has exactly `reactions_uniq_max` reaction emojis, you can't react with a new emoji, see [the docs for more info &raquo;](/api/config#client-configuration).";
}
export class ReactionEmpty extends BadRequest {
  id: string = 'REACTION_EMPTY';
  message: string = 'Empty reaction provided.';
}
export class ReactionInvalid extends BadRequest {
  id: string = 'REACTION_INVALID';
  message: string = 'The specified reaction is invalid.';
}
export class ReflectorNotAvailable extends BadRequest {
  id: string = 'REFLECTOR_NOT_AVAILABLE';
  message: string = 'The call reflector is not available';
}
export class ReplyMarkupBuyEmpty extends BadRequest {
  id: string = 'REPLY_MARKUP_BUY_EMPTY';
  message: string = 'Reply markup for buy button empty.';
}
export class ReplyMarkupGameEmpty extends BadRequest {
  id: string = 'REPLY_MARKUP_GAME_EMPTY';
  message: string = 'The provided reply markup for the game is empty';
}
export class ReplyMarkupInvalid extends BadRequest {
  id: string = 'REPLY_MARKUP_INVALID';
  message: string = 'The provided reply markup is invalid.';
}
export class ReplyMarkupTooLong extends BadRequest {
  id: string = 'REPLY_MARKUP_TOO_LONG';
  message: string = 'The specified reply_markup is too long.';
}
export class ReplyMessageIdInvalid extends BadRequest {
  id: string = 'REPLY_MESSAGE_ID_INVALID';
  message: string = 'The specified reply-to message ID is invalid.';
}
export class ReplyToInvalid extends BadRequest {
  id: string = 'REPLY_TO_INVALID';
  message: string = 'The specified `reply_to` field is invalid.';
}
export class ReplyToUserInvalid extends BadRequest {
  id: string = 'REPLY_TO_USER_INVALID';
  message: string = 'The replied-to user is invalid.';
}
export class ResetRequestMissing extends BadRequest {
  id: string = 'RESET_REQUEST_MISSING';
  message: string = 'No password reset is in progress.';
}
export class ResultsTooMuch extends BadRequest {
  id: string = 'RESULTS_TOO_MUCH';
  message: string = 'Too many results were provided.';
}
export class ResultIdDuplicate extends BadRequest {
  id: string = 'RESULT_ID_DUPLICATE';
  message: string = 'You provided a duplicate result ID.';
}
export class ResultIdEmpty extends BadRequest {
  id: string = 'RESULT_ID_EMPTY';
  message: string = 'Result ID empty.';
}
export class ResultIdInvalid extends BadRequest {
  id: string = 'RESULT_ID_INVALID';
  message: string = 'One of the specified result IDs is invalid.';
}
export class ResultTypeInvalid extends BadRequest {
  id: string = 'RESULT_TYPE_INVALID';
  message: string = 'Result type invalid.';
}
export class RevoteNotAllowed extends BadRequest {
  id: string = 'REVOTE_NOT_ALLOWED';
  message: string = 'You cannot change your vote.';
}
export class RightsNotModified extends BadRequest {
  id: string = 'RIGHTS_NOT_MODIFIED';
  message: string = 'The new admin rights are equal to the old rights, no change was made.';
}
export class RsaDecryptFailed extends BadRequest {
  id: string = 'RSA_DECRYPT_FAILED';
  message: string = 'Internal RSA decryption failed.';
}
export class ScheduleBotNotAllowed extends BadRequest {
  id: string = 'SCHEDULE_BOT_NOT_ALLOWED';
  message: string = 'Bots cannot schedule messages.';
}
export class ScheduleDateInvalid extends BadRequest {
  id: string = 'SCHEDULE_DATE_INVALID';
  message: string = 'Invalid schedule date provided.';
}
export class ScheduleDateTooLate extends BadRequest {
  id: string = 'SCHEDULE_DATE_TOO_LATE';
  message: string = "You can't schedule a message this far in the future.";
}
export class ScheduleStatusPrivate extends BadRequest {
  id: string = 'SCHEDULE_STATUS_PRIVATE';
  message: string =
    "Can't schedule until user is online, if the user's last seen timestamp is hidden by their privacy settings.";
}
export class ScheduleTooMuch extends BadRequest {
  id: string = 'SCHEDULE_TOO_MUCH';
  message: string = 'There are too many scheduled messages.';
}
export class ScoreInvalid extends BadRequest {
  id: string = 'SCORE_INVALID';
  message: string = 'The specified game score is invalid.';
}
export class SearchQueryEmpty extends BadRequest {
  id: string = 'SEARCH_QUERY_EMPTY';
  message: string = 'The search query is empty.';
}
export class SearchWithLinkNotSupported extends BadRequest {
  id: string = 'SEARCH_WITH_LINK_NOT_SUPPORTED';
  message: string = 'You cannot provide a search query and an invite link at the same time.';
}
export class SecondsInvalid extends BadRequest {
  id: string = 'SECONDS_INVALID';
  message: string = 'Invalid duration provided.';
}
export class SendAsPeerInvalid extends BadRequest {
  id: string = 'SEND_AS_PEER_INVALID';
  message: string = "You can't send messages as the specified peer.";
}
export class SendMessageMediaInvalid extends BadRequest {
  id: string = 'SEND_MESSAGE_MEDIA_INVALID';
  message: string = 'Invalid media provided.';
}
export class SendMessageTypeInvalid extends BadRequest {
  id: string = 'SEND_MESSAGE_TYPE_INVALID';
  message: string = 'The message type is invalid.';
}
export class SessionTooFresh extends BadRequest {
  id: string = 'SESSION_TOO_FRESH_X';
  message: string =
    'This session was created less than 24 hours ago, try again in {value} seconds.';
}
export class SettingsInvalid extends BadRequest {
  id: string = 'SETTINGS_INVALID';
  message: string = 'Invalid settings were provided.';
}
export class Sha256HashInvalid extends BadRequest {
  id: string = 'SHA256_HASH_INVALID';
  message: string = 'The provided SHA256 hash is invalid.';
}
export class ShortnameOccupyFailed extends BadRequest {
  id: string = 'SHORTNAME_OCCUPY_FAILED';
  message: string =
    'An error occurred when trying to register the short-name used for the sticker pack. Try a different name';
}
export class ShortNameInvalid extends BadRequest {
  id: string = 'SHORT_NAME_INVALID';
  message: string = 'The specified short name is invalid.';
}
export class ShortNameOccupied extends BadRequest {
  id: string = 'SHORT_NAME_OCCUPIED';
  message: string = 'The specified short name is already in use.';
}
export class SlotsEmpty extends BadRequest {
  id: string = 'SLOTS_EMPTY';
  message: string = 'The specified slot list is empty.';
}
export class SlowmodeMultiMsgsDisabled extends BadRequest {
  id: string = 'SLOWMODE_MULTI_MSGS_DISABLED';
  message: string = 'Slowmode is enabled, you cannot forward multiple messages to this group.';
}
export class SlugInvalid extends BadRequest {
  id: string = 'SLUG_INVALID';
  message: string = 'The specified invoice slug is invalid.';
}
export class SmsCodeCreateFailed extends BadRequest {
  id: string = 'SMS_CODE_CREATE_FAILED';
  message: string = 'An error occurred while creating the SMS code.';
}
export class SrpIdInvalid extends BadRequest {
  id: string = 'SRP_ID_INVALID';
  message: string = 'Invalid SRP ID provided.';
}
export class SrpPasswordChanged extends BadRequest {
  id: string = 'SRP_PASSWORD_CHANGED';
  message: string = 'Password has changed.';
}
export class StartParamEmpty extends BadRequest {
  id: string = 'START_PARAM_EMPTY';
  message: string = 'The start parameter is empty.';
}
export class StartParamInvalid extends BadRequest {
  id: string = 'START_PARAM_INVALID';
  message: string = 'Start parameter invalid.';
}
export class StartParamTooLong extends BadRequest {
  id: string = 'START_PARAM_TOO_LONG';
  message: string = 'Start parameter is too long.';
}
export class StickerpackStickersTooMuch extends BadRequest {
  id: string = 'STICKERPACK_STICKERS_TOO_MUCH';
  message: string = "There are too many stickers in this stickerpack, you can't add any more.";
}
export class StickersetInvalid extends BadRequest {
  id: string = 'STICKERSET_INVALID';
  message: string = 'The provided sticker set is invalid.';
}
export class StickersEmpty extends BadRequest {
  id: string = 'STICKERS_EMPTY';
  message: string = 'No sticker provided.';
}
export class StickersTooMuch extends BadRequest {
  id: string = 'STICKERS_TOO_MUCH';
  message: string = "There are too many stickers in this stickerpack, you can't add any more.";
}
export class StickerDocumentInvalid extends BadRequest {
  id: string = 'STICKER_DOCUMENT_INVALID';
  message: string = 'The specified sticker document is invalid.';
}
export class StickerEmojiInvalid extends BadRequest {
  id: string = 'STICKER_EMOJI_INVALID';
  message: string = 'Sticker emoji invalid.';
}
export class StickerFileInvalid extends BadRequest {
  id: string = 'STICKER_FILE_INVALID';
  message: string = 'Sticker file invalid.';
}
export class StickerGifDimensions extends BadRequest {
  id: string = 'STICKER_GIF_DIMENSIONS';
  message: string = 'The specified video sticker has invalid dimensions.';
}
export class StickerIdInvalid extends BadRequest {
  id: string = 'STICKER_ID_INVALID';
  message: string = 'The provided sticker ID is invalid.';
}
export class StickerInvalid extends BadRequest {
  id: string = 'STICKER_INVALID';
  message: string = 'The provided sticker is invalid.';
}
export class StickerMimeInvalid extends BadRequest {
  id: string = 'STICKER_MIME_INVALID';
  message: string = 'The specified sticker MIME type is invalid.';
}
export class StickerPngDimensions extends BadRequest {
  id: string = 'STICKER_PNG_DIMENSIONS';
  message: string = 'Sticker png dimensions invalid.';
}
export class StickerPngNopng extends BadRequest {
  id: string = 'STICKER_PNG_NOPNG';
  message: string = 'One of the specified stickers is not a valid PNG file.';
}
export class StickerTgsNodoc extends BadRequest {
  id: string = 'STICKER_TGS_NODOC';
  message: string = 'You must send the animated sticker as a document.';
}
export class StickerTgsNotgs extends BadRequest {
  id: string = 'STICKER_TGS_NOTGS';
  message: string = 'Invalid TGS sticker provided.';
}
export class StickerThumbPngNopng extends BadRequest {
  id: string = 'STICKER_THUMB_PNG_NOPNG';
  message: string = 'Incorrect stickerset thumb file provided, PNG / WEBP expected.';
}
export class StickerThumbTgsNotgs extends BadRequest {
  id: string = 'STICKER_THUMB_TGS_NOTGS';
  message: string = 'Incorrect stickerset TGS thumb file provided.';
}
export class StickerVideoBig extends BadRequest {
  id: string = 'STICKER_VIDEO_BIG';
  message: string = 'The specified video sticker is too big.';
}
export class StickerVideoNodoc extends BadRequest {
  id: string = 'STICKER_VIDEO_NODOC';
  message: string = 'You must send the video sticker as a document.';
}
export class StickerVideoNowebm extends BadRequest {
  id: string = 'STICKER_VIDEO_NOWEBM';
  message: string = 'The specified video sticker is not in webm format.';
}
export class StoriesNeverCreated extends BadRequest {
  id: string = 'STORIES_NEVER_CREATED';
  message: string = "This peer hasn't ever posted any stories.";
}
export class StoriesTooMuch extends BadRequest {
  id: string = 'STORIES_TOO_MUCH';
  message: string =
    'You have hit the maximum active stories limit as specified by the [`story_expiring_limit_*` client configuration parameters](https://core.telegram.org/api/config#story-expiring-limit-default): you should buy a [Premium](/api/premium) subscription, delete an active story, or wait for the oldest story to expire.';
}
export class StoryIdEmpty extends BadRequest {
  id: string = 'STORY_ID_EMPTY';
  message: string = 'You specified no story IDs.';
}
export class StoryIdInvalid extends BadRequest {
  id: string = 'STORY_ID_INVALID';
  message: string = 'The specified story ID is invalid.';
}
export class StoryNotModified extends BadRequest {
  id: string = 'STORY_NOT_MODIFIED';
  message: string =
    "The new story information you passed is equal to the previous story information, thus it wasn't modified.";
}
export class StoryPeriodInvalid extends BadRequest {
  id: string = 'STORY_PERIOD_INVALID';
  message: string = 'The specified story period is invalid for this account.';
}
export class StorySendFloodMonthly extends BadRequest {
  id: string = 'STORY_SEND_FLOOD_MONTHLY_X';
  message: string =
    "You've hit the monthly story limit as specified by the [`stories_sent_monthly_limit_*` client configuration parameters](https://core.telegram.org/api/config#stories-sent-monthly-limit-default): wait for the specified number of seconds before posting a new story.";
}
export class StorySendFloodWeekly extends BadRequest {
  id: string = 'STORY_SEND_FLOOD_WEEKLY_X';
  message: string =
    "You've hit the weekly story limit as specified by the [`stories_sent_weekly_limit_*` client configuration parameters](https://core.telegram.org/api/config#stories-sent-weekly-limit-default): wait for the specified number of seconds before posting a new story.";
}
export class SwitchPmTextEmpty extends BadRequest {
  id: string = 'SWITCH_PM_TEXT_EMPTY';
  message: string = 'The switch_pm.text field was empty.';
}
export class TakeoutInvalid extends BadRequest {
  id: string = 'TAKEOUT_INVALID';
  message: string = 'The specified takeout ID is invalid.';
}
export class TakeoutRequired extends BadRequest {
  id: string = 'TAKEOUT_REQUIRED';
  message: string =
    'A [takeout](https://core.telegram.org/api/takeout) session needs to be initialized first, [see here &raquo; for more info](/api/takeout).';
}
export class TaskAlreadyExists extends BadRequest {
  id: string = 'TASK_ALREADY_EXISTS';
  message: string = 'An email reset was already requested.';
}
export class TempAuthKeyAlreadyBound extends BadRequest {
  id: string = 'TEMP_AUTH_KEY_ALREADY_BOUND';
  message: string = 'The passed temporary key is already bound to another **perm_auth_key_id**.';
}
export class TempAuthKeyEmpty extends BadRequest {
  id: string = 'TEMP_AUTH_KEY_EMPTY';
  message: string = 'No temporary auth key provided.';
}
export class ThemeFileInvalid extends BadRequest {
  id: string = 'THEME_FILE_INVALID';
  message: string = 'Invalid theme file provided.';
}
export class ThemeFormatInvalid extends BadRequest {
  id: string = 'THEME_FORMAT_INVALID';
  message: string = 'Invalid theme format provided.';
}
export class ThemeInvalid extends BadRequest {
  id: string = 'THEME_INVALID';
  message: string = 'Invalid theme provided.';
}
export class ThemeMimeInvalid extends BadRequest {
  id: string = 'THEME_MIME_INVALID';
  message: string = "The theme's MIME type is invalid.";
}
export class ThemeTitleInvalid extends BadRequest {
  id: string = 'THEME_TITLE_INVALID';
  message: string = 'The specified theme title is invalid.';
}
export class TitleInvalid extends BadRequest {
  id: string = 'TITLE_INVALID';
  message: string = 'The specified stickerpack title is invalid.';
}
export class TmpPasswordDisabled extends BadRequest {
  id: string = 'TMP_PASSWORD_DISABLED';
  message: string = 'The temporary password is disabled.';
}
export class TmpPasswordInvalid extends BadRequest {
  id: string = 'TMP_PASSWORD_INVALID';
  message: string = 'The temporary password is invalid';
}
export class TokenEmpty extends BadRequest {
  id: string = 'TOKEN_EMPTY';
  message: string = 'The specified token is empty.';
}
export class TokenInvalid extends BadRequest {
  id: string = 'TOKEN_INVALID';
  message: string = 'The provided token is invalid.';
}
export class TokenTypeInvalid extends BadRequest {
  id: string = 'TOKEN_TYPE_INVALID';
  message: string = 'The specified token type is invalid.';
}
export class TopicsEmpty extends BadRequest {
  id: string = 'TOPICS_EMPTY';
  message: string = 'You specified no topic IDs.';
}
export class TopicClosed extends BadRequest {
  id: string = 'TOPIC_CLOSED';
  message: string = "This topic was closed, you can't send messages to it anymore.";
}
export class TopicCloseSeparately extends BadRequest {
  id: string = 'TOPIC_CLOSE_SEPARATELY';
  message: string = 'The `close` flag cannot be provided together with any of the other flags.';
}
export class TopicDeleted extends BadRequest {
  id: string = 'TOPIC_DELETED';
  message: string = 'The specified topic was deleted.';
}
export class TopicHideSeparately extends BadRequest {
  id: string = 'TOPIC_HIDE_SEPARATELY';
  message: string = 'The `hide` flag cannot be provided together with any of the other flags.';
}
export class TopicIdInvalid extends BadRequest {
  id: string = 'TOPIC_ID_INVALID';
  message: string = 'The specified topic ID is invalid.';
}
export class TopicNotModified extends BadRequest {
  id: string = 'TOPIC_NOT_MODIFIED';
  message: string =
    'The updated topic info is equal to the current topic info, nothing was changed.';
}
export class TopicTitleEmpty extends BadRequest {
  id: string = 'TOPIC_TITLE_EMPTY';
  message: string = 'The specified topic title is empty.';
}
export class ToLangInvalid extends BadRequest {
  id: string = 'TO_LANG_INVALID';
  message: string = 'The specified destination language is invalid.';
}
export class TranscriptionFailed extends BadRequest {
  id: string = 'TRANSCRIPTION_FAILED';
  message: string = 'Audio transcription failed.';
}
export class TtlDaysInvalid extends BadRequest {
  id: string = 'TTL_DAYS_INVALID';
  message: string = 'The provided TTL is invalid.';
}
export class TtlMediaInvalid extends BadRequest {
  id: string = 'TTL_MEDIA_INVALID';
  message: string = 'Invalid media Time To Live was provided.';
}
export class TtlPeriodInvalid extends BadRequest {
  id: string = 'TTL_PERIOD_INVALID';
  message: string = 'The specified TTL period is invalid.';
}
export class TypesEmpty extends BadRequest {
  id: string = 'TYPES_EMPTY';
  message: string = 'No top peer type was provided.';
}
export class TypeConstructorInvalid extends BadRequest {
  id: string = 'TYPE_CONSTRUCTOR_INVALID';
  message: string = 'The type constructor is invalid';
}
export class UntilDateInvalid extends BadRequest {
  id: string = 'UNTIL_DATE_INVALID';
  message: string = 'Invalid until date provided.';
}
export class UrlInvalid extends BadRequest {
  id: string = 'URL_INVALID';
  message: string = 'Invalid URL provided.';
}
export class UsageLimitInvalid extends BadRequest {
  id: string = 'USAGE_LIMIT_INVALID';
  message: string = 'The specified usage limit is invalid.';
}
export class UsernamesActiveTooMuch extends BadRequest {
  id: string = 'USERNAMES_ACTIVE_TOO_MUCH';
  message: string = 'The maximum number of active usernames was reached.';
}
export class UsernameInvalid extends BadRequest {
  id: string = 'USERNAME_INVALID';
  message: string = 'The provided username is not valid.';
}
export class UsernameNotModified extends BadRequest {
  id: string = 'USERNAME_NOT_MODIFIED';
  message: string = 'The username was not modified.';
}
export class UsernameNotOccupied extends BadRequest {
  id: string = 'USERNAME_NOT_OCCUPIED';
  message: string = 'The provided username is not occupied.';
}
export class UsernameOccupied extends BadRequest {
  id: string = 'USERNAME_OCCUPIED';
  message: string = 'The provided username is already occupied.';
}
export class UsernamePurchaseAvailable extends BadRequest {
  id: string = 'USERNAME_PURCHASE_AVAILABLE';
  message: string = 'The specified username can be purchased on https://fragment.com.';
}
export class UserpicUploadRequired extends BadRequest {
  id: string = 'USERPIC_UPLOAD_REQUIRED';
  message: string = 'You must have a profile picture to publish your geolocation.';
}
export class UsersTooFew extends BadRequest {
  id: string = 'USERS_TOO_FEW';
  message: string = 'Not enough users (to create a chat, for example).';
}
export class UsersTooMuch extends BadRequest {
  id: string = 'USERS_TOO_MUCH';
  message: string =
    'The maximum number of users has been exceeded (to create a chat, for example).';
}
export class UserAdminInvalid extends BadRequest {
  id: string = 'USER_ADMIN_INVALID';
  message: string = "You're not an admin.";
}
export class UserAlreadyInvited extends BadRequest {
  id: string = 'USER_ALREADY_INVITED';
  message: string = 'You have already invited this user.';
}
export class UserAlreadyParticipant extends BadRequest {
  id: string = 'USER_ALREADY_PARTICIPANT';
  message: string = 'The user is already in the group.';
}
export class UserBannedInChannel extends BadRequest {
  id: string = 'USER_BANNED_IN_CHANNEL';
  message: string = "You're banned from sending messages in supergroups/channels.";
}
export class UserBlocked extends BadRequest {
  id: string = 'USER_BLOCKED';
  message: string = 'User blocked.';
}
export class UserBot extends BadRequest {
  id: string = 'USER_BOT';
  message: string = 'Bots can only be admins in channels.';
}
export class UserBotInvalid extends BadRequest {
  id: string = 'USER_BOT_INVALID';
  message: string =
    'User accounts must provide the `bot` method parameter when calling this method. If there is no such method parameter, this method can only be invoked by bot accounts.';
}
export class UserBotRequired extends BadRequest {
  id: string = 'USER_BOT_REQUIRED';
  message: string = 'This method can only be called by a bot.';
}
export class UserChannelsTooMuch extends BadRequest {
  id: string = 'USER_CHANNELS_TOO_MUCH';
  message: string =
    'One of the users you tried to add is already in too many channels/supergroups.';
}
export class UserCreator extends BadRequest {
  id: string = 'USER_CREATOR';
  message: string = "You can't leave this channel, because you're its creator.";
}
export class UserIdInvalid extends BadRequest {
  id: string = 'USER_ID_INVALID';
  message: string = 'The provided user ID is invalid.';
}
export class UserInvalid extends BadRequest {
  id: string = 'USER_INVALID';
  message: string = 'Invalid user provided.';
}
export class UserIsBlocked extends BadRequest {
  id: string = 'USER_IS_BLOCKED';
  message: string = 'You were blocked by this user.';
}
export class UserIsBot extends BadRequest {
  id: string = 'USER_IS_BOT';
  message: string = "Bots can't send messages to other bots.";
}
export class UserKicked extends BadRequest {
  id: string = 'USER_KICKED';
  message: string = 'This user was kicked from this supergroup/channel.';
}
export class UserNotMutualContact extends BadRequest {
  id: string = 'USER_NOT_MUTUAL_CONTACT';
  message: string = 'The provided user is not a mutual contact.';
}
export class UserNotParticipant extends BadRequest {
  id: string = 'USER_NOT_PARTICIPANT';
  message: string = "You're not a member of this supergroup/channel.";
}
export class UserPublicMissing extends BadRequest {
  id: string = 'USER_PUBLIC_MISSING';
  message: string = 'Cannot generate a link to stories posted by a peer without a username.';
}
export class UserVolumeInvalid extends BadRequest {
  id: string = 'USER_VOLUME_INVALID';
  message: string = 'The specified user volume is invalid.';
}
export class VenueIdInvalid extends BadRequest {
  id: string = 'VENUE_ID_INVALID';
  message: string = 'The specified venue ID is invalid.';
}
export class VideoContentTypeInvalid extends BadRequest {
  id: string = 'VIDEO_CONTENT_TYPE_INVALID';
  message: string = "The video's content type is invalid.";
}
export class VideoFileInvalid extends BadRequest {
  id: string = 'VIDEO_FILE_INVALID';
  message: string = 'The specified video file is invalid.';
}
export class VideoTitleEmpty extends BadRequest {
  id: string = 'VIDEO_TITLE_EMPTY';
  message: string = 'The specified video title is empty.';
}
export class VoiceMessagesForbidden extends BadRequest {
  id: string = 'VOICE_MESSAGES_FORBIDDEN';
  message: string = "This user's privacy settings forbid you from sending voice messages.";
}
export class VolumeLocNotFound extends BadRequest {
  id: string = 'VOLUME_LOC_NOT_FOUND';
  message: string = "The volume location can't be found";
}
export class WallpaperFileInvalid extends BadRequest {
  id: string = 'WALLPAPER_FILE_INVALID';
  message: string = 'The specified wallpaper file is invalid.';
}
export class WallpaperInvalid extends BadRequest {
  id: string = 'WALLPAPER_INVALID';
  message: string = 'The specified wallpaper is invalid.';
}
export class WallpaperMimeInvalid extends BadRequest {
  id: string = 'WALLPAPER_MIME_INVALID';
  message: string = 'The specified wallpaper MIME type is invalid.';
}
export class WallpaperNotFound extends BadRequest {
  id: string = 'WALLPAPER_NOT_FOUND';
  message: string = 'The specified wallpaper could not be found.';
}
export class WcConvertUrlInvalid extends BadRequest {
  id: string = 'WC_CONVERT_URL_INVALID';
  message: string = 'WC convert URL invalid.';
}
export class WebdocumentInvalid extends BadRequest {
  id: string = 'WEBDOCUMENT_INVALID';
  message: string = 'Invalid webdocument URL provided.';
}
export class WebdocumentMimeInvalid extends BadRequest {
  id: string = 'WEBDOCUMENT_MIME_INVALID';
  message: string = 'Invalid webdocument mime type provided.';
}
export class WebdocumentSizeTooBig extends BadRequest {
  id: string = 'WEBDOCUMENT_SIZE_TOO_BIG';
  message: string = 'Webdocument is too big!';
}
export class WebdocumentUrlEmpty extends BadRequest {
  id: string = 'WEBDOCUMENT_URL_EMPTY';
  message: string = 'The web document URL is empty';
}
export class WebdocumentUrlInvalid extends BadRequest {
  id: string = 'WEBDOCUMENT_URL_INVALID';
  message: string = 'The specified webdocument URL is invalid.';
}
export class WebpageCurlFailed extends BadRequest {
  id: string = 'WEBPAGE_CURL_FAILED';
  message: string = 'Failure while fetching the webpage with cURL.';
}
export class WebpageMediaEmpty extends BadRequest {
  id: string = 'WEBPAGE_MEDIA_EMPTY';
  message: string = 'Webpage media empty.';
}
export class WebpageNotFound extends BadRequest {
  id: string = 'WEBPAGE_NOT_FOUND';
  message: string = 'A preview for the specified webpage `url` could not be generated.';
}
export class WebpageUrlInvalid extends BadRequest {
  id: string = 'WEBPAGE_URL_INVALID';
  message: string = 'The specified webpage `url` is invalid.';
}
export class WebpushAuthInvalid extends BadRequest {
  id: string = 'WEBPUSH_AUTH_INVALID';
  message: string = 'The specified web push authentication secret is invalid.';
}
export class WebpushKeyInvalid extends BadRequest {
  id: string = 'WEBPUSH_KEY_INVALID';
  message: string = 'The specified web push elliptic curve Diffie-Hellman public key is invalid.';
}
export class WebpushTokenInvalid extends BadRequest {
  id: string = 'WEBPUSH_TOKEN_INVALID';
  message: string = 'The specified web push token is invalid.';
}
export class YouBlockedUser extends BadRequest {
  id: string = 'YOU_BLOCKED_USER';
  message: string = 'You blocked this user.';
}
