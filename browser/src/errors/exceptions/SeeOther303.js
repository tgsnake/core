import { RPCError } from '../RpcError.js';
class SeeOther extends RPCError {
  code = 303;
  name = 'SEE_OTHER';
}
class FileMigrate extends SeeOther {
  id = 'FILE_MIGRATE_X';
  message = 'The file to be accessed is currently stored in DC{value}';
}
class NetworkMigrate extends SeeOther {
  id = 'NETWORK_MIGRATE_X';
  message = 'The source IP address is associated with DC{value} (for registration)';
}
class PhoneMigrate extends SeeOther {
  id = 'PHONE_MIGRATE_X';
  message =
    'The phone number a user is trying to use for authorization is associated with DC{value}';
}
class StatsMigrate extends SeeOther {
  id = 'STATS_MIGRATE_X';
  message = 'The statistics of the group/channel are stored in DC{value}';
}
class UserMigrate extends SeeOther {
  id = 'USER_MIGRATE_X';
  message =
    'The user whose identity is being used to execute queries is associated with DC{value} (for registration)';
}
export { FileMigrate, NetworkMigrate, PhoneMigrate, SeeOther, StatsMigrate, UserMigrate };
