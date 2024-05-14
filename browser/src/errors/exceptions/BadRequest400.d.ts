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
export declare class BadRequest extends RPCError {
  code: number;
  name: string;
}
export declare class AboutTooLong extends BadRequest {
  id: string;
  message: string;
}
export declare class AccessTokenExpired extends BadRequest {
  id: string;
  message: string;
}
export declare class AccessTokenInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class AddressInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class AdminsTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class AdminIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class AdminRankEmojiNotAllowed extends BadRequest {
  id: string;
  message: string;
}
export declare class AdminRankInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class AdminRightsEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class AlbumPhotosTooMany extends BadRequest {
  id: string;
  message: string;
}
export declare class ApiIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ApiIdPublishedFlood extends BadRequest {
  id: string;
  message: string;
}
export declare class ArticleTitleEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class AudioContentUrlEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class AudioTitleEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class AuthBytesInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class AuthTokenAlreadyAccepted extends BadRequest {
  id: string;
  message: string;
}
export declare class AuthTokenException extends BadRequest {
  id: string;
  message: string;
}
export declare class AuthTokenExpired extends BadRequest {
  id: string;
  message: string;
}
export declare class AuthTokenInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class AuthTokenInvalidx extends BadRequest {
  id: string;
  message: string;
}
export declare class AutoarchiveNotAvailable extends BadRequest {
  id: string;
  message: string;
}
export declare class BankCardNumberInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class BannedRightsInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class BasePortLocInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class BoostsEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class BoostsRequired extends BadRequest {
  id: string;
  message: string;
}
export declare class BoostNotModified extends BadRequest {
  id: string;
  message: string;
}
export declare class BoostPeerInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class BotsTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class BotAppInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class BotAppShortnameInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class BotChannelsNa extends BadRequest {
  id: string;
  message: string;
}
export declare class BotCommandDescriptionInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class BotCommandInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class BotDomainInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class BotGamesDisabled extends BadRequest {
  id: string;
  message: string;
}
export declare class BotGroupsBlocked extends BadRequest {
  id: string;
  message: string;
}
export declare class BotInlineDisabled extends BadRequest {
  id: string;
  message: string;
}
export declare class BotInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class BotMethodInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class BotMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class BotOnesideNotAvail extends BadRequest {
  id: string;
  message: string;
}
export declare class BotPaymentsDisabled extends BadRequest {
  id: string;
  message: string;
}
export declare class BotPollsDisabled extends BadRequest {
  id: string;
  message: string;
}
export declare class BotResponseTimeout extends BadRequest {
  id: string;
  message: string;
}
export declare class BotScoreNotModified extends BadRequest {
  id: string;
  message: string;
}
export declare class BotWebviewDisabled extends BadRequest {
  id: string;
  message: string;
}
export declare class BroadcastIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class BroadcastPublicVotersForbidden extends BadRequest {
  id: string;
  message: string;
}
export declare class BroadcastRequired extends BadRequest {
  id: string;
  message: string;
}
export declare class ButtonDataInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ButtonTextInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ButtonTypeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ButtonUrlInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ButtonUserInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ButtonUserPrivacyRestricted extends BadRequest {
  id: string;
  message: string;
}
export declare class CallAlreadyAccepted extends BadRequest {
  id: string;
  message: string;
}
export declare class CallAlreadyDeclined extends BadRequest {
  id: string;
  message: string;
}
export declare class CallOccupyFailed extends BadRequest {
  id: string;
  message: string;
}
export declare class CallPeerInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class CallProtocolFlagsInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class CdnMethodInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ChannelsAdminLocatedTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class ChannelsAdminPublicTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class ChannelsTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class ChannelAddInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ChannelBanned extends BadRequest {
  id: string;
  message: string;
}
export declare class ChannelForumMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class ChannelIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ChannelInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ChannelParicipantMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class ChannelPrivate extends BadRequest {
  id: string;
  message: string;
}
export declare class ChannelTooBig extends BadRequest {
  id: string;
  message: string;
}
export declare class ChannelTooLarge extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatlistExcludeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatAboutNotModified extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatAboutTooLong extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatAdminRequired extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatDiscussionUnallowed extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatForwardsRestricted extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatIdEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatInvitePermanent extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatLinkExists extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatNotModified extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatPublicRequired extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatRestricted extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatRevokeDateUnsupported extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatSendInlineForbidden extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatTitleEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class ChatTooBig extends BadRequest {
  id: string;
  message: string;
}
export declare class CodeEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class CodeHashInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class CodeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ColorInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ConnectionApiIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ConnectionAppVersionEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class ConnectionDeviceModelEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class ConnectionLangPackInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ConnectionLayerInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ConnectionNotInited extends BadRequest {
  id: string;
  message: string;
}
export declare class ConnectionSystemEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class ConnectionSystemLangCodeEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class ContactAddMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class ContactIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ContactMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class ContactNameEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class ContactReqMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class CreateCallFailed extends BadRequest {
  id: string;
  message: string;
}
export declare class CurrencyTotalAmountInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class CustomReactionsTooMany extends BadRequest {
  id: string;
  message: string;
}
export declare class DataInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class DataJsonInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class DataTooLong extends BadRequest {
  id: string;
  message: string;
}
export declare class DateEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class DcIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class DhGAInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class DocumentInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class EmailHashExpired extends BadRequest {
  id: string;
  message: string;
}
export declare class EmailInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class EmailNotSetup extends BadRequest {
  id: string;
  message: string;
}
export declare class EmailUnconfirmed extends BadRequest {
  id: string;
  message: string;
}
export declare class EmailUnconfirmedX extends BadRequest {
  id: string;
  message: string;
}
export declare class EmailVerifyExpired extends BadRequest {
  id: string;
  message: string;
}
export declare class EmojiInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class EmojiMarkupInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class EmojiNotModified extends BadRequest {
  id: string;
  message: string;
}
export declare class EmoticonEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class EmoticonInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class EmoticonStickerpackMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class EncryptedMessageInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class EncryptionAlreadyAccepted extends BadRequest {
  id: string;
  message: string;
}
export declare class EncryptionAlreadyDeclined extends BadRequest {
  id: string;
  message: string;
}
export declare class EncryptionDeclined extends BadRequest {
  id: string;
  message: string;
}
export declare class EncryptionIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class EntitiesTooLong extends BadRequest {
  id: string;
  message: string;
}
export declare class EntityBoundsInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class EntityMentionUserInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ErrorTextEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class ExpireDateInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ExportCardInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ExternalUrlInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class FieldNameEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class FieldNameInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class FileContentTypeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class FileEmtpy extends BadRequest {
  id: string;
  message: string;
}
export declare class FileIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class FileMigrate extends BadRequest {
  id: string;
  message: string;
}
export declare class FilePartsInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class FilePartEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class FilePartInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class FilePartLengthInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class FilePartSizeChanged extends BadRequest {
  id: string;
  message: string;
}
export declare class FilePartSizeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class FilePartTooBig extends BadRequest {
  id: string;
  message: string;
}
export declare class FilePartMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class FileReferenceAny extends BadRequest {
  id: string;
  message: string;
}
export declare class FileReferenceEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class FileReferenceExpired extends BadRequest {
  id: string;
  message: string;
}
export declare class FileReferenceInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class FileTitleEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class FileTokenInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class FilterIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class FilterIncludeEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class FilterNotSupported extends BadRequest {
  id: string;
  message: string;
}
export declare class FilterTitleEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class FirstnameInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class FolderIdEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class FolderIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ForumEnabled extends BadRequest {
  id: string;
  message: string;
}
export declare class FreshChangeAdminsForbidden extends BadRequest {
  id: string;
  message: string;
}
export declare class FromMessageBotDisabled extends BadRequest {
  id: string;
  message: string;
}
export declare class FromPeerInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class GameBotInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class GeneralModifyIconForbidden extends BadRequest {
  id: string;
  message: string;
}
export declare class GeoPointInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class GiftSlugExpired extends BadRequest {
  id: string;
  message: string;
}
export declare class GiftSlugInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class GifContentTypeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class GifIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class GraphExpiredReload extends BadRequest {
  id: string;
  message: string;
}
export declare class GraphInvalidReload extends BadRequest {
  id: string;
  message: string;
}
export declare class GraphOutdatedReload extends BadRequest {
  id: string;
  message: string;
}
export declare class GroupcallAlreadyDiscarded extends BadRequest {
  id: string;
  message: string;
}
export declare class GroupcallForbidden extends BadRequest {
  id: string;
  message: string;
}
export declare class GroupcallInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class GroupcallJoinMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class GroupcallNotModified extends BadRequest {
  id: string;
  message: string;
}
export declare class GroupcallSsrcDuplicateMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class GroupedMediaInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class GroupCallInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class HashInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class HideRequesterMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class ImageProcessFailed extends BadRequest {
  id: string;
  message: string;
}
export declare class ImportFileInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ImportFormatUnrecognized extends BadRequest {
  id: string;
  message: string;
}
export declare class ImportIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ImportTokenInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class InlineResultExpired extends BadRequest {
  id: string;
  message: string;
}
export declare class InputChatlistInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class InputConstructorInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class InputFetchError extends BadRequest {
  id: string;
  message: string;
}
export declare class InputFetchFail extends BadRequest {
  id: string;
  message: string;
}
export declare class InputFilterInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class InputLayerInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class InputMethodInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class InputRequestTooLong extends BadRequest {
  id: string;
  message: string;
}
export declare class InputTextEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class InputTextTooLong extends BadRequest {
  id: string;
  message: string;
}
export declare class InputUserDeactivated extends BadRequest {
  id: string;
  message: string;
}
export declare class InvitesTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class InviteForbiddenWithJoinas extends BadRequest {
  id: string;
  message: string;
}
export declare class InviteHashEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class InviteHashExpired extends BadRequest {
  id: string;
  message: string;
}
export declare class InviteHashInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class InviteRequestSent extends BadRequest {
  id: string;
  message: string;
}
export declare class InviteRevokedMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class InviteSlugEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class InviteSlugExpired extends BadRequest {
  id: string;
  message: string;
}
export declare class InvoicePayloadInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class JoinAsPeerInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class LangCodeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class LangCodeNotSupported extends BadRequest {
  id: string;
  message: string;
}
export declare class LangPackInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class LastnameInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class LimitInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class LinkNotModified extends BadRequest {
  id: string;
  message: string;
}
export declare class LocationInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MaxDateInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MaxIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MaxQtsInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class Md5ChecksumInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MediaCaptionTooLong extends BadRequest {
  id: string;
  message: string;
}
export declare class MediaEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class MediaFileInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MediaGroupedInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MediaInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MediaNewInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MediaPrevInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MediaTtlInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MediaTypeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MediaVideoStoryMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class MegagroupGeoRequired extends BadRequest {
  id: string;
  message: string;
}
export declare class MegagroupIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MegagroupPrehistoryHidden extends BadRequest {
  id: string;
  message: string;
}
export declare class MegagroupRequired extends BadRequest {
  id: string;
  message: string;
}
export declare class MessageEditTimeExpired extends BadRequest {
  id: string;
  message: string;
}
export declare class MessageEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class MessageIdsEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class MessageIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MessageNotModified extends BadRequest {
  id: string;
  message: string;
}
export declare class MessagePollClosed extends BadRequest {
  id: string;
  message: string;
}
export declare class MessageTooLong extends BadRequest {
  id: string;
  message: string;
}
export declare class MethodInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MinDateInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MsgIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class MsgTooOld extends BadRequest {
  id: string;
  message: string;
}
export declare class MsgWaitFailed extends BadRequest {
  id: string;
  message: string;
}
export declare class MultiMediaTooLong extends BadRequest {
  id: string;
  message: string;
}
export declare class NewSaltInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class NewSettingsEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class NewSettingsInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class NextOffsetInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class OffsetInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class OffsetPeerIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class OptionsTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class OptionInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class OrderInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PackShortNameInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PackShortNameOccupied extends BadRequest {
  id: string;
  message: string;
}
export declare class PackTitleInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ParticipantsTooFew extends BadRequest {
  id: string;
  message: string;
}
export declare class ParticipantIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ParticipantJoinMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class ParticipantVersionOutdated extends BadRequest {
  id: string;
  message: string;
}
export declare class PasswordEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class PasswordHashInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PasswordMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class PasswordRecoveryExpired extends BadRequest {
  id: string;
  message: string;
}
export declare class PasswordRecoveryNa extends BadRequest {
  id: string;
  message: string;
}
export declare class PasswordRequired extends BadRequest {
  id: string;
  message: string;
}
export declare class PasswordTooFresh extends BadRequest {
  id: string;
  message: string;
}
export declare class PaymentProviderInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PeersListEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class PeerFlood extends BadRequest {
  id: string;
  message: string;
}
export declare class PeerHistoryEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class PeerIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PeerIdNotSupported extends BadRequest {
  id: string;
  message: string;
}
export declare class PersistentTimestampEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class PersistentTimestampInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PhoneCodeEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class PhoneCodeExpired extends BadRequest {
  id: string;
  message: string;
}
export declare class PhoneCodeHashEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class PhoneCodeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PhoneHashExpired extends BadRequest {
  id: string;
  message: string;
}
export declare class PhoneNotOccupied extends BadRequest {
  id: string;
  message: string;
}
export declare class PhoneNumberAppSignupForbidden extends BadRequest {
  id: string;
  message: string;
}
export declare class PhoneNumberBanned extends BadRequest {
  id: string;
  message: string;
}
export declare class PhoneNumberFlood extends BadRequest {
  id: string;
  message: string;
}
export declare class PhoneNumberInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PhoneNumberOccupied extends BadRequest {
  id: string;
  message: string;
}
export declare class PhoneNumberUnoccupied extends BadRequest {
  id: string;
  message: string;
}
export declare class PhonePasswordProtected extends BadRequest {
  id: string;
  message: string;
}
export declare class PhotoContentTypeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PhotoContentUrlEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class PhotoCropFileMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class PhotoCropSizeSmall extends BadRequest {
  id: string;
  message: string;
}
export declare class PhotoExtInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PhotoFileMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class PhotoIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PhotoInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PhotoInvalidDimensions extends BadRequest {
  id: string;
  message: string;
}
export declare class PhotoSaveFileInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PhotoThumbUrlEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class PhotoThumbUrlInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PinnedDialogsTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class PinRestricted extends BadRequest {
  id: string;
  message: string;
}
export declare class PollAnswersInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PollAnswerInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PollOptionDuplicate extends BadRequest {
  id: string;
  message: string;
}
export declare class PollOptionInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PollQuestionInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PollUnsupported extends BadRequest {
  id: string;
  message: string;
}
export declare class PollVoteRequired extends BadRequest {
  id: string;
  message: string;
}
export declare class PremiumAccountRequired extends BadRequest {
  id: string;
  message: string;
}
export declare class PrivacyKeyInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PrivacyTooLong extends BadRequest {
  id: string;
  message: string;
}
export declare class PrivacyValueInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class PublicKeyRequired extends BadRequest {
  id: string;
  message: string;
}
export declare class QueryIdEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class QueryIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class QueryTooShort extends BadRequest {
  id: string;
  message: string;
}
export declare class QuizAnswerMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class QuizCorrectAnswersEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class QuizCorrectAnswersTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class QuizCorrectAnswerInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class QuizMultipleInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class RandomIdEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class RandomIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class RandomLengthInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class RangesInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ReactionsTooMany extends BadRequest {
  id: string;
  message: string;
}
export declare class ReactionEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class ReactionInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ReflectorNotAvailable extends BadRequest {
  id: string;
  message: string;
}
export declare class ReplyMarkupBuyEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class ReplyMarkupGameEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class ReplyMarkupInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ReplyMarkupTooLong extends BadRequest {
  id: string;
  message: string;
}
export declare class ReplyMessageIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ReplyToInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ReplyToUserInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ResetRequestMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class ResultsTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class ResultIdDuplicate extends BadRequest {
  id: string;
  message: string;
}
export declare class ResultIdEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class ResultIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ResultTypeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class RevoteNotAllowed extends BadRequest {
  id: string;
  message: string;
}
export declare class RightsNotModified extends BadRequest {
  id: string;
  message: string;
}
export declare class RsaDecryptFailed extends BadRequest {
  id: string;
  message: string;
}
export declare class ScheduleBotNotAllowed extends BadRequest {
  id: string;
  message: string;
}
export declare class ScheduleDateInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ScheduleDateTooLate extends BadRequest {
  id: string;
  message: string;
}
export declare class ScheduleStatusPrivate extends BadRequest {
  id: string;
  message: string;
}
export declare class ScheduleTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class ScoreInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class SearchQueryEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class SearchWithLinkNotSupported extends BadRequest {
  id: string;
  message: string;
}
export declare class SecondsInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class SendAsPeerInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class SendMessageMediaInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class SendMessageTypeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class SessionTooFresh extends BadRequest {
  id: string;
  message: string;
}
export declare class SettingsInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class Sha256HashInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ShortnameOccupyFailed extends BadRequest {
  id: string;
  message: string;
}
export declare class ShortNameInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ShortNameOccupied extends BadRequest {
  id: string;
  message: string;
}
export declare class SlotsEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class SlowmodeMultiMsgsDisabled extends BadRequest {
  id: string;
  message: string;
}
export declare class SlugInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class SmsCodeCreateFailed extends BadRequest {
  id: string;
  message: string;
}
export declare class SrpIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class SrpPasswordChanged extends BadRequest {
  id: string;
  message: string;
}
export declare class StartParamEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class StartParamInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class StartParamTooLong extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerpackStickersTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class StickersetInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class StickersEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class StickersTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerDocumentInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerEmojiInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerFileInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerGifDimensions extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerMimeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerPngDimensions extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerPngNopng extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerTgsNodoc extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerTgsNotgs extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerThumbPngNopng extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerThumbTgsNotgs extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerVideoBig extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerVideoNodoc extends BadRequest {
  id: string;
  message: string;
}
export declare class StickerVideoNowebm extends BadRequest {
  id: string;
  message: string;
}
export declare class StoriesNeverCreated extends BadRequest {
  id: string;
  message: string;
}
export declare class StoriesTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class StoryIdEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class StoryIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class StoryNotModified extends BadRequest {
  id: string;
  message: string;
}
export declare class StoryPeriodInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class StorySendFloodMonthly extends BadRequest {
  id: string;
  message: string;
}
export declare class StorySendFloodWeekly extends BadRequest {
  id: string;
  message: string;
}
export declare class SwitchPmTextEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class TakeoutInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class TakeoutRequired extends BadRequest {
  id: string;
  message: string;
}
export declare class TaskAlreadyExists extends BadRequest {
  id: string;
  message: string;
}
export declare class TempAuthKeyAlreadyBound extends BadRequest {
  id: string;
  message: string;
}
export declare class TempAuthKeyEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class ThemeFileInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ThemeFormatInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ThemeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ThemeMimeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class ThemeTitleInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class TitleInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class TmpPasswordDisabled extends BadRequest {
  id: string;
  message: string;
}
export declare class TmpPasswordInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class TokenEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class TokenInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class TokenTypeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class TopicsEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class TopicClosed extends BadRequest {
  id: string;
  message: string;
}
export declare class TopicCloseSeparately extends BadRequest {
  id: string;
  message: string;
}
export declare class TopicDeleted extends BadRequest {
  id: string;
  message: string;
}
export declare class TopicHideSeparately extends BadRequest {
  id: string;
  message: string;
}
export declare class TopicIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class TopicNotModified extends BadRequest {
  id: string;
  message: string;
}
export declare class TopicTitleEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class ToLangInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class TranscriptionFailed extends BadRequest {
  id: string;
  message: string;
}
export declare class TtlDaysInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class TtlMediaInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class TtlPeriodInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class TypesEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class TypeConstructorInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class UntilDateInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class UrlInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class UsageLimitInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class UsernamesActiveTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class UsernameInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class UsernameNotModified extends BadRequest {
  id: string;
  message: string;
}
export declare class UsernameNotOccupied extends BadRequest {
  id: string;
  message: string;
}
export declare class UsernameOccupied extends BadRequest {
  id: string;
  message: string;
}
export declare class UsernamePurchaseAvailable extends BadRequest {
  id: string;
  message: string;
}
export declare class UserpicUploadRequired extends BadRequest {
  id: string;
  message: string;
}
export declare class UsersTooFew extends BadRequest {
  id: string;
  message: string;
}
export declare class UsersTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class UserAdminInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class UserAlreadyInvited extends BadRequest {
  id: string;
  message: string;
}
export declare class UserAlreadyParticipant extends BadRequest {
  id: string;
  message: string;
}
export declare class UserBannedInChannel extends BadRequest {
  id: string;
  message: string;
}
export declare class UserBlocked extends BadRequest {
  id: string;
  message: string;
}
export declare class UserBot extends BadRequest {
  id: string;
  message: string;
}
export declare class UserBotInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class UserBotRequired extends BadRequest {
  id: string;
  message: string;
}
export declare class UserChannelsTooMuch extends BadRequest {
  id: string;
  message: string;
}
export declare class UserCreator extends BadRequest {
  id: string;
  message: string;
}
export declare class UserIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class UserInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class UserIsBlocked extends BadRequest {
  id: string;
  message: string;
}
export declare class UserIsBot extends BadRequest {
  id: string;
  message: string;
}
export declare class UserKicked extends BadRequest {
  id: string;
  message: string;
}
export declare class UserNotMutualContact extends BadRequest {
  id: string;
  message: string;
}
export declare class UserNotParticipant extends BadRequest {
  id: string;
  message: string;
}
export declare class UserPublicMissing extends BadRequest {
  id: string;
  message: string;
}
export declare class UserVolumeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class VenueIdInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class VideoContentTypeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class VideoFileInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class VideoTitleEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class VoiceMessagesForbidden extends BadRequest {
  id: string;
  message: string;
}
export declare class VolumeLocNotFound extends BadRequest {
  id: string;
  message: string;
}
export declare class WallpaperFileInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class WallpaperInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class WallpaperMimeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class WallpaperNotFound extends BadRequest {
  id: string;
  message: string;
}
export declare class WcConvertUrlInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class WebdocumentInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class WebdocumentMimeInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class WebdocumentSizeTooBig extends BadRequest {
  id: string;
  message: string;
}
export declare class WebdocumentUrlEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class WebdocumentUrlInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class WebpageCurlFailed extends BadRequest {
  id: string;
  message: string;
}
export declare class WebpageMediaEmpty extends BadRequest {
  id: string;
  message: string;
}
export declare class WebpageNotFound extends BadRequest {
  id: string;
  message: string;
}
export declare class WebpageUrlInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class WebpushAuthInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class WebpushKeyInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class WebpushTokenInvalid extends BadRequest {
  id: string;
  message: string;
}
export declare class YouBlockedUser extends BadRequest {
  id: string;
  message: string;
}
