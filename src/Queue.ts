/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

/**
 * An asynchronous Queue implementation.
 *
 * This class provides a FIFO (First-In, First-Out) queue mechanism. It supports
 * restricting the queue size. If `maxsize` is specified and greater than zero, the
 * queue is bounded; calls to `put` will block when the queue is full until elements
 * are removed using `get`. If `maxsize` is less than or equal to zero, the queue
 * size is unbounded (infinity).
 *
 * @template T The type of items stored in the queue.
 */
export class Queue<T> {
  /** The maximum capacity of the queue. If <= 0, capacity is unlimited. */
  protected _maxsize!: number;
  /** The underlying array storing the queue items. */
  protected _queues!: Array<T>;
  /** Internal signal or Promise controlling blocked `put` operations. */
  protected _possiblePut!: boolean | Promise<boolean>;
  /** Resolver function to unblock `put` operations. */
  protected _resolvePut!: { (value: boolean): any };
  /** Promise controlling blocked `get` operations. */
  protected _possibleGet!: Promise<boolean>;
  /** Resolver function to unblock `get` operations. */
  protected _resolveGet!: { (value: boolean): any };

  /**
   * Creates a new Queue instance.
   *
   * @param {number} [maxsize=0] - The maximum capacity of the queue. Defaults to 0 (unbounded).
   */
  constructor(maxsize: number = 0) {
    this._maxsize = maxsize;
    this._queues = [];
    this._possiblePut = this._queues.length < maxsize;
    this._resolvePut = (_value) => {};
    this._possibleGet = new Promise((resolve) => {
      this._resolveGet = resolve;
    });
  }

  /**
   * Puts an item into the queue.
   *
   * If the queue is bounded and currently full, this method will asynchronously
   * wait until a free slot becomes available (via a `get` call) before adding the item.
   *
   * @param {T} value - The item to be inserted into the queue.
   * @returns {Promise<void>} A promise that resolves when the item has been successfully added.
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
   * Removes and returns an item from the front of the queue.
   *
   * If the queue is empty, this method will asynchronously block and wait
   * until an item is added to the queue via `put`.
   *
   * @returns {Promise<T>} A promise resolving to the item removed from the queue.
   */
  async get() {
    if (this.empty) await this._possibleGet;
    const value = this._queues.shift();
    this._resolvePut(true);
    this._possibleGet = new Promise((resolve) => {
      this._resolveGet = resolve;
    });
    return value as T;
  }

  /**
   * Indicates whether the queue is full.
   *
   * If `maxsize` is less than or equal to zero, this always returns `false`.
   *
   * @returns {boolean} `true` if the queue size has reached or exceeded `maxsize`; otherwise `false`.
   */
  get full() {
    return this.maxsize <= 0 ? false : this.size >= this.maxsize;
  }

  /**
   * Gets the current number of elements in the queue.
   *
   * @returns {number} The current size of the queue.
   */
  get size() {
    return this._queues.length;
  }

  /**
   * Indicates whether the queue is empty.
   *
   * @returns {boolean} `true` if the queue has no elements; otherwise `false`.
   */
  get empty() {
    return !this.size;
  }

  /**
   * Gets the maximum capacity limit configured for the queue.
   *
   * @returns {number} The maximum size of the queue.
   */
  get maxsize() {
    return this._maxsize;
  }
}
