class MsgId {
  referenceClock = BigInt(0);
  lastTime = BigInt(0);
  msgIdOffset = BigInt(0);
  serverTime = BigInt(0);
  constructor() {}
  getMsgId() {
    const now = BigInt(Math.floor(Date.now() / 1e3)) - this.referenceClock + this.serverTime;
    this.msgIdOffset = now === this.lastTime ? this.msgIdOffset + BigInt(4) : BigInt(0);
    const msgId = now * BigInt(2 ** 32) + this.msgIdOffset;
    this.lastTime = now;
    return msgId;
  }
  setServerTime(serverTime) {
    if (!this.serverTime) {
      this.referenceClock = BigInt(Math.floor(Date.now() / 1e3));
      this.serverTime = serverTime;
    }
  }
}
export { MsgId };
