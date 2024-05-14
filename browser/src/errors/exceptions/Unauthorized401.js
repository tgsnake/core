import { RPCError } from '../RpcError.js';
class Unauthorized extends RPCError {
  code = 401;
  name = 'UNAUTHORIZED';
}
class ActiveUserRequired extends Unauthorized {
  id = 'ACTIVE_USER_REQUIRED';
  message = 'The method is only available to already activated users';
}
class AuthKeyInvalid extends Unauthorized {
  id = 'AUTH_KEY_INVALID';
  message = 'The key is invalid';
}
class AuthKeyPermEmpty extends Unauthorized {
  id = 'AUTH_KEY_PERM_EMPTY';
  message = 'The method is unavailable for temporary authorization key, not bound to permanent';
}
class AuthKeyUnregistered extends Unauthorized {
  id = 'AUTH_KEY_UNREGISTERED';
  message = 'The key is not registered in the system. Delete your session file and login again';
}
class SessionExpired extends Unauthorized {
  id = 'SESSION_EXPIRED';
  message = 'The authorization has expired';
}
class SessionPasswordNeeded extends Unauthorized {
  id = 'SESSION_PASSWORD_NEEDED';
  message = 'The two-step verification is enabled and a password is required';
}
class SessionRevoked extends Unauthorized {
  id = 'SESSION_REVOKED';
  message = 'The authorization has been invalidated, because of the user terminating all sessions';
}
class UserDeactivated extends Unauthorized {
  id = 'USER_DEACTIVATED';
  message = 'The user has been deleted/deactivated';
}
class UserDeactivatedBan extends Unauthorized {
  id = 'USER_DEACTIVATED_BAN';
  message = 'The user has been deleted/deactivated';
}
export {
  ActiveUserRequired,
  AuthKeyInvalid,
  AuthKeyPermEmpty,
  AuthKeyUnregistered,
  SessionExpired,
  SessionPasswordNeeded,
  SessionRevoked,
  Unauthorized,
  UserDeactivated,
  UserDeactivatedBan,
};
