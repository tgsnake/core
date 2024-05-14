import { RPCError } from '../RpcError.js';
class ServiceUnavailable extends RPCError {
  code = 503;
  name = 'SERVICE_UNAVAILABLE';
}
class ApiCallError extends ServiceUnavailable {
  id = 'ApiCallError';
  message = 'Telegram is having internal problems. Please try again later.';
}
class Timeout extends ServiceUnavailable {
  id = 'Timeout';
  message = 'Timeout while fetching data.';
}
export { ApiCallError, ServiceUnavailable, Timeout };
