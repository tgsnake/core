/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
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
  message: string = 'The provided about/bio text is too long';
}
export class AccessTokenExpired extends BadRequest {
  id: string = 'ACCESS_TOKEN_EXPIRED';
  message: string = 'The bot token has expired';
}
export class AccessTokenInvalid extends BadRequest {
  id: string = 'ACCESS_TOKEN_INVALID';
  message: string = 'The bot access token is invalid';
}
export class AdminsTooMuch extends BadRequest {
  id: string = 'ADMINS_TOO_MUCH';
  message: string = 'The chat has too many administrators';
}
export class AdminRankEmojiNotAllowed extends BadRequest {
  id: string = 'ADMIN_RANK_EMOJI_NOT_ALLOWED';
  message: string = 'Emoji are not allowed in custom administrator titles';
}
export class AdminRankInvalid extends BadRequest {
  id: string = 'ADMIN_RANK_INVALID';
  message: string = 'The custom administrator title is invalid or too long';
}
export class AlbumPhotosTooMany extends BadRequest {
  id: string = 'ALBUM_PHOTOS_TOO_MANY';
  message: string = 'Too many photos were included in the album';
}
export class ApiIdInvalid extends BadRequest {
  id: string = 'API_ID_INVALID';
  message: string = 'The api_id/api_hash combination is invalid';
}
export class ApiIdPublishedFlood extends BadRequest {
  id: string = 'API_ID_PUBLISHED_FLOOD';
  message: string =
    'You are using an API key that is limited on the server side because it was published somewhere';
}
export class ArticleTitleEmpty extends BadRequest {
  id: string = 'ARTICLE_TITLE_EMPTY';
  message: string = 'The article title is empty';
}
export class AudioTitleEmpty extends BadRequest {
  id: string = 'AUDIO_TITLE_EMPTY';
  message: string = 'The title attribute of the audio is empty';
}
export class AuthBytesInvalid extends BadRequest {
  id: string = 'AUTH_BYTES_INVALID';
  message: string = 'The authorization bytes are invalid';
}
export class AuthTokenAlreadyAccepted extends BadRequest {
  id: string = 'AUTH_TOKEN_ALREADY_ACCEPTED';
  message: string = 'The authorization token was already used';
}
export class AuthTokenExpired extends BadRequest {
  id: string = 'AUTH_TOKEN_EXPIRED';
  message: string =
    'The provided authorization token has expired and the updated QR-code must be re-scanned';
}
export class AuthTokenInvalid extends BadRequest {
  id: string = 'AUTH_TOKEN_INVALID';
  message: string = 'An invalid authorization token was provided';
}
export class AutoarchiveNotAvailable extends BadRequest {
  id: string = 'AUTOARCHIVE_NOT_AVAILABLE';
  message: string =
    'This feature is not yet enabled for your account due to it not receiving too many private messages from strangers';
}
export class BankCardNumberInvalid extends BadRequest {
  id: string = 'BANK_CARD_NUMBER_INVALID';
  message: string = 'The credit card number is invalid';
}
export class BannedRightsInvalid extends BadRequest {
  id: string = 'BANNED_RIGHTS_INVALID';
  message: string = 'You provided a set of restrictions that is invalid';
}
export class BasePortLocInvalid extends BadRequest {
  id: string = 'BASE_PORT_LOC_INVALID';
  message: string = 'The base port location is invalid';
}
export class BotsTooMuch extends BadRequest {
  id: string = 'BOTS_TOO_MUCH';
  message: string = 'The chat has too many bots';
}
export class BotChannelsNa extends BadRequest {
  id: string = 'BOT_CHANNELS_NA';
  message: string = "Bots can't edit admin privileges";
}
export class BotCommandDescriptionInvalid extends BadRequest {
  id: string = 'BOT_COMMAND_DESCRIPTION_INVALID';
  message: string = 'The command description was empty, too long or had invalid characters';
}
export class BotDomainInvalid extends BadRequest {
  id: string = 'BOT_DOMAIN_INVALID';
  message: string =
    'The domain used for the auth button does not match the one configured in @BotFather';
}
export class BotGamesDisabled extends BadRequest {
  id: string = 'BOT_GAMES_DISABLED';
  message: string = 'Bot games cannot be used in this type of chat';
}
export class BotGroupsBlocked extends BadRequest {
  id: string = 'BOT_GROUPS_BLOCKED';
  message: string = "This bot can't be added to groups";
}
export class BotInlineDisabled extends BadRequest {
  id: string = 'BOT_INLINE_DISABLED';
  message: string = 'The inline feature of the bot is disabled';
}
export class BotInvalid extends BadRequest {
  id: string = 'BOT_INVALID';
  message: string = 'This is not a valid bot';
}
export class BotMethodInvalid extends BadRequest {
  id: string = 'BOT_METHOD_INVALID';
  message: string = "The method can't be used by bots";
}
export class BotMissing extends BadRequest {
  id: string = 'BOT_MISSING';
  message: string = 'This method can only be run by a bot';
}
export class BotPaymentsDisabled extends BadRequest {
  id: string = 'BOT_PAYMENTS_DISABLED';
  message: string = 'This method can only be run by a bot';
}
export class BotPollsDisabled extends BadRequest {
  id: string = 'BOT_POLLS_DISABLED';
  message: string = 'Sending polls by bots has been disabled';
}
export class BotResponseTimeout extends BadRequest {
  id: string = 'BOT_RESPONSE_TIMEOUT';
  message: string = 'The bot did not answer to the callback query in time';
}
export class BotScoreNotModified extends BadRequest {
  id: string = 'BOT_SCORE_NOT_MODIFIED';
  message: string = 'The bot score was not modified';
}
export class BroadcastIdInvalid extends BadRequest {
  id: string = 'BROADCAST_ID_INVALID';
  message: string = 'The channel is invalid';
}
export class BroadcastPublicVotersForbidden extends BadRequest {
  id: string = 'BROADCAST_PUBLIC_VOTERS_FORBIDDEN';
  message: string = 'Polls with public voters cannot be sent in channels';
}
export class BroadcastRequired extends BadRequest {
  id: string = 'BROADCAST_REQUIRED';
  message: string = 'The request can only be used with a channel';
}
export class ButtonDataInvalid extends BadRequest {
  id: string = 'BUTTON_DATA_INVALID';
  message: string = 'The button callback data is invalid or too large';
}
export class ButtonTypeInvalid extends BadRequest {
  id: string = 'BUTTON_TYPE_INVALID';
  message: string = 'The type of one of the buttons you provided is invalid';
}
export class ButtonUrlInvalid extends BadRequest {
  id: string = 'BUTTON_URL_INVALID';
  message: string = 'The button url is invalid';
}
export class CallAlreadyAccepted extends BadRequest {
  id: string = 'CALL_ALREADY_ACCEPTED';
  message: string = 'The call is already accepted';
}
export class CallAlreadyDeclined extends BadRequest {
  id: string = 'CALL_ALREADY_DECLINED';
  message: string = 'The call is already declined';
}
export class CallPeerInvalid extends BadRequest {
  id: string = 'CALL_PEER_INVALID';
  message: string = 'The provided call peer object is invalid';
}
export class CallProtocolFlagsInvalid extends BadRequest {
  id: string = 'CALL_PROTOCOL_FLAGS_INVALID';
  message: string = 'Call protocol flags invalid';
}
export class CdnMethodInvalid extends BadRequest {
  id: string = 'CDN_METHOD_INVALID';
  message: string = "The method can't be used on CDN DCs";
}
export class ChannelsAdminPublicTooMuch extends BadRequest {
  id: string = 'CHANNELS_ADMIN_PUBLIC_TOO_MUCH';
  message: string = 'You are an administrator of too many public channels';
}
export class ChannelsTooMuch extends BadRequest {
  id: string = 'CHANNELS_TOO_MUCH';
  message: string = 'You have joined too many channels or supergroups, leave some and try again';
}
export class ChannelAddInvalid extends BadRequest {
  id: string = 'CHANNEL_ADD_INVALID';
  message: string = 'Internal error.';
}
export class ChannelBanned extends BadRequest {
  id: string = 'CHANNEL_BANNED';
  message: string = 'The channel is banned';
}
export class ChannelInvalid extends BadRequest {
  id: string = 'CHANNEL_INVALID';
  message: string = 'The channel parameter is invalid';
}
export class ChannelPrivate extends BadRequest {
  id: string = 'CHANNEL_PRIVATE';
  message: string = 'The channel/supergroup is not accessible';
}
export class ChannelTooLarge extends BadRequest {
  id: string = 'CHANNEL_TOO_LARGE';
  message: string = 'The channel is too large';
}
export class ChatAboutNotModified extends BadRequest {
  id: string = 'CHAT_ABOUT_NOT_MODIFIED';
  message: string =
    'The chat about text was not modified because you tried to edit it using the same content';
}
export class ChatAboutTooLong extends BadRequest {
  id: string = 'CHAT_ABOUT_TOO_LONG';
  message: string = 'The chat about text is too long';
}
export class ChatAdminRequired extends BadRequest {
  id: string = 'CHAT_ADMIN_REQUIRED';
  message: string = 'The method requires chat admin privileges';
}
export class ChatForwardsRestricted extends BadRequest {
  id: string = 'CHAT_FORWARDS_RESTRICTED';
  message: string = 'The chat restricts forwarding content';
}
export class ChatIdEmpty extends BadRequest {
  id: string = 'CHAT_ID_EMPTY';
  message: string = 'The provided chat id is empty';
}
export class ChatIdInvalid extends BadRequest {
  id: string = 'CHAT_ID_INVALID';
  message: string =
    'The chat id being used is invalid or not known yet. Make sure you see the chat before interacting with it';
}
export class ChatInvalid extends BadRequest {
  id: string = 'CHAT_INVALID';
  message: string = 'The chat is invalid';
}
export class ChatInvitePermanent extends BadRequest {
  id: string = 'CHAT_INVITE_PERMANENT';
  message: string = 'The chat invite link is primary';
}
export class ChatLinkExists extends BadRequest {
  id: string = 'CHAT_LINK_EXISTS';
  message: string = 'The action failed because the supergroup is linked to a channel';
}
export class ChatNotModified extends BadRequest {
  id: string = 'CHAT_NOT_MODIFIED';
  message: string =
    'The chat settings (title, permissions, photo, etc..) were not modified because you tried to edit them using the same content';
}
export class ChatRestricted extends BadRequest {
  id: string = 'CHAT_RESTRICTED';
  message: string = 'The chat is restricted and cannot be used';
}
export class ChatSendInlineForbidden extends BadRequest {
  id: string = 'CHAT_SEND_INLINE_FORBIDDEN';
  message: string = 'You cannot use inline bots to send messages in this chat';
}
export class ChatTitleEmpty extends BadRequest {
  id: string = 'CHAT_TITLE_EMPTY';
  message: string = 'The chat title is empty';
}
export class ChatTooBig extends BadRequest {
  id: string = 'CHAT_TOO_BIG';
  message: string = 'The chat is too big for this action';
}
export class CodeEmpty extends BadRequest {
  id: string = 'CODE_EMPTY';
  message: string = 'The provided code is empty';
}
export class CodeHashInvalid extends BadRequest {
  id: string = 'CODE_HASH_INVALID';
  message: string = 'The provided code hash invalid';
}
export class CodeInvalid extends BadRequest {
  id: string = 'CODE_INVALID';
  message: string = 'The provided code is invalid (i.e. from email)';
}
export class ConnectionApiIdInvalid extends BadRequest {
  id: string = 'CONNECTION_API_ID_INVALID';
  message: string = 'The provided API id is invalid';
}
export class ConnectionAppVersionEmpty extends BadRequest {
  id: string = 'CONNECTION_APP_VERSION_EMPTY';
  message: string = 'App version is empty';
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
  message: string = 'The connection layer is invalid. Missing InvokeWithLayer-InitConnection call';
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
  message: string = 'Contact to add is missing';
}
export class ContactIdInvalid extends BadRequest {
  id: string = 'CONTACT_ID_INVALID';
  message: string = 'The provided contact id is invalid';
}
export class ContactNameEmpty extends BadRequest {
  id: string = 'CONTACT_NAME_EMPTY';
  message: string = 'The provided contact name is empty';
}
export class ContactReqMissing extends BadRequest {
  id: string = 'CONTACT_REQ_MISSING';
  message: string = 'Missing contact request';
}
export class DataInvalid extends BadRequest {
  id: string = 'DATA_INVALID';
  message: string = 'The encrypted data is invalid';
}
export class DataJsonInvalid extends BadRequest {
  id: string = 'DATA_JSON_INVALID';
  message: string = 'The provided JSON data is invalid';
}
export class DataTooLong extends BadRequest {
  id: string = 'DATA_TOO_LONG';
  message: string = 'Data too long';
}
export class DateEmpty extends BadRequest {
  id: string = 'DATE_EMPTY';
  message: string = 'The date argument is empty';
}
export class DcIdInvalid extends BadRequest {
  id: string = 'DC_ID_INVALID';
  message: string = 'The dc_id parameter is invalid';
}
export class DhGAInvalid extends BadRequest {
  id: string = 'DH_G_A_INVALID';
  message: string = 'The g_a parameter invalid';
}
export class DocumentInvalid extends BadRequest {
  id: string = 'DOCUMENT_INVALID';
  message: string = 'The document is invalid';
}
export class EmailHashExpired extends BadRequest {
  id: string = 'EMAIL_HASH_EXPIRED';
  message: string = 'The email hash expired and cannot be used to verify it';
}
export class EmailInvalid extends BadRequest {
  id: string = 'EMAIL_INVALID';
  message: string = 'The email provided is invalid';
}
export class EmailUnconfirmed extends BadRequest {
  id: string = 'EMAIL_UNCONFIRMED';
  message: string = 'Email unconfirmed';
}
export class EmailUnconfirmedX extends BadRequest {
  id: string = 'EMAIL_UNCONFIRMED_X';
  message: string =
    "The provided email isn't confirmed, {value} is the length of the verification code that was just sent to the email";
}
export class EmailVerifyExpired extends BadRequest {
  id: string = 'EMAIL_VERIFY_EXPIRED';
  message: string = 'The verification email has expired';
}
export class EmoticonEmpty extends BadRequest {
  id: string = 'EMOTICON_EMPTY';
  message: string = 'The emoticon parameter is empty';
}
export class EmoticonInvalid extends BadRequest {
  id: string = 'EMOTICON_INVALID';
  message: string = 'The emoticon parameter is invalid';
}
export class EmoticonStickerpackMissing extends BadRequest {
  id: string = 'EMOTICON_STICKERPACK_MISSING';
  message: string = 'The emoticon sticker pack you are trying to obtain is missing';
}
export class EncryptedMessageInvalid extends BadRequest {
  id: string = 'ENCRYPTED_MESSAGE_INVALID';
  message: string = 'The special binding message (bind_auth_key_inner) contains invalid data';
}
export class EncryptionAlreadyAccepted extends BadRequest {
  id: string = 'ENCRYPTION_ALREADY_ACCEPTED';
  message: string = 'The secret chat is already accepted';
}
export class EncryptionAlreadyDeclined extends BadRequest {
  id: string = 'ENCRYPTION_ALREADY_DECLINED';
  message: string = 'The secret chat is already declined';
}
export class EncryptionDeclined extends BadRequest {
  id: string = 'ENCRYPTION_DECLINED';
  message: string = 'The secret chat was declined';
}
export class EncryptionIdInvalid extends BadRequest {
  id: string = 'ENCRYPTION_ID_INVALID';
  message: string = 'The provided secret chat id is invalid';
}
export class EntitiesTooLong extends BadRequest {
  id: string = 'ENTITIES_TOO_LONG';
  message: string =
    'The entity provided contains data that is too long, or you passed too many entities to this message';
}
export class EntityMentionUserInvalid extends BadRequest {
  id: string = 'ENTITY_MENTION_USER_INVALID';
  message: string = 'The mentioned entity is not an user';
}
export class ErrorTextEmpty extends BadRequest {
  id: string = 'ERROR_TEXT_EMPTY';
  message: string = 'The provided error message is empty';
}
export class ExpireDateInvalid extends BadRequest {
  id: string = 'EXPIRE_DATE_INVALID';
  message: string = 'The expiration date is invalid';
}
export class ExportCardInvalid extends BadRequest {
  id: string = 'EXPORT_CARD_INVALID';
  message: string = 'The provided card is invalid';
}
export class ExternalUrlInvalid extends BadRequest {
  id: string = 'EXTERNAL_URL_INVALID';
  message: string = 'The external media URL is invalid';
}
export class FieldNameEmpty extends BadRequest {
  id: string = 'FIELD_NAME_EMPTY';
  message: string = 'The field with the name FIELD_NAME is missing';
}
export class FieldNameInvalid extends BadRequest {
  id: string = 'FIELD_NAME_INVALID';
  message: string = 'The field with the name FIELD_NAME is invalid';
}
export class FileIdInvalid extends BadRequest {
  id: string = 'FILE_ID_INVALID';
  message: string = 'The file id is invalid';
}
export class FileMigrate extends BadRequest {
  id: string = 'FILE_MIGRATE_X';
  message: string = 'The file is in Data Center No. {value}';
}
export class FilePartsInvalid extends BadRequest {
  id: string = 'FILE_PARTS_INVALID';
  message: string = 'Invalid number of parts.';
}
export class FilePartEmpty extends BadRequest {
  id: string = 'FILE_PART_EMPTY';
  message: string = 'The file part sent is empty';
}
export class FilePartInvalid extends BadRequest {
  id: string = 'FILE_PART_INVALID';
  message: string = 'The file part number is invalid.';
}
export class FilePartLengthInvalid extends BadRequest {
  id: string = 'FILE_PART_LENGTH_INVALID';
  message: string = 'The length of a file part is invalid';
}
export class FilePartSizeChanged extends BadRequest {
  id: string = 'FILE_PART_SIZE_CHANGED';
  message: string =
    'The part size is different from the size of one of the previous parts in the same file';
}
export class FilePartSizeInvalid extends BadRequest {
  id: string = 'FILE_PART_SIZE_INVALID';
  message: string = 'The file part size is invalid';
}
export class FilePartTooBig extends BadRequest {
  id: string = 'FILE_PART_TOO_BIG';
  message: string = 'The size limit for the content of the file part has been exceeded';
}
export class FilePartMissing extends BadRequest {
  id: string = 'FILE_PART_X_MISSING';
  message: string = 'Part {value} of the file is missing from storage';
}
export class FileReferenceEmpty extends BadRequest {
  id: string = 'FILE_REFERENCE_EMPTY';
  message: string =
    'The file id contains an empty file reference, you must obtain a valid one by fetching the message from the origin context';
}
export class FileReferenceExpired extends BadRequest {
  id: string = 'FILE_REFERENCE_EXPIRED';
  message: string =
    'The file id contains an expired file reference, you must obtain a valid one by fetching the message from the origin context';
}
export class FileReferenceInvalid extends BadRequest {
  id: string = 'FILE_REFERENCE_INVALID';
  message: string =
    'The file id contains an invalid file reference, you must obtain a valid one by fetching the message from the origin context';
}
export class FilterIdInvalid extends BadRequest {
  id: string = 'FILTER_ID_INVALID';
  message: string = 'The specified filter ID is invalid';
}
export class FirstnameInvalid extends BadRequest {
  id: string = 'FIRSTNAME_INVALID';
  message: string = 'The first name is invalid';
}
export class FolderIdEmpty extends BadRequest {
  id: string = 'FOLDER_ID_EMPTY';
  message: string = 'The folder you tried to delete was already empty';
}
export class FolderIdInvalid extends BadRequest {
  id: string = 'FOLDER_ID_INVALID';
  message: string = 'The folder id is invalid';
}
export class FreshChangeAdminsForbidden extends BadRequest {
  id: string = 'FRESH_CHANGE_ADMINS_FORBIDDEN';
  message: string =
    "You can't change administrator settings in this chat because your session was logged-in recently";
}
export class FromMessageBotDisabled extends BadRequest {
  id: string = 'FROM_MESSAGE_BOT_DISABLED';
  message: string = "Bots can't use fromMessage min constructors";
}
export class FromPeerInvalid extends BadRequest {
  id: string = 'FROM_PEER_INVALID';
  message: string = 'The from peer value is invalid';
}
export class GameBotInvalid extends BadRequest {
  id: string = 'GAME_BOT_INVALID';
  message: string = 'You cannot send that game with the current bot';
}
export class GeoPointInvalid extends BadRequest {
  id: string = 'GEO_POINT_INVALID';
  message: string = 'Invalid geo point provided';
}
export class GifContentTypeInvalid extends BadRequest {
  id: string = 'GIF_CONTENT_TYPE_INVALID';
  message: string = 'GIF content-type invalid';
}
export class GifIdInvalid extends BadRequest {
  id: string = 'GIF_ID_INVALID';
  message: string = 'The provided gif/animation id is invalid';
}
export class GraphInvalidReload extends BadRequest {
  id: string = 'GRAPH_INVALID_RELOAD';
  message: string =
    'Invalid graph token provided, please reload the stats and provide the updated token';
}
export class GraphOutdatedReload extends BadRequest {
  id: string = 'GRAPH_OUTDATED_RELOAD';
  message: string = 'The graph data is outdated';
}
export class GroupcallSsrcDuplicateMuch extends BadRequest {
  id: string = 'GROUPCALL_SSRC_DUPLICATE_MUCH';
  message: string = 'Too many group call synchronization source duplicates';
}
export class GroupedMediaInvalid extends BadRequest {
  id: string = 'GROUPED_MEDIA_INVALID';
  message: string = 'The album contains invalid media';
}
export class GroupCallInvalid extends BadRequest {
  id: string = 'GROUP_CALL_INVALID';
  message: string = 'The group call is invalid';
}
export class HashInvalid extends BadRequest {
  id: string = 'HASH_INVALID';
  message: string = 'The provided hash is invalid';
}
export class ImageProcessFailed extends BadRequest {
  id: string = 'IMAGE_PROCESS_FAILED';
  message: string = 'The server failed to process your image';
}
export class ImportFileInvalid extends BadRequest {
  id: string = 'IMPORT_FILE_INVALID';
  message: string = 'The imported file is invalid';
}
export class ImportFormatUnrecognized extends BadRequest {
  id: string = 'IMPORT_FORMAT_UNRECOGNIZED';
  message: string = 'The imported format is unrecognized';
}
export class ImportIdInvalid extends BadRequest {
  id: string = 'IMPORT_ID_INVALID';
  message: string = 'The import id is invalid';
}
export class InlineResultExpired extends BadRequest {
  id: string = 'INLINE_RESULT_EXPIRED';
  message: string = 'The inline bot query expired';
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
  message: string = 'The filter is invalid for this query';
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
export class InputUserDeactivated extends BadRequest {
  id: string = 'INPUT_USER_DEACTIVATED';
  message: string = 'The target user has been deleted/deactivated';
}
export class InviteHashEmpty extends BadRequest {
  id: string = 'INVITE_HASH_EMPTY';
  message: string = 'The invite hash is empty';
}
export class InviteHashExpired extends BadRequest {
  id: string = 'INVITE_HASH_EXPIRED';
  message: string = 'The chat invite link is no longer valid';
}
export class InviteHashInvalid extends BadRequest {
  id: string = 'INVITE_HASH_INVALID';
  message: string = 'The invite link hash is invalid';
}
export class InviteRevokedMissing extends BadRequest {
  id: string = 'INVITE_REVOKED_MISSING';
  message: string = 'The action required a chat invite link to be revoked first';
}
export class LangPackInvalid extends BadRequest {
  id: string = 'LANG_PACK_INVALID';
  message: string = 'The provided language pack is invalid';
}
export class LastnameInvalid extends BadRequest {
  id: string = 'LASTNAME_INVALID';
  message: string = 'The last name is invalid';
}
export class LimitInvalid extends BadRequest {
  id: string = 'LIMIT_INVALID';
  message: string = 'The limit parameter is invalid';
}
export class LinkNotModified extends BadRequest {
  id: string = 'LINK_NOT_MODIFIED';
  message: string = 'The chat link was not modified because you tried to link to the same target';
}
export class LocationInvalid extends BadRequest {
  id: string = 'LOCATION_INVALID';
  message: string = 'The file location is invalid';
}
export class MaxIdInvalid extends BadRequest {
  id: string = 'MAX_ID_INVALID';
  message: string = 'The max_id parameter is invalid';
}
export class MaxQtsInvalid extends BadRequest {
  id: string = 'MAX_QTS_INVALID';
  message: string = 'The provided QTS is invalid';
}
export class Md5ChecksumInvalid extends BadRequest {
  id: string = 'MD5_CHECKSUM_INVALID';
  message: string = "The file's checksum did not match the md5_checksum parameter";
}
export class MediaCaptionTooLong extends BadRequest {
  id: string = 'MEDIA_CAPTION_TOO_LONG';
  message: string = 'The media caption is too long';
}
export class MediaEmpty extends BadRequest {
  id: string = 'MEDIA_EMPTY';
  message: string = 'The media you tried to send is invalid';
}
export class MediaInvalid extends BadRequest {
  id: string = 'MEDIA_INVALID';
  message: string = 'The media is invalid';
}
export class MediaNewInvalid extends BadRequest {
  id: string = 'MEDIA_NEW_INVALID';
  message: string = 'The new media to edit the message with is invalid';
}
export class MediaPrevInvalid extends BadRequest {
  id: string = 'MEDIA_PREV_INVALID';
  message: string = 'The previous media cannot be edited with anything else';
}
export class MegagroupIdInvalid extends BadRequest {
  id: string = 'MEGAGROUP_ID_INVALID';
  message: string = 'The supergroup is invalid';
}
export class MegagroupPrehistoryHidden extends BadRequest {
  id: string = 'MEGAGROUP_PREHISTORY_HIDDEN';
  message: string = 'The action failed because the supergroup has the pre-history hidden';
}
export class MegagroupRequired extends BadRequest {
  id: string = 'MEGAGROUP_REQUIRED';
  message: string = 'The request can only be used with a supergroup';
}
export class MessageEditTimeExpired extends BadRequest {
  id: string = 'MESSAGE_EDIT_TIME_EXPIRED';
  message: string = 'You can no longer edit this message because too much time has passed';
}
export class MessageEmpty extends BadRequest {
  id: string = 'MESSAGE_EMPTY';
  message: string = 'The message sent is empty or contains invalid characters';
}
export class MessageIdsEmpty extends BadRequest {
  id: string = 'MESSAGE_IDS_EMPTY';
  message: string = "The requested message doesn't exist or you provided no message id";
}
export class MessageIdInvalid extends BadRequest {
  id: string = 'MESSAGE_ID_INVALID';
  message: string = 'The message id is invalid';
}
export class MessageNotModified extends BadRequest {
  id: string = 'MESSAGE_NOT_MODIFIED';
  message: string =
    'The message was not modified because you tried to edit it using the same content';
}
export class MessagePollClosed extends BadRequest {
  id: string = 'MESSAGE_POLL_CLOSED';
  message: string = "You can't interact with a closed poll";
}
export class MessageTooLong extends BadRequest {
  id: string = 'MESSAGE_TOO_LONG';
  message: string = 'The message text is too long';
}
export class MethodInvalid extends BadRequest {
  id: string = 'METHOD_INVALID';
  message: string = 'The API method is invalid and cannot be used';
}
export class MsgIdInvalid extends BadRequest {
  id: string = 'MSG_ID_INVALID';
  message: string = 'The message ID used in the peer was invalid';
}
export class MsgWaitFailed extends BadRequest {
  id: string = 'MSG_WAIT_FAILED';
  message: string = 'A waiting call returned an error';
}
export class MultiMediaTooLong extends BadRequest {
  id: string = 'MULTI_MEDIA_TOO_LONG';
  message: string = 'The album/media group contains too many items';
}
export class NewSaltInvalid extends BadRequest {
  id: string = 'NEW_SALT_INVALID';
  message: string = 'The new salt is invalid';
}
export class NewSettingsInvalid extends BadRequest {
  id: string = 'NEW_SETTINGS_INVALID';
  message: string = 'The new settings are invalid';
}
export class NextOffsetInvalid extends BadRequest {
  id: string = 'NEXT_OFFSET_INVALID';
  message: string = 'The next offset value is invalid';
}
export class OffsetInvalid extends BadRequest {
  id: string = 'OFFSET_INVALID';
  message: string = 'The offset parameter is invalid';
}
export class OffsetPeerIdInvalid extends BadRequest {
  id: string = 'OFFSET_PEER_ID_INVALID';
  message: string = 'The provided offset peer is invalid';
}
export class OptionsTooMuch extends BadRequest {
  id: string = 'OPTIONS_TOO_MUCH';
  message: string = 'The poll options are too many';
}
export class OptionInvalid extends BadRequest {
  id: string = 'OPTION_INVALID';
  message: string = 'The option specified is invalid and does not exist in the target poll';
}
export class PackShortNameInvalid extends BadRequest {
  id: string = 'PACK_SHORT_NAME_INVALID';
  message: string =
    "Invalid sticker pack name. It must begin with a letter, can't contain consecutive underscores and must end in '_by_<bot username>'.";
}
export class PackShortNameOccupied extends BadRequest {
  id: string = 'PACK_SHORT_NAME_OCCUPIED';
  message: string = 'A sticker pack with this name already exists';
}
export class PackTitleInvalid extends BadRequest {
  id: string = 'PACK_TITLE_INVALID';
  message: string = 'The sticker pack title is invalid';
}
export class ParticipantsTooFew extends BadRequest {
  id: string = 'PARTICIPANTS_TOO_FEW';
  message: string = "The chat doesn't have enough participants";
}
export class ParticipantVersionOutdated extends BadRequest {
  id: string = 'PARTICIPANT_VERSION_OUTDATED';
  message: string = 'The other participant is using an outdated Telegram app version';
}
export class PasswordEmpty extends BadRequest {
  id: string = 'PASSWORD_EMPTY';
  message: string = 'The password provided is empty';
}
export class PasswordHashInvalid extends BadRequest {
  id: string = 'PASSWORD_HASH_INVALID';
  message: string = 'The two-step verification password is invalid';
}
export class PasswordMissing extends BadRequest {
  id: string = 'PASSWORD_MISSING';
  message: string = 'The account is missing the two-step verification password';
}
export class PasswordRecoveryNa extends BadRequest {
  id: string = 'PASSWORD_RECOVERY_NA';
  message: string = 'The password recovery e-mail is not available';
}
export class PasswordRequired extends BadRequest {
  id: string = 'PASSWORD_REQUIRED';
  message: string = 'The two-step verification password is required for this method';
}
export class PasswordTooFresh extends BadRequest {
  id: string = 'PASSWORD_TOO_FRESH_X';
  message: string =
    'The two-step verification password was added recently and you are required to wait {value} seconds';
}
export class PaymentProviderInvalid extends BadRequest {
  id: string = 'PAYMENT_PROVIDER_INVALID';
  message: string = 'The payment provider was not recognised or its token was invalid';
}
export class PeerFlood extends BadRequest {
  id: string = 'PEER_FLOOD';
  message: string = "The method can't be used because your account is currently limited";
}
export class PeerIdInvalid extends BadRequest {
  id: string = 'PEER_ID_INVALID';
  message: string =
    'The peer id being used is invalid or not known yet. Make sure you meet the peer before interacting with it';
}
export class PeerIdNotSupported extends BadRequest {
  id: string = 'PEER_ID_NOT_SUPPORTED';
  message: string = 'The provided peer id is not supported';
}
export class PersistentTimestampEmpty extends BadRequest {
  id: string = 'PERSISTENT_TIMESTAMP_EMPTY';
  message: string = 'The pts argument is empty';
}
export class PersistentTimestampInvalid extends BadRequest {
  id: string = 'PERSISTENT_TIMESTAMP_INVALID';
  message: string = 'The persistent timestamp is invalid';
}
export class PhoneCodeEmpty extends BadRequest {
  id: string = 'PHONE_CODE_EMPTY';
  message: string = 'The phone code is missing';
}
export class PhoneCodeExpired extends BadRequest {
  id: string = 'PHONE_CODE_EXPIRED';
  message: string = 'The confirmation code has expired';
}
export class PhoneCodeHashEmpty extends BadRequest {
  id: string = 'PHONE_CODE_HASH_EMPTY';
  message: string = 'The phone code hash is missing';
}
export class PhoneCodeInvalid extends BadRequest {
  id: string = 'PHONE_CODE_INVALID';
  message: string = 'The confirmation code is invalid';
}
export class PhoneNumberAppSignupForbidden extends BadRequest {
  id: string = 'PHONE_NUMBER_APP_SIGNUP_FORBIDDEN';
  message: string = "You can't sign up using this app";
}
export class PhoneNumberBanned extends BadRequest {
  id: string = 'PHONE_NUMBER_BANNED';
  message: string = 'The phone number is banned from Telegram and cannot be used';
}
export class PhoneNumberFlood extends BadRequest {
  id: string = 'PHONE_NUMBER_FLOOD';
  message: string = 'This number has tried to login too many times';
}
export class PhoneNumberInvalid extends BadRequest {
  id: string = 'PHONE_NUMBER_INVALID';
  message: string = 'The phone number is invalid';
}
export class PhoneNumberOccupied extends BadRequest {
  id: string = 'PHONE_NUMBER_OCCUPIED';
  message: string = 'The phone number is already in use';
}
export class PhoneNumberUnoccupied extends BadRequest {
  id: string = 'PHONE_NUMBER_UNOCCUPIED';
  message: string = 'The phone number is not yet being used';
}
export class PhonePasswordProtected extends BadRequest {
  id: string = 'PHONE_PASSWORD_PROTECTED';
  message: string = 'The phone is password protected';
}
export class PhotoContentTypeInvalid extends BadRequest {
  id: string = 'PHOTO_CONTENT_TYPE_INVALID';
  message: string = 'The photo content type is invalid';
}
export class PhotoContentUrlEmpty extends BadRequest {
  id: string = 'PHOTO_CONTENT_URL_EMPTY';
  message: string = 'The photo content URL is empty';
}
export class PhotoCropFileMissing extends BadRequest {
  id: string = 'PHOTO_CROP_FILE_MISSING';
  message: string = 'Photo crop file missing';
}
export class PhotoCropSizeSmall extends BadRequest {
  id: string = 'PHOTO_CROP_SIZE_SMALL';
  message: string = 'The photo is too small';
}
export class PhotoExtInvalid extends BadRequest {
  id: string = 'PHOTO_EXT_INVALID';
  message: string = 'The photo extension is invalid';
}
export class PhotoFileMissing extends BadRequest {
  id: string = 'PHOTO_FILE_MISSING';
  message: string = 'Profile photo file missing';
}
export class PhotoIdInvalid extends BadRequest {
  id: string = 'PHOTO_ID_INVALID';
  message: string = 'The photo id is invalid';
}
export class PhotoInvalid extends BadRequest {
  id: string = 'PHOTO_INVALID';
  message: string = 'The photo is invalid';
}
export class PhotoInvalidDimensions extends BadRequest {
  id: string = 'PHOTO_INVALID_DIMENSIONS';
  message: string = 'The photo dimensions are invalid';
}
export class PhotoSaveFileInvalid extends BadRequest {
  id: string = 'PHOTO_SAVE_FILE_INVALID';
  message: string = 'The photo you tried to send cannot be saved by Telegram';
}
export class PhotoThumbUrlEmpty extends BadRequest {
  id: string = 'PHOTO_THUMB_URL_EMPTY';
  message: string = 'The photo thumb URL is empty';
}
export class PhotoThumbUrlInvalid extends BadRequest {
  id: string = 'PHOTO_THUMB_URL_INVALID';
  message: string = 'The photo thumb URL is invalid';
}
export class PinnedDialogsTooMuch extends BadRequest {
  id: string = 'PINNED_DIALOGS_TOO_MUCH';
  message: string = 'Too many pinned dialogs';
}
export class PinRestricted extends BadRequest {
  id: string = 'PIN_RESTRICTED';
  message: string = "You can't pin messages in private chats with other people";
}
export class PollAnswersInvalid extends BadRequest {
  id: string = 'POLL_ANSWERS_INVALID';
  message: string = 'The poll answers are invalid';
}
export class PollOptionDuplicate extends BadRequest {
  id: string = 'POLL_OPTION_DUPLICATE';
  message: string = 'A duplicate option was sent in the same poll';
}
export class PollOptionInvalid extends BadRequest {
  id: string = 'POLL_OPTION_INVALID';
  message: string = 'A poll option used invalid data (the data may be too long)';
}
export class PollQuestionInvalid extends BadRequest {
  id: string = 'POLL_QUESTION_INVALID';
  message: string = 'The poll question is invalid';
}
export class PollUnsupported extends BadRequest {
  id: string = 'POLL_UNSUPPORTED';
  message: string = 'This layer does not support polls in the invoked method';
}
export class PollVoteRequired extends BadRequest {
  id: string = 'POLL_VOTE_REQUIRED';
  message: string = 'Cast a vote in the poll before calling this method';
}
export class PrivacyKeyInvalid extends BadRequest {
  id: string = 'PRIVACY_KEY_INVALID';
  message: string = 'The privacy key is invalid';
}
export class PrivacyTooLong extends BadRequest {
  id: string = 'PRIVACY_TOO_LONG';
  message: string = 'Your privacy exception list has exceeded the maximum capacity';
}
export class PrivacyValueInvalid extends BadRequest {
  id: string = 'PRIVACY_VALUE_INVALID';
  message: string = 'The privacy value is invalid';
}
export class QueryIdEmpty extends BadRequest {
  id: string = 'QUERY_ID_EMPTY';
  message: string = 'The query ID is empty';
}
export class QueryIdInvalid extends BadRequest {
  id: string = 'QUERY_ID_INVALID';
  message: string = 'The callback query id is invalid';
}
export class QueryTooShort extends BadRequest {
  id: string = 'QUERY_TOO_SHORT';
  message: string = 'The query is too short';
}
export class QuizCorrectAnswersEmpty extends BadRequest {
  id: string = 'QUIZ_CORRECT_ANSWERS_EMPTY';
  message: string = 'The correct answers of the quiz are empty';
}
export class QuizCorrectAnswersTooMuch extends BadRequest {
  id: string = 'QUIZ_CORRECT_ANSWERS_TOO_MUCH';
  message: string = 'The quiz contains too many correct answers';
}
export class QuizCorrectAnswerInvalid extends BadRequest {
  id: string = 'QUIZ_CORRECT_ANSWER_INVALID';
  message: string = 'The correct answers of the quiz are invalid';
}
export class QuizMultipleInvalid extends BadRequest {
  id: string = 'QUIZ_MULTIPLE_INVALID';
  message: string = "A quiz can't have multiple answers";
}
export class RandomIdEmpty extends BadRequest {
  id: string = 'RANDOM_ID_EMPTY';
  message: string = 'The random ID is empty';
}
export class RandomIdInvalid extends BadRequest {
  id: string = 'RANDOM_ID_INVALID';
  message: string = 'The provided random ID is invalid';
}
export class RandomLengthInvalid extends BadRequest {
  id: string = 'RANDOM_LENGTH_INVALID';
  message: string = 'The random length is invalid';
}
export class RangesInvalid extends BadRequest {
  id: string = 'RANGES_INVALID';
  message: string = 'Invalid range provided';
}
export class ReactionEmpty extends BadRequest {
  id: string = 'REACTION_EMPTY';
  message: string = 'The reaction provided is empty';
}
export class ReactionInvalid extends BadRequest {
  id: string = 'REACTION_INVALID';
  message: string = 'Invalid reaction provided (only valid emoji are allowed)';
}
export class ReflectorNotAvailable extends BadRequest {
  id: string = 'REFLECTOR_NOT_AVAILABLE';
  message: string = 'The call reflector is not available';
}
export class ReplyMarkupBuyEmpty extends BadRequest {
  id: string = 'REPLY_MARKUP_BUY_EMPTY';
  message: string = 'Reply markup for buy button empty';
}
export class ReplyMarkupGameEmpty extends BadRequest {
  id: string = 'REPLY_MARKUP_GAME_EMPTY';
  message: string = 'The provided reply markup for the game is empty';
}
export class ReplyMarkupInvalid extends BadRequest {
  id: string = 'REPLY_MARKUP_INVALID';
  message: string = 'The provided reply markup is invalid';
}
export class ReplyMarkupTooLong extends BadRequest {
  id: string = 'REPLY_MARKUP_TOO_LONG';
  message: string = 'The reply markup is too long';
}
export class ResultsTooMuch extends BadRequest {
  id: string = 'RESULTS_TOO_MUCH';
  message: string = 'The result contains too many items';
}
export class ResultIdDuplicate extends BadRequest {
  id: string = 'RESULT_ID_DUPLICATE';
  message: string = 'The result contains items with duplicated identifiers';
}
export class ResultIdEmpty extends BadRequest {
  id: string = 'RESULT_ID_EMPTY';
  message: string = 'Result ID empty';
}
export class ResultIdInvalid extends BadRequest {
  id: string = 'RESULT_ID_INVALID';
  message: string = 'The given result cannot be used to send the selection to the bot';
}
export class ResultTypeInvalid extends BadRequest {
  id: string = 'RESULT_TYPE_INVALID';
  message: string = 'The result type is invalid';
}
export class RevoteNotAllowed extends BadRequest {
  id: string = 'REVOTE_NOT_ALLOWED';
  message: string = 'You cannot change your vote';
}
export class RsaDecryptFailed extends BadRequest {
  id: string = 'RSA_DECRYPT_FAILED';
  message: string = 'Internal RSA decryption failed';
}
export class ScheduleBotNotAllowed extends BadRequest {
  id: string = 'SCHEDULE_BOT_NOT_ALLOWED';
  message: string = 'Bots are not allowed to schedule messages';
}
export class ScheduleDateInvalid extends BadRequest {
  id: string = 'SCHEDULE_DATE_INVALID';
  message: string = 'Invalid schedule date provided';
}
export class ScheduleDateTooLate extends BadRequest {
  id: string = 'SCHEDULE_DATE_TOO_LATE';
  message: string = 'The date you tried to schedule is too far in the future (more than one year)';
}
export class ScheduleStatusPrivate extends BadRequest {
  id: string = 'SCHEDULE_STATUS_PRIVATE';
  message: string =
    'You cannot schedule a message until the person comes online if their privacy does not show this information';
}
export class ScheduleTooMuch extends BadRequest {
  id: string = 'SCHEDULE_TOO_MUCH';
  message: string = 'You tried to schedule too many messages in this chat';
}
export class SearchQueryEmpty extends BadRequest {
  id: string = 'SEARCH_QUERY_EMPTY';
  message: string = 'The search query is empty';
}
export class SecondsInvalid extends BadRequest {
  id: string = 'SECONDS_INVALID';
  message: string = 'The seconds interval is invalid';
}
export class SendMessageMediaInvalid extends BadRequest {
  id: string = 'SEND_MESSAGE_MEDIA_INVALID';
  message: string = 'The message media is invalid';
}
export class SendMessageTypeInvalid extends BadRequest {
  id: string = 'SEND_MESSAGE_TYPE_INVALID';
  message: string = 'The message type is invalid';
}
export class SessionTooFresh extends BadRequest {
  id: string = 'SESSION_TOO_FRESH_X';
  message: string = "You can't do this action because the current session was logged-in recently";
}
export class SettingsInvalid extends BadRequest {
  id: string = 'SETTINGS_INVALID';
  message: string = 'Invalid settings were provided';
}
export class Shatwo56HashInvalid extends BadRequest {
  id: string = 'SHA256_HASH_INVALID';
  message: string = 'The provided SHA256 hash is invalid';
}
export class ShortnameOccupyFailed extends BadRequest {
  id: string = 'SHORTNAME_OCCUPY_FAILED';
  message: string =
    'An error occurred when trying to register the short-name used for the sticker pack. Try a different name';
}
export class SlowmodeMultiMsgsDisabled extends BadRequest {
  id: string = 'SLOWMODE_MULTI_MSGS_DISABLED';
  message: string = 'Slowmode is enabled, you cannot forward multiple messages to this group';
}
export class SmsCodeCreateFailed extends BadRequest {
  id: string = 'SMS_CODE_CREATE_FAILED';
  message: string = 'An error occurred while creating the SMS code';
}
export class SrpIdInvalid extends BadRequest {
  id: string = 'SRP_ID_INVALID';
  message: string = 'Invalid SRP ID provided';
}
export class SrpPasswordChanged extends BadRequest {
  id: string = 'SRP_PASSWORD_CHANGED';
  message: string = 'The password has changed';
}
export class StartParamEmpty extends BadRequest {
  id: string = 'START_PARAM_EMPTY';
  message: string = 'The start parameter is empty';
}
export class StartParamInvalid extends BadRequest {
  id: string = 'START_PARAM_INVALID';
  message: string = 'The start parameter is invalid';
}
export class StartParamTooLong extends BadRequest {
  id: string = 'START_PARAM_TOO_LONG';
  message: string = 'The start parameter is too long';
}
export class StickersetInvalid extends BadRequest {
  id: string = 'STICKERSET_INVALID';
  message: string = 'The requested sticker set is invalid';
}
export class StickersEmpty extends BadRequest {
  id: string = 'STICKERS_EMPTY';
  message: string = 'The sticker provided is empty';
}
export class StickerDocumentInvalid extends BadRequest {
  id: string = 'STICKER_DOCUMENT_INVALID';
  message: string = 'The sticker document is invalid';
}
export class StickerEmojiInvalid extends BadRequest {
  id: string = 'STICKER_EMOJI_INVALID';
  message: string = 'The sticker emoji is invalid';
}
export class StickerFileInvalid extends BadRequest {
  id: string = 'STICKER_FILE_INVALID';
  message: string = 'The sticker file is invalid';
}
export class StickerIdInvalid extends BadRequest {
  id: string = 'STICKER_ID_INVALID';
  message: string = 'The provided sticker id is invalid';
}
export class StickerInvalid extends BadRequest {
  id: string = 'STICKER_INVALID';
  message: string = 'The provided sticker is invalid';
}
export class StickerPngDimensions extends BadRequest {
  id: string = 'STICKER_PNG_DIMENSIONS';
  message: string = 'The sticker png dimensions are invalid';
}
export class StickerPngNopng extends BadRequest {
  id: string = 'STICKER_PNG_NOPNG';
  message: string = 'Stickers must be png files but the provided image was not a png';
}
export class StickerTgsNotgs extends BadRequest {
  id: string = 'STICKER_TGS_NOTGS';
  message: string = 'A tgs sticker file was expected, but something else was provided';
}
export class StickerThumbPngNopng extends BadRequest {
  id: string = 'STICKER_THUMB_PNG_NOPNG';
  message: string = 'A png sticker thumbnail file was expected, but something else was provided';
}
export class TakeoutInvalid extends BadRequest {
  id: string = 'TAKEOUT_INVALID';
  message: string = 'The takeout id is invalid';
}
export class TakeoutRequired extends BadRequest {
  id: string = 'TAKEOUT_REQUIRED';
  message: string = 'The method must be invoked inside a takeout session';
}
export class TempAuthKeyEmpty extends BadRequest {
  id: string = 'TEMP_AUTH_KEY_EMPTY';
  message: string = 'The temporary auth key provided is empty';
}
export class ThemeFileInvalid extends BadRequest {
  id: string = 'THEME_FILE_INVALID';
  message: string = 'Invalid theme file provided';
}
export class ThemeFormatInvalid extends BadRequest {
  id: string = 'THEME_FORMAT_INVALID';
  message: string = 'Invalid theme format provided';
}
export class ThemeInvalid extends BadRequest {
  id: string = 'THEME_INVALID';
  message: string = 'Invalid theme provided';
}
export class ThemeMimeInvalid extends BadRequest {
  id: string = 'THEME_MIME_INVALID';
  message: string = 'You cannot create this theme because the mime-type is invalid';
}
export class TmpPasswordDisabled extends BadRequest {
  id: string = 'TMP_PASSWORD_DISABLED';
  message: string = 'The temporary password is disabled';
}
export class TmpPasswordInvalid extends BadRequest {
  id: string = 'TMP_PASSWORD_INVALID';
  message: string = 'The temporary password is invalid';
}
export class TokenInvalid extends BadRequest {
  id: string = 'TOKEN_INVALID';
  message: string = 'The provided token is invalid';
}
export class TtlDaysInvalid extends BadRequest {
  id: string = 'TTL_DAYS_INVALID';
  message: string = 'The provided TTL days is invalid';
}
export class TtlMediaInvalid extends BadRequest {
  id: string = 'TTL_MEDIA_INVALID';
  message: string = 'The media does not support self-destruction';
}
export class TypesEmpty extends BadRequest {
  id: string = 'TYPES_EMPTY';
  message: string = 'The types parameter is empty';
}
export class TypeConstructorInvalid extends BadRequest {
  id: string = 'TYPE_CONSTRUCTOR_INVALID';
  message: string = 'The type constructor is invalid';
}
export class UntilDateInvalid extends BadRequest {
  id: string = 'UNTIL_DATE_INVALID';
  message: string = 'That date parameter is invalid';
}
export class UrlInvalid extends BadRequest {
  id: string = 'URL_INVALID';
  message: string = 'The URL provided is invalid';
}
export class UsageLimitInvalid extends BadRequest {
  id: string = 'USAGE_LIMIT_INVALID';
  message: string = 'The usage limit is invalid';
}
export class UsernameInvalid extends BadRequest {
  id: string = 'USERNAME_INVALID';
  message: string = 'The username is invalid';
}
export class UsernameNotModified extends BadRequest {
  id: string = 'USERNAME_NOT_MODIFIED';
  message: string = 'The username was not modified because you tried to edit it using the same one';
}
export class UsernameNotOccupied extends BadRequest {
  id: string = 'USERNAME_NOT_OCCUPIED';
  message: string = 'The username is not occupied by anyone';
}
export class UsernameOccupied extends BadRequest {
  id: string = 'USERNAME_OCCUPIED';
  message: string = 'The username is already in use by someone else';
}
export class UserpicUploadRequired extends BadRequest {
  id: string = 'USERPIC_UPLOAD_REQUIRED';
  message: string = 'You are required to upload a profile picture for this action';
}
export class UsersTooFew extends BadRequest {
  id: string = 'USERS_TOO_FEW';
  message: string = 'Not enough users (to create a chat, for example)';
}
export class UsersTooMuch extends BadRequest {
  id: string = 'USERS_TOO_MUCH';
  message: string = 'The maximum number of users has been exceeded (to create a chat, for example)';
}
export class UserAdminInvalid extends BadRequest {
  id: string = 'USER_ADMIN_INVALID';
  message: string =
    "The action requires admin privileges. Probably you tried to edit admin privileges on someone you don't have rights to";
}
export class UserAlreadyParticipant extends BadRequest {
  id: string = 'USER_ALREADY_PARTICIPANT';
  message: string = 'The user is already a participant of this chat';
}
export class UserBannedInChannel extends BadRequest {
  id: string = 'USER_BANNED_IN_CHANNEL';
  message: string =
    'You are limited from sending messages in supergroups/channels, check @SpamBot for details';
}
export class UserBlocked extends BadRequest {
  id: string = 'USER_BLOCKED';
  message: string = 'The user is blocked';
}
export class UserBot extends BadRequest {
  id: string = 'USER_BOT';
  message: string = 'Bots in channels can only be administrators, not members.';
}
export class UserBotInvalid extends BadRequest {
  id: string = 'USER_BOT_INVALID';
  message: string = 'This method can only be used by a bot';
}
export class UserBotRequired extends BadRequest {
  id: string = 'USER_BOT_REQUIRED';
  message: string = 'The method can be used by bots only';
}
export class UserChannelsTooMuch extends BadRequest {
  id: string = 'USER_CHANNELS_TOO_MUCH';
  message: string = 'The user is already in too many channels or supergroups';
}
export class UserCreator extends BadRequest {
  id: string = 'USER_CREATOR';
  message: string = "You can't leave this channel because you're its creator";
}
export class UserIdInvalid extends BadRequest {
  id: string = 'USER_ID_INVALID';
  message: string =
    'The user id being used is invalid or not known yet. Make sure you meet the user before interacting with it';
}
export class UserInvalid extends BadRequest {
  id: string = 'USER_INVALID';
  message: string = 'The provided user is invalid';
}
export class UserIsBlocked extends BadRequest {
  id: string = 'USER_IS_BLOCKED';
  message: string = 'The user blocked you';
}
export class UserIsBot extends BadRequest {
  id: string = 'USER_IS_BOT';
  message: string = 'A bot cannot send messages to other bots or to itself';
}
export class UserKicked extends BadRequest {
  id: string = 'USER_KICKED';
  message: string = 'This user was kicked from this chat';
}
export class UserNotMutualContact extends BadRequest {
  id: string = 'USER_NOT_MUTUAL_CONTACT';
  message: string = 'The user is not a mutual contact';
}
export class UserNotParticipant extends BadRequest {
  id: string = 'USER_NOT_PARTICIPANT';
  message: string = 'The user is not a member of this chat';
}
export class VideoContentTypeInvalid extends BadRequest {
  id: string = 'VIDEO_CONTENT_TYPE_INVALID';
  message: string = 'The video content type is invalid (i.e.: not streamable)';
}
export class VideoFileInvalid extends BadRequest {
  id: string = 'VIDEO_FILE_INVALID';
  message: string = 'The video file is invalid';
}
export class VolumeLocNotFound extends BadRequest {
  id: string = 'VOLUME_LOC_NOT_FOUND';
  message: string = "The volume location can't be found";
}
export class WallpaperFileInvalid extends BadRequest {
  id: string = 'WALLPAPER_FILE_INVALID';
  message: string = 'The provided file cannot be used as a wallpaper';
}
export class WallpaperInvalid extends BadRequest {
  id: string = 'WALLPAPER_INVALID';
  message: string = 'The input wallpaper was not valid';
}
export class WallpaperMimeInvalid extends BadRequest {
  id: string = 'WALLPAPER_MIME_INVALID';
  message: string = 'The wallpaper mime type is invalid';
}
export class WcConvertUrlInvalid extends BadRequest {
  id: string = 'WC_CONVERT_URL_INVALID';
  message: string = 'WC convert URL invalid';
}
export class WebdocumentInvalid extends BadRequest {
  id: string = 'WEBDOCUMENT_INVALID';
  message: string = 'The web document is invalid';
}
export class WebdocumentMimeInvalid extends BadRequest {
  id: string = 'WEBDOCUMENT_MIME_INVALID';
  message: string = 'The web document mime type is invalid';
}
export class WebdocumentSizeTooBig extends BadRequest {
  id: string = 'WEBDOCUMENT_SIZE_TOO_BIG';
  message: string = 'The web document is too big';
}
export class WebdocumentUrlEmpty extends BadRequest {
  id: string = 'WEBDOCUMENT_URL_EMPTY';
  message: string = 'The web document URL is empty';
}
export class WebdocumentUrlInvalid extends BadRequest {
  id: string = 'WEBDOCUMENT_URL_INVALID';
  message: string = 'The web document URL is invalid';
}
export class WebpageCurlFailed extends BadRequest {
  id: string = 'WEBPAGE_CURL_FAILED';
  message: string = 'Telegram server could not fetch the provided URL';
}
export class WebpageMediaEmpty extends BadRequest {
  id: string = 'WEBPAGE_MEDIA_EMPTY';
  message: string = "The URL doesn't contain any valid media";
}
export class YouBlockedUser extends BadRequest {
  id: string = 'YOU_BLOCKED_USER';
  message: string = 'You blocked this user';
}
