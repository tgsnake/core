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

export class InternalServerError extends RPCError {
  code: number = 500;
  name: string = 'INTERNAL_SERVER_ERROR';
}
export class ApiCallError extends InternalServerError {
  id: string = 'API_CALL_ERROR';
  message: string =
    'API call error due to Telegram having internal problems. Please try again later';
}
export class AuthRestart extends InternalServerError {
  id: string = 'AUTH_RESTART';
  message: string = 'User authorization has restarted';
}
export class CallOccupyFailed extends InternalServerError {
  id: string = 'CALL_OCCUPY_FAILED';
  message: string = 'The call failed because the user is already making another call';
}
export class CdnUploadTimeout extends InternalServerError {
  id: string = 'CDN_UPLOAD_TIMEOUT';
  message: string = 'A server-side timeout occurred while reuploading the file to the CDN DC.';
}
export class ChatIdGenerateFailed extends InternalServerError {
  id: string = 'CHAT_ID_GENERATE_FAILED';
  message: string =
    'Failure while generating the chat ID due to Telegram having internal problems. Please try again later';
}
export class ChatInvalid extends InternalServerError {
  id: string = 'CHAT_INVALID';
  message: string = 'Invalid chat.';
}
export class ChatOccupyLocFailed extends InternalServerError {
  id: string = 'CHAT_OCCUPY_LOC_FAILED';
  message: string = 'An internal error occurred while creating the chat';
}
export class ChatOccupyUsernameFailed extends InternalServerError {
  id: string = 'CHAT_OCCUPY_USERNAME_FAILED';
  message: string =
    'Failure to occupy chat username due to Telegram having internal problems. Please try again later';
}
export class ChpCallFail extends InternalServerError {
  id: string = 'CHP_CALL_FAIL';
  message: string = 'Telegram is having internal problems. Please try again later';
}
export class EncryptionOccupyAdminFailed extends InternalServerError {
  id: string = 'ENCRYPTION_OCCUPY_ADMIN_FAILED';
  message: string =
    'Failed occupying memory for admin info due to Telegram having internal problems. Please try again later';
}
export class EncryptionOccupyFailed extends InternalServerError {
  id: string = 'ENCRYPTION_OCCUPY_FAILED';
  message: string = 'Internal server error while accepting secret chat';
}
export class FolderDeacAutofixAll extends InternalServerError {
  id: string = 'FOLDER_DEAC_AUTOFIX_ALL';
  message: string = 'Telegram is having internal problems. Please try again later';
}
export class GroupcallAddParticipantsFailed extends InternalServerError {
  id: string = 'GROUPCALL_ADD_PARTICIPANTS_FAILED';
  message: string =
    'Failure while adding voice chat member due to Telegram having internal problems. Please try again later';
}
export class GroupedIdOccupyFailed extends InternalServerError {
  id: string = 'GROUPED_ID_OCCUPY_FAILED';
  message: string = 'Telegram is having internal problems. Please try again later';
}
export class HistoryGetFailed extends InternalServerError {
  id: string = 'HISTORY_GET_FAILED';
  message: string =
    "The chat history couldn't be retrieved due to Telegram having internal problems. Please try again later";
}
export class ImageEngineDown extends InternalServerError {
  id: string = 'IMAGE_ENGINE_DOWN';
  message: string =
    'Image engine down due to Telegram having internal problems. Please try again later';
}
export class InterdcCallError extends InternalServerError {
  id: string = 'INTERDC_X_CALL_ERROR';
  message: string =
    'An error occurred while Telegram was intercommunicating with DC{value}. Please try again later';
}
export class InterdcCallRichError extends InternalServerError {
  id: string = 'INTERDC_X_CALL_RICH_ERROR';
  message: string =
    'A rich error occurred while Telegram was intercommunicating with DC{value}. Please try again later';
}
export class MemberChatAddFailed extends InternalServerError {
  id: string = 'MEMBER_CHAT_ADD_FAILED';
  message: string = '';
}
export class MemberFetchFailed extends InternalServerError {
  id: string = 'MEMBER_FETCH_FAILED';
  message: string = 'Telegram is having internal problems. Please try again later';
}
export class MemberNotFound extends InternalServerError {
  id: string = 'MEMBER_NOT_FOUND';
  message: string = '';
}
export class MemberNoLocation extends InternalServerError {
  id: string = 'MEMBER_NO_LOCATION';
  message: string =
    "Couldn't find the member's location due to Telegram having internal problems. Please try again later";
}
export class MemberOccupyPrimaryLocFailed extends InternalServerError {
  id: string = 'MEMBER_OCCUPY_PRIMARY_LOC_FAILED';
  message: string = 'Telegram is having internal problems. Please try again later';
}
export class MemberOccupyUsernameFailed extends InternalServerError {
  id: string = 'MEMBER_OCCUPY_USERNAME_FAILED';
  message: string =
    'Failure to occupy member username due to Telegram having internal problems. Please try again later';
}
export class MsgidDecreaseRetry extends InternalServerError {
  id: string = 'MSGID_DECREASE_RETRY';
  message: string = 'Telegram is having internal problems. Please try again later';
}
export class MsgRangeUnsync extends InternalServerError {
  id: string = 'MSG_RANGE_UNSYNC';
  message: string =
    'Message range unsynchronized due to Telegram having internal problems. Please try again later';
}
export class MsgWaitFailed extends InternalServerError {
  id: string = 'MSG_WAIT_FAILED';
  message: string = 'A waiting call returned an error.';
}
export class MtSendQueueTooLong extends InternalServerError {
  id: string = 'MT_SEND_QUEUE_TOO_LONG';
  message: string =
    'The MTProto send queue has grown too much due to Telegram having internal problems. Please try again later';
}
export class NeedChatInvalid extends InternalServerError {
  id: string = 'NEED_CHAT_INVALID';
  message: string = 'The provided chat is invalid';
}
export class NeedMemberInvalid extends InternalServerError {
  id: string = 'NEED_MEMBER_INVALID';
  message: string = 'The provided member is invalid or does not exist';
}
export class NoWorkersRunning extends InternalServerError {
  id: string = 'No_workers_running';
  message: string = 'The Telegram server is restarting its workers. Try again later.';
}
export class ParticipantCallFailed extends InternalServerError {
  id: string = 'PARTICIPANT_CALL_FAILED';
  message: string =
    'Failure while making call due to Telegram having internal problems. Please try again later';
}
export class PersistentTimestampOutdated extends InternalServerError {
  id: string = 'PERSISTENT_TIMESTAMP_OUTDATED';
  message: string =
    'The persistent timestamp is outdated due to Telegram having internal problems. Please try again later';
}
export class PhotoCreateFailed extends InternalServerError {
  id: string = 'PHOTO_CREATE_FAILED';
  message: string =
    'The creation of the photo failed due to Telegram having internal problems. Please try again later';
}
export class PostponedTimeout extends InternalServerError {
  id: string = 'POSTPONED_TIMEOUT';
  message: string = 'Telegram is having internal problems. Please try again later';
}
export class PtsChangeEmpty extends InternalServerError {
  id: string = 'PTS_CHANGE_EMPTY';
  message: string = 'No PTS change';
}
export class RandomIdDuplicate extends InternalServerError {
  id: string = 'RANDOM_ID_DUPLICATE';
  message: string = 'You provided a random ID that was already used';
}
export class RegIdGenerateFailed extends InternalServerError {
  id: string = 'REG_ID_GENERATE_FAILED';
  message: string =
    'The registration id failed to generate due to Telegram having internal problems. Please try again later';
}
export class RpcCallFail extends InternalServerError {
  id: string = 'RPC_CALL_FAIL';
  message: string = 'Telegram is having internal problems. Please try again later';
}
export class RpcConnectFailed extends InternalServerError {
  id: string = 'RPC_CONNECT_FAILED';
  message: string = 'Telegram is having internal problems. Please try again later';
}
export class RpcMcgetFail extends InternalServerError {
  id: string = 'RPC_MCGET_FAIL';
  message: string = 'Telegram is having internal problems. Please try again later';
}
export class SendMediaInvalid extends InternalServerError {
  id: string = 'SEND_MEDIA_INVALID';
  message: string = '';
}
export class SignInFailed extends InternalServerError {
  id: string = 'SIGN_IN_FAILED';
  message: string =
    'Failure while signing in due to Telegram having internal problems. Please try again later';
}
export class StorageCheckFailed extends InternalServerError {
  id: string = 'STORAGE_CHECK_FAILED';
  message: string =
    'Server storage check failed due to Telegram having internal problems. Please try again later';
}
export class StoreInvalidScalarType extends InternalServerError {
  id: string = 'STORE_INVALID_SCALAR_TYPE';
  message: string = 'Telegram is having internal problems. Please try again later';
}
export class UnknownMethod extends InternalServerError {
  id: string = 'UNKNOWN_METHOD';
  message: string = 'The method you tried to call cannot be called on non-CDN DCs';
}
export class UploadNoVolume extends InternalServerError {
  id: string = 'UPLOAD_NO_VOLUME';
  message: string = 'Telegram is having internal problems. Please try again later';
}
export class VolumeLocNotFound extends InternalServerError {
  id: string = 'VOLUME_LOC_NOT_FOUND';
  message: string = 'Telegram is having internal problems. Please try again later';
}
export class WorkerBusyTooLongRetry extends InternalServerError {
  id: string = 'WORKER_BUSY_TOO_LONG_RETRY';
  message: string =
    'Server workers are too busy right now due to Telegram having internal problems. Please try again later';
}
export class WpIdGenerateFailed extends InternalServerError {
  id: string = 'WP_ID_GENERATE_FAILED';
  message: string = 'Telegram is having internal problems. Please try again later';
}
