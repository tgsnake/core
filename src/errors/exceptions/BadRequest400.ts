/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

/***********************************************************
 *                         Warning!!                        *
 *               This file is auto generate.                *
 *         All change made in this file will be lost!       *
 ***********************************************************/
import { RPCError } from '../RpcError.ts';

export class BadRequest extends RPCError {
  override code: number = 400;
  override name: string = 'BAD_REQUEST';
}
export class AboutTooLong extends BadRequest {
  override id: string = 'ABOUT_TOO_LONG';
  override message: string = 'About string too long.';
}
export class AccessTokenExpired extends BadRequest {
  override id: string = 'ACCESS_TOKEN_EXPIRED';
  override message: string = 'Access token expired.';
}
export class AccessTokenInvalid extends BadRequest {
  override id: string = 'ACCESS_TOKEN_INVALID';
  override message: string = 'Access token invalid.';
}
export class AddressInvalid extends BadRequest {
  override id: string = 'ADDRESS_INVALID';
  override message: string = 'The specified geopoint address is invalid.';
}
export class AdminsTooMuch extends BadRequest {
  override id: string = 'ADMINS_TOO_MUCH';
  override message: string = 'There are too many admins.';
}
export class AdminIdInvalid extends BadRequest {
  override id: string = 'ADMIN_ID_INVALID';
  override message: string = 'The specified admin ID is invalid.';
}
export class AdminRankEmojiNotAllowed extends BadRequest {
  override id: string = 'ADMIN_RANK_EMOJI_NOT_ALLOWED';
  override message: string = 'An admin rank cannot contain emojis.';
}
export class AdminRankInvalid extends BadRequest {
  override id: string = 'ADMIN_RANK_INVALID';
  override message: string = 'The specified admin rank is invalid.';
}
export class AdminRightsEmpty extends BadRequest {
  override id: string = 'ADMIN_RIGHTS_EMPTY';
  override message: string =
    'The chatAdminRights constructor passed in keyboardButtonRequestPeer.peer_type.user_admin_rights has no rights set (i.e. flags is 0).';
}
export class AdExpired extends BadRequest {
  override id: string = 'AD_EXPIRED';
  override message: string = 'The ad has expired (too old or not found).';
}
export class AlbumPhotosTooMany extends BadRequest {
  override id: string = 'ALBUM_PHOTOS_TOO_MANY';
  override message: string =
    'You have uploaded too many profile photos, delete some before retrying.';
}
export class ApiIdInvalid extends BadRequest {
  override id: string = 'API_ID_INVALID';
  override message: string = 'API ID invalid.';
}
export class ApiIdPublishedFlood extends BadRequest {
  override id: string = 'API_ID_PUBLISHED_FLOOD';
  override message: string = "This API id was published somewhere, you can't use it now.";
}
export class ArticleTitleEmpty extends BadRequest {
  override id: string = 'ARTICLE_TITLE_EMPTY';
  override message: string = 'The title of the article is empty.';
}
export class AudioContentUrlEmpty extends BadRequest {
  override id: string = 'AUDIO_CONTENT_URL_EMPTY';
  override message: string = 'The remote URL specified in the content field is empty.';
}
export class AudioTitleEmpty extends BadRequest {
  override id: string = 'AUDIO_TITLE_EMPTY';
  override message: string = 'An empty audio title was provided.';
}
export class AuthBytesInvalid extends BadRequest {
  override id: string = 'AUTH_BYTES_INVALID';
  override message: string = 'The provided authorization is invalid.';
}
export class AuthTokenAlreadyAccepted extends BadRequest {
  override id: string = 'AUTH_TOKEN_ALREADY_ACCEPTED';
  override message: string = 'The specified auth token was already accepted.';
}
export class AuthTokenException extends BadRequest {
  override id: string = 'AUTH_TOKEN_EXCEPTION';
  override message: string = 'An error occurred while importing the auth token.';
}
export class AuthTokenExpired extends BadRequest {
  override id: string = 'AUTH_TOKEN_EXPIRED';
  override message: string = 'The authorization token has expired.';
}
export class AuthTokenInvalid extends BadRequest {
  override id: string = 'AUTH_TOKEN_INVALID';
  override message: string = 'The specified auth token is invalid.';
}
export class AuthTokenInvalidx extends BadRequest {
  override id: string = 'AUTH_TOKEN_INVALIDX';
  override message: string = 'The specified auth token is invalid.';
}
export class AutoarchiveNotAvailable extends BadRequest {
  override id: string = 'AUTOARCHIVE_NOT_AVAILABLE';
  override message: string =
    'The autoarchive setting is not available at this time: please check the value of the [autoarchive_setting_available field in client config &raquo;](https://core.telegram.org/api/config#client-configuration) before calling this method.';
}
export class BalanceTooLow extends BadRequest {
  override id: string = 'BALANCE_TOO_LOW';
  override message: string =
    'The transaction cannot be completed because the current [Telegram Stars balance](https://core.telegram.org/api/stars) is too low.';
}
export class BankCardNumberInvalid extends BadRequest {
  override id: string = 'BANK_CARD_NUMBER_INVALID';
  override message: string = 'The specified card number is invalid.';
}
export class BannedRightsInvalid extends BadRequest {
  override id: string = 'BANNED_RIGHTS_INVALID';
  override message: string = 'You provided some invalid flags in the banned rights.';
}
export class BasePortLocInvalid extends BadRequest {
  override id: string = 'BASE_PORT_LOC_INVALID';
  override message: string = 'The base port location is invalid';
}
export class BirthdayInvalid extends BadRequest {
  override id: string = 'BIRTHDAY_INVALID';
  override message: string = 'An invalid age was specified, must be between 0 and 150 years.';
}
export class BoostsEmpty extends BadRequest {
  override id: string = 'BOOSTS_EMPTY';
  override message: string = 'No boost slots were specified.';
}
export class BoostsRequired extends BadRequest {
  override id: string = 'BOOSTS_REQUIRED';
  override message: string =
    'The specified channel must first be [boosted by its users](https://core.telegram.org/api/boost) in order to perform this action.';
}
export class BoostNotModified extends BadRequest {
  override id: string = 'BOOST_NOT_MODIFIED';
  override message: string =
    "You're already [boosting](https://core.telegram.org/api/boost) the specified channel.";
}
export class BoostPeerInvalid extends BadRequest {
  override id: string = 'BOOST_PEER_INVALID';
  override message: string = 'The specified `boost_peer` is invalid.';
}
export class BotsTooMuch extends BadRequest {
  override id: string = 'BOTS_TOO_MUCH';
  override message: string = 'There are too many bots in this chat/channel.';
}
export class BotAlreadyDisabled extends BadRequest {
  override id: string = 'BOT_ALREADY_DISABLED';
  override message: string =
    'The connected business bot was already disabled for the specified peer.';
}
export class BotAppBotInvalid extends BadRequest {
  override id: string = 'BOT_APP_BOT_INVALID';
  override message: string =
    'The bot_id passed in the inputBotAppShortName constructor is invalid.';
}
export class BotAppInvalid extends BadRequest {
  override id: string = 'BOT_APP_INVALID';
  override message: string = 'The specified bot app is invalid.';
}
export class BotAppShortnameInvalid extends BadRequest {
  override id: string = 'BOT_APP_SHORTNAME_INVALID';
  override message: string = 'The specified bot app short name is invalid.';
}
export class BotBusinessMissing extends BadRequest {
  override id: string = 'BOT_BUSINESS_MISSING';
  override message: string =
    'The specified bot is not a business bot (the [user](https://core.telegram.org/constructor/user).`bot_business` flag is not set).';
}
export class BotChannelsNa extends BadRequest {
  override id: string = 'BOT_CHANNELS_NA';
  override message: string = "Bots can't edit admin privileges.";
}
export class BotCommandDescriptionInvalid extends BadRequest {
  override id: string = 'BOT_COMMAND_DESCRIPTION_INVALID';
  override message: string = 'The specified command description is invalid.';
}
export class BotCommandInvalid extends BadRequest {
  override id: string = 'BOT_COMMAND_INVALID';
  override message: string = 'The specified command is invalid.';
}
export class BotDomainInvalid extends BadRequest {
  override id: string = 'BOT_DOMAIN_INVALID';
  override message: string = 'Bot domain invalid.';
}
export class BotGamesDisabled extends BadRequest {
  override id: string = 'BOT_GAMES_DISABLED';
  override message: string = "Games can't be sent to channels.";
}
export class BotGroupsBlocked extends BadRequest {
  override id: string = 'BOT_GROUPS_BLOCKED';
  override message: string = "This bot can't be added to groups.";
}
export class BotInlineDisabled extends BadRequest {
  override id: string = 'BOT_INLINE_DISABLED';
  override message: string = "This bot can't be used in inline mode.";
}
export class BotInvalid extends BadRequest {
  override id: string = 'BOT_INVALID';
  override message: string = 'This is not a valid bot.';
}
export class BotInvoiceInvalid extends BadRequest {
  override id: string = 'BOT_INVOICE_INVALID';
  override message: string = 'The specified invoice is invalid.';
}
export class BotMethodInvalid extends BadRequest {
  override id: string = 'BOT_METHOD_INVALID';
  override message: string = 'The specified method cannot be used by bots.';
}
export class BotMissing extends BadRequest {
  override id: string = 'BOT_MISSING';
  override message: string =
    "Only bots can call this method, please use [@stickers](https://t.me/stickers) if you're a user.";
}
export class BotNotConnectedYet extends BadRequest {
  override id: string = 'BOT_NOT_CONNECTED_YET';
  override message: string =
    'No [business bot](https://core.telegram.org/api/business#connected-bots) is connected to the currently logged in user.';
}
export class BotOnesideNotAvail extends BadRequest {
  override id: string = 'BOT_ONESIDE_NOT_AVAIL';
  override message: string = "Bots can't pin messages in PM just for themselves.";
}
export class BotPaymentsDisabled extends BadRequest {
  override id: string = 'BOT_PAYMENTS_DISABLED';
  override message: string = 'Please enable bot payments in botfather before calling this method.';
}
export class BotPollsDisabled extends BadRequest {
  override id: string = 'BOT_POLLS_DISABLED';
  override message: string = 'Sending polls by bots has been disabled';
}
export class BotResponseTimeout extends BadRequest {
  override id: string = 'BOT_RESPONSE_TIMEOUT';
  override message: string = 'A timeout occurred while fetching data from the bot.';
}
export class BotScoreNotModified extends BadRequest {
  override id: string = 'BOT_SCORE_NOT_MODIFIED';
  override message: string = "The score wasn't modified.";
}
export class BotWebviewDisabled extends BadRequest {
  override id: string = 'BOT_WEBVIEW_DISABLED';
  override message: string =
    'A webview cannot be opened in the specified conditions: emitted for example if `from_bot_menu` or `url` are set and `peer` is not the chat with the bot.';
}
export class BroadcastIdInvalid extends BadRequest {
  override id: string = 'BROADCAST_ID_INVALID';
  override message: string = 'Broadcast ID invalid.';
}
export class BroadcastPublicVotersForbidden extends BadRequest {
  override id: string = 'BROADCAST_PUBLIC_VOTERS_FORBIDDEN';
  override message: string = "You can't forward polls with public voters.";
}
export class BroadcastRequired extends BadRequest {
  override id: string = 'BROADCAST_REQUIRED';
  override message: string =
    'This method can only be called on a channel, please use stats.getMegagroupStats for supergroups.';
}
export class BusinessPeerInvalid extends BadRequest {
  override id: string = 'BUSINESS_PEER_INVALID';
  override message: string =
    "Messages can't be set to the specified peer through the current [business connection](https://core.telegram.org/api/business#connected-bots).";
}
export class BusinessPeerUsageMissing extends BadRequest {
  override id: string = 'BUSINESS_PEER_USAGE_MISSING';
  override message: string =
    "You cannot send a message to a user through a [business connection](https://core.telegram.org/api/business#connected-bots) if the user hasn't recently contacted us.";
}
export class BusinessRecipientsEmpty extends BadRequest {
  override id: string = 'BUSINESS_RECIPIENTS_EMPTY';
  override message: string =
    "You didn't set any flag in inputBusinessBotRecipients, thus the bot cannot work with *any* peer.";
}
export class BusinessWorkHoursEmpty extends BadRequest {
  override id: string = 'BUSINESS_WORK_HOURS_EMPTY';
  override message: string = 'No work hours were specified.';
}
export class BusinessWorkHoursPeriodInvalid extends BadRequest {
  override id: string = 'BUSINESS_WORK_HOURS_PERIOD_INVALID';
  override message: string =
    'The specified work hours are invalid, see [here &raquo;](https://core.telegram.org/api/business#opening-hours) for the exact requirements.';
}
export class ButtonCopyTextInvalid extends BadRequest {
  override id: string = 'BUTTON_COPY_TEXT_INVALID';
  override message: string =
    'The specified [keyboardButtonCopy](https://core.telegram.org/constructor/keyboardButtonCopy).`copy_text` is invalid.';
}
export class ButtonDataInvalid extends BadRequest {
  override id: string = 'BUTTON_DATA_INVALID';
  override message: string = 'The data of one or more of the buttons you provided is invalid.';
}
export class ButtonIdInvalid extends BadRequest {
  override id: string = 'BUTTON_ID_INVALID';
  override message: string = 'The specified button ID is invalid.';
}
export class ButtonPosInvalid extends BadRequest {
  override id: string = 'BUTTON_POS_INVALID';
  override message: string =
    'The position of one of the keyboard buttons is invalid (i.e. a Game or Pay button not in the first position, and so on...).';
}
export class ButtonTextInvalid extends BadRequest {
  override id: string = 'BUTTON_TEXT_INVALID';
  override message: string = 'The specified button text is invalid.';
}
export class ButtonTypeInvalid extends BadRequest {
  override id: string = 'BUTTON_TYPE_INVALID';
  override message: string = 'The type of one or more of the buttons you provided is invalid.';
}
export class ButtonUrlInvalid extends BadRequest {
  override id: string = 'BUTTON_URL_INVALID';
  override message: string = 'Button URL invalid.';
}
export class ButtonUserInvalid extends BadRequest {
  override id: string = 'BUTTON_USER_INVALID';
  override message: string = 'The `user_id` passed to inputKeyboardButtonUserProfile is invalid!';
}
export class ButtonUserPrivacyRestricted extends BadRequest {
  override id: string = 'BUTTON_USER_PRIVACY_RESTRICTED';
  override message: string =
    'The privacy setting of the user specified in a [inputKeyboardButtonUserProfile](https://core.telegram.org/constructor/inputKeyboardButtonUserProfile) button do not allow creating such a button.';
}
export class CallAlreadyAccepted extends BadRequest {
  override id: string = 'CALL_ALREADY_ACCEPTED';
  override message: string = 'The call was already accepted.';
}
export class CallAlreadyDeclined extends BadRequest {
  override id: string = 'CALL_ALREADY_DECLINED';
  override message: string = 'The call was already declined.';
}
export class CallOccupyFailed extends BadRequest {
  override id: string = 'CALL_OCCUPY_FAILED';
  override message: string = 'The call failed because the user is already making another call.';
}
export class CallPeerInvalid extends BadRequest {
  override id: string = 'CALL_PEER_INVALID';
  override message: string = 'The provided call peer object is invalid.';
}
export class CallProtocolFlagsInvalid extends BadRequest {
  override id: string = 'CALL_PROTOCOL_FLAGS_INVALID';
  override message: string = 'Call protocol flags invalid.';
}
export class CdnMethodInvalid extends BadRequest {
  override id: string = 'CDN_METHOD_INVALID';
  override message: string = "You can't call this method in a CDN DC.";
}
export class ChannelsAdminLocatedTooMuch extends BadRequest {
  override id: string = 'CHANNELS_ADMIN_LOCATED_TOO_MUCH';
  override message: string = 'The user has reached the limit of public geogroups.';
}
export class ChannelsAdminPublicTooMuch extends BadRequest {
  override id: string = 'CHANNELS_ADMIN_PUBLIC_TOO_MUCH';
  override message: string =
    "You're admin of too many public channels, make some channels private to change the username of this channel.";
}
export class ChannelsTooMuch extends BadRequest {
  override id: string = 'CHANNELS_TOO_MUCH';
  override message: string = 'You have joined too many channels/supergroups.';
}
export class ChannelAddInvalid extends BadRequest {
  override id: string = 'CHANNEL_ADD_INVALID';
  override message: string = 'Internal error.';
}
export class ChannelBanned extends BadRequest {
  override id: string = 'CHANNEL_BANNED';
  override message: string = 'The channel is banned';
}
export class ChannelForumMissing extends BadRequest {
  override id: string = 'CHANNEL_FORUM_MISSING';
  override message: string = 'This supergroup is not a forum.';
}
export class ChannelIdInvalid extends BadRequest {
  override id: string = 'CHANNEL_ID_INVALID';
  override message: string = 'The specified supergroup ID is invalid.';
}
export class ChannelInvalid extends BadRequest {
  override id: string = 'CHANNEL_INVALID';
  override message: string = 'The provided channel is invalid.';
}
export class ChannelParicipantMissing extends BadRequest {
  override id: string = 'CHANNEL_PARICIPANT_MISSING';
  override message: string = 'The current user is not in the channel.';
}
export class ChannelPrivate extends BadRequest {
  override id: string = 'CHANNEL_PRIVATE';
  override message: string = "You haven't joined this channel/supergroup.";
}
export class ChannelTooBig extends BadRequest {
  override id: string = 'CHANNEL_TOO_BIG';
  override message: string = 'This channel has too many participants (>1000) to be deleted.';
}
export class ChannelTooLarge extends BadRequest {
  override id: string = 'CHANNEL_TOO_LARGE';
  override message: string =
    'Channel is too large to be deleted; this error is issued when trying to delete channels with more than 1000 members (subject to change).';
}
export class ChargeAlreadyRefunded extends BadRequest {
  override id: string = 'CHARGE_ALREADY_REFUNDED';
  override message: string = 'The transaction was already refunded.';
}
export class ChatlinksTooMuch extends BadRequest {
  override id: string = 'CHATLINKS_TOO_MUCH';
  override message: string =
    'Too many [business chat links](https://core.telegram.org/api/business#business-chat-links) were created, please delete some older links.';
}
export class ChatlinkSlugEmpty extends BadRequest {
  override id: string = 'CHATLINK_SLUG_EMPTY';
  override message: string = 'The specified slug is empty.';
}
export class ChatlinkSlugExpired extends BadRequest {
  override id: string = 'CHATLINK_SLUG_EXPIRED';
  override message: string =
    'The specified [business chat link](https://core.telegram.org/api/business#business-chat-links) has expired.';
}
export class ChatlistsTooMuch extends BadRequest {
  override id: string = 'CHATLISTS_TOO_MUCH';
  override message: string =
    'You have created too many folder links, hitting the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [limits &raquo;](https://core.telegram.org/api/config#chatlist-invites-limit-default).';
}
export class ChatlistExcludeInvalid extends BadRequest {
  override id: string = 'CHATLIST_EXCLUDE_INVALID';
  override message: string = 'The specified `exclude_peers` are invalid.';
}
export class ChatAboutNotModified extends BadRequest {
  override id: string = 'CHAT_ABOUT_NOT_MODIFIED';
  override message: string = 'About text has not changed.';
}
export class ChatAboutTooLong extends BadRequest {
  override id: string = 'CHAT_ABOUT_TOO_LONG';
  override message: string = 'Chat about too long.';
}
export class ChatAdminRequired extends BadRequest {
  override id: string = 'CHAT_ADMIN_REQUIRED';
  override message: string = 'You must be an admin in this chat to do this.';
}
export class ChatDiscussionUnallowed extends BadRequest {
  override id: string = 'CHAT_DISCUSSION_UNALLOWED';
  override message: string =
    "You can't enable forum topics in a discussion group linked to a channel.";
}
export class ChatForwardsRestricted extends BadRequest {
  override id: string = 'CHAT_FORWARDS_RESTRICTED';
  override message: string = "You can't forward messages from a protected chat.";
}
export class ChatIdEmpty extends BadRequest {
  override id: string = 'CHAT_ID_EMPTY';
  override message: string = 'The provided chat ID is empty.';
}
export class ChatIdInvalid extends BadRequest {
  override id: string = 'CHAT_ID_INVALID';
  override message: string = 'The provided chat id is invalid.';
}
export class ChatInvalid extends BadRequest {
  override id: string = 'CHAT_INVALID';
  override message: string = 'Invalid chat.';
}
export class ChatInvitePermanent extends BadRequest {
  override id: string = 'CHAT_INVITE_PERMANENT';
  override message: string = "You can't set an expiration date on permanent invite links.";
}
export class ChatLinkExists extends BadRequest {
  override id: string = 'CHAT_LINK_EXISTS';
  override message: string = "The chat is public, you can't hide the history to new users.";
}
export class ChatMemberAddFailed extends BadRequest {
  override id: string = 'CHAT_MEMBER_ADD_FAILED';
  override message: string = 'Could not add participants.';
}
export class ChatNotModified extends BadRequest {
  override id: string = 'CHAT_NOT_MODIFIED';
  override message: string =
    'No changes were made to chat information because the new information you passed is identical to the current information.';
}
export class ChatPublicRequired extends BadRequest {
  override id: string = 'CHAT_PUBLIC_REQUIRED';
  override message: string = 'You can only enable join requests in public groups.';
}
export class ChatRestricted extends BadRequest {
  override id: string = 'CHAT_RESTRICTED';
  override message: string = "You can't send messages in this chat, you were restricted.";
}
export class ChatRevokeDateUnsupported extends BadRequest {
  override id: string = 'CHAT_REVOKE_DATE_UNSUPPORTED';
  override message: string =
    '`min_date` and `max_date` are not available for using with non-user peers.';
}
export class ChatSendInlineForbidden extends BadRequest {
  override id: string = 'CHAT_SEND_INLINE_FORBIDDEN';
  override message: string = "You can't send inline messages in this group.";
}
export class ChatTitleEmpty extends BadRequest {
  override id: string = 'CHAT_TITLE_EMPTY';
  override message: string = 'No chat title provided.';
}
export class ChatTooBig extends BadRequest {
  override id: string = 'CHAT_TOO_BIG';
  override message: string =
    'This method is not available for groups with more than `chat_read_mark_size_threshold` members, [see client configuration &raquo;](https://core.telegram.org/api/config#client-configuration).';
}
export class CodeEmpty extends BadRequest {
  override id: string = 'CODE_EMPTY';
  override message: string = 'The provided code is empty.';
}
export class CodeHashInvalid extends BadRequest {
  override id: string = 'CODE_HASH_INVALID';
  override message: string = 'Code hash invalid.';
}
export class CodeInvalid extends BadRequest {
  override id: string = 'CODE_INVALID';
  override message: string = 'Code invalid.';
}
export class CollectibleInvalid extends BadRequest {
  override id: string = 'COLLECTIBLE_INVALID';
  override message: string = 'The specified collectible is invalid.';
}
export class CollectibleNotFound extends BadRequest {
  override id: string = 'COLLECTIBLE_NOT_FOUND';
  override message: string = 'The specified collectible could not be found.';
}
export class ColorInvalid extends BadRequest {
  override id: string = 'COLOR_INVALID';
  override message: string = 'The specified color palette ID was invalid.';
}
export class ConnectionApiIdInvalid extends BadRequest {
  override id: string = 'CONNECTION_API_ID_INVALID';
  override message: string = 'The provided API id is invalid.';
}
export class ConnectionAppVersionEmpty extends BadRequest {
  override id: string = 'CONNECTION_APP_VERSION_EMPTY';
  override message: string = 'App version is empty.';
}
export class ConnectionDeviceModelEmpty extends BadRequest {
  override id: string = 'CONNECTION_DEVICE_MODEL_EMPTY';
  override message: string = 'The specified device model is empty.';
}
export class ConnectionIdInvalid extends BadRequest {
  override id: string = 'CONNECTION_ID_INVALID';
  override message: string = 'The specified connection ID is invalid.';
}
export class ConnectionLangPackInvalid extends BadRequest {
  override id: string = 'CONNECTION_LANG_PACK_INVALID';
  override message: string = 'The specified language pack is empty.';
}
export class ConnectionLayerInvalid extends BadRequest {
  override id: string = 'CONNECTION_LAYER_INVALID';
  override message: string = 'Layer invalid.';
}
export class ConnectionNotInited extends BadRequest {
  override id: string = 'CONNECTION_NOT_INITED';
  override message: string =
    'Please initialize the connection using initConnection before making queries.';
}
export class ConnectionSystemEmpty extends BadRequest {
  override id: string = 'CONNECTION_SYSTEM_EMPTY';
  override message: string = 'The specified system version is empty.';
}
export class ConnectionSystemLangCodeEmpty extends BadRequest {
  override id: string = 'CONNECTION_SYSTEM_LANG_CODE_EMPTY';
  override message: string = 'The specified system language code is empty.';
}
export class ContactAddMissing extends BadRequest {
  override id: string = 'CONTACT_ADD_MISSING';
  override message: string = 'Contact to add is missing.';
}
export class ContactIdInvalid extends BadRequest {
  override id: string = 'CONTACT_ID_INVALID';
  override message: string = 'The provided contact ID is invalid.';
}
export class ContactMissing extends BadRequest {
  override id: string = 'CONTACT_MISSING';
  override message: string = 'The specified user is not a contact.';
}
export class ContactNameEmpty extends BadRequest {
  override id: string = 'CONTACT_NAME_EMPTY';
  override message: string = 'Contact name empty.';
}
export class ContactReqMissing extends BadRequest {
  override id: string = 'CONTACT_REQ_MISSING';
  override message: string = 'Missing contact request.';
}
export class CreateCallFailed extends BadRequest {
  override id: string = 'CREATE_CALL_FAILED';
  override message: string = 'An error occurred while creating the call.';
}
export class CurrencyTotalAmountInvalid extends BadRequest {
  override id: string = 'CURRENCY_TOTAL_AMOUNT_INVALID';
  override message: string = 'The total amount of all prices is invalid.';
}
export class CustomReactionsTooMany extends BadRequest {
  override id: string = 'CUSTOM_REACTIONS_TOO_MANY';
  override message: string = 'Too many custom reactions were specified.';
}
export class DataInvalid extends BadRequest {
  override id: string = 'DATA_INVALID';
  override message: string = 'Encrypted data invalid.';
}
export class DataJsonInvalid extends BadRequest {
  override id: string = 'DATA_JSON_INVALID';
  override message: string = 'The provided JSON data is invalid.';
}
export class DataTooLong extends BadRequest {
  override id: string = 'DATA_TOO_LONG';
  override message: string = 'Data too long.';
}
export class DateEmpty extends BadRequest {
  override id: string = 'DATE_EMPTY';
  override message: string = 'Date empty.';
}
export class DcIdInvalid extends BadRequest {
  override id: string = 'DC_ID_INVALID';
  override message: string = 'The provided DC ID is invalid.';
}
export class DhGAInvalid extends BadRequest {
  override id: string = 'DH_G_A_INVALID';
  override message: string = 'g_a invalid.';
}
export class DocumentInvalid extends BadRequest {
  override id: string = 'DOCUMENT_INVALID';
  override message: string = 'The specified document is invalid.';
}
export class EmailHashExpired extends BadRequest {
  override id: string = 'EMAIL_HASH_EXPIRED';
  override message: string = 'Email hash expired.';
}
export class EmailInvalid extends BadRequest {
  override id: string = 'EMAIL_INVALID';
  override message: string = 'The specified email is invalid.';
}
export class EmailNotAllowed extends BadRequest {
  override id: string = 'EMAIL_NOT_ALLOWED';
  override message: string = 'The specified email cannot be used to complete the operation.';
}
export class EmailNotSetup extends BadRequest {
  override id: string = 'EMAIL_NOT_SETUP';
  override message: string =
    'In order to change the login email with emailVerifyPurposeLoginChange, an existing login email must already be set using emailVerifyPurposeLoginSetup.';
}
export class EmailUnconfirmed extends BadRequest {
  override id: string = 'EMAIL_UNCONFIRMED';
  override message: string = 'Email unconfirmed.';
}
export class EmailUnconfirmedX extends BadRequest {
  override id: string = 'EMAIL_UNCONFIRMED_X';
  override message: string =
    "The provided email isn't confirmed, {value} is the length of the verification code that was just sent to the email: use [account.verifyEmail](https://core.telegram.org/method/account.verifyEmail) to enter the received verification code and enable the recovery email.";
}
export class EmailVerifyExpired extends BadRequest {
  override id: string = 'EMAIL_VERIFY_EXPIRED';
  override message: string = 'The verification email has expired.';
}
export class EmojiInvalid extends BadRequest {
  override id: string = 'EMOJI_INVALID';
  override message: string = 'The specified theme emoji is valid.';
}
export class EmojiMarkupInvalid extends BadRequest {
  override id: string = 'EMOJI_MARKUP_INVALID';
  override message: string = 'The specified `video_emoji_markup` was invalid.';
}
export class EmojiNotModified extends BadRequest {
  override id: string = 'EMOJI_NOT_MODIFIED';
  override message: string = "The theme wasn't changed.";
}
export class EmoticonEmpty extends BadRequest {
  override id: string = 'EMOTICON_EMPTY';
  override message: string = 'The emoji is empty.';
}
export class EmoticonInvalid extends BadRequest {
  override id: string = 'EMOTICON_INVALID';
  override message: string = 'The specified emoji is invalid.';
}
export class EmoticonStickerpackMissing extends BadRequest {
  override id: string = 'EMOTICON_STICKERPACK_MISSING';
  override message: string = 'inputStickerSetDice.emoji cannot be empty.';
}
export class EncryptedMessageInvalid extends BadRequest {
  override id: string = 'ENCRYPTED_MESSAGE_INVALID';
  override message: string = 'Encrypted message invalid.';
}
export class EncryptionAlreadyAccepted extends BadRequest {
  override id: string = 'ENCRYPTION_ALREADY_ACCEPTED';
  override message: string = 'Secret chat already accepted.';
}
export class EncryptionAlreadyDeclined extends BadRequest {
  override id: string = 'ENCRYPTION_ALREADY_DECLINED';
  override message: string = 'The secret chat was already declined.';
}
export class EncryptionDeclined extends BadRequest {
  override id: string = 'ENCRYPTION_DECLINED';
  override message: string = 'The secret chat was declined.';
}
export class EncryptionIdInvalid extends BadRequest {
  override id: string = 'ENCRYPTION_ID_INVALID';
  override message: string = 'The provided secret chat ID is invalid.';
}
export class EntitiesTooLong extends BadRequest {
  override id: string = 'ENTITIES_TOO_LONG';
  override message: string = 'You provided too many styled message entities.';
}
export class EntityBoundsInvalid extends BadRequest {
  override id: string = 'ENTITY_BOUNDS_INVALID';
  override message: string =
    'A specified [entity offset or length](https://core.telegram.org/api/entities#entity-length) is invalid, see [here &raquo;](https://core.telegram.org/api/entities#entity-length) for info on how to properly compute the entity offset/length.';
}
export class EntityMentionUserInvalid extends BadRequest {
  override id: string = 'ENTITY_MENTION_USER_INVALID';
  override message: string = 'You mentioned an invalid user.';
}
export class ErrorTextEmpty extends BadRequest {
  override id: string = 'ERROR_TEXT_EMPTY';
  override message: string = 'The provided error message is empty.';
}
export class ExpireDateInvalid extends BadRequest {
  override id: string = 'EXPIRE_DATE_INVALID';
  override message: string = 'The specified expiration date is invalid.';
}
export class ExportCardInvalid extends BadRequest {
  override id: string = 'EXPORT_CARD_INVALID';
  override message: string = 'Provided card is invalid.';
}
export class ExtendedMediaAmountInvalid extends BadRequest {
  override id: string = 'EXTENDED_MEDIA_AMOUNT_INVALID';
  override message: string =
    'The specified `stars_amount` of the passed [inputMediaPaidMedia](https://core.telegram.org/constructor/inputMediaPaidMedia) is invalid.';
}
export class ExternalUrlInvalid extends BadRequest {
  override id: string = 'EXTERNAL_URL_INVALID';
  override message: string = 'External URL invalid.';
}
export class FieldNameEmpty extends BadRequest {
  override id: string = 'FIELD_NAME_EMPTY';
  override message: string = 'The field with the name FIELD_NAME is missing';
}
export class FieldNameInvalid extends BadRequest {
  override id: string = 'FIELD_NAME_INVALID';
  override message: string = 'The field with the name FIELD_NAME is invalid';
}
export class FileContentTypeInvalid extends BadRequest {
  override id: string = 'FILE_CONTENT_TYPE_INVALID';
  override message: string = 'File content-type is invalid.';
}
export class FileEmtpy extends BadRequest {
  override id: string = 'FILE_EMTPY';
  override message: string = 'An empty file was provided.';
}
export class FileIdInvalid extends BadRequest {
  override id: string = 'FILE_ID_INVALID';
  override message: string = 'The provided file id is invalid.';
}
export class FileMigrate extends BadRequest {
  override id: string = 'FILE_MIGRATE_X';
  override message: string =
    'The file currently being accessed is stored in DC {value}, please re-send the query to that DC.';
}
export class FilePartsInvalid extends BadRequest {
  override id: string = 'FILE_PARTS_INVALID';
  override message: string = 'The number of file parts is invalid.';
}
export class FilePartEmpty extends BadRequest {
  override id: string = 'FILE_PART_EMPTY';
  override message: string = 'The provided file part is empty.';
}
export class FilePartInvalid extends BadRequest {
  override id: string = 'FILE_PART_INVALID';
  override message: string = 'The file part number is invalid.';
}
export class FilePartLengthInvalid extends BadRequest {
  override id: string = 'FILE_PART_LENGTH_INVALID';
  override message: string = 'The length of a file part is invalid.';
}
export class FilePartSizeChanged extends BadRequest {
  override id: string = 'FILE_PART_SIZE_CHANGED';
  override message: string = 'Provided file part size has changed.';
}
export class FilePartSizeInvalid extends BadRequest {
  override id: string = 'FILE_PART_SIZE_INVALID';
  override message: string = 'The provided file part size is invalid.';
}
export class FilePartTooBig extends BadRequest {
  override id: string = 'FILE_PART_TOO_BIG';
  override message: string = 'The uploaded file part is too big.';
}
export class FilePartTooSmall extends BadRequest {
  override id: string = 'FILE_PART_TOO_SMALL';
  override message: string =
    'The size of the uploaded file part is too small, please see the documentation for the allowed sizes.';
}
export class FilePartMissing extends BadRequest {
  override id: string = 'FILE_PART_X_MISSING';
  override message: string =
    'Part {value} of the file is missing from storage. Try repeating the method call to resave the part.';
}
export class FileReferenceAny extends BadRequest {
  override id: string = 'FILE_REFERENCE_*';
  override message: string =
    'The file reference expired, it [must be refreshed](https://core.telegram.org/api/file_reference).';
}
export class FileReferenceEmpty extends BadRequest {
  override id: string = 'FILE_REFERENCE_EMPTY';
  override message: string =
    'An empty [file reference](https://core.telegram.org/api/file_reference) was specified.';
}
export class FileReferenceExpired extends BadRequest {
  override id: string = 'FILE_REFERENCE_EXPIRED';
  override message: string =
    'File reference expired, it must be refetched as described in [the documentation](https://core.telegram.org/api/file_reference).';
}
export class FileReferenceInvalid extends BadRequest {
  override id: string = 'FILE_REFERENCE_INVALID';
  override message: string =
    'The specified [file reference](https://core.telegram.org/api/file_reference) is invalid.';
}
export class FileReferenceXExpired extends BadRequest {
  override id: string = 'FILE_REFERENCE_X_EXPIRED';
  override message: string =
    'The file reference of the media file at index {value} in the passed media array expired, it [must be refreshed](https://core.telegram.org/api/file_reference).';
}
export class FileReferenceXInvalid extends BadRequest {
  override id: string = 'FILE_REFERENCE_X_INVALID';
  override message: string =
    'The file reference of the media file at index {value} in the passed media array is invalid.';
}
export class FileTitleEmpty extends BadRequest {
  override id: string = 'FILE_TITLE_EMPTY';
  override message: string = 'An empty file title was specified.';
}
export class FileTokenInvalid extends BadRequest {
  override id: string = 'FILE_TOKEN_INVALID';
  override message: string =
    'The master DC did not accept the `file_token` (e.g., the token has expired). Continue downloading the file from the master DC using upload.getFile.';
}
export class FilterIdInvalid extends BadRequest {
  override id: string = 'FILTER_ID_INVALID';
  override message: string = 'The specified filter ID is invalid.';
}
export class FilterIncludeEmpty extends BadRequest {
  override id: string = 'FILTER_INCLUDE_EMPTY';
  override message: string = 'The include_peers vector of the filter is empty.';
}
export class FilterNotSupported extends BadRequest {
  override id: string = 'FILTER_NOT_SUPPORTED';
  override message: string = 'The specified filter cannot be used in this context.';
}
export class FilterTitleEmpty extends BadRequest {
  override id: string = 'FILTER_TITLE_EMPTY';
  override message: string = 'The title field of the filter is empty.';
}
export class FirstnameInvalid extends BadRequest {
  override id: string = 'FIRSTNAME_INVALID';
  override message: string = 'The first name is invalid.';
}
export class FolderIdEmpty extends BadRequest {
  override id: string = 'FOLDER_ID_EMPTY';
  override message: string = 'An empty folder ID was specified.';
}
export class FolderIdInvalid extends BadRequest {
  override id: string = 'FOLDER_ID_INVALID';
  override message: string = 'Invalid folder ID.';
}
export class FormExpired extends BadRequest {
  override id: string = 'FORM_EXPIRED';
  override message: string =
    'The form was generated more than 10 minutes ago and has expired, please re-generate it using [payments.getPaymentForm](https://core.telegram.org/method/payments.getPaymentForm) and pass the new `form_id`.';
}
export class FormIdEmpty extends BadRequest {
  override id: string = 'FORM_ID_EMPTY';
  override message: string = 'The specified form ID is empty.';
}
export class FormUnsupported extends BadRequest {
  override id: string = 'FORM_UNSUPPORTED';
  override message: string = 'Please update your client.';
}
export class ForumEnabled extends BadRequest {
  override id: string = 'FORUM_ENABLED';
  override message: string =
    "You can't execute the specified action because the group is a [forum](https://core.telegram.org/api/forum), disable forum functionality to continue.";
}
export class FreshChangeAdminsForbidden extends BadRequest {
  override id: string = 'FRESH_CHANGE_ADMINS_FORBIDDEN';
  override message: string =
    "You were just elected admin, you can't add or modify other admins yet.";
}
export class FromMessageBotDisabled extends BadRequest {
  override id: string = 'FROM_MESSAGE_BOT_DISABLED';
  override message: string = "Bots can't use fromMessage min constructors.";
}
export class FromPeerInvalid extends BadRequest {
  override id: string = 'FROM_PEER_INVALID';
  override message: string = 'The specified from_id is invalid.';
}
export class GameBotInvalid extends BadRequest {
  override id: string = 'GAME_BOT_INVALID';
  override message: string = "Bots can't send another bot's game.";
}
export class GeneralModifyIconForbidden extends BadRequest {
  override id: string = 'GENERAL_MODIFY_ICON_FORBIDDEN';
  override message: string = 'You can\'t modify the icon of the "General" topic.';
}
export class GeoPointInvalid extends BadRequest {
  override id: string = 'GEO_POINT_INVALID';
  override message: string = 'Invalid geoposition provided.';
}
export class GiftSlugExpired extends BadRequest {
  override id: string = 'GIFT_SLUG_EXPIRED';
  override message: string = 'The specified gift slug has expired.';
}
export class GiftSlugInvalid extends BadRequest {
  override id: string = 'GIFT_SLUG_INVALID';
  override message: string = 'The specified slug is invalid.';
}
export class GifContentTypeInvalid extends BadRequest {
  override id: string = 'GIF_CONTENT_TYPE_INVALID';
  override message: string = 'GIF content-type invalid.';
}
export class GifIdInvalid extends BadRequest {
  override id: string = 'GIF_ID_INVALID';
  override message: string = 'The provided GIF ID is invalid.';
}
export class GraphExpiredReload extends BadRequest {
  override id: string = 'GRAPH_EXPIRED_RELOAD';
  override message: string = 'This graph has expired, please obtain a new graph token.';
}
export class GraphInvalidReload extends BadRequest {
  override id: string = 'GRAPH_INVALID_RELOAD';
  override message: string =
    'Invalid graph token provided, please reload the stats and provide the updated token.';
}
export class GraphOutdatedReload extends BadRequest {
  override id: string = 'GRAPH_OUTDATED_RELOAD';
  override message: string =
    'The graph is outdated, please get a new async token using stats.getBroadcastStats.';
}
export class GroupcallAlreadyDiscarded extends BadRequest {
  override id: string = 'GROUPCALL_ALREADY_DISCARDED';
  override message: string = 'The group call was already discarded.';
}
export class GroupcallForbidden extends BadRequest {
  override id: string = 'GROUPCALL_FORBIDDEN';
  override message: string = 'The group call has already ended.';
}
export class GroupcallInvalid extends BadRequest {
  override id: string = 'GROUPCALL_INVALID';
  override message: string = 'The specified group call is invalid.';
}
export class GroupcallJoinMissing extends BadRequest {
  override id: string = 'GROUPCALL_JOIN_MISSING';
  override message: string = "You haven't joined this group call.";
}
export class GroupcallNotModified extends BadRequest {
  override id: string = 'GROUPCALL_NOT_MODIFIED';
  override message: string = "Group call settings weren't modified.";
}
export class GroupcallSsrcDuplicateMuch extends BadRequest {
  override id: string = 'GROUPCALL_SSRC_DUPLICATE_MUCH';
  override message: string = 'The app needs to retry joining the group call with a new SSRC value.';
}
export class GroupedMediaInvalid extends BadRequest {
  override id: string = 'GROUPED_MEDIA_INVALID';
  override message: string = 'Invalid grouped media.';
}
export class GroupCallInvalid extends BadRequest {
  override id: string = 'GROUP_CALL_INVALID';
  override message: string = 'The group call is invalid';
}
export class HashtagInvalid extends BadRequest {
  override id: string = 'HASHTAG_INVALID';
  override message: string = 'The specified hashtag is invalid.';
}
export class HashInvalid extends BadRequest {
  override id: string = 'HASH_INVALID';
  override message: string = 'The provided hash is invalid.';
}
export class HideRequesterMissing extends BadRequest {
  override id: string = 'HIDE_REQUESTER_MISSING';
  override message: string = 'The join request was missing or was already handled.';
}
export class IdExpired extends BadRequest {
  override id: string = 'ID_EXPIRED';
  override message: string = 'The passed prepared inline message ID has expired.';
}
export class IdInvalid extends BadRequest {
  override id: string = 'ID_INVALID';
  override message: string = 'The passed ID is invalid.';
}
export class ImageProcessFailed extends BadRequest {
  override id: string = 'IMAGE_PROCESS_FAILED';
  override message: string = 'Failure while processing image.';
}
export class ImportFileInvalid extends BadRequest {
  override id: string = 'IMPORT_FILE_INVALID';
  override message: string = 'The specified chat export file is invalid.';
}
export class ImportFormatDateInvalid extends BadRequest {
  override id: string = 'IMPORT_FORMAT_DATE_INVALID';
  override message: string = 'The date specified in the import file is invalid.';
}
export class ImportFormatUnrecognized extends BadRequest {
  override id: string = 'IMPORT_FORMAT_UNRECOGNIZED';
  override message: string =
    'The specified chat export file was exported from an unsupported chat app.';
}
export class ImportHistoryLogEmpty extends BadRequest {
  override id: string = 'IMPORT_HISTORY_LOG_EMPTY';
  override message: string = '';
}
export class ImportIdInvalid extends BadRequest {
  override id: string = 'IMPORT_ID_INVALID';
  override message: string = 'The specified import ID is invalid.';
}
export class ImportTokenInvalid extends BadRequest {
  override id: string = 'IMPORT_TOKEN_INVALID';
  override message: string = 'The specified token is invalid.';
}
export class InlineResultExpired extends BadRequest {
  override id: string = 'INLINE_RESULT_EXPIRED';
  override message: string = 'The inline query expired.';
}
export class InputChatlistInvalid extends BadRequest {
  override id: string = 'INPUT_CHATLIST_INVALID';
  override message: string = 'The specified folder is invalid.';
}
export class InputConstructorInvalid extends BadRequest {
  override id: string = 'INPUT_CONSTRUCTOR_INVALID';
  override message: string = 'The specified TL constructor is invalid.';
}
export class InputFetchError extends BadRequest {
  override id: string = 'INPUT_FETCH_ERROR';
  override message: string = 'An error occurred while parsing the provided TL constructor.';
}
export class InputFetchFail extends BadRequest {
  override id: string = 'INPUT_FETCH_FAIL';
  override message: string = 'An error occurred while parsing the provided TL constructor.';
}
export class InputFileInvalid extends BadRequest {
  override id: string = 'INPUT_FILE_INVALID';
  override message: string =
    'The specified [InputFile](https://core.telegram.org/type/InputFile) is invalid.';
}
export class InputFilterInvalid extends BadRequest {
  override id: string = 'INPUT_FILTER_INVALID';
  override message: string = 'The specified filter is invalid.';
}
export class InputLayerInvalid extends BadRequest {
  override id: string = 'INPUT_LAYER_INVALID';
  override message: string = 'The specified layer is invalid.';
}
export class InputMethodInvalid extends BadRequest {
  override id: string = 'INPUT_METHOD_INVALID';
  override message: string = 'The specified method is invalid.';
}
export class InputPeersEmpty extends BadRequest {
  override id: string = 'INPUT_PEERS_EMPTY';
  override message: string = 'The specified peer array is empty.';
}
export class InputRequestTooLong extends BadRequest {
  override id: string = 'INPUT_REQUEST_TOO_LONG';
  override message: string = 'The request payload is too long.';
}
export class InputTextEmpty extends BadRequest {
  override id: string = 'INPUT_TEXT_EMPTY';
  override message: string = 'The specified text is empty.';
}
export class InputTextTooLong extends BadRequest {
  override id: string = 'INPUT_TEXT_TOO_LONG';
  override message: string = 'The specified text is too long.';
}
export class InputUserDeactivated extends BadRequest {
  override id: string = 'INPUT_USER_DEACTIVATED';
  override message: string = 'The specified user was deleted.';
}
export class InvitesTooMuch extends BadRequest {
  override id: string = 'INVITES_TOO_MUCH';
  override message: string =
    'The maximum number of per-folder invites specified by the `chatlist_invites_limit_default`/`chatlist_invites_limit_premium` [client configuration parameters &raquo;](https://core.telegram.org/api/config#chatlist-invites-limit-default) was reached.';
}
export class InviteForbiddenWithJoinas extends BadRequest {
  override id: string = 'INVITE_FORBIDDEN_WITH_JOINAS';
  override message: string =
    "If the user has anonymously joined a group call as a channel, they can't invite other users to the group call because that would cause deanonymization, because the invite would be sent using the original user ID, not the anonymized channel ID.";
}
export class InviteHashEmpty extends BadRequest {
  override id: string = 'INVITE_HASH_EMPTY';
  override message: string = 'The invite hash is empty.';
}
export class InviteHashExpired extends BadRequest {
  override id: string = 'INVITE_HASH_EXPIRED';
  override message: string = 'The invite link has expired.';
}
export class InviteHashInvalid extends BadRequest {
  override id: string = 'INVITE_HASH_INVALID';
  override message: string = 'The invite hash is invalid.';
}
export class InviteRequestSent extends BadRequest {
  override id: string = 'INVITE_REQUEST_SENT';
  override message: string = 'You have successfully requested to join this chat or channel.';
}
export class InviteRevokedMissing extends BadRequest {
  override id: string = 'INVITE_REVOKED_MISSING';
  override message: string = 'The specified invite link was already revoked or is invalid.';
}
export class InviteSlugEmpty extends BadRequest {
  override id: string = 'INVITE_SLUG_EMPTY';
  override message: string = 'The specified invite slug is empty.';
}
export class InviteSlugExpired extends BadRequest {
  override id: string = 'INVITE_SLUG_EXPIRED';
  override message: string = 'The specified chat folder link has expired.';
}
export class InviteSlugInvalid extends BadRequest {
  override id: string = 'INVITE_SLUG_INVALID';
  override message: string = 'The specified invitation slug is invalid.';
}
export class InvoicePayloadInvalid extends BadRequest {
  override id: string = 'INVOICE_PAYLOAD_INVALID';
  override message: string = 'The specified invoice payload is invalid.';
}
export class JoinAsPeerInvalid extends BadRequest {
  override id: string = 'JOIN_AS_PEER_INVALID';
  override message: string = 'The specified peer cannot be used to join a group call.';
}
export class LanguageInvalid extends BadRequest {
  override id: string = 'LANGUAGE_INVALID';
  override message: string = 'The specified lang_code is invalid.';
}
export class LangCodeInvalid extends BadRequest {
  override id: string = 'LANG_CODE_INVALID';
  override message: string = 'The specified language code is invalid.';
}
export class LangCodeNotSupported extends BadRequest {
  override id: string = 'LANG_CODE_NOT_SUPPORTED';
  override message: string = 'The specified language code is not supported.';
}
export class LangPackInvalid extends BadRequest {
  override id: string = 'LANG_PACK_INVALID';
  override message: string = 'The provided language pack is invalid.';
}
export class LastnameInvalid extends BadRequest {
  override id: string = 'LASTNAME_INVALID';
  override message: string = 'The last name is invalid.';
}
export class LimitInvalid extends BadRequest {
  override id: string = 'LIMIT_INVALID';
  override message: string = 'The provided limit is invalid.';
}
export class LinkNotModified extends BadRequest {
  override id: string = 'LINK_NOT_MODIFIED';
  override message: string = 'Discussion link not modified.';
}
export class LocationInvalid extends BadRequest {
  override id: string = 'LOCATION_INVALID';
  override message: string = 'The provided location is invalid.';
}
export class MaxDateInvalid extends BadRequest {
  override id: string = 'MAX_DATE_INVALID';
  override message: string = 'The specified maximum date is invalid.';
}
export class MaxIdInvalid extends BadRequest {
  override id: string = 'MAX_ID_INVALID';
  override message: string = 'The provided max ID is invalid.';
}
export class MaxQtsInvalid extends BadRequest {
  override id: string = 'MAX_QTS_INVALID';
  override message: string = 'The specified max_qts is invalid.';
}
export class Md5ChecksumInvalid extends BadRequest {
  override id: string = 'MD5_CHECKSUM_INVALID';
  override message: string = 'The MD5 checksums do not match.';
}
export class MediaCaptionTooLong extends BadRequest {
  override id: string = 'MEDIA_CAPTION_TOO_LONG';
  override message: string = 'The caption is too long.';
}
export class MediaEmpty extends BadRequest {
  override id: string = 'MEDIA_EMPTY';
  override message: string = 'The provided media object is invalid.';
}
export class MediaFileInvalid extends BadRequest {
  override id: string = 'MEDIA_FILE_INVALID';
  override message: string = 'The specified media file is invalid.';
}
export class MediaGroupedInvalid extends BadRequest {
  override id: string = 'MEDIA_GROUPED_INVALID';
  override message: string = 'You tried to send media of different types in an album.';
}
export class MediaInvalid extends BadRequest {
  override id: string = 'MEDIA_INVALID';
  override message: string = 'Media invalid.';
}
export class MediaNewInvalid extends BadRequest {
  override id: string = 'MEDIA_NEW_INVALID';
  override message: string = 'The new media is invalid.';
}
export class MediaPrevInvalid extends BadRequest {
  override id: string = 'MEDIA_PREV_INVALID';
  override message: string = 'Previous media invalid.';
}
export class MediaTtlInvalid extends BadRequest {
  override id: string = 'MEDIA_TTL_INVALID';
  override message: string = 'The specified media TTL is invalid.';
}
export class MediaTypeInvalid extends BadRequest {
  override id: string = 'MEDIA_TYPE_INVALID';
  override message: string = 'The specified media type cannot be used in stories.';
}
export class MediaVideoStoryMissing extends BadRequest {
  override id: string = 'MEDIA_VIDEO_STORY_MISSING';
  override message: string =
    'A non-story video cannot be repubblished as a story (emitted when trying to resend a non-story video as a story using inputDocument).';
}
export class MegagroupGeoRequired extends BadRequest {
  override id: string = 'MEGAGROUP_GEO_REQUIRED';
  override message: string = 'This method can only be invoked on a geogroup.';
}
export class MegagroupIdInvalid extends BadRequest {
  override id: string = 'MEGAGROUP_ID_INVALID';
  override message: string = 'Invalid supergroup ID.';
}
export class MegagroupPrehistoryHidden extends BadRequest {
  override id: string = 'MEGAGROUP_PREHISTORY_HIDDEN';
  override message: string =
    "Group with hidden history for new members can't be set as discussion groups.";
}
export class MegagroupRequired extends BadRequest {
  override id: string = 'MEGAGROUP_REQUIRED';
  override message: string = 'You can only use this method on a supergroup.';
}
export class MessageEditTimeExpired extends BadRequest {
  override id: string = 'MESSAGE_EDIT_TIME_EXPIRED';
  override message: string =
    "You can't edit this message anymore, too much time has passed since its creation.";
}
export class MessageEmpty extends BadRequest {
  override id: string = 'MESSAGE_EMPTY';
  override message: string = 'The provided message is empty.';
}
export class MessageIdsEmpty extends BadRequest {
  override id: string = 'MESSAGE_IDS_EMPTY';
  override message: string = 'No message ids were provided.';
}
export class MessageIdInvalid extends BadRequest {
  override id: string = 'MESSAGE_ID_INVALID';
  override message: string = 'The provided message id is invalid.';
}
export class MessageNotModified extends BadRequest {
  override id: string = 'MESSAGE_NOT_MODIFIED';
  override message: string =
    "The provided message data is identical to the previous message data, the message wasn't modified.";
}
export class MessageNotReadYet extends BadRequest {
  override id: string = 'MESSAGE_NOT_READ_YET';
  override message: string = "The specified message wasn't read yet.";
}
export class MessagePollClosed extends BadRequest {
  override id: string = 'MESSAGE_POLL_CLOSED';
  override message: string = 'Poll closed.';
}
export class MessageTooLong extends BadRequest {
  override id: string = 'MESSAGE_TOO_LONG';
  override message: string = 'The provided message is too long.';
}
export class MessageTooOld extends BadRequest {
  override id: string = 'MESSAGE_TOO_OLD';
  override message: string = 'The message is too old, the requested information is not available.';
}
export class MethodInvalid extends BadRequest {
  override id: string = 'METHOD_INVALID';
  override message: string = 'The specified method is invalid.';
}
export class MinDateInvalid extends BadRequest {
  override id: string = 'MIN_DATE_INVALID';
  override message: string = 'The specified minimum date is invalid.';
}
export class MsgIdInvalid extends BadRequest {
  override id: string = 'MSG_ID_INVALID';
  override message: string = 'Invalid message ID provided.';
}
export class MsgTooOld extends BadRequest {
  override id: string = 'MSG_TOO_OLD';
  override message: string =
    '[`chat_read_mark_expire_period` seconds](https://core.telegram.org/api/config#chat-read-mark-expire-period) have passed since the message was sent, read receipts were deleted.';
}
export class MsgWaitFailed extends BadRequest {
  override id: string = 'MSG_WAIT_FAILED';
  override message: string = 'A waiting call returned an error.';
}
export class MultiMediaTooLong extends BadRequest {
  override id: string = 'MULTI_MEDIA_TOO_LONG';
  override message: string = 'Too many media files for album.';
}
export class NewSaltInvalid extends BadRequest {
  override id: string = 'NEW_SALT_INVALID';
  override message: string = 'The new salt is invalid.';
}
export class NewSettingsEmpty extends BadRequest {
  override id: string = 'NEW_SETTINGS_EMPTY';
  override message: string =
    'No password is set on the current account, and no new password was specified in `new_settings`.';
}
export class NewSettingsInvalid extends BadRequest {
  override id: string = 'NEW_SETTINGS_INVALID';
  override message: string = 'The new password settings are invalid.';
}
export class NextOffsetInvalid extends BadRequest {
  override id: string = 'NEXT_OFFSET_INVALID';
  override message: string = 'The specified offset is longer than 64 bytes.';
}
export class NotEligible extends BadRequest {
  override id: string = 'NOT_ELIGIBLE';
  override message: string =
    'The current user is not eligible to join the Peer-to-Peer Login Program.';
}
export class NotJoined extends BadRequest {
  override id: string = 'NOT_JOINED';
  override message: string = "The current user hasn't joined the Peer-to-Peer Login Program.";
}
export class OffsetInvalid extends BadRequest {
  override id: string = 'OFFSET_INVALID';
  override message: string = 'The provided offset is invalid.';
}
export class OffsetPeerIdInvalid extends BadRequest {
  override id: string = 'OFFSET_PEER_ID_INVALID';
  override message: string = 'The provided offset peer is invalid.';
}
export class OptionsTooMuch extends BadRequest {
  override id: string = 'OPTIONS_TOO_MUCH';
  override message: string = 'Too many options provided.';
}
export class OptionInvalid extends BadRequest {
  override id: string = 'OPTION_INVALID';
  override message: string = 'Invalid option selected.';
}
export class OrderInvalid extends BadRequest {
  override id: string = 'ORDER_INVALID';
  override message: string = 'The specified username order is invalid.';
}
export class PackShortNameInvalid extends BadRequest {
  override id: string = 'PACK_SHORT_NAME_INVALID';
  override message: string = 'Short pack name invalid.';
}
export class PackShortNameOccupied extends BadRequest {
  override id: string = 'PACK_SHORT_NAME_OCCUPIED';
  override message: string = 'A stickerpack with this name already exists.';
}
export class PackTitleInvalid extends BadRequest {
  override id: string = 'PACK_TITLE_INVALID';
  override message: string = 'The stickerpack title is invalid.';
}
export class ParticipantsTooFew extends BadRequest {
  override id: string = 'PARTICIPANTS_TOO_FEW';
  override message: string = 'Not enough participants.';
}
export class ParticipantIdInvalid extends BadRequest {
  override id: string = 'PARTICIPANT_ID_INVALID';
  override message: string = 'The specified participant ID is invalid.';
}
export class ParticipantJoinMissing extends BadRequest {
  override id: string = 'PARTICIPANT_JOIN_MISSING';
  override message: string =
    "Trying to enable a presentation, when the user hasn't joined the Video Chat with [phone.joinGroupCall](https://core.telegram.org/method/phone.joinGroupCall).";
}
export class ParticipantVersionOutdated extends BadRequest {
  override id: string = 'PARTICIPANT_VERSION_OUTDATED';
  override message: string =
    'The other participant does not use an up to date telegram client with support for calls.';
}
export class PasswordEmpty extends BadRequest {
  override id: string = 'PASSWORD_EMPTY';
  override message: string = 'The provided password is empty.';
}
export class PasswordHashInvalid extends BadRequest {
  override id: string = 'PASSWORD_HASH_INVALID';
  override message: string = 'The provided password hash is invalid.';
}
export class PasswordMissing extends BadRequest {
  override id: string = 'PASSWORD_MISSING';
  override message: string =
    'You must [enable 2FA](https://core.telegram.org/api/srp) before executing this operation.';
}
export class PasswordRecoveryExpired extends BadRequest {
  override id: string = 'PASSWORD_RECOVERY_EXPIRED';
  override message: string = 'The recovery code has expired.';
}
export class PasswordRecoveryNa extends BadRequest {
  override id: string = 'PASSWORD_RECOVERY_NA';
  override message: string = "No email was set, can't recover password via email.";
}
export class PasswordRequired extends BadRequest {
  override id: string = 'PASSWORD_REQUIRED';
  override message: string =
    'A [2FA password](https://core.telegram.org/api/srp) must be configured to use Telegram Passport.';
}
export class PasswordTooFresh extends BadRequest {
  override id: string = 'PASSWORD_TOO_FRESH_X';
  override message: string =
    'The password was modified less than 24 hours ago, try again in {value} seconds.';
}
export class PaymentProviderInvalid extends BadRequest {
  override id: string = 'PAYMENT_PROVIDER_INVALID';
  override message: string = 'The specified payment provider is invalid.';
}
export class PeersListEmpty extends BadRequest {
  override id: string = 'PEERS_LIST_EMPTY';
  override message: string = 'The specified list of peers is empty.';
}
export class PeerFlood extends BadRequest {
  override id: string = 'PEER_FLOOD';
  override message: string =
    'The current account is spamreported, you cannot execute this action, check @spambot for more info.';
}
export class PeerHistoryEmpty extends BadRequest {
  override id: string = 'PEER_HISTORY_EMPTY';
  override message: string = "You can't pin an empty chat with a user.";
}
export class PeerIdInvalid extends BadRequest {
  override id: string = 'PEER_ID_INVALID';
  override message: string = 'The provided peer id is invalid.';
}
export class PeerIdNotSupported extends BadRequest {
  override id: string = 'PEER_ID_NOT_SUPPORTED';
  override message: string = 'The provided peer ID is not supported.';
}
export class PeerTypesInvalid extends BadRequest {
  override id: string = 'PEER_TYPES_INVALID';
  override message: string =
    'The passed [keyboardButtonSwitchInline](https://core.telegram.org/constructor/keyboardButtonSwitchInline).`peer_types` field is invalid.';
}
export class PersistentTimestampEmpty extends BadRequest {
  override id: string = 'PERSISTENT_TIMESTAMP_EMPTY';
  override message: string = 'Persistent timestamp empty.';
}
export class PersistentTimestampInvalid extends BadRequest {
  override id: string = 'PERSISTENT_TIMESTAMP_INVALID';
  override message: string = 'Persistent timestamp invalid.';
}
export class PhoneCodeEmpty extends BadRequest {
  override id: string = 'PHONE_CODE_EMPTY';
  override message: string = 'phone_code is missing.';
}
export class PhoneCodeExpired extends BadRequest {
  override id: string = 'PHONE_CODE_EXPIRED';
  override message: string = 'The phone code you provided has expired.';
}
export class PhoneCodeHashEmpty extends BadRequest {
  override id: string = 'PHONE_CODE_HASH_EMPTY';
  override message: string = 'phone_code_hash is missing.';
}
export class PhoneCodeInvalid extends BadRequest {
  override id: string = 'PHONE_CODE_INVALID';
  override message: string = 'The provided phone code is invalid.';
}
export class PhoneHashExpired extends BadRequest {
  override id: string = 'PHONE_HASH_EXPIRED';
  override message: string = 'An invalid or expired `phone_code_hash` was provided.';
}
export class PhoneNotOccupied extends BadRequest {
  override id: string = 'PHONE_NOT_OCCUPIED';
  override message: string = 'No user is associated to the specified phone number.';
}
export class PhoneNumberAppSignupForbidden extends BadRequest {
  override id: string = 'PHONE_NUMBER_APP_SIGNUP_FORBIDDEN';
  override message: string = "You can't sign up using this app.";
}
export class PhoneNumberBanned extends BadRequest {
  override id: string = 'PHONE_NUMBER_BANNED';
  override message: string = 'The provided phone number is banned from telegram.';
}
export class PhoneNumberFlood extends BadRequest {
  override id: string = 'PHONE_NUMBER_FLOOD';
  override message: string = 'You asked for the code too many times.';
}
export class PhoneNumberInvalid extends BadRequest {
  override id: string = 'PHONE_NUMBER_INVALID';
  override message: string = 'The phone number is invalid.';
}
export class PhoneNumberOccupied extends BadRequest {
  override id: string = 'PHONE_NUMBER_OCCUPIED';
  override message: string = 'The phone number is already in use.';
}
export class PhoneNumberUnoccupied extends BadRequest {
  override id: string = 'PHONE_NUMBER_UNOCCUPIED';
  override message: string = 'The phone number is not yet being used.';
}
export class PhonePasswordProtected extends BadRequest {
  override id: string = 'PHONE_PASSWORD_PROTECTED';
  override message: string = 'This phone is password protected.';
}
export class PhotoContentTypeInvalid extends BadRequest {
  override id: string = 'PHOTO_CONTENT_TYPE_INVALID';
  override message: string = 'Photo mime-type invalid.';
}
export class PhotoContentUrlEmpty extends BadRequest {
  override id: string = 'PHOTO_CONTENT_URL_EMPTY';
  override message: string = 'Photo URL invalid.';
}
export class PhotoCropFileMissing extends BadRequest {
  override id: string = 'PHOTO_CROP_FILE_MISSING';
  override message: string = 'Photo crop file missing.';
}
export class PhotoCropSizeSmall extends BadRequest {
  override id: string = 'PHOTO_CROP_SIZE_SMALL';
  override message: string = 'Photo is too small.';
}
export class PhotoExtInvalid extends BadRequest {
  override id: string = 'PHOTO_EXT_INVALID';
  override message: string = 'The extension of the photo is invalid.';
}
export class PhotoFileMissing extends BadRequest {
  override id: string = 'PHOTO_FILE_MISSING';
  override message: string = 'Profile photo file missing.';
}
export class PhotoIdInvalid extends BadRequest {
  override id: string = 'PHOTO_ID_INVALID';
  override message: string = 'Photo ID invalid.';
}
export class PhotoInvalid extends BadRequest {
  override id: string = 'PHOTO_INVALID';
  override message: string = 'Photo invalid.';
}
export class PhotoInvalidDimensions extends BadRequest {
  override id: string = 'PHOTO_INVALID_DIMENSIONS';
  override message: string = 'The photo dimensions are invalid.';
}
export class PhotoSaveFileInvalid extends BadRequest {
  override id: string = 'PHOTO_SAVE_FILE_INVALID';
  override message: string = 'Internal issues, try again later.';
}
export class PhotoThumbUrlEmpty extends BadRequest {
  override id: string = 'PHOTO_THUMB_URL_EMPTY';
  override message: string = 'Photo thumbnail URL is empty.';
}
export class PhotoThumbUrlInvalid extends BadRequest {
  override id: string = 'PHOTO_THUMB_URL_INVALID';
  override message: string = 'The photo thumb URL is invalid';
}
export class PinnedDialogsTooMuch extends BadRequest {
  override id: string = 'PINNED_DIALOGS_TOO_MUCH';
  override message: string = 'Too many pinned dialogs.';
}
export class PinRestricted extends BadRequest {
  override id: string = 'PIN_RESTRICTED';
  override message: string = "You can't pin messages.";
}
export class PollAnswersInvalid extends BadRequest {
  override id: string = 'POLL_ANSWERS_INVALID';
  override message: string = 'Invalid poll answers were provided.';
}
export class PollAnswerInvalid extends BadRequest {
  override id: string = 'POLL_ANSWER_INVALID';
  override message: string = 'One of the poll answers is not acceptable.';
}
export class PollOptionDuplicate extends BadRequest {
  override id: string = 'POLL_OPTION_DUPLICATE';
  override message: string = 'Duplicate poll options provided.';
}
export class PollOptionInvalid extends BadRequest {
  override id: string = 'POLL_OPTION_INVALID';
  override message: string = 'Invalid poll option provided.';
}
export class PollQuestionInvalid extends BadRequest {
  override id: string = 'POLL_QUESTION_INVALID';
  override message: string = 'One of the poll questions is not acceptable.';
}
export class PollUnsupported extends BadRequest {
  override id: string = 'POLL_UNSUPPORTED';
  override message: string = 'This layer does not support polls in the invoked method';
}
export class PollVoteRequired extends BadRequest {
  override id: string = 'POLL_VOTE_REQUIRED';
  override message: string = 'Cast a vote in the poll before calling this method';
}
export class PremiumAccountRequired extends BadRequest {
  override id: string = 'PREMIUM_ACCOUNT_REQUIRED';
  override message: string = 'A premium account is required to execute this action.';
}
export class PricingChatInvalid extends BadRequest {
  override id: string = 'PRICING_CHAT_INVALID';
  override message: string =
    'The pricing for the [subscription](https://core.telegram.org/api/subscriptions) is invalid, the maximum price is specified in the [`stars_subscription_amount_max` config key &raquo;](https://core.telegram.org/api/config#stars-subscription-amount-max).';
}
export class PrivacyKeyInvalid extends BadRequest {
  override id: string = 'PRIVACY_KEY_INVALID';
  override message: string = 'The privacy key is invalid.';
}
export class PrivacyTooLong extends BadRequest {
  override id: string = 'PRIVACY_TOO_LONG';
  override message: string = 'Too many privacy rules were specified, the current limit is 1000.';
}
export class PrivacyValueInvalid extends BadRequest {
  override id: string = 'PRIVACY_VALUE_INVALID';
  override message: string = 'The specified privacy rule combination is invalid.';
}
export class PublicKeyRequired extends BadRequest {
  override id: string = 'PUBLIC_KEY_REQUIRED';
  override message: string = 'A public key is required.';
}
export class QueryIdEmpty extends BadRequest {
  override id: string = 'QUERY_ID_EMPTY';
  override message: string = 'The query ID is empty.';
}
export class QueryIdInvalid extends BadRequest {
  override id: string = 'QUERY_ID_INVALID';
  override message: string = 'The query ID is invalid.';
}
export class QueryTooShort extends BadRequest {
  override id: string = 'QUERY_TOO_SHORT';
  override message: string = 'The query string is too short.';
}
export class QuickRepliesTooMuch extends BadRequest {
  override id: string = 'QUICK_REPLIES_TOO_MUCH';
  override message: string =
    'A maximum of [appConfig.`quick_replies_limit`](https://core.telegram.org/api/config#quick-replies-limit) shortcuts may be created, the limit was reached.';
}
export class QuizAnswerMissing extends BadRequest {
  override id: string = 'QUIZ_ANSWER_MISSING';
  override message: string =
    'You can forward a quiz while hiding the original author only after choosing an option in the quiz.';
}
export class QuizCorrectAnswersEmpty extends BadRequest {
  override id: string = 'QUIZ_CORRECT_ANSWERS_EMPTY';
  override message: string = 'No correct quiz answer was specified.';
}
export class QuizCorrectAnswersTooMuch extends BadRequest {
  override id: string = 'QUIZ_CORRECT_ANSWERS_TOO_MUCH';
  override message: string =
    'You specified too many correct answers in a quiz, quizzes can only have one right answer!';
}
export class QuizCorrectAnswerInvalid extends BadRequest {
  override id: string = 'QUIZ_CORRECT_ANSWER_INVALID';
  override message: string = 'An invalid value was provided to the correct_answers field.';
}
export class QuizMultipleInvalid extends BadRequest {
  override id: string = 'QUIZ_MULTIPLE_INVALID';
  override message: string = "Quizzes can't have the multiple_choice flag set!";
}
export class QuoteTextInvalid extends BadRequest {
  override id: string = 'QUOTE_TEXT_INVALID';
  override message: string = 'The specified `reply_to`.`quote_text` field is invalid.';
}
export class RaiseHandForbidden extends BadRequest {
  override id: string = 'RAISE_HAND_FORBIDDEN';
  override message: string = 'You cannot raise your hand.';
}
export class RandomIdEmpty extends BadRequest {
  override id: string = 'RANDOM_ID_EMPTY';
  override message: string = 'Random ID empty.';
}
export class RandomIdInvalid extends BadRequest {
  override id: string = 'RANDOM_ID_INVALID';
  override message: string = 'A provided random ID is invalid.';
}
export class RandomLengthInvalid extends BadRequest {
  override id: string = 'RANDOM_LENGTH_INVALID';
  override message: string = 'Random length invalid.';
}
export class RangesInvalid extends BadRequest {
  override id: string = 'RANGES_INVALID';
  override message: string = 'Invalid range provided.';
}
export class ReactionsTooMany extends BadRequest {
  override id: string = 'REACTIONS_TOO_MANY';
  override message: string =
    "The message already has exactly `reactions_uniq_max` reaction emojis, you can't react with a new emoji, see [the docs for more info &raquo;](https://core.telegram.org/api/config#client-configuration).";
}
export class ReactionEmpty extends BadRequest {
  override id: string = 'REACTION_EMPTY';
  override message: string = 'Empty reaction provided.';
}
export class ReactionInvalid extends BadRequest {
  override id: string = 'REACTION_INVALID';
  override message: string = 'The specified reaction is invalid.';
}
export class ReceiptEmpty extends BadRequest {
  override id: string = 'RECEIPT_EMPTY';
  override message: string = 'The specified receipt is empty.';
}
export class ReflectorNotAvailable extends BadRequest {
  override id: string = 'REFLECTOR_NOT_AVAILABLE';
  override message: string = 'The call reflector is not available';
}
export class ReplyMarkupBuyEmpty extends BadRequest {
  override id: string = 'REPLY_MARKUP_BUY_EMPTY';
  override message: string = 'Reply markup for buy button empty.';
}
export class ReplyMarkupGameEmpty extends BadRequest {
  override id: string = 'REPLY_MARKUP_GAME_EMPTY';
  override message: string =
    "A game message is being edited, but the newly provided keyboard doesn't have a keyboardButtonGame button.";
}
export class ReplyMarkupInvalid extends BadRequest {
  override id: string = 'REPLY_MARKUP_INVALID';
  override message: string = 'The provided reply markup is invalid.';
}
export class ReplyMarkupTooLong extends BadRequest {
  override id: string = 'REPLY_MARKUP_TOO_LONG';
  override message: string = 'The specified reply_markup is too long.';
}
export class ReplyMessagesTooMuch extends BadRequest {
  override id: string = 'REPLY_MESSAGES_TOO_MUCH';
  override message: string =
    'Each shortcut can contain a maximum of [appConfig.`quick_reply_messages_limit`](https://core.telegram.org/api/config#quick-reply-messages-limit) messages, the limit was reached.';
}
export class ReplyMessageIdInvalid extends BadRequest {
  override id: string = 'REPLY_MESSAGE_ID_INVALID';
  override message: string = 'The specified reply-to message ID is invalid.';
}
export class ReplyToInvalid extends BadRequest {
  override id: string = 'REPLY_TO_INVALID';
  override message: string = 'The specified `reply_to` field is invalid.';
}
export class ReplyToUserInvalid extends BadRequest {
  override id: string = 'REPLY_TO_USER_INVALID';
  override message: string = 'The replied-to user is invalid.';
}
export class RequestTokenInvalid extends BadRequest {
  override id: string = 'REQUEST_TOKEN_INVALID';
  override message: string =
    'The master DC did not accept the `request_token` from the CDN DC. Continue downloading the file from the master DC using upload.getFile.';
}
export class ResetRequestMissing extends BadRequest {
  override id: string = 'RESET_REQUEST_MISSING';
  override message: string = 'No password reset is in progress.';
}
export class ResultsTooMuch extends BadRequest {
  override id: string = 'RESULTS_TOO_MUCH';
  override message: string = 'Too many results were provided.';
}
export class ResultIdDuplicate extends BadRequest {
  override id: string = 'RESULT_ID_DUPLICATE';
  override message: string = 'You provided a duplicate result ID.';
}
export class ResultIdEmpty extends BadRequest {
  override id: string = 'RESULT_ID_EMPTY';
  override message: string = 'Result ID empty.';
}
export class ResultIdInvalid extends BadRequest {
  override id: string = 'RESULT_ID_INVALID';
  override message: string = 'One of the specified result IDs is invalid.';
}
export class ResultTypeInvalid extends BadRequest {
  override id: string = 'RESULT_TYPE_INVALID';
  override message: string = 'Result type invalid.';
}
export class RevoteNotAllowed extends BadRequest {
  override id: string = 'REVOTE_NOT_ALLOWED';
  override message: string = 'You cannot change your vote.';
}
export class RightsNotModified extends BadRequest {
  override id: string = 'RIGHTS_NOT_MODIFIED';
  override message: string =
    'The new admin rights are equal to the old rights, no change was made.';
}
export class RingtoneInvalid extends BadRequest {
  override id: string = 'RINGTONE_INVALID';
  override message: string = 'The specified ringtone is invalid.';
}
export class RingtoneMimeInvalid extends BadRequest {
  override id: string = 'RINGTONE_MIME_INVALID';
  override message: string = 'The MIME type for the ringtone is invalid.';
}
export class RsaDecryptFailed extends BadRequest {
  override id: string = 'RSA_DECRYPT_FAILED';
  override message: string = 'Internal RSA decryption failed.';
}
export class ScheduleBotNotAllowed extends BadRequest {
  override id: string = 'SCHEDULE_BOT_NOT_ALLOWED';
  override message: string = 'Bots cannot schedule messages.';
}
export class ScheduleDateInvalid extends BadRequest {
  override id: string = 'SCHEDULE_DATE_INVALID';
  override message: string = 'Invalid schedule date provided.';
}
export class ScheduleDateTooLate extends BadRequest {
  override id: string = 'SCHEDULE_DATE_TOO_LATE';
  override message: string = "You can't schedule a message this far in the future.";
}
export class ScheduleStatusPrivate extends BadRequest {
  override id: string = 'SCHEDULE_STATUS_PRIVATE';
  override message: string =
    "Can't schedule until user is online, if the user's last seen timestamp is hidden by their privacy settings.";
}
export class ScheduleTooMuch extends BadRequest {
  override id: string = 'SCHEDULE_TOO_MUCH';
  override message: string = 'There are too many scheduled messages.';
}
export class ScoreInvalid extends BadRequest {
  override id: string = 'SCORE_INVALID';
  override message: string = 'The specified game score is invalid.';
}
export class SearchQueryEmpty extends BadRequest {
  override id: string = 'SEARCH_QUERY_EMPTY';
  override message: string = 'The search query is empty.';
}
export class SearchWithLinkNotSupported extends BadRequest {
  override id: string = 'SEARCH_WITH_LINK_NOT_SUPPORTED';
  override message: string =
    'You cannot provide a search query and an invite link at the same time.';
}
export class SecondsInvalid extends BadRequest {
  override id: string = 'SECONDS_INVALID';
  override message: string = 'Invalid duration provided.';
}
export class SecureSecretRequired extends BadRequest {
  override id: string = 'SECURE_SECRET_REQUIRED';
  override message: string = 'A secure secret is required.';
}
export class SendAsPeerInvalid extends BadRequest {
  override id: string = 'SEND_AS_PEER_INVALID';
  override message: string = "You can't send messages as the specified peer.";
}
export class SendMessageMediaInvalid extends BadRequest {
  override id: string = 'SEND_MESSAGE_MEDIA_INVALID';
  override message: string = 'Invalid media provided.';
}
export class SendMessageTypeInvalid extends BadRequest {
  override id: string = 'SEND_MESSAGE_TYPE_INVALID';
  override message: string = 'The message type is invalid.';
}
export class SessionTooFresh extends BadRequest {
  override id: string = 'SESSION_TOO_FRESH_X';
  override message: string =
    'This session was created less than 24 hours ago, try again in {value} seconds.';
}
export class SettingsInvalid extends BadRequest {
  override id: string = 'SETTINGS_INVALID';
  override message: string = 'Invalid settings were provided.';
}
export class Sha256HashInvalid extends BadRequest {
  override id: string = 'SHA256_HASH_INVALID';
  override message: string = 'The provided SHA256 hash is invalid.';
}
export class ShortcutInvalid extends BadRequest {
  override id: string = 'SHORTCUT_INVALID';
  override message: string = 'The specified shortcut is invalid.';
}
export class ShortnameOccupyFailed extends BadRequest {
  override id: string = 'SHORTNAME_OCCUPY_FAILED';
  override message: string =
    'An error occurred when trying to register the short-name used for the sticker pack. Try a different name';
}
export class ShortNameInvalid extends BadRequest {
  override id: string = 'SHORT_NAME_INVALID';
  override message: string = 'The specified short name is invalid.';
}
export class ShortNameOccupied extends BadRequest {
  override id: string = 'SHORT_NAME_OCCUPIED';
  override message: string = 'The specified short name is already in use.';
}
export class SlotsEmpty extends BadRequest {
  override id: string = 'SLOTS_EMPTY';
  override message: string = 'The specified slot list is empty.';
}
export class SlowmodeMultiMsgsDisabled extends BadRequest {
  override id: string = 'SLOWMODE_MULTI_MSGS_DISABLED';
  override message: string =
    'Slowmode is enabled, you cannot forward multiple messages to this group.';
}
export class SlugInvalid extends BadRequest {
  override id: string = 'SLUG_INVALID';
  override message: string = 'The specified invoice slug is invalid.';
}
export class SmsjobIdInvalid extends BadRequest {
  override id: string = 'SMSJOB_ID_INVALID';
  override message: string = 'The specified job ID is invalid.';
}
export class SmsCodeCreateFailed extends BadRequest {
  override id: string = 'SMS_CODE_CREATE_FAILED';
  override message: string = 'An error occurred while creating the SMS code.';
}
export class SrpAInvalid extends BadRequest {
  override id: string = 'SRP_A_INVALID';
  override message: string = 'The specified inputCheckPasswordSRP.A value is invalid.';
}
export class SrpIdInvalid extends BadRequest {
  override id: string = 'SRP_ID_INVALID';
  override message: string = 'Invalid SRP ID provided.';
}
export class SrpPasswordChanged extends BadRequest {
  override id: string = 'SRP_PASSWORD_CHANGED';
  override message: string = 'Password has changed.';
}
export class StargiftInvalid extends BadRequest {
  override id: string = 'STARGIFT_INVALID';
  override message: string =
    'The passed [inputInvoiceStarGift](https://core.telegram.org/constructor/inputInvoiceStarGift) is invalid.';
}
export class StargiftUsageLimited extends BadRequest {
  override id: string = 'STARGIFT_USAGE_LIMITED';
  override message: string = 'The gift is sold out.';
}
export class StarrefAwaitingEnd extends BadRequest {
  override id: string = 'STARREF_AWAITING_END';
  override message: string =
    'The previous referral program was terminated less than 24 hours ago: further changes can be made after the date specified in userFull.starref_program.end_date.';
}
export class StarrefHashRevoked extends BadRequest {
  override id: string = 'STARREF_HASH_REVOKED';
  override message: string = 'The specified affiliate link was already revoked.';
}
export class StarrefPermilleInvalid extends BadRequest {
  override id: string = 'STARREF_PERMILLE_INVALID';
  override message: string =
    'The specified commission_permille is invalid: the minimum and maximum values for this parameter are contained in the [starref_min_commission_permille](https://core.telegram.org/api/config#starref-min-commission-permille) and [starref_max_commission_permille](https://core.telegram.org/api/config#starref-max-commission-permille) client configuration parameters.';
}
export class StarrefPermilleTooLow extends BadRequest {
  override id: string = 'STARREF_PERMILLE_TOO_LOW';
  override message: string =
    'The specified commission_permille is too low: the minimum and maximum values for this parameter are contained in the [starref_min_commission_permille](https://core.telegram.org/api/config#starref-min-commission-permille) and [starref_max_commission_permille](https://core.telegram.org/api/config#starref-max-commission-permille) client configuration parameters.';
}
export class StarsInvoiceInvalid extends BadRequest {
  override id: string = 'STARS_INVOICE_INVALID';
  override message: string = 'The specified Telegram Star invoice is invalid.';
}
export class StarsPaymentRequired extends BadRequest {
  override id: string = 'STARS_PAYMENT_REQUIRED';
  override message: string =
    'To import this chat invite link, you must first [pay for the associated Telegram Star subscription &raquo;](https://core.telegram.org/api/subscriptions#channel-subscriptions).';
}
export class StartParamEmpty extends BadRequest {
  override id: string = 'START_PARAM_EMPTY';
  override message: string = 'The start parameter is empty.';
}
export class StartParamInvalid extends BadRequest {
  override id: string = 'START_PARAM_INVALID';
  override message: string = 'Start parameter invalid.';
}
export class StartParamTooLong extends BadRequest {
  override id: string = 'START_PARAM_TOO_LONG';
  override message: string = 'Start parameter is too long.';
}
export class StickerpackStickersTooMuch extends BadRequest {
  override id: string = 'STICKERPACK_STICKERS_TOO_MUCH';
  override message: string =
    "There are too many stickers in this stickerpack, you can't add any more.";
}
export class StickersetInvalid extends BadRequest {
  override id: string = 'STICKERSET_INVALID';
  override message: string = 'The provided sticker set is invalid.';
}
export class StickersetNotModified extends BadRequest {
  override id: string = 'STICKERSET_NOT_MODIFIED';
  override message: string =
    'The passed stickerset information is equal to the current information.';
}
export class StickersEmpty extends BadRequest {
  override id: string = 'STICKERS_EMPTY';
  override message: string = 'No sticker provided.';
}
export class StickersTooMuch extends BadRequest {
  override id: string = 'STICKERS_TOO_MUCH';
  override message: string =
    "There are too many stickers in this stickerpack, you can't add any more.";
}
export class StickerDocumentInvalid extends BadRequest {
  override id: string = 'STICKER_DOCUMENT_INVALID';
  override message: string = 'The specified sticker document is invalid.';
}
export class StickerEmojiInvalid extends BadRequest {
  override id: string = 'STICKER_EMOJI_INVALID';
  override message: string = 'Sticker emoji invalid.';
}
export class StickerFileInvalid extends BadRequest {
  override id: string = 'STICKER_FILE_INVALID';
  override message: string = 'Sticker file invalid.';
}
export class StickerGifDimensions extends BadRequest {
  override id: string = 'STICKER_GIF_DIMENSIONS';
  override message: string = 'The specified video sticker has invalid dimensions.';
}
export class StickerIdInvalid extends BadRequest {
  override id: string = 'STICKER_ID_INVALID';
  override message: string = 'The provided sticker ID is invalid.';
}
export class StickerInvalid extends BadRequest {
  override id: string = 'STICKER_INVALID';
  override message: string = 'The provided sticker is invalid.';
}
export class StickerMimeInvalid extends BadRequest {
  override id: string = 'STICKER_MIME_INVALID';
  override message: string = 'The specified sticker MIME type is invalid.';
}
export class StickerPngDimensions extends BadRequest {
  override id: string = 'STICKER_PNG_DIMENSIONS';
  override message: string = 'Sticker png dimensions invalid.';
}
export class StickerPngNopng extends BadRequest {
  override id: string = 'STICKER_PNG_NOPNG';
  override message: string = 'One of the specified stickers is not a valid PNG file.';
}
export class StickerTgsNodoc extends BadRequest {
  override id: string = 'STICKER_TGS_NODOC';
  override message: string = 'You must send the animated sticker as a document.';
}
export class StickerTgsNotgs extends BadRequest {
  override id: string = 'STICKER_TGS_NOTGS';
  override message: string = 'Invalid TGS sticker provided.';
}
export class StickerThumbPngNopng extends BadRequest {
  override id: string = 'STICKER_THUMB_PNG_NOPNG';
  override message: string = 'Incorrect stickerset thumb file provided, PNG / WEBP expected.';
}
export class StickerThumbTgsNotgs extends BadRequest {
  override id: string = 'STICKER_THUMB_TGS_NOTGS';
  override message: string = 'Incorrect stickerset TGS thumb file provided.';
}
export class StickerVideoBig extends BadRequest {
  override id: string = 'STICKER_VIDEO_BIG';
  override message: string = 'The specified video sticker is too big.';
}
export class StickerVideoNodoc extends BadRequest {
  override id: string = 'STICKER_VIDEO_NODOC';
  override message: string = 'You must send the video sticker as a document.';
}
export class StickerVideoNowebm extends BadRequest {
  override id: string = 'STICKER_VIDEO_NOWEBM';
  override message: string = 'The specified video sticker is not in webm format.';
}
export class StoriesNeverCreated extends BadRequest {
  override id: string = 'STORIES_NEVER_CREATED';
  override message: string = "This peer hasn't ever posted any stories.";
}
export class StoriesTooMuch extends BadRequest {
  override id: string = 'STORIES_TOO_MUCH';
  override message: string =
    'You have hit the maximum active stories limit as specified by the [`story_expiring_limit_*` client configuration parameters](https://core.telegram.org/api/config#story-expiring-limit-default): you should buy a [Premium](https://core.telegram.org/api/premium) subscription, delete an active story, or wait for the oldest story to expire.';
}
export class StoryIdEmpty extends BadRequest {
  override id: string = 'STORY_ID_EMPTY';
  override message: string = 'You specified no story IDs.';
}
export class StoryIdInvalid extends BadRequest {
  override id: string = 'STORY_ID_INVALID';
  override message: string = 'The specified story ID is invalid.';
}
export class StoryNotModified extends BadRequest {
  override id: string = 'STORY_NOT_MODIFIED';
  override message: string =
    "The new story information you passed is equal to the previous story information, thus it wasn't modified.";
}
export class StoryPeriodInvalid extends BadRequest {
  override id: string = 'STORY_PERIOD_INVALID';
  override message: string = 'The specified story period is invalid for this account.';
}
export class StorySendFloodMonthly extends BadRequest {
  override id: string = 'STORY_SEND_FLOOD_MONTHLY_X';
  override message: string =
    "You've hit the monthly story limit as specified by the [`stories_sent_monthly_limit_*` client configuration parameters](https://core.telegram.org/api/config#stories-sent-monthly-limit-default): wait for the specified number of seconds before posting a new story.";
}
export class StorySendFloodWeekly extends BadRequest {
  override id: string = 'STORY_SEND_FLOOD_WEEKLY_X';
  override message: string =
    "You've hit the weekly story limit as specified by the [`stories_sent_weekly_limit_*` client configuration parameters](https://core.telegram.org/api/config#stories-sent-weekly-limit-default): wait for the specified number of seconds before posting a new story.";
}
export class SubscriptionExportMissing extends BadRequest {
  override id: string = 'SUBSCRIPTION_EXPORT_MISSING';
  override message: string =
    'You cannot send a [bot subscription invoice](https://core.telegram.org/api/subscriptions#bot-subscriptions) directly, you may only create invoice links using [payments.exportInvoice](https://core.telegram.org/method/payments.exportInvoice).';
}
export class SubscriptionPeriodInvalid extends BadRequest {
  override id: string = 'SUBSCRIPTION_PERIOD_INVALID';
  override message: string = 'The specified subscription_pricing.period is invalid.';
}
export class SwitchPmTextEmpty extends BadRequest {
  override id: string = 'SWITCH_PM_TEXT_EMPTY';
  override message: string = 'The switch_pm.text field was empty.';
}
export class SwitchWebviewUrlInvalid extends BadRequest {
  override id: string = 'SWITCH_WEBVIEW_URL_INVALID';
  override message: string = 'The URL specified in switch_webview.url is invalid!';
}
export class TakeoutInvalid extends BadRequest {
  override id: string = 'TAKEOUT_INVALID';
  override message: string = 'The specified takeout ID is invalid.';
}
export class TakeoutRequired extends BadRequest {
  override id: string = 'TAKEOUT_REQUIRED';
  override message: string =
    'A [takeout](https://core.telegram.org/api/takeout) session needs to be initialized first, [see here &raquo; for more info](https://core.telegram.org/api/takeout).';
}
export class TaskAlreadyExists extends BadRequest {
  override id: string = 'TASK_ALREADY_EXISTS';
  override message: string = 'An email reset was already requested.';
}
export class TempAuthKeyAlreadyBound extends BadRequest {
  override id: string = 'TEMP_AUTH_KEY_ALREADY_BOUND';
  override message: string =
    'The passed temporary key is already bound to another **perm_auth_key_id**.';
}
export class TempAuthKeyEmpty extends BadRequest {
  override id: string = 'TEMP_AUTH_KEY_EMPTY';
  override message: string = 'No temporary auth key provided.';
}
export class TermsUrlInvalid extends BadRequest {
  override id: string = 'TERMS_URL_INVALID';
  override message: string =
    'The specified [invoice](https://core.telegram.org/constructor/invoice).`terms_url` is invalid.';
}
export class ThemeFileInvalid extends BadRequest {
  override id: string = 'THEME_FILE_INVALID';
  override message: string = 'Invalid theme file provided.';
}
export class ThemeFormatInvalid extends BadRequest {
  override id: string = 'THEME_FORMAT_INVALID';
  override message: string = 'Invalid theme format provided.';
}
export class ThemeInvalid extends BadRequest {
  override id: string = 'THEME_INVALID';
  override message: string = 'Invalid theme provided.';
}
export class ThemeMimeInvalid extends BadRequest {
  override id: string = 'THEME_MIME_INVALID';
  override message: string = "The theme's MIME type is invalid.";
}
export class ThemeParamsInvalid extends BadRequest {
  override id: string = 'THEME_PARAMS_INVALID';
  override message: string = 'The specified `theme_params` field is invalid.';
}
export class ThemeTitleInvalid extends BadRequest {
  override id: string = 'THEME_TITLE_INVALID';
  override message: string = 'The specified theme title is invalid.';
}
export class TimezoneInvalid extends BadRequest {
  override id: string = 'TIMEZONE_INVALID';
  override message: string = 'The specified timezone does not exist.';
}
export class TitleInvalid extends BadRequest {
  override id: string = 'TITLE_INVALID';
  override message: string = 'The specified stickerpack title is invalid.';
}
export class TmpPasswordDisabled extends BadRequest {
  override id: string = 'TMP_PASSWORD_DISABLED';
  override message: string = 'The temporary password is disabled.';
}
export class TmpPasswordInvalid extends BadRequest {
  override id: string = 'TMP_PASSWORD_INVALID';
  override message: string = 'The passed tmp_password is invalid.';
}
export class TokenEmpty extends BadRequest {
  override id: string = 'TOKEN_EMPTY';
  override message: string = 'The specified token is empty.';
}
export class TokenInvalid extends BadRequest {
  override id: string = 'TOKEN_INVALID';
  override message: string = 'The provided token is invalid.';
}
export class TokenTypeInvalid extends BadRequest {
  override id: string = 'TOKEN_TYPE_INVALID';
  override message: string = 'The specified token type is invalid.';
}
export class TopicsEmpty extends BadRequest {
  override id: string = 'TOPICS_EMPTY';
  override message: string = 'You specified no topic IDs.';
}
export class TopicClosed extends BadRequest {
  override id: string = 'TOPIC_CLOSED';
  override message: string = "This topic was closed, you can't send messages to it anymore.";
}
export class TopicCloseSeparately extends BadRequest {
  override id: string = 'TOPIC_CLOSE_SEPARATELY';
  override message: string =
    'The `close` flag cannot be provided together with any of the other flags.';
}
export class TopicDeleted extends BadRequest {
  override id: string = 'TOPIC_DELETED';
  override message: string = 'The specified topic was deleted.';
}
export class TopicHideSeparately extends BadRequest {
  override id: string = 'TOPIC_HIDE_SEPARATELY';
  override message: string =
    'The `hide` flag cannot be provided together with any of the other flags.';
}
export class TopicIdInvalid extends BadRequest {
  override id: string = 'TOPIC_ID_INVALID';
  override message: string = 'The specified topic ID is invalid.';
}
export class TopicNotModified extends BadRequest {
  override id: string = 'TOPIC_NOT_MODIFIED';
  override message: string =
    'The updated topic info is equal to the current topic info, nothing was changed.';
}
export class TopicTitleEmpty extends BadRequest {
  override id: string = 'TOPIC_TITLE_EMPTY';
  override message: string = 'The specified topic title is empty.';
}
export class ToLangInvalid extends BadRequest {
  override id: string = 'TO_LANG_INVALID';
  override message: string = 'The specified destination language is invalid.';
}
export class TransactionIdInvalid extends BadRequest {
  override id: string = 'TRANSACTION_ID_INVALID';
  override message: string = 'The specified transaction ID is invalid.';
}
export class TranscriptionFailed extends BadRequest {
  override id: string = 'TRANSCRIPTION_FAILED';
  override message: string = 'Audio transcription failed.';
}
export class TranslateReqQuotaExceeded extends BadRequest {
  override id: string = 'TRANSLATE_REQ_QUOTA_EXCEEDED';
  override message: string =
    'Translation is currently unavailable due to a temporary server-side lack of resources.';
}
export class TtlDaysInvalid extends BadRequest {
  override id: string = 'TTL_DAYS_INVALID';
  override message: string = 'The provided TTL is invalid.';
}
export class TtlMediaInvalid extends BadRequest {
  override id: string = 'TTL_MEDIA_INVALID';
  override message: string = 'Invalid media Time To Live was provided.';
}
export class TtlPeriodInvalid extends BadRequest {
  override id: string = 'TTL_PERIOD_INVALID';
  override message: string = 'The specified TTL period is invalid.';
}
export class TypesEmpty extends BadRequest {
  override id: string = 'TYPES_EMPTY';
  override message: string = 'No top peer type was provided.';
}
export class TypeConstructorInvalid extends BadRequest {
  override id: string = 'TYPE_CONSTRUCTOR_INVALID';
  override message: string = 'The type constructor is invalid';
}
export class UntilDateInvalid extends BadRequest {
  override id: string = 'UNTIL_DATE_INVALID';
  override message: string = 'Invalid until date provided.';
}
export class UrlInvalid extends BadRequest {
  override id: string = 'URL_INVALID';
  override message: string = 'Invalid URL provided.';
}
export class UsageLimitInvalid extends BadRequest {
  override id: string = 'USAGE_LIMIT_INVALID';
  override message: string = 'The specified usage limit is invalid.';
}
export class UsernamesActiveTooMuch extends BadRequest {
  override id: string = 'USERNAMES_ACTIVE_TOO_MUCH';
  override message: string = 'The maximum number of active usernames was reached.';
}
export class UsernameInvalid extends BadRequest {
  override id: string = 'USERNAME_INVALID';
  override message: string = 'The provided username is not valid.';
}
export class UsernameNotModified extends BadRequest {
  override id: string = 'USERNAME_NOT_MODIFIED';
  override message: string = 'The username was not modified.';
}
export class UsernameNotOccupied extends BadRequest {
  override id: string = 'USERNAME_NOT_OCCUPIED';
  override message: string = 'The provided username is not occupied.';
}
export class UsernameOccupied extends BadRequest {
  override id: string = 'USERNAME_OCCUPIED';
  override message: string = 'The provided username is already occupied.';
}
export class UsernamePurchaseAvailable extends BadRequest {
  override id: string = 'USERNAME_PURCHASE_AVAILABLE';
  override message: string = 'The specified username can be purchased on https://fragment.com.';
}
export class UserpicUploadRequired extends BadRequest {
  override id: string = 'USERPIC_UPLOAD_REQUIRED';
  override message: string = 'You must have a profile picture to publish your geolocation.';
}
export class UsersTooFew extends BadRequest {
  override id: string = 'USERS_TOO_FEW';
  override message: string = 'Not enough users (to create a chat, for example).';
}
export class UsersTooMuch extends BadRequest {
  override id: string = 'USERS_TOO_MUCH';
  override message: string =
    'The maximum number of users has been exceeded (to create a chat, for example).';
}
export class UserAdminInvalid extends BadRequest {
  override id: string = 'USER_ADMIN_INVALID';
  override message: string = "You're not an admin.";
}
export class UserAlreadyInvited extends BadRequest {
  override id: string = 'USER_ALREADY_INVITED';
  override message: string = 'You have already invited this user.';
}
export class UserAlreadyParticipant extends BadRequest {
  override id: string = 'USER_ALREADY_PARTICIPANT';
  override message: string = 'The user is already in the group.';
}
export class UserBannedInChannel extends BadRequest {
  override id: string = 'USER_BANNED_IN_CHANNEL';
  override message: string = "You're banned from sending messages in supergroups/channels.";
}
export class UserBlocked extends BadRequest {
  override id: string = 'USER_BLOCKED';
  override message: string = 'User blocked.';
}
export class UserBot extends BadRequest {
  override id: string = 'USER_BOT';
  override message: string = 'Bots can only be admins in channels.';
}
export class UserBotInvalid extends BadRequest {
  override id: string = 'USER_BOT_INVALID';
  override message: string =
    'User accounts must provide the `bot` method parameter when calling this method. If there is no such method parameter, this method can only be invoked by bot accounts.';
}
export class UserBotRequired extends BadRequest {
  override id: string = 'USER_BOT_REQUIRED';
  override message: string = 'This method can only be called by a bot.';
}
export class UserChannelsTooMuch extends BadRequest {
  override id: string = 'USER_CHANNELS_TOO_MUCH';
  override message: string =
    'One of the users you tried to add is already in too many channels/supergroups.';
}
export class UserCreator extends BadRequest {
  override id: string = 'USER_CREATOR';
  override message: string =
    "For channels.editAdmin: you've tried to edit the admin rights of the owner, but you're not the owner; for channels.leaveChannel: you can't leave this channel, because you're its creator.";
}
export class UserGiftUnavailable extends BadRequest {
  override id: string = 'USER_GIFT_UNAVAILABLE';
  override message: string =
    'Gifts are not available in the current region ([stars_gifts_enabled](https://core.telegram.org/api/config#stars-gifts-enabled) is equal to false).';
}
export class UserIdInvalid extends BadRequest {
  override id: string = 'USER_ID_INVALID';
  override message: string = 'The provided user ID is invalid.';
}
export class UserInvalid extends BadRequest {
  override id: string = 'USER_INVALID';
  override message: string = 'Invalid user provided.';
}
export class UserIsBlocked extends BadRequest {
  override id: string = 'USER_IS_BLOCKED';
  override message: string = 'You were blocked by this user.';
}
export class UserIsBot extends BadRequest {
  override id: string = 'USER_IS_BOT';
  override message: string = "Bots can't send messages to other bots.";
}
export class UserKicked extends BadRequest {
  override id: string = 'USER_KICKED';
  override message: string = 'This user was kicked from this supergroup/channel.';
}
export class UserNotMutualContact extends BadRequest {
  override id: string = 'USER_NOT_MUTUAL_CONTACT';
  override message: string = 'The provided user is not a mutual contact.';
}
export class UserNotParticipant extends BadRequest {
  override id: string = 'USER_NOT_PARTICIPANT';
  override message: string = "You're not a member of this supergroup/channel.";
}
export class UserPublicMissing extends BadRequest {
  override id: string = 'USER_PUBLIC_MISSING';
  override message: string =
    'Cannot generate a link to stories posted by a peer without a username.';
}
export class UserVolumeInvalid extends BadRequest {
  override id: string = 'USER_VOLUME_INVALID';
  override message: string = 'The specified user volume is invalid.';
}
export class VenueIdInvalid extends BadRequest {
  override id: string = 'VENUE_ID_INVALID';
  override message: string = 'The specified venue ID is invalid.';
}
export class VideoContentTypeInvalid extends BadRequest {
  override id: string = 'VIDEO_CONTENT_TYPE_INVALID';
  override message: string = "The video's content type is invalid.";
}
export class VideoFileInvalid extends BadRequest {
  override id: string = 'VIDEO_FILE_INVALID';
  override message: string = 'The specified video file is invalid.';
}
export class VideoPauseForbidden extends BadRequest {
  override id: string = 'VIDEO_PAUSE_FORBIDDEN';
  override message: string = 'You cannot pause the video stream.';
}
export class VideoStopForbidden extends BadRequest {
  override id: string = 'VIDEO_STOP_FORBIDDEN';
  override message: string = 'You cannot stop the video stream.';
}
export class VideoTitleEmpty extends BadRequest {
  override id: string = 'VIDEO_TITLE_EMPTY';
  override message: string = 'The specified video title is empty.';
}
export class VoiceMessagesForbidden extends BadRequest {
  override id: string = 'VOICE_MESSAGES_FORBIDDEN';
  override message: string = "This user's privacy settings forbid you from sending voice messages.";
}
export class VolumeLocNotFound extends BadRequest {
  override id: string = 'VOLUME_LOC_NOT_FOUND';
  override message: string = "The volume location can't be found";
}
export class WallpaperFileInvalid extends BadRequest {
  override id: string = 'WALLPAPER_FILE_INVALID';
  override message: string = 'The specified wallpaper file is invalid.';
}
export class WallpaperInvalid extends BadRequest {
  override id: string = 'WALLPAPER_INVALID';
  override message: string = 'The specified wallpaper is invalid.';
}
export class WallpaperMimeInvalid extends BadRequest {
  override id: string = 'WALLPAPER_MIME_INVALID';
  override message: string = 'The specified wallpaper MIME type is invalid.';
}
export class WallpaperNotFound extends BadRequest {
  override id: string = 'WALLPAPER_NOT_FOUND';
  override message: string = 'The specified wallpaper could not be found.';
}
export class WcConvertUrlInvalid extends BadRequest {
  override id: string = 'WC_CONVERT_URL_INVALID';
  override message: string = 'WC convert URL invalid.';
}
export class WebdocumentInvalid extends BadRequest {
  override id: string = 'WEBDOCUMENT_INVALID';
  override message: string = 'Invalid webdocument URL provided.';
}
export class WebdocumentMimeInvalid extends BadRequest {
  override id: string = 'WEBDOCUMENT_MIME_INVALID';
  override message: string = 'Invalid webdocument mime type provided.';
}
export class WebdocumentSizeTooBig extends BadRequest {
  override id: string = 'WEBDOCUMENT_SIZE_TOO_BIG';
  override message: string = 'Webdocument is too big!';
}
export class WebdocumentUrlEmpty extends BadRequest {
  override id: string = 'WEBDOCUMENT_URL_EMPTY';
  override message: string = 'The passed web document URL is empty.';
}
export class WebdocumentUrlInvalid extends BadRequest {
  override id: string = 'WEBDOCUMENT_URL_INVALID';
  override message: string = 'The specified webdocument URL is invalid.';
}
export class WebpageCurlFailed extends BadRequest {
  override id: string = 'WEBPAGE_CURL_FAILED';
  override message: string = 'Failure while fetching the webpage with cURL.';
}
export class WebpageMediaEmpty extends BadRequest {
  override id: string = 'WEBPAGE_MEDIA_EMPTY';
  override message: string = 'Webpage media empty.';
}
export class WebpageNotFound extends BadRequest {
  override id: string = 'WEBPAGE_NOT_FOUND';
  override message: string = 'A preview for the specified webpage `url` could not be generated.';
}
export class WebpageUrlInvalid extends BadRequest {
  override id: string = 'WEBPAGE_URL_INVALID';
  override message: string = 'The specified webpage `url` is invalid.';
}
export class WebpushAuthInvalid extends BadRequest {
  override id: string = 'WEBPUSH_AUTH_INVALID';
  override message: string = 'The specified web push authentication secret is invalid.';
}
export class WebpushKeyInvalid extends BadRequest {
  override id: string = 'WEBPUSH_KEY_INVALID';
  override message: string =
    'The specified web push elliptic curve Diffie-Hellman public key is invalid.';
}
export class WebpushTokenInvalid extends BadRequest {
  override id: string = 'WEBPUSH_TOKEN_INVALID';
  override message: string = 'The specified web push token is invalid.';
}
export class YouBlockedUser extends BadRequest {
  override id: string = 'YOU_BLOCKED_USER';
  override message: string = 'You blocked this user.';
}
