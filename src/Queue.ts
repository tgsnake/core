/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

/**
 * @class
 * Queue class
 * @param {Number} maxsize - Maxsize of queue. If less than or equal to zero, the queue size is infinity. If greater than zero, then put method it will blocked until the queue is empty by get method. Default is 0
 */
export class Queue<T> {
  protected _maxsize!: number;
  protected _queues!: Array<T>;
  protected _possiblePut!: boolean | Promise<boolean>;
  protected _resolvePut!: { (value: boolean): any };
  protected _possibleGet!: Promise<boolean>;
  protected _resolveGet!: { (value: boolean): any };
  constructor(maxsize: number = 0) {
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
  async put(value: T) {
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
