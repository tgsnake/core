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
export declare class InternalServerError extends RPCError {
  code: number;
  name: string;
}
export declare class ApiCallError extends InternalServerError {
  id: string;
  message: string;
}
export declare class AuthRestart extends InternalServerError {
  id: string;
  message: string;
}
export declare class CallOccupyFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class CdnUploadTimeout extends InternalServerError {
  id: string;
  message: string;
}
export declare class ChatIdGenerateFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class ChatInvalid extends InternalServerError {
  id: string;
  message: string;
}
export declare class ChatOccupyLocFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class ChatOccupyUsernameFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class ChpCallFail extends InternalServerError {
  id: string;
  message: string;
}
export declare class EncryptionOccupyAdminFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class EncryptionOccupyFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class FolderDeacAutofixAll extends InternalServerError {
  id: string;
  message: string;
}
export declare class GroupcallAddParticipantsFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class GroupedIdOccupyFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class HistoryGetFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class ImageEngineDown extends InternalServerError {
  id: string;
  message: string;
}
export declare class InterdcCallError extends InternalServerError {
  id: string;
  message: string;
}
export declare class InterdcCallRichError extends InternalServerError {
  id: string;
  message: string;
}
export declare class MemberChatAddFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class MemberFetchFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class MemberNotFound extends InternalServerError {
  id: string;
  message: string;
}
export declare class MemberNoLocation extends InternalServerError {
  id: string;
  message: string;
}
export declare class MemberOccupyPrimaryLocFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class MemberOccupyUsernameFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class MsgidDecreaseRetry extends InternalServerError {
  id: string;
  message: string;
}
export declare class MsgRangeUnsync extends InternalServerError {
  id: string;
  message: string;
}
export declare class MsgWaitFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class MtSendQueueTooLong extends InternalServerError {
  id: string;
  message: string;
}
export declare class NeedChatInvalid extends InternalServerError {
  id: string;
  message: string;
}
export declare class NeedMemberInvalid extends InternalServerError {
  id: string;
  message: string;
}
export declare class NoWorkersRunning extends InternalServerError {
  id: string;
  message: string;
}
export declare class ParticipantCallFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class PersistentTimestampOutdated extends InternalServerError {
  id: string;
  message: string;
}
export declare class PhotoCreateFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class PostponedTimeout extends InternalServerError {
  id: string;
  message: string;
}
export declare class PtsChangeEmpty extends InternalServerError {
  id: string;
  message: string;
}
export declare class RandomIdDuplicate extends InternalServerError {
  id: string;
  message: string;
}
export declare class RegIdGenerateFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class RpcCallFail extends InternalServerError {
  id: string;
  message: string;
}
export declare class RpcConnectFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class RpcMcgetFail extends InternalServerError {
  id: string;
  message: string;
}
export declare class SendMediaInvalid extends InternalServerError {
  id: string;
  message: string;
}
export declare class SignInFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class StorageCheckFailed extends InternalServerError {
  id: string;
  message: string;
}
export declare class StoreInvalidScalarType extends InternalServerError {
  id: string;
  message: string;
}
export declare class UnknownMethod extends InternalServerError {
  id: string;
  message: string;
}
export declare class UploadNoVolume extends InternalServerError {
  id: string;
  message: string;
}
export declare class VolumeLocNotFound extends InternalServerError {
  id: string;
  message: string;
}
export declare class WorkerBusyTooLongRetry extends InternalServerError {
  id: string;
  message: string;
}
export declare class WpIdGenerateFailed extends InternalServerError {
  id: string;
  message: string;
}
