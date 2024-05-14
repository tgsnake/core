class Queue {
  _maxsize;
  _queues;
  _possiblePut;
  _resolvePut;
  _possibleGet;
  _resolveGet;
  constructor(maxsize = 0) {
    this._maxsize = maxsize;
    this._queues = [];
    this._possiblePut = this._queues.length < maxsize;
    this._resolvePut = (value) => {};
    this._possibleGet = new Promise((resolve) => {
      this._resolveGet = resolve;
    });
  }
  /**
   * Put an item into the queue. If the queue is full, wait until a free slot is available before adding the item.
   */
  async put(value) {
    if (this.full) await this._possiblePut;
    this._queues.push(value);
    this._resolveGet(true);
    this._possiblePut = new Promise((resolve) => {
      this._resolvePut = resolve;
    });
  }
  /**
   * Remove and return an item from the queue. If queue is empty, wait until an item is available.
   */
  async get() {
    if (this.empty) await this._possibleGet;
    const value = this._queues.shift();
    this._resolvePut(true);
    this._possibleGet = new Promise((resolve) => {
      this._resolveGet = resolve;
    });
    return value;
  }
  /**
   * Check the queue is full or not.
   * If the maxsize is less than or equal to zero, this is will be return false.
   */
  get full() {
    return this.maxsize <= 0 ? false : this.size >= this.maxsize;
  }
  /**
   * Get the total size of queue.
   */
  get size() {
    return this._queues.length;
  }
  /**
   * Check if the queue is empty or not.
   */
  get empty() {
    return !this.size;
  }
  /**
   * Get the maxsize of the queue.
   */
  get maxsize() {
    return this._maxsize;
  }
}
export { Queue };
