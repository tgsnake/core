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

const count = 455;
const Exceptions = {
  303: {
    _: 'SeeOther.SeeOther',
    FILE_MIGRATE_X: 'SeeOther.FileMigrate',
    NETWORK_MIGRATE_X: 'SeeOther.NetworkMigrate',
    PHONE_MIGRATE_X: 'SeeOther.PhoneMigrate',
    STATS_MIGRATE_X: 'SeeOther.StatsMigrate',
    USER_MIGRATE_X: 'SeeOther.UserMigrate',
  },
  400: {
    _: 'BadRequest.BadRequest',
    ABOUT_TOO_LONG: 'BadRequest.AboutTooLong',
    ACCESS_TOKEN_EXPIRED: 'BadRequest.AccessTokenExpired',
    ACCESS_TOKEN_INVALID: 'BadRequest.AccessTokenInvalid',
    ADMINS_TOO_MUCH: 'BadRequest.AdminsTooMuch',
    ADMIN_RANK_EMOJI_NOT_ALLOWED: 'BadRequest.AdminRankEmojiNotAllowed',
    ADMIN_RANK_INVALID: 'BadRequest.AdminRankInvalid',
    ALBUM_PHOTOS_TOO_MANY: 'BadRequest.AlbumPhotosTooMany',
    API_ID_INVALID: 'BadRequest.ApiIdInvalid',
    API_ID_PUBLISHED_FLOOD: 'BadRequest.ApiIdPublishedFlood',
    ARTICLE_TITLE_EMPTY: 'BadRequest.ArticleTitleEmpty',
    AUDIO_TITLE_EMPTY: 'BadRequest.AudioTitleEmpty',
    AUTH_BYTES_INVALID: 'BadRequest.AuthBytesInvalid',
    AUTH_TOKEN_ALREADY_ACCEPTED: 'BadRequest.AuthTokenAlreadyAccepted',
    AUTH_TOKEN_EXPIRED: 'BadRequest.AuthTokenExpired',
    AUTH_TOKEN_INVALID: 'BadRequest.AuthTokenInvalid',
    AUTOARCHIVE_NOT_AVAILABLE: 'BadRequest.AutoarchiveNotAvailable',
    BANK_CARD_NUMBER_INVALID: 'BadRequest.BankCardNumberInvalid',
    BANNED_RIGHTS_INVALID: 'BadRequest.BannedRightsInvalid',
    BASE_PORT_LOC_INVALID: 'BadRequest.BasePortLocInvalid',
    BOTS_TOO_MUCH: 'BadRequest.BotsTooMuch',
    BOT_CHANNELS_NA: 'BadRequest.BotChannelsNa',
    BOT_COMMAND_DESCRIPTION_INVALID: 'BadRequest.BotCommandDescriptionInvalid',
    BOT_DOMAIN_INVALID: 'BadRequest.BotDomainInvalid',
    BOT_GAMES_DISABLED: 'BadRequest.BotGamesDisabled',
    BOT_GROUPS_BLOCKED: 'BadRequest.BotGroupsBlocked',
    BOT_INLINE_DISABLED: 'BadRequest.BotInlineDisabled',
    BOT_INVALID: 'BadRequest.BotInvalid',
    BOT_METHOD_INVALID: 'BadRequest.BotMethodInvalid',
    BOT_MISSING: 'BadRequest.BotMissing',
    BOT_PAYMENTS_DISABLED: 'BadRequest.BotPaymentsDisabled',
    BOT_POLLS_DISABLED: 'BadRequest.BotPollsDisabled',
    BOT_RESPONSE_TIMEOUT: 'BadRequest.BotResponseTimeout',
    BOT_SCORE_NOT_MODIFIED: 'BadRequest.BotScoreNotModified',
    BROADCAST_ID_INVALID: 'BadRequest.BroadcastIdInvalid',
    BROADCAST_PUBLIC_VOTERS_FORBIDDEN: 'BadRequest.BroadcastPublicVotersForbidden',
    BROADCAST_REQUIRED: 'BadRequest.BroadcastRequired',
    BUTTON_DATA_INVALID: 'BadRequest.ButtonDataInvalid',
    BUTTON_TYPE_INVALID: 'BadRequest.ButtonTypeInvalid',
    BUTTON_URL_INVALID: 'BadRequest.ButtonUrlInvalid',
    CALL_ALREADY_ACCEPTED: 'BadRequest.CallAlreadyAccepted',
    CALL_ALREADY_DECLINED: 'BadRequest.CallAlreadyDeclined',
    CALL_PEER_INVALID: 'BadRequest.CallPeerInvalid',
    CALL_PROTOCOL_FLAGS_INVALID: 'BadRequest.CallProtocolFlagsInvalid',
    CDN_METHOD_INVALID: 'BadRequest.CdnMethodInvalid',
    CHANNELS_ADMIN_PUBLIC_TOO_MUCH: 'BadRequest.ChannelsAdminPublicTooMuch',
    CHANNELS_TOO_MUCH: 'BadRequest.ChannelsTooMuch',
    CHANNEL_ADD_INVALID: 'BadRequest.ChannelAddInvalid',
    CHANNEL_BANNED: 'BadRequest.ChannelBanned',
    CHANNEL_INVALID: 'BadRequest.ChannelInvalid',
    CHANNEL_PRIVATE: 'BadRequest.ChannelPrivate',
    CHANNEL_TOO_LARGE: 'BadRequest.ChannelTooLarge',
    CHAT_ABOUT_NOT_MODIFIED: 'BadRequest.ChatAboutNotModified',
    CHAT_ABOUT_TOO_LONG: 'BadRequest.ChatAboutTooLong',
    CHAT_ADMIN_REQUIRED: 'BadRequest.ChatAdminRequired',
    CHAT_FORWARDS_RESTRICTED: 'BadRequest.ChatForwardsRestricted',
    CHAT_ID_EMPTY: 'BadRequest.ChatIdEmpty',
    CHAT_ID_INVALID: 'BadRequest.ChatIdInvalid',
    CHAT_INVALID: 'BadRequest.ChatInvalid',
    CHAT_INVITE_PERMANENT: 'BadRequest.ChatInvitePermanent',
    CHAT_LINK_EXISTS: 'BadRequest.ChatLinkExists',
    CHAT_NOT_MODIFIED: 'BadRequest.ChatNotModified',
    CHAT_RESTRICTED: 'BadRequest.ChatRestricted',
    CHAT_SEND_INLINE_FORBIDDEN: 'BadRequest.ChatSendInlineForbidden',
    CHAT_TITLE_EMPTY: 'BadRequest.ChatTitleEmpty',
    CHAT_TOO_BIG: 'BadRequest.ChatTooBig',
    CODE_EMPTY: 'BadRequest.CodeEmpty',
    CODE_HASH_INVALID: 'BadRequest.CodeHashInvalid',
    CODE_INVALID: 'BadRequest.CodeInvalid',
    CONNECTION_API_ID_INVALID: 'BadRequest.ConnectionApiIdInvalid',
    CONNECTION_APP_VERSION_EMPTY: 'BadRequest.ConnectionAppVersionEmpty',
    CONNECTION_DEVICE_MODEL_EMPTY: 'BadRequest.ConnectionDeviceModelEmpty',
    CONNECTION_LANG_PACK_INVALID: 'BadRequest.ConnectionLangPackInvalid',
    CONNECTION_LAYER_INVALID: 'BadRequest.ConnectionLayerInvalid',
    CONNECTION_NOT_INITED: 'BadRequest.ConnectionNotInited',
    CONNECTION_SYSTEM_EMPTY: 'BadRequest.ConnectionSystemEmpty',
    CONNECTION_SYSTEM_LANG_CODE_EMPTY: 'BadRequest.ConnectionSystemLangCodeEmpty',
    CONTACT_ADD_MISSING: 'BadRequest.ContactAddMissing',
    CONTACT_ID_INVALID: 'BadRequest.ContactIdInvalid',
    CONTACT_NAME_EMPTY: 'BadRequest.ContactNameEmpty',
    CONTACT_REQ_MISSING: 'BadRequest.ContactReqMissing',
    DATA_INVALID: 'BadRequest.DataInvalid',
    DATA_JSON_INVALID: 'BadRequest.DataJsonInvalid',
    DATA_TOO_LONG: 'BadRequest.DataTooLong',
    DATE_EMPTY: 'BadRequest.DateEmpty',
    DC_ID_INVALID: 'BadRequest.DcIdInvalid',
    DH_G_A_INVALID: 'BadRequest.DhGAInvalid',
    DOCUMENT_INVALID: 'BadRequest.DocumentInvalid',
    EMAIL_HASH_EXPIRED: 'BadRequest.EmailHashExpired',
    EMAIL_INVALID: 'BadRequest.EmailInvalid',
    EMAIL_UNCONFIRMED: 'BadRequest.EmailUnconfirmed',
    EMAIL_UNCONFIRMED_X: 'BadRequest.EmailUnconfirmedX',
    EMAIL_VERIFY_EXPIRED: 'BadRequest.EmailVerifyExpired',
    EMOTICON_EMPTY: 'BadRequest.EmoticonEmpty',
    EMOTICON_INVALID: 'BadRequest.EmoticonInvalid',
    EMOTICON_STICKERPACK_MISSING: 'BadRequest.EmoticonStickerpackMissing',
    ENCRYPTED_MESSAGE_INVALID: 'BadRequest.EncryptedMessageInvalid',
    ENCRYPTION_ALREADY_ACCEPTED: 'BadRequest.EncryptionAlreadyAccepted',
    ENCRYPTION_ALREADY_DECLINED: 'BadRequest.EncryptionAlreadyDeclined',
    ENCRYPTION_DECLINED: 'BadRequest.EncryptionDeclined',
    ENCRYPTION_ID_INVALID: 'BadRequest.EncryptionIdInvalid',
    ENTITIES_TOO_LONG: 'BadRequest.EntitiesTooLong',
    ENTITY_MENTION_USER_INVALID: 'BadRequest.EntityMentionUserInvalid',
    ERROR_TEXT_EMPTY: 'BadRequest.ErrorTextEmpty',
    EXPIRE_DATE_INVALID: 'BadRequest.ExpireDateInvalid',
    EXPORT_CARD_INVALID: 'BadRequest.ExportCardInvalid',
    EXTERNAL_URL_INVALID: 'BadRequest.ExternalUrlInvalid',
    FIELD_NAME_EMPTY: 'BadRequest.FieldNameEmpty',
    FIELD_NAME_INVALID: 'BadRequest.FieldNameInvalid',
    FILE_ID_INVALID: 'BadRequest.FileIdInvalid',
    FILE_MIGRATE_X: 'BadRequest.FileMigrate',
    FILE_PARTS_INVALID: 'BadRequest.FilePartsInvalid',
    FILE_PART_EMPTY: 'BadRequest.FilePartEmpty',
    FILE_PART_INVALID: 'BadRequest.FilePartInvalid',
    FILE_PART_LENGTH_INVALID: 'BadRequest.FilePartLengthInvalid',
    FILE_PART_SIZE_CHANGED: 'BadRequest.FilePartSizeChanged',
    FILE_PART_SIZE_INVALID: 'BadRequest.FilePartSizeInvalid',
    FILE_PART_TOO_BIG: 'BadRequest.FilePartTooBig',
    FILE_PART_X_MISSING: 'BadRequest.FilePartMissing',
    FILE_REFERENCE_EMPTY: 'BadRequest.FileReferenceEmpty',
    FILE_REFERENCE_EXPIRED: 'BadRequest.FileReferenceExpired',
    FILE_REFERENCE_INVALID: 'BadRequest.FileReferenceInvalid',
    FILTER_ID_INVALID: 'BadRequest.FilterIdInvalid',
    FIRSTNAME_INVALID: 'BadRequest.FirstnameInvalid',
    FOLDER_ID_EMPTY: 'BadRequest.FolderIdEmpty',
    FOLDER_ID_INVALID: 'BadRequest.FolderIdInvalid',
    FRESH_CHANGE_ADMINS_FORBIDDEN: 'BadRequest.FreshChangeAdminsForbidden',
    FROM_MESSAGE_BOT_DISABLED: 'BadRequest.FromMessageBotDisabled',
    FROM_PEER_INVALID: 'BadRequest.FromPeerInvalid',
    GAME_BOT_INVALID: 'BadRequest.GameBotInvalid',
    GEO_POINT_INVALID: 'BadRequest.GeoPointInvalid',
    GIF_CONTENT_TYPE_INVALID: 'BadRequest.GifContentTypeInvalid',
    GIF_ID_INVALID: 'BadRequest.GifIdInvalid',
    GRAPH_INVALID_RELOAD: 'BadRequest.GraphInvalidReload',
    GRAPH_OUTDATED_RELOAD: 'BadRequest.GraphOutdatedReload',
    GROUPCALL_SSRC_DUPLICATE_MUCH: 'BadRequest.GroupcallSsrcDuplicateMuch',
    GROUPED_MEDIA_INVALID: 'BadRequest.GroupedMediaInvalid',
    GROUP_CALL_INVALID: 'BadRequest.GroupCallInvalid',
    HASH_INVALID: 'BadRequest.HashInvalid',
    IMAGE_PROCESS_FAILED: 'BadRequest.ImageProcessFailed',
    IMPORT_FILE_INVALID: 'BadRequest.ImportFileInvalid',
    IMPORT_FORMAT_UNRECOGNIZED: 'BadRequest.ImportFormatUnrecognized',
    IMPORT_ID_INVALID: 'BadRequest.ImportIdInvalid',
    INLINE_RESULT_EXPIRED: 'BadRequest.InlineResultExpired',
    INPUT_CONSTRUCTOR_INVALID: 'BadRequest.InputConstructorInvalid',
    INPUT_FETCH_ERROR: 'BadRequest.InputFetchError',
    INPUT_FETCH_FAIL: 'BadRequest.InputFetchFail',
    INPUT_FILTER_INVALID: 'BadRequest.InputFilterInvalid',
    INPUT_LAYER_INVALID: 'BadRequest.InputLayerInvalid',
    INPUT_METHOD_INVALID: 'BadRequest.InputMethodInvalid',
    INPUT_REQUEST_TOO_LONG: 'BadRequest.InputRequestTooLong',
    INPUT_USER_DEACTIVATED: 'BadRequest.InputUserDeactivated',
    INVITE_HASH_EMPTY: 'BadRequest.InviteHashEmpty',
    INVITE_HASH_EXPIRED: 'BadRequest.InviteHashExpired',
    INVITE_HASH_INVALID: 'BadRequest.InviteHashInvalid',
    INVITE_REVOKED_MISSING: 'BadRequest.InviteRevokedMissing',
    LANG_PACK_INVALID: 'BadRequest.LangPackInvalid',
    LASTNAME_INVALID: 'BadRequest.LastnameInvalid',
    LIMIT_INVALID: 'BadRequest.LimitInvalid',
    LINK_NOT_MODIFIED: 'BadRequest.LinkNotModified',
    LOCATION_INVALID: 'BadRequest.LocationInvalid',
    MAX_ID_INVALID: 'BadRequest.MaxIdInvalid',
    MAX_QTS_INVALID: 'BadRequest.MaxQtsInvalid',
    MD5_CHECKSUM_INVALID: 'BadRequest.Md5ChecksumInvalid',
    MEDIA_CAPTION_TOO_LONG: 'BadRequest.MediaCaptionTooLong',
    MEDIA_EMPTY: 'BadRequest.MediaEmpty',
    MEDIA_INVALID: 'BadRequest.MediaInvalid',
    MEDIA_NEW_INVALID: 'BadRequest.MediaNewInvalid',
    MEDIA_PREV_INVALID: 'BadRequest.MediaPrevInvalid',
    MEGAGROUP_ID_INVALID: 'BadRequest.MegagroupIdInvalid',
    MEGAGROUP_PREHISTORY_HIDDEN: 'BadRequest.MegagroupPrehistoryHidden',
    MEGAGROUP_REQUIRED: 'BadRequest.MegagroupRequired',
    MESSAGE_EDIT_TIME_EXPIRED: 'BadRequest.MessageEditTimeExpired',
    MESSAGE_EMPTY: 'BadRequest.MessageEmpty',
    MESSAGE_IDS_EMPTY: 'BadRequest.MessageIdsEmpty',
    MESSAGE_ID_INVALID: 'BadRequest.MessageIdInvalid',
    MESSAGE_NOT_MODIFIED: 'BadRequest.MessageNotModified',
    MESSAGE_POLL_CLOSED: 'BadRequest.MessagePollClosed',
    MESSAGE_TOO_LONG: 'BadRequest.MessageTooLong',
    METHOD_INVALID: 'BadRequest.MethodInvalid',
    MSG_ID_INVALID: 'BadRequest.MsgIdInvalid',
    MSG_WAIT_FAILED: 'BadRequest.MsgWaitFailed',
    MULTI_MEDIA_TOO_LONG: 'BadRequest.MultiMediaTooLong',
    NEW_SALT_INVALID: 'BadRequest.NewSaltInvalid',
    NEW_SETTINGS_INVALID: 'BadRequest.NewSettingsInvalid',
    NEXT_OFFSET_INVALID: 'BadRequest.NextOffsetInvalid',
    OFFSET_INVALID: 'BadRequest.OffsetInvalid',
    OFFSET_PEER_ID_INVALID: 'BadRequest.OffsetPeerIdInvalid',
    OPTIONS_TOO_MUCH: 'BadRequest.OptionsTooMuch',
    OPTION_INVALID: 'BadRequest.OptionInvalid',
    PACK_SHORT_NAME_INVALID: 'BadRequest.PackShortNameInvalid',
    PACK_SHORT_NAME_OCCUPIED: 'BadRequest.PackShortNameOccupied',
    PACK_TITLE_INVALID: 'BadRequest.PackTitleInvalid',
    PARTICIPANTS_TOO_FEW: 'BadRequest.ParticipantsTooFew',
    PARTICIPANT_VERSION_OUTDATED: 'BadRequest.ParticipantVersionOutdated',
    PASSWORD_EMPTY: 'BadRequest.PasswordEmpty',
    PASSWORD_HASH_INVALID: 'BadRequest.PasswordHashInvalid',
    PASSWORD_MISSING: 'BadRequest.PasswordMissing',
    PASSWORD_RECOVERY_NA: 'BadRequest.PasswordRecoveryNa',
    PASSWORD_REQUIRED: 'BadRequest.PasswordRequired',
    PASSWORD_TOO_FRESH_X: 'BadRequest.PasswordTooFresh',
    PAYMENT_PROVIDER_INVALID: 'BadRequest.PaymentProviderInvalid',
    PEER_FLOOD: 'BadRequest.PeerFlood',
    PEER_ID_INVALID: 'BadRequest.PeerIdInvalid',
    PEER_ID_NOT_SUPPORTED: 'BadRequest.PeerIdNotSupported',
    PERSISTENT_TIMESTAMP_EMPTY: 'BadRequest.PersistentTimestampEmpty',
    PERSISTENT_TIMESTAMP_INVALID: 'BadRequest.PersistentTimestampInvalid',
    PHONE_CODE_EMPTY: 'BadRequest.PhoneCodeEmpty',
    PHONE_CODE_EXPIRED: 'BadRequest.PhoneCodeExpired',
    PHONE_CODE_HASH_EMPTY: 'BadRequest.PhoneCodeHashEmpty',
    PHONE_CODE_INVALID: 'BadRequest.PhoneCodeInvalid',
    PHONE_NUMBER_APP_SIGNUP_FORBIDDEN: 'BadRequest.PhoneNumberAppSignupForbidden',
    PHONE_NUMBER_BANNED: 'BadRequest.PhoneNumberBanned',
    PHONE_NUMBER_FLOOD: 'BadRequest.PhoneNumberFlood',
    PHONE_NUMBER_INVALID: 'BadRequest.PhoneNumberInvalid',
    PHONE_NUMBER_OCCUPIED: 'BadRequest.PhoneNumberOccupied',
    PHONE_NUMBER_UNOCCUPIED: 'BadRequest.PhoneNumberUnoccupied',
    PHONE_PASSWORD_PROTECTED: 'BadRequest.PhonePasswordProtected',
    PHOTO_CONTENT_TYPE_INVALID: 'BadRequest.PhotoContentTypeInvalid',
    PHOTO_CONTENT_URL_EMPTY: 'BadRequest.PhotoContentUrlEmpty',
    PHOTO_CROP_FILE_MISSING: 'BadRequest.PhotoCropFileMissing',
    PHOTO_CROP_SIZE_SMALL: 'BadRequest.PhotoCropSizeSmall',
    PHOTO_EXT_INVALID: 'BadRequest.PhotoExtInvalid',
    PHOTO_FILE_MISSING: 'BadRequest.PhotoFileMissing',
    PHOTO_ID_INVALID: 'BadRequest.PhotoIdInvalid',
    PHOTO_INVALID: 'BadRequest.PhotoInvalid',
    PHOTO_INVALID_DIMENSIONS: 'BadRequest.PhotoInvalidDimensions',
    PHOTO_SAVE_FILE_INVALID: 'BadRequest.PhotoSaveFileInvalid',
    PHOTO_THUMB_URL_EMPTY: 'BadRequest.PhotoThumbUrlEmpty',
    PHOTO_THUMB_URL_INVALID: 'BadRequest.PhotoThumbUrlInvalid',
    PINNED_DIALOGS_TOO_MUCH: 'BadRequest.PinnedDialogsTooMuch',
    PIN_RESTRICTED: 'BadRequest.PinRestricted',
    POLL_ANSWERS_INVALID: 'BadRequest.PollAnswersInvalid',
    POLL_OPTION_DUPLICATE: 'BadRequest.PollOptionDuplicate',
    POLL_OPTION_INVALID: 'BadRequest.PollOptionInvalid',
    POLL_QUESTION_INVALID: 'BadRequest.PollQuestionInvalid',
    POLL_UNSUPPORTED: 'BadRequest.PollUnsupported',
    POLL_VOTE_REQUIRED: 'BadRequest.PollVoteRequired',
    PRIVACY_KEY_INVALID: 'BadRequest.PrivacyKeyInvalid',
    PRIVACY_TOO_LONG: 'BadRequest.PrivacyTooLong',
    PRIVACY_VALUE_INVALID: 'BadRequest.PrivacyValueInvalid',
    QUERY_ID_EMPTY: 'BadRequest.QueryIdEmpty',
    QUERY_ID_INVALID: 'BadRequest.QueryIdInvalid',
    QUERY_TOO_SHORT: 'BadRequest.QueryTooShort',
    QUIZ_CORRECT_ANSWERS_EMPTY: 'BadRequest.QuizCorrectAnswersEmpty',
    QUIZ_CORRECT_ANSWERS_TOO_MUCH: 'BadRequest.QuizCorrectAnswersTooMuch',
    QUIZ_CORRECT_ANSWER_INVALID: 'BadRequest.QuizCorrectAnswerInvalid',
    QUIZ_MULTIPLE_INVALID: 'BadRequest.QuizMultipleInvalid',
    RANDOM_ID_EMPTY: 'BadRequest.RandomIdEmpty',
    RANDOM_ID_INVALID: 'BadRequest.RandomIdInvalid',
    RANDOM_LENGTH_INVALID: 'BadRequest.RandomLengthInvalid',
    RANGES_INVALID: 'BadRequest.RangesInvalid',
    REACTION_EMPTY: 'BadRequest.ReactionEmpty',
    REACTION_INVALID: 'BadRequest.ReactionInvalid',
    REFLECTOR_NOT_AVAILABLE: 'BadRequest.ReflectorNotAvailable',
    REPLY_MARKUP_BUY_EMPTY: 'BadRequest.ReplyMarkupBuyEmpty',
    REPLY_MARKUP_GAME_EMPTY: 'BadRequest.ReplyMarkupGameEmpty',
    REPLY_MARKUP_INVALID: 'BadRequest.ReplyMarkupInvalid',
    REPLY_MARKUP_TOO_LONG: 'BadRequest.ReplyMarkupTooLong',
    RESULTS_TOO_MUCH: 'BadRequest.ResultsTooMuch',
    RESULT_ID_DUPLICATE: 'BadRequest.ResultIdDuplicate',
    RESULT_ID_EMPTY: 'BadRequest.ResultIdEmpty',
    RESULT_ID_INVALID: 'BadRequest.ResultIdInvalid',
    RESULT_TYPE_INVALID: 'BadRequest.ResultTypeInvalid',
    REVOTE_NOT_ALLOWED: 'BadRequest.RevoteNotAllowed',
    RSA_DECRYPT_FAILED: 'BadRequest.RsaDecryptFailed',
    SCHEDULE_BOT_NOT_ALLOWED: 'BadRequest.ScheduleBotNotAllowed',
    SCHEDULE_DATE_INVALID: 'BadRequest.ScheduleDateInvalid',
    SCHEDULE_DATE_TOO_LATE: 'BadRequest.ScheduleDateTooLate',
    SCHEDULE_STATUS_PRIVATE: 'BadRequest.ScheduleStatusPrivate',
    SCHEDULE_TOO_MUCH: 'BadRequest.ScheduleTooMuch',
    SEARCH_QUERY_EMPTY: 'BadRequest.SearchQueryEmpty',
    SECONDS_INVALID: 'BadRequest.SecondsInvalid',
    SEND_MESSAGE_MEDIA_INVALID: 'BadRequest.SendMessageMediaInvalid',
    SEND_MESSAGE_TYPE_INVALID: 'BadRequest.SendMessageTypeInvalid',
    SESSION_TOO_FRESH_X: 'BadRequest.SessionTooFresh',
    SETTINGS_INVALID: 'BadRequest.SettingsInvalid',
    SHA256_HASH_INVALID: 'BadRequest.Shatwo56HashInvalid',
    SHORTNAME_OCCUPY_FAILED: 'BadRequest.ShortnameOccupyFailed',
    SLOWMODE_MULTI_MSGS_DISABLED: 'BadRequest.SlowmodeMultiMsgsDisabled',
    SMS_CODE_CREATE_FAILED: 'BadRequest.SmsCodeCreateFailed',
    SRP_ID_INVALID: 'BadRequest.SrpIdInvalid',
    SRP_PASSWORD_CHANGED: 'BadRequest.SrpPasswordChanged',
    START_PARAM_EMPTY: 'BadRequest.StartParamEmpty',
    START_PARAM_INVALID: 'BadRequest.StartParamInvalid',
    START_PARAM_TOO_LONG: 'BadRequest.StartParamTooLong',
    STICKERSET_INVALID: 'BadRequest.StickersetInvalid',
    STICKERS_EMPTY: 'BadRequest.StickersEmpty',
    STICKER_DOCUMENT_INVALID: 'BadRequest.StickerDocumentInvalid',
    STICKER_EMOJI_INVALID: 'BadRequest.StickerEmojiInvalid',
    STICKER_FILE_INVALID: 'BadRequest.StickerFileInvalid',
    STICKER_ID_INVALID: 'BadRequest.StickerIdInvalid',
    STICKER_INVALID: 'BadRequest.StickerInvalid',
    STICKER_PNG_DIMENSIONS: 'BadRequest.StickerPngDimensions',
    STICKER_PNG_NOPNG: 'BadRequest.StickerPngNopng',
    STICKER_TGS_NOTGS: 'BadRequest.StickerTgsNotgs',
    STICKER_THUMB_PNG_NOPNG: 'BadRequest.StickerThumbPngNopng',
    TAKEOUT_INVALID: 'BadRequest.TakeoutInvalid',
    TAKEOUT_REQUIRED: 'BadRequest.TakeoutRequired',
    TEMP_AUTH_KEY_EMPTY: 'BadRequest.TempAuthKeyEmpty',
    THEME_FILE_INVALID: 'BadRequest.ThemeFileInvalid',
    THEME_FORMAT_INVALID: 'BadRequest.ThemeFormatInvalid',
    THEME_INVALID: 'BadRequest.ThemeInvalid',
    THEME_MIME_INVALID: 'BadRequest.ThemeMimeInvalid',
    TMP_PASSWORD_DISABLED: 'BadRequest.TmpPasswordDisabled',
    TMP_PASSWORD_INVALID: 'BadRequest.TmpPasswordInvalid',
    TOKEN_INVALID: 'BadRequest.TokenInvalid',
    TTL_DAYS_INVALID: 'BadRequest.TtlDaysInvalid',
    TTL_MEDIA_INVALID: 'BadRequest.TtlMediaInvalid',
    TYPES_EMPTY: 'BadRequest.TypesEmpty',
    TYPE_CONSTRUCTOR_INVALID: 'BadRequest.TypeConstructorInvalid',
    UNTIL_DATE_INVALID: 'BadRequest.UntilDateInvalid',
    URL_INVALID: 'BadRequest.UrlInvalid',
    USAGE_LIMIT_INVALID: 'BadRequest.UsageLimitInvalid',
    USERNAME_INVALID: 'BadRequest.UsernameInvalid',
    USERNAME_NOT_MODIFIED: 'BadRequest.UsernameNotModified',
    USERNAME_NOT_OCCUPIED: 'BadRequest.UsernameNotOccupied',
    USERNAME_OCCUPIED: 'BadRequest.UsernameOccupied',
    USERPIC_UPLOAD_REQUIRED: 'BadRequest.UserpicUploadRequired',
    USERS_TOO_FEW: 'BadRequest.UsersTooFew',
    USERS_TOO_MUCH: 'BadRequest.UsersTooMuch',
    USER_ADMIN_INVALID: 'BadRequest.UserAdminInvalid',
    USER_ALREADY_PARTICIPANT: 'BadRequest.UserAlreadyParticipant',
    USER_BANNED_IN_CHANNEL: 'BadRequest.UserBannedInChannel',
    USER_BLOCKED: 'BadRequest.UserBlocked',
    USER_BOT: 'BadRequest.UserBot',
    USER_BOT_INVALID: 'BadRequest.UserBotInvalid',
    USER_BOT_REQUIRED: 'BadRequest.UserBotRequired',
    USER_CHANNELS_TOO_MUCH: 'BadRequest.UserChannelsTooMuch',
    USER_CREATOR: 'BadRequest.UserCreator',
    USER_ID_INVALID: 'BadRequest.UserIdInvalid',
    USER_INVALID: 'BadRequest.UserInvalid',
    USER_IS_BLOCKED: 'BadRequest.UserIsBlocked',
    USER_IS_BOT: 'BadRequest.UserIsBot',
    USER_KICKED: 'BadRequest.UserKicked',
    USER_NOT_MUTUAL_CONTACT: 'BadRequest.UserNotMutualContact',
    USER_NOT_PARTICIPANT: 'BadRequest.UserNotParticipant',
    VIDEO_CONTENT_TYPE_INVALID: 'BadRequest.VideoContentTypeInvalid',
    VIDEO_FILE_INVALID: 'BadRequest.VideoFileInvalid',
    VOLUME_LOC_NOT_FOUND: 'BadRequest.VolumeLocNotFound',
    WALLPAPER_FILE_INVALID: 'BadRequest.WallpaperFileInvalid',
    WALLPAPER_INVALID: 'BadRequest.WallpaperInvalid',
    WALLPAPER_MIME_INVALID: 'BadRequest.WallpaperMimeInvalid',
    WC_CONVERT_URL_INVALID: 'BadRequest.WcConvertUrlInvalid',
    WEBDOCUMENT_INVALID: 'BadRequest.WebdocumentInvalid',
    WEBDOCUMENT_MIME_INVALID: 'BadRequest.WebdocumentMimeInvalid',
    WEBDOCUMENT_SIZE_TOO_BIG: 'BadRequest.WebdocumentSizeTooBig',
    WEBDOCUMENT_URL_EMPTY: 'BadRequest.WebdocumentUrlEmpty',
    WEBDOCUMENT_URL_INVALID: 'BadRequest.WebdocumentUrlInvalid',
    WEBPAGE_CURL_FAILED: 'BadRequest.WebpageCurlFailed',
    WEBPAGE_MEDIA_EMPTY: 'BadRequest.WebpageMediaEmpty',
    YOU_BLOCKED_USER: 'BadRequest.YouBlockedUser',
  },
  401: {
    _: 'Unauthorized.Unauthorized',
    ACTIVE_USER_REQUIRED: 'Unauthorized.ActiveUserRequired',
    AUTH_KEY_INVALID: 'Unauthorized.AuthKeyInvalid',
    AUTH_KEY_PERM_EMPTY: 'Unauthorized.AuthKeyPermEmpty',
    AUTH_KEY_UNREGISTERED: 'Unauthorized.AuthKeyUnregistered',
    SESSION_EXPIRED: 'Unauthorized.SessionExpired',
    SESSION_PASSWORD_NEEDED: 'Unauthorized.SessionPasswordNeeded',
    SESSION_REVOKED: 'Unauthorized.SessionRevoked',
    USER_DEACTIVATED: 'Unauthorized.UserDeactivated',
    USER_DEACTIVATED_BAN: 'Unauthorized.UserDeactivatedBan',
  },
  403: {
    _: 'Forbidden.Forbidden',
    BROADCAST_FORBIDDEN: 'Forbidden.BroadcastForbidden',
    CHANNEL_PUBLIC_GROUP_NA: 'Forbidden.ChannelPublicGroupNa',
    CHAT_ADMIN_INVITE_REQUIRED: 'Forbidden.ChatAdminInviteRequired',
    CHAT_ADMIN_REQUIRED: 'Forbidden.ChatAdminRequired',
    CHAT_FORBIDDEN: 'Forbidden.ChatForbidden',
    CHAT_SEND_GIFS_FORBIDDEN: 'Forbidden.ChatSendGifsForbidden',
    CHAT_SEND_INLINE_FORBIDDEN: 'Forbidden.ChatSendInlineForbidden',
    CHAT_SEND_MEDIA_FORBIDDEN: 'Forbidden.ChatSendMediaForbidden',
    CHAT_SEND_POLL_FORBIDDEN: 'Forbidden.ChatSendPollForbidden',
    CHAT_SEND_STICKERS_FORBIDDEN: 'Forbidden.ChatSendStickersForbidden',
    CHAT_WRITE_FORBIDDEN: 'Forbidden.ChatWriteForbidden',
    EDIT_BOT_INVITE_FORBIDDEN: 'Forbidden.EditBotInviteForbidden',
    INLINE_BOT_REQUIRED: 'Forbidden.InlineBotRequired',
    MESSAGE_AUTHOR_REQUIRED: 'Forbidden.MessageAuthorRequired',
    MESSAGE_DELETE_FORBIDDEN: 'Forbidden.MessageDeleteForbidden',
    POLL_VOTE_REQUIRED: 'Forbidden.PollVoteRequired',
    RIGHT_FORBIDDEN: 'Forbidden.RightForbidden',
    SENSITIVE_CHANGE_FORBIDDEN: 'Forbidden.SensitiveChangeForbidden',
    TAKEOUT_REQUIRED: 'Forbidden.TakeoutRequired',
    USER_BOT_INVALID: 'Forbidden.UserBotInvalid',
    USER_CHANNELS_TOO_MUCH: 'Forbidden.UserChannelsTooMuch',
    USER_INVALID: 'Forbidden.UserInvalid',
    USER_IS_BLOCKED: 'Forbidden.UserIsBlocked',
    USER_NOT_MUTUAL_CONTACT: 'Forbidden.UserNotMutualContact',
    USER_PRIVACY_RESTRICTED: 'Forbidden.UserPrivacyRestricted',
    USER_RESTRICTED: 'Forbidden.UserRestricted',
    PREMIUM_ACCOUNT_REQUIRED: 'Forbidden.PremiumAccountRequired',
  },
  406: {
    _: 'NotAcceptable.NotAcceptable',
    AUTH_KEY_DUPLICATED: 'NotAcceptable.AuthKeyDuplicated',
    CHANNEL_PRIVATE: 'NotAcceptable.ChannelPrivate',
    FILEREF_UPGRADE_NEEDED: 'NotAcceptable.FilerefUpgradeNeeded',
    FRESH_CHANGE_ADMINS_FORBIDDEN: 'NotAcceptable.FreshChangeAdminsForbidden',
    FRESH_CHANGE_PHONE_FORBIDDEN: 'NotAcceptable.FreshChangePhoneForbidden',
    FRESH_RESET_AUTHORISATION_FORBIDDEN: 'NotAcceptable.FreshResetAuthorisationForbidden',
    PHONE_NUMBER_INVALID: 'NotAcceptable.PhoneNumberInvalid',
    PHONE_PASSWORD_FLOOD: 'NotAcceptable.PhonePasswordFlood',
    STICKERSET_INVALID: 'NotAcceptable.StickersetInvalid',
    STICKERSET_OWNER_ANONYMOUS: 'NotAcceptable.StickersetOwnerAnonymous',
    USERPIC_UPLOAD_REQUIRED: 'NotAcceptable.UserpicUploadRequired',
    USER_RESTRICTED: 'NotAcceptable.UserRestricted',
  },
  420: {
    _: 'Flood.Flood',
    '2FA_CONFIRM_WAIT_X': 'Flood.TwoFaConfirmWait',
    FLOOD_TEST_PHONE_WAIT_X: 'Flood.FloodTestPhoneWait',
    FLOOD_WAIT_X: 'Flood.FloodWait',
    SLOWMODE_WAIT_X: 'Flood.SlowmodeWait',
    TAKEOUT_INIT_DELAY_X: 'Flood.TakeoutInitDelay',
  },
  500: {
    _: 'InternalServerError.InternalServerError',
    API_CALL_ERROR: 'InternalServerError.ApiCallError',
    AUTH_RESTART: 'InternalServerError.AuthRestart',
    CALL_OCCUPY_FAILED: 'InternalServerError.CallOccupyFailed',
    CHAT_ID_GENERATE_FAILED: 'InternalServerError.ChatIdGenerateFailed',
    CHAT_OCCUPY_LOC_FAILED: 'InternalServerError.ChatOccupyLocFailed',
    CHAT_OCCUPY_USERNAME_FAILED: 'InternalServerError.ChatOccupyUsernameFailed',
    CHP_CALL_FAIL: 'InternalServerError.ChpCallFail',
    ENCRYPTION_OCCUPY_ADMIN_FAILED: 'InternalServerError.EncryptionOccupyAdminFailed',
    ENCRYPTION_OCCUPY_FAILED: 'InternalServerError.EncryptionOccupyFailed',
    FOLDER_DEAC_AUTOFIX_ALL: 'InternalServerError.FolderDeacAutofixAll',
    GROUPCALL_ADD_PARTICIPANTS_FAILED: 'InternalServerError.GroupcallAddParticipantsFailed',
    GROUPED_ID_OCCUPY_FAILED: 'InternalServerError.GroupedIdOccupyFailed',
    HISTORY_GET_FAILED: 'InternalServerError.HistoryGetFailed',
    IMAGE_ENGINE_DOWN: 'InternalServerError.ImageEngineDown',
    INTERDC_X_CALL_ERROR: 'InternalServerError.InterdcCallError',
    INTERDC_X_CALL_RICH_ERROR: 'InternalServerError.InterdcCallRichError',
    MEMBER_FETCH_FAILED: 'InternalServerError.MemberFetchFailed',
    MEMBER_NO_LOCATION: 'InternalServerError.MemberNoLocation',
    MEMBER_OCCUPY_PRIMARY_LOC_FAILED: 'InternalServerError.MemberOccupyPrimaryLocFailed',
    MEMBER_OCCUPY_USERNAME_FAILED: 'InternalServerError.MemberOccupyUsernameFailed',
    MSGID_DECREASE_RETRY: 'InternalServerError.MsgidDecreaseRetry',
    MSG_RANGE_UNSYNC: 'InternalServerError.MsgRangeUnsync',
    MT_SEND_QUEUE_TOO_LONG: 'InternalServerError.MtSendQueueTooLong',
    NEED_CHAT_INVALID: 'InternalServerError.NeedChatInvalid',
    NEED_MEMBER_INVALID: 'InternalServerError.NeedMemberInvalid',
    No_workers_running: 'InternalServerError.NoWorkersRunning',
    PARTICIPANT_CALL_FAILED: 'InternalServerError.ParticipantCallFailed',
    PERSISTENT_TIMESTAMP_OUTDATED: 'InternalServerError.PersistentTimestampOutdated',
    PHOTO_CREATE_FAILED: 'InternalServerError.PhotoCreateFailed',
    POSTPONED_TIMEOUT: 'InternalServerError.PostponedTimeout',
    PTS_CHANGE_EMPTY: 'InternalServerError.PtsChangeEmpty',
    RANDOM_ID_DUPLICATE: 'InternalServerError.RandomIdDuplicate',
    REG_ID_GENERATE_FAILED: 'InternalServerError.RegIdGenerateFailed',
    RPC_CALL_FAIL: 'InternalServerError.RpcCallFail',
    RPC_CONNECT_FAILED: 'InternalServerError.RpcConnectFailed',
    RPC_MCGET_FAIL: 'InternalServerError.RpcMcgetFail',
    SIGN_IN_FAILED: 'InternalServerError.SignInFailed',
    STORAGE_CHECK_FAILED: 'InternalServerError.StorageCheckFailed',
    STORE_INVALID_SCALAR_TYPE: 'InternalServerError.StoreInvalidScalarType',
    UNKNOWN_METHOD: 'InternalServerError.UnknownMethod',
    UPLOAD_NO_VOLUME: 'InternalServerError.UploadNoVolume',
    VOLUME_LOC_NOT_FOUND: 'InternalServerError.VolumeLocNotFound',
    WORKER_BUSY_TOO_LONG_RETRY: 'InternalServerError.WorkerBusyTooLongRetry',
    WP_ID_GENERATE_FAILED: 'InternalServerError.WpIdGenerateFailed',
  },
  503: {
    _: 'ServiceUnavailable.ServiceUnavailable',
    ApiCallError: 'ServiceUnavailable.ApiCallError',
    Timeout: 'ServiceUnavailable.Timeout',
  },
};

export { Exceptions, count };