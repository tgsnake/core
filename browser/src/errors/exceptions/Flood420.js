import { RPCError } from '../RpcError.js';
class Flood extends RPCError {
  code = 420;
  name = 'FLOOD';
}
class TwoFaConfirmWait extends Flood {
  id = '2FA_CONFIRM_WAIT_X';
  message =
    "Since this account is active and protected by a 2FA password, we will delete it in 1 week for security purposes. You can cancel this process at any time, you'll be able to reset your account in {value} seconds.";
}
class FloodTestPhoneWait extends Flood {
  id = 'FLOOD_TEST_PHONE_WAIT_X';
  message = 'A wait of {value} seconds is required in the test servers';
}
class FloodWait extends Flood {
  id = 'FLOOD_WAIT_X';
  message = 'A wait of {value} seconds is required';
}
class PremiumSubActiveUntil extends Flood {
  id = 'PREMIUM_SUB_ACTIVE_UNTIL_X';
  message = 'You already have a premium subscription active until unixtime {value} .';
}
class SlowmodeWait extends Flood {
  id = 'SLOWMODE_WAIT_X';
  message =
    'Slowmode is enabled in this chat: wait {value} seconds before sending another message to this chat.';
}
class TakeoutInitDelay extends Flood {
  id = 'TAKEOUT_INIT_DELAY_X';
  message =
    "Sorry, for security reasons, you will be able to begin downloading your data in {value} seconds. We have notified all your devices about the export request to make sure it's authorized and to give you time to react if it's not.";
}
export {
  Flood,
  FloodTestPhoneWait,
  FloodWait,
  PremiumSubActiveUntil,
  SlowmodeWait,
  TakeoutInitDelay,
  TwoFaConfirmWait,
};
