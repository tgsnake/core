import { RPCError } from '../RpcError.js';
class InternalServerError extends RPCError {
  code = 500;
  name = 'INTERNAL_SERVER_ERROR';
}
class ApiCallError extends InternalServerError {
  id = 'API_CALL_ERROR';
  message = 'API call error due to Telegram having internal problems. Please try again later';
}
class AuthRestart extends InternalServerError {
  id = 'AUTH_RESTART';
  message = 'Restart the authorization process.';
}
class CallOccupyFailed extends InternalServerError {
  id = 'CALL_OCCUPY_FAILED';
  message = 'The call failed because the user is already making another call.';
}
class CdnUploadTimeout extends InternalServerError {
  id = 'CDN_UPLOAD_TIMEOUT';
  message = 'A server-side timeout occurred while reuploading the file to the CDN DC.';
}
class ChatIdGenerateFailed extends InternalServerError {
  id = 'CHAT_ID_GENERATE_FAILED';
  message = 'Failure while generating the chat ID.';
}
class ChatInvalid extends InternalServerError {
  id = 'CHAT_INVALID';
  message = 'Invalid chat.';
}
class ChatOccupyLocFailed extends InternalServerError {
  id = 'CHAT_OCCUPY_LOC_FAILED';
  message = 'An internal error occurred while creating the chat';
}
class ChatOccupyUsernameFailed extends InternalServerError {
  id = 'CHAT_OCCUPY_USERNAME_FAILED';
  message =
    'Failure to occupy chat username due to Telegram having internal problems. Please try again later';
}
class ChpCallFail extends InternalServerError {
  id = 'CHP_CALL_FAIL';
  message = 'Telegram is having internal problems. Please try again later';
}
class EncryptionOccupyAdminFailed extends InternalServerError {
  id = 'ENCRYPTION_OCCUPY_ADMIN_FAILED';
  message =
    'Failed occupying memory for admin info due to Telegram having internal problems. Please try again later';
}
class EncryptionOccupyFailed extends InternalServerError {
  id = 'ENCRYPTION_OCCUPY_FAILED';
  message = 'Internal server error while accepting secret chat';
}
class FolderDeacAutofixAll extends InternalServerError {
  id = 'FOLDER_DEAC_AUTOFIX_ALL';
  message = 'Telegram is having internal problems. Please try again later';
}
class GroupcallAddParticipantsFailed extends InternalServerError {
  id = 'GROUPCALL_ADD_PARTICIPANTS_FAILED';
  message =
    'Failure while adding voice chat member due to Telegram having internal problems. Please try again later';
}
class GroupedIdOccupyFailed extends InternalServerError {
  id = 'GROUPED_ID_OCCUPY_FAILED';
  message = 'Telegram is having internal problems. Please try again later';
}
class HistoryGetFailed extends InternalServerError {
  id = 'HISTORY_GET_FAILED';
  message =
    "The chat history couldn't be retrieved due to Telegram having internal problems. Please try again later";
}
class ImageEngineDown extends InternalServerError {
  id = 'IMAGE_ENGINE_DOWN';
  message = 'Image engine down due to Telegram having internal problems. Please try again later';
}
class InterdcCallError extends InternalServerError {
  id = 'INTERDC_X_CALL_ERROR';
  message =
    'An error occurred while Telegram was intercommunicating with DC{value}. Please try again later';
}
class InterdcCallRichError extends InternalServerError {
  id = 'INTERDC_X_CALL_RICH_ERROR';
  message =
    'A rich error occurred while Telegram was intercommunicating with DC{value}. Please try again later';
}
class MemberChatAddFailed extends InternalServerError {
  id = 'MEMBER_CHAT_ADD_FAILED';
  message = '';
}
class MemberFetchFailed extends InternalServerError {
  id = 'MEMBER_FETCH_FAILED';
  message = 'Telegram is having internal problems. Please try again later';
}
class MemberNotFound extends InternalServerError {
  id = 'MEMBER_NOT_FOUND';
  message = '';
}
class MemberNoLocation extends InternalServerError {
  id = 'MEMBER_NO_LOCATION';
  message =
    "Couldn't find the member's location due to Telegram having internal problems. Please try again later";
}
class MemberOccupyPrimaryLocFailed extends InternalServerError {
  id = 'MEMBER_OCCUPY_PRIMARY_LOC_FAILED';
  message = 'Telegram is having internal problems. Please try again later';
}
class MemberOccupyUsernameFailed extends InternalServerError {
  id = 'MEMBER_OCCUPY_USERNAME_FAILED';
  message =
    'Failure to occupy member username due to Telegram having internal problems. Please try again later';
}
class MsgidDecreaseRetry extends InternalServerError {
  id = 'MSGID_DECREASE_RETRY';
  message = 'Telegram is having internal problems. Please try again later';
}
class MsgRangeUnsync extends InternalServerError {
  id = 'MSG_RANGE_UNSYNC';
  message =
    'Message range unsynchronized due to Telegram having internal problems. Please try again later';
}
class MsgWaitFailed extends InternalServerError {
  id = 'MSG_WAIT_FAILED';
  message = 'A waiting call returned an error.';
}
class MtSendQueueTooLong extends InternalServerError {
  id = 'MT_SEND_QUEUE_TOO_LONG';
  message =
    'The MTProto send queue has grown too much due to Telegram having internal problems. Please try again later';
}
class NeedChatInvalid extends InternalServerError {
  id = 'NEED_CHAT_INVALID';
  message = 'The provided chat is invalid';
}
class NeedMemberInvalid extends InternalServerError {
  id = 'NEED_MEMBER_INVALID';
  message = 'The provided member is invalid or does not exist';
}
class NoWorkersRunning extends InternalServerError {
  id = 'No_workers_running';
  message = 'The Telegram server is restarting its workers. Try again later.';
}
class ParticipantCallFailed extends InternalServerError {
  id = 'PARTICIPANT_CALL_FAILED';
  message =
    'Failure while making call due to Telegram having internal problems. Please try again later';
}
class PersistentTimestampOutdated extends InternalServerError {
  id = 'PERSISTENT_TIMESTAMP_OUTDATED';
  message =
    'Channel internal replication issues, try again later (treat this like an RPC_CALL_FAIL).';
}
class PhotoCreateFailed extends InternalServerError {
  id = 'PHOTO_CREATE_FAILED';
  message =
    'The creation of the photo failed due to Telegram having internal problems. Please try again later';
}
class PostponedTimeout extends InternalServerError {
  id = 'POSTPONED_TIMEOUT';
  message = 'Telegram is having internal problems. Please try again later';
}
class PtsChangeEmpty extends InternalServerError {
  id = 'PTS_CHANGE_EMPTY';
  message = 'No PTS change';
}
class RandomIdDuplicate extends InternalServerError {
  id = 'RANDOM_ID_DUPLICATE';
  message = 'You provided a random ID that was already used.';
}
class RegIdGenerateFailed extends InternalServerError {
  id = 'REG_ID_GENERATE_FAILED';
  message =
    'The registration id failed to generate due to Telegram having internal problems. Please try again later';
}
class RpcCallFail extends InternalServerError {
  id = 'RPC_CALL_FAIL';
  message = 'Telegram is having internal problems. Please try again later';
}
class RpcConnectFailed extends InternalServerError {
  id = 'RPC_CONNECT_FAILED';
  message = 'Telegram is having internal problems. Please try again later';
}
class RpcMcgetFail extends InternalServerError {
  id = 'RPC_MCGET_FAIL';
  message = 'Telegram is having internal problems. Please try again later';
}
class SendMediaInvalid extends InternalServerError {
  id = 'SEND_MEDIA_INVALID';
  message = 'The specified media is invalid.';
}
class SignInFailed extends InternalServerError {
  id = 'SIGN_IN_FAILED';
  message = 'Failure while signing in.';
}
class StorageCheckFailed extends InternalServerError {
  id = 'STORAGE_CHECK_FAILED';
  message =
    'Server storage check failed due to Telegram having internal problems. Please try again later';
}
class StoreInvalidScalarType extends InternalServerError {
  id = 'STORE_INVALID_SCALAR_TYPE';
  message = 'Telegram is having internal problems. Please try again later';
}
class UnknownMethod extends InternalServerError {
  id = 'UNKNOWN_METHOD';
  message = 'The method you tried to call cannot be called on non-CDN DCs';
}
class UploadNoVolume extends InternalServerError {
  id = 'UPLOAD_NO_VOLUME';
  message = 'Telegram is having internal problems. Please try again later';
}
class VolumeLocNotFound extends InternalServerError {
  id = 'VOLUME_LOC_NOT_FOUND';
  message = 'Telegram is having internal problems. Please try again later';
}
class WorkerBusyTooLongRetry extends InternalServerError {
  id = 'WORKER_BUSY_TOO_LONG_RETRY';
  message =
    'Server workers are too busy right now due to Telegram having internal problems. Please try again later';
}
class WpIdGenerateFailed extends InternalServerError {
  id = 'WP_ID_GENERATE_FAILED';
  message = 'Telegram is having internal problems. Please try again later';
}
export {
  ApiCallError,
  AuthRestart,
  CallOccupyFailed,
  CdnUploadTimeout,
  ChatIdGenerateFailed,
  ChatInvalid,
  ChatOccupyLocFailed,
  ChatOccupyUsernameFailed,
  ChpCallFail,
  EncryptionOccupyAdminFailed,
  EncryptionOccupyFailed,
  FolderDeacAutofixAll,
  GroupcallAddParticipantsFailed,
  GroupedIdOccupyFailed,
  HistoryGetFailed,
  ImageEngineDown,
  InterdcCallError,
  InterdcCallRichError,
  InternalServerError,
  MemberChatAddFailed,
  MemberFetchFailed,
  MemberNoLocation,
  MemberNotFound,
  MemberOccupyPrimaryLocFailed,
  MemberOccupyUsernameFailed,
  MsgRangeUnsync,
  MsgWaitFailed,
  MsgidDecreaseRetry,
  MtSendQueueTooLong,
  NeedChatInvalid,
  NeedMemberInvalid,
  NoWorkersRunning,
  ParticipantCallFailed,
  PersistentTimestampOutdated,
  PhotoCreateFailed,
  PostponedTimeout,
  PtsChangeEmpty,
  RandomIdDuplicate,
  RegIdGenerateFailed,
  RpcCallFail,
  RpcConnectFailed,
  RpcMcgetFail,
  SendMediaInvalid,
  SignInFailed,
  StorageCheckFailed,
  StoreInvalidScalarType,
  UnknownMethod,
  UploadNoVolume,
  VolumeLocNotFound,
  WorkerBusyTooLongRetry,
  WpIdGenerateFailed,
};
