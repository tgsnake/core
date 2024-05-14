import { Raw } from '../Raw.js';
import { TLObject } from './TLObject.js';
class UpdateSecretChatMessage extends TLObject {
  message;
  qts;
  _original;
  constructor(params) {
    super();
    this.classType = 'modified_types_UpdateNewEncryptedMessage';
    this.className = 'UpdateSecretChatMessage';
    this.constructorId = 1;
    this.subclassOfId = 2676568142;
    this._slots = ['message', 'qts'];
    this.message = params.message;
    this.qts = params.qts;
    this._original = params.original;
  }
  static async generate(update, secretChat) {
    const decrypted = await secretChat.decrypt(update.message);
    if (update.message instanceof Raw.EncryptedMessageService) {
      return new UpdateSecretChatMessage({
        message: new SecretChatMessageService({
          randomId: update.message.randomId,
          chatId: update.message.chatId,
          date: update.message.date,
          message: decrypted,
        }),
        qts: update.qts,
        original: update,
      });
    }
    return new UpdateSecretChatMessage({
      message: new SecretChatMessage({
        randomId: update.message.randomId,
        chatId: update.message.chatId,
        date: update.message.date,
        file: update.message.file,
        message: decrypted,
      }),
      qts: update.qts,
      original: update,
    });
  }
}
class SecretChatMessage extends TLObject {
  randomId;
  chatId;
  date;
  message;
  file;
  constructor(params) {
    super();
    this.classType = 'modified_types_EncryptedMessage';
    this.className = 'SecretChatMessage';
    this.constructorId = 2;
    this.subclassOfId = 597634641;
    this._slots = ['randomId', 'chatId', 'date', 'message', 'file'];
    this.randomId = params.randomId;
    this.chatId = params.chatId;
    this.date = params.date;
    this.message = params.message;
    this.file = params.file;
  }
}
class SecretChatMessageService extends TLObject {
  randomId;
  chatId;
  date;
  message;
  constructor(params) {
    super();
    this.classType = 'modified_types_EncryptedMessageService';
    this.className = 'SecretChatMessageService';
    this.constructorId = 3;
    this.subclassOfId = 597634641;
    this._slots = ['randomId', 'chatId', 'date', 'message'];
    this.randomId = params.randomId;
    this.chatId = params.chatId;
    this.date = params.date;
    this.message = params.message;
  }
}
export { SecretChatMessage, SecretChatMessageService, UpdateSecretChatMessage };
