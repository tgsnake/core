// ===8===
sclayer8.decryptedMessage#1f814f1f random_id:long random_bytes:bytes message:string media:DecryptedMessageMedia = DecryptedMessage;
sclayer8.decryptedMessageService#aa48327d random_id:long random_bytes:bytes action:DecryptedMessageAction = DecryptedMessage;
sclayer8.decryptedMessageMediaEmpty#89f5c4a = DecryptedMessageMedia;
sclayer8.decryptedMessageMediaPhoto#32798a8c thumb:bytes thumb_w:int thumb_h:int w:int h:int size:int key:bytes iv:bytes = DecryptedMessageMedia;
sclayer8.decryptedMessageMediaVideo#4cee6ef3 thumb:bytes thumb_w:int thumb_h:int duration:int w:int h:int size:int key:bytes iv:bytes = DecryptedMessageMedia;
sclayer8.decryptedMessageMediaGeoPoint#35480a59 lat:double long:double = DecryptedMessageMedia;
sclayer8.decryptedMessageMediaContact#588a0a97 phone_number:string first_name:string last_name:string user_id:int = DecryptedMessageMedia;
sclayer8.decryptedMessageActionSetMessageTTL#a1733aec ttl_seconds:int = DecryptedMessageAction;
sclayer8.decryptedMessageMediaDocument#b095434b thumb:bytes thumb_w:int thumb_h:int file_name:string mime_type:string size:int key:bytes iv:bytes = DecryptedMessageMedia;
sclayer8.decryptedMessageMediaAudio#6080758f duration:int size:int key:bytes iv:bytes = DecryptedMessageMedia;
sclayer8.decryptedMessageActionReadMessages#c4f40be random_ids:Vector<long> = DecryptedMessageAction;
sclayer8.decryptedMessageActionDeleteMessages#65614304 random_ids:Vector<long> = DecryptedMessageAction;
sclayer8.decryptedMessageActionScreenshotMessages#8ac1f475 random_ids:Vector<long> = DecryptedMessageAction;
sclayer8.decryptedMessageActionFlushHistory#6719e45c = DecryptedMessageAction;

// ===17===
sclayer17.decryptedMessage#204d3878 random_id:long ttl:int message:string media:DecryptedMessageMedia = DecryptedMessage;
sclayer17.decryptedMessageService#73164160 random_id:long action:DecryptedMessageAction = DecryptedMessage;
sclayer17.decryptedMessageMediaVideo#524a415d thumb:bytes thumb_w:int thumb_h:int duration:int mime_type:string w:int h:int size:int key:bytes iv:bytes = DecryptedMessageMedia;
sclayer17.decryptedMessageMediaAudio#57e0a9cb duration:int mime_type:string size:int key:bytes iv:bytes = DecryptedMessageMedia;
sclayer17.decryptedMessageLayer#1be31789 random_bytes:bytes layer:int in_seq_no:int out_seq_no:int message:DecryptedMessage = DecryptedMessageLayer;
sclayer17.sendMessageTypingAction#16bf744e = SendMessageAction;
sclayer17.sendMessageCancelAction#fd5ec8f5 = SendMessageAction;
sclayer17.sendMessageRecordVideoAction#a187d66f = SendMessageAction;
sclayer17.sendMessageUploadVideoAction#92042ff7 = SendMessageAction;
sclayer17.sendMessageRecordAudioAction#d52f73f7 = SendMessageAction;
sclayer17.sendMessageUploadAudioAction#e6ac8a6f = SendMessageAction;
sclayer17.sendMessageUploadPhotoAction#990a3c1a = SendMessageAction;
sclayer17.sendMessageUploadDocumentAction#8faee98e = SendMessageAction;
sclayer17.sendMessageGeoLocationAction#176f8ba1 = SendMessageAction;
sclayer17.sendMessageChooseContactAction#628cbc6f = SendMessageAction;
sclayer17.decryptedMessageActionResend#511110b0 start_seq_no:int end_seq_no:int = DecryptedMessageAction;
sclayer17.decryptedMessageActionNotifyLayer#f3048883 layer:int = DecryptedMessageAction;
sclayer17.decryptedMessageActionTyping#ccb27641 action:SendMessageAction = DecryptedMessageAction;

// ===20===
sclayer20.decryptedMessageActionRequestKey#f3c9611b exchange_id:long g_a:bytes = DecryptedMessageAction;
sclayer20.decryptedMessageActionAcceptKey#6fe1735b exchange_id:long g_b:bytes key_fingerprint:long = DecryptedMessageAction;
sclayer20.decryptedMessageActionAbortKey#dd05ec6b exchange_id:long = DecryptedMessageAction;
sclayer20.decryptedMessageActionCommitKey#ec2e0b9b exchange_id:long key_fingerprint:long = DecryptedMessageAction;
sclayer20.decryptedMessageActionNoop#a82fdd63 = DecryptedMessageAction;

// ===23===
sclayer23.documentAttributeImageSize#6c37c15c w:int h:int = DocumentAttribute;
sclayer23.documentAttributeAnimated#11b58939 = DocumentAttribute;
sclayer23.documentAttributeSticker#fb0a5727 = DocumentAttribute;
sclayer23.documentAttributeVideo#5910cccb duration:int w:int h:int = DocumentAttribute;
sclayer23.documentAttributeAudio#51448e5 duration:int = DocumentAttribute;
sclayer23.documentAttributeFilename#15590068 file_name:string = DocumentAttribute;
sclayer23.photoSizeEmpty#e17e23c type:string = PhotoSize;
sclayer23.photoSize#77bfb61b type:string location:FileLocation w:int h:int size:int = PhotoSize;
sclayer23.photoCachedSize#e9a734fa type:string location:FileLocation w:int h:int bytes:bytes = PhotoSize;
sclayer23.fileLocationUnavailable#7c596b46 volume_id:long local_id:int secret:long = FileLocation;
sclayer23.fileLocation#53d69076 dc_id:int volume_id:long local_id:int secret:long = FileLocation;
sclayer23.decryptedMessageMediaExternalDocument#fa95b0dd id:long access_hash:long date:int mime_type:string size:int thumb:PhotoSize dc_id:int attributes:Vector<DocumentAttribute> = DecryptedMessageMedia;

// ===45===
sclayer45.decryptedMessage#36b091de flags:# random_id:long ttl:int message:string media:flags.9?DecryptedMessageMedia entities:flags.7?Vector<MessageEntity> via_bot_name:flags.11?string reply_to_random_id:flags.3?long = DecryptedMessage;
sclayer45.decryptedMessageMediaPhoto#f1fa8d78 thumb:bytes thumb_w:int thumb_h:int w:int h:int size:int key:bytes iv:bytes caption:string = DecryptedMessageMedia;
sclayer45.decryptedMessageMediaVideo#970c8c0e thumb:bytes thumb_w:int thumb_h:int duration:int mime_type:string w:int h:int size:int key:bytes iv:bytes caption:string = DecryptedMessageMedia;
sclayer45.decryptedMessageMediaDocument#7afe8ae2 thumb:bytes thumb_w:int thumb_h:int mime_type:string size:int key:bytes iv:bytes attributes:Vector<DocumentAttribute> caption:string = DecryptedMessageMedia;
sclayer45.documentAttributeSticker#3a556302 alt:string stickerset:InputStickerSet = DocumentAttribute;
sclayer45.documentAttributeAudio#ded218e0 duration:int title:string performer:string = DocumentAttribute;
sclayer45.messageEntityUnknown#bb92ba95 offset:int length:int = MessageEntity;
sclayer45.messageEntityMention#fa04579d offset:int length:int = MessageEntity;
sclayer45.messageEntityHashtag#6f635b0d offset:int length:int = MessageEntity;
sclayer45.messageEntityBotCommand#6cef8ac7 offset:int length:int = MessageEntity;
sclayer45.messageEntityUrl#6ed02538 offset:int length:int = MessageEntity;
sclayer45.messageEntityEmail#64e475c2 offset:int length:int = MessageEntity;
sclayer45.messageEntityBold#bd610bc9 offset:int length:int = MessageEntity;
sclayer45.messageEntityItalic#826f8b60 offset:int length:int = MessageEntity;
sclayer45.messageEntityCode#28a20571 offset:int length:int = MessageEntity;
sclayer45.messageEntityPre#73924be0 offset:int length:int language:string = MessageEntity;
sclayer45.messageEntityTextUrl#76a6d327 offset:int length:int url:string = MessageEntity;
sclayer45.inputStickerSetShortName#861cc8a0 short_name:string = InputStickerSet;
sclayer45.inputStickerSetEmpty#ffb62b95 = InputStickerSet;
sclayer45.decryptedMessageMediaVenue#8a0df56f lat:double long:double title:string address:string provider:string venue_id:string = DecryptedMessageMedia;
sclayer45.decryptedMessageMediaWebPage#e50511d8 url:string = DecryptedMessageMedia;

// ===46===
sclayer46.documentAttributeAudio#9852f9c6 flags:# voice:flags.10?true duration:int title:flags.0?string performer:flags.1?string waveform:flags.2?bytes = DocumentAttribute;

// ===66===
sclayer66.documentAttributeVideo#ef02ce6 flags:# round_message:flags.0?true duration:int w:int h:int = DocumentAttribute;
sclayer66.sendMessageRecordRoundAction#88f27fbc = SendMessageAction;
sclayer66.sendMessageUploadRoundAction#bb718624 = SendMessageAction;

// ===73===
sclayer73.decryptedMessage#91cc4674 flags:# no_webpage:flags.1?true silent:flags.5?true random_id:long ttl:int message:string media:flags.9?DecryptedMessageMedia entities:flags.7?Vector<MessageEntity> via_bot_name:flags.11?string reply_to_random_id:flags.3?long grouped_id:flags.17?long = DecryptedMessage;

// ===101===
sclayer101.messageEntityUnderline#9c4e7e8b offset:int length:int = MessageEntity;
sclayer101messageEntityStrike#bf0693d4 offset:int length:int = MessageEntity;
sclayer101.messageEntityBlockquote#20df5d0 offset:int length:int = MessageEntity;

// ===143===
sclayer143.decryptedMessageMediaDocument#6abd9782 thumb:bytes thumb_w:int thumb_h:int mime_type:string size:long key:bytes iv:bytes attributes:Vector<DocumentAttribute> caption:string = DecryptedMessageMedia;

// ===144===
sclayer144.messageEntitySpoiler#32ca960f offset:int length:int = MessageEntity;
sclayer144.messageEntityCustomEmoji#c8cf05f8 offset:int length:int document_id:long = MessageEntity;