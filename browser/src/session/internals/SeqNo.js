class SeqNo {
  contentRMsgSend;
  seqNo;
  constructor() {
    this.contentRMsgSend = 0;
    this.seqNo = 0;
  }
  getSeqNo(isContentRelated) {
    this.seqNo = this.contentRMsgSend * 2 + (isContentRelated ? 1 : 0);
    if (isContentRelated) this.contentRMsgSend += 1;
    return this.seqNo;
  }
}
export { SeqNo };
