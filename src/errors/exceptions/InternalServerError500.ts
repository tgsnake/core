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

export class InternalServerError extends RPCError {
  override code: number = 500;
  override name: string = 'INTERNAL_SERVER_ERROR';
}
export class ApiCallError extends InternalServerError {
  override id: string = 'API_CALL_ERROR';
  override message: string =
    'API call error due to Telegram having internal problems. Please try again later';
}
export class AuthKeyUnsynchronized extends InternalServerError {
  override id: string = 'AUTH_KEY_UNSYNCHRONIZED';
  override message: string = 'Internal error, please repeat the method call.';
}
export class AuthRestart extends InternalServerError {
  override id: string = 'AUTH_RESTART';
  override message: string = 'Restart the authorization process.';
}
export class AuthRestartX extends InternalServerError {
  override id: string = 'AUTH_RESTART_X';
  override message: string = 'Internal error (debug info {value}), please repeat the method call.';
}
export class CallOccupyFailed extends InternalServerError {
  override id: string = 'CALL_OCCUPY_FAILED';
  override message: string = 'The call failed because the user is already making another call.';
}
export class CdnSaltsEmpty extends InternalServerError {
  override id: string = 'CDN_SALTS_EMPTY';
  override message: string = '';
}
export class CdnUploadTimeout extends InternalServerError {
  override id: string = 'CDN_UPLOAD_TIMEOUT';
  override message: string =
    'A server-side timeout occurred while reuploading the file to the CDN DC.';
}
export class ChatIdGenerateFailed extends InternalServerError {
  override id: string = 'CHAT_ID_GENERATE_FAILED';
  override message: string = 'Failure while generating the chat ID.';
}
export class ChatInvalid extends InternalServerError {
  override id: string = 'CHAT_INVALID';
  override message: string = 'Invalid chat.';
}
export class ChatOccupyLocFailed extends InternalServerError {
  override id: string = 'CHAT_OCCUPY_LOC_FAILED';
  override message: string = 'An internal error occurred while creating the chat';
}
export class ChatOccupyUsernameFailed extends InternalServerError {
  override id: string = 'CHAT_OCCUPY_USERNAME_FAILED';
  override message: string =
    'Failure to occupy chat username due to Telegram having internal problems. Please try again later';
}
export class ChpCallFail extends InternalServerError {
  override id: string = 'CHP_CALL_FAIL';
  override message: string = 'Telegram is having internal problems. Please try again later';
}
export class EncryptionOccupyAdminFailed extends InternalServerError {
  override id: string = 'ENCRYPTION_OCCUPY_ADMIN_FAILED';
  override message: string =
    'Failed occupying memory for admin info due to Telegram having internal problems. Please try again later';
}
export class EncryptionOccupyFailed extends InternalServerError {
  override id: string = 'ENCRYPTION_OCCUPY_FAILED';
  override message: string = 'Internal server error while accepting secret chat';
}
export class FolderDeacAutofixAll extends InternalServerError {
  override id: string = 'FOLDER_DEAC_AUTOFIX_ALL';
  override message: string = 'Telegram is having internal problems. Please try again later';
}
export class GroupcallAddParticipantsFailed extends InternalServerError {
  override id: string = 'GROUPCALL_ADD_PARTICIPANTS_FAILED';
  override message: string =
    'Failure while adding voice chat member due to Telegram having internal problems. Please try again later';
}
export class GroupedIdOccupyFailed extends InternalServerError {
  override id: string = 'GROUPED_ID_OCCUPY_FAILED';
  override message: string = 'Telegram is having internal problems. Please try again later';
}
export class HistoryGetFailed extends InternalServerError {
  override id: string = 'HISTORY_GET_FAILED';
  override message: string =
    "The chat history couldn't be retrieved due to Telegram having internal problems. Please try again later";
}
export class ImageEngineDown extends InternalServerError {
  override id: string = 'IMAGE_ENGINE_DOWN';
  override message: string =
    'Image engine down due to Telegram having internal problems. Please try again later';
}
export class InterdcCallError extends InternalServerError {
  override id: string = 'INTERDC_X_CALL_ERROR';
  override message: string =
    'An error occurred while Telegram was intercommunicating with DC{value}. Please try again later';
}
export class InterdcCallRichError extends InternalServerError {
  override id: string = 'INTERDC_X_CALL_RICH_ERROR';
  override message: string =
    'A rich error occurred while Telegram was intercommunicating with DC{value}. Please try again later';
}
export class MemberChatAddFailed extends InternalServerError {
  override id: string = 'MEMBER_CHAT_ADD_FAILED';
  override message: string = '';
}
export class MemberFetchFailed extends InternalServerError {
  override id: string = 'MEMBER_FETCH_FAILED';
  override message: string = 'Telegram is having internal problems. Please try again later';
}
export class MemberNotFound extends InternalServerError {
  override id: string = 'MEMBER_NOT_FOUND';
  override message: string = '';
}
export class MemberNoLocation extends InternalServerError {
  override id: string = 'MEMBER_NO_LOCATION';
  override message: string =
    "Couldn't find the member's location due to Telegram having internal problems. Please try again later";
}
export class MemberOccupyPrimaryLocFailed extends InternalServerError {
  override id: string = 'MEMBER_OCCUPY_PRIMARY_LOC_FAILED';
  override message: string = 'Telegram is having internal problems. Please try again later';
}
export class MemberOccupyUsernameFailed extends InternalServerError {
  override id: string = 'MEMBER_OCCUPY_USERNAME_FAILED';
  override message: string =
    'Failure to occupy member username due to Telegram having internal problems. Please try again later';
}
export class MsgidDecreaseRetry extends InternalServerError {
  override id: string = 'MSGID_DECREASE_RETRY';
  override message: string = 'Telegram is having internal problems. Please try again later';
}
export class MsgRangeUnsync extends InternalServerError {
  override id: string = 'MSG_RANGE_UNSYNC';
  override message: string =
    'Message range unsynchronized due to Telegram having internal problems. Please try again later';
}
export class MsgWaitFailed extends InternalServerError {
  override id: string = 'MSG_WAIT_FAILED';
  override message: string = 'A waiting call returned an error.';
}
export class MtSendQueueTooLong extends InternalServerError {
  override id: string = 'MT_SEND_QUEUE_TOO_LONG';
  override message: string =
    'The MTProto send queue has grown too much due to Telegram having internal problems. Please try again later';
}
export class NeedChatInvalid extends InternalServerError {
  override id: string = 'NEED_CHAT_INVALID';
  override message: string = 'The provided chat is invalid';
}
export class NeedMemberInvalid extends InternalServerError {
  override id: string = 'NEED_MEMBER_INVALID';
  override message: string = 'The provided member is invalid or does not exist';
}
export class NoWorkersRunning extends InternalServerError {
  override id: string = 'No_workers_running';
  override message: string = 'The Telegram server is restarting its workers. Try again later.';
}
export class ParticipantCallFailed extends InternalServerError {
  override id: string = 'PARTICIPANT_CALL_FAILED';
  override message: string =
    'Failure while making call due to Telegram having internal problems. Please try again later';
}
export class PersistentTimestampOutdated extends InternalServerError {
  override id: string = 'PERSISTENT_TIMESTAMP_OUTDATED';
  override message: string =
    'Channel internal replication issues, try again later (treat this like an RPC_CALL_FAIL).';
}
export class PhotoCreateFailed extends InternalServerError {
  override id: string = 'PHOTO_CREATE_FAILED';
  override message: string =
    'The creation of the photo failed due to Telegram having internal problems. Please try again later';
}
export class PostponedTimeout extends InternalServerError {
  override id: string = 'POSTPONED_TIMEOUT';
  override message: string = 'Telegram is having internal problems. Please try again later';
}
export class PtsChangeEmpty extends InternalServerError {
  override id: string = 'PTS_CHANGE_EMPTY';
  override message: string = 'No PTS change';
}
export class RandomIdDuplicate extends InternalServerError {
  override id: string = 'RANDOM_ID_DUPLICATE';
  override message: string = 'You provided a random ID that was already used.';
}
export class RegIdGenerateFailed extends InternalServerError {
  override id: string = 'REG_ID_GENERATE_FAILED';
  override message: string =
    'The registration id failed to generate due to Telegram having internal problems. Please try again later';
}
export class RpcCallFail extends InternalServerError {
  override id: string = 'RPC_CALL_FAIL';
  override message: string = 'Telegram is having internal problems. Please try again later';
}
export class RpcConnectFailed extends InternalServerError {
  override id: string = 'RPC_CONNECT_FAILED';
  override message: string = 'Telegram is having internal problems. Please try again later';
}
export class RpcMcgetFail extends InternalServerError {
  override id: string = 'RPC_MCGET_FAIL';
  override message: string = 'Telegram is having internal problems. Please try again later';
}
export class SendMediaInvalid extends InternalServerError {
  override id: string = 'SEND_MEDIA_INVALID';
  override message: string = 'The specified media is invalid.';
}
export class SignInFailed extends InternalServerError {
  override id: string = 'SIGN_IN_FAILED';
  override message: string = 'Failure while signing in.';
}
export class StorageCheckFailed extends InternalServerError {
  override id: string = 'STORAGE_CHECK_FAILED';
  override message: string =
    'Server storage check failed due to Telegram having internal problems. Please try again later';
}
export class StoreInvalidScalarType extends InternalServerError {
  override id: string = 'STORE_INVALID_SCALAR_TYPE';
  override message: string = 'Telegram is having internal problems. Please try again later';
}
export class TranslateReqFailed extends InternalServerError {
  override id: string = 'TRANSLATE_REQ_FAILED';
  override message: string = 'Translation failed, please try again later.';
}
export class UnknownMethod extends InternalServerError {
  override id: string = 'UNKNOWN_METHOD';
  override message: string = 'The method you tried to call cannot be called on non-CDN DCs';
}
export class UploadNoVolume extends InternalServerError {
  override id: string = 'UPLOAD_NO_VOLUME';
  override message: string = 'Telegram is having internal problems. Please try again later';
}
export class VolumeLocNotFound extends InternalServerError {
  override id: string = 'VOLUME_LOC_NOT_FOUND';
  override message: string = 'Telegram is having internal problems. Please try again later';
}
export class WorkerBusyTooLongRetry extends InternalServerError {
  override id: string = 'WORKER_BUSY_TOO_LONG_RETRY';
  override message: string =
    'Server workers are too busy right now due to Telegram having internal problems. Please try again later';
}
export class WpIdGenerateFailed extends InternalServerError {
  override id: string = 'WP_ID_GENERATE_FAILED';
  override message: string = 'Telegram is having internal problems. Please try again later';
}
