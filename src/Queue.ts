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
  /** Head pointer for amortized O(1) dequeue operations. */
  protected _head: number = 0;
  /** Queue of waiting getters (waiting consumers). */
  protected _waitingGetters: Array<{ (value: T): void }> = [];
  /** Queue of waiting putters (waiting producers). */
  protected _waitingPutters: Array<{ (): void }> = [];
  /** Internal signal or Promise controlling blocked `put` operations (compatibility). */
  protected _possiblePut!: boolean | Promise<boolean>;
  /** Resolver function to unblock `put` operations (compatibility). */
  protected _resolvePut!: { (value: boolean): any };
  /** Promise controlling blocked `get` operations (compatibility). */
  protected _possibleGet!: Promise<boolean>;
  /** Resolver function to unblock `get` operations (compatibility). */
  protected _resolveGet!: { (value: boolean): any };

  /**
   * Creates a new Queue instance.
   *
   * @param {number} [maxsize=0] - The maximum capacity of the queue. Defaults to 0 (unbounded).
   */
  constructor(maxsize: number = 0) {
    this._maxsize = maxsize;
    this._queues = [];
    this._head = 0;
    this._waitingGetters = [];
    this._waitingPutters = [];
    this._possiblePut = true;
    this._resolvePut = (_value) => {};
    this._possibleGet = Promise.resolve(true);
    this._resolveGet = (_value) => {};
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
  async put(value: T): Promise<void> {
    if (this._waitingGetters.length > 0) {
      const getter = this._waitingGetters.shift()!;
      getter(value);
      return;
    }
    if (this.full) {
      await new Promise<void>((resolve) => {
        this._waitingPutters.push(resolve);
      });
    }
    this._queues.push(value);
  }

  /**
   * Removes and returns an item from the front of the queue.
   *
   * If the queue is empty, this method will asynchronously block and wait
   * until an item is added to the queue via `put`.
   *
   * @returns {Promise<T>} A promise resolving to the item removed from the queue.
   */
  async get(): Promise<T> {
    if (this.size > 0) {
      const value = this._queues[this._head++];
      if (this._head > 64 && this._head * 2 >= this._queues.length) {
        this._queues = this._queues.slice(this._head);
        this._head = 0;
      }
      if (this._waitingPutters.length > 0) {
        const putter = this._waitingPutters.shift()!;
        putter();
      }
      return value as T;
    }
    return new Promise<T>((resolve) => {
      this._waitingGetters.push(resolve);
    });
  }

  /**
   * Indicates whether the queue is full.
   *
   * If `maxsize` is less than or equal to zero, this always returns `false`.
   *
   * @returns {boolean} `true` if the queue size has reached or exceeded `maxsize`; otherwise `false`.
   */
  get full(): boolean {
    return this.maxsize <= 0 ? false : this.size >= this.maxsize;
  }

  /**
   * Gets the current number of elements in the queue.
   *
   * @returns {number} The current size of the queue.
   */
  get size(): number {
    return this._queues.length - this._head;
  }

  /**
   * Indicates whether the queue is empty.
   *
   * @returns {boolean} `true` if the queue has no elements; otherwise `false`.
   */
  get empty(): boolean {
    return !this.size;
  }

  /**
   * Gets the maximum capacity limit configured for the queue.
   *
   * @returns {number} The maximum size of the queue.
   */
  get maxsize(): number {
    return this._maxsize;
  }
}
