import { SeqNo } from './SeqNo.js';
import { Raw, Message, MsgContainer } from '../../raw/index.js';
function MsgFactory() {
  const seqNo = new SeqNo();
  const notRelatedContent = (content) => {
    if (content instanceof Raw.Ping) return true;
    if (content instanceof Raw.HttpWait) return true;
    if (content instanceof Raw.MsgsAck) return true;
    if (content instanceof MsgContainer) return true;
    return false;
  };
  return (body, msgId) => {
    return new Message(
      body,
      BigInt(msgId.getMsgId()),
      seqNo.getSeqNo(!notRelatedContent(body)),
      body.write().length,
    );
  };
}
export { MsgFactory };
