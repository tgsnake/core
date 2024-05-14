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
export declare class Queue<T> {
  protected _maxsize: number;
  protected _queues: Array<T>;
  protected _possiblePut: boolean | Promise<boolean>;
  protected _resolvePut: {
    (value: boolean): any;
  };
  protected _possibleGet: Promise<boolean>;
  protected _resolveGet: {
    (value: boolean): any;
  };
  constructor(maxsize?: number);
  /**
   * Put an item into the queue. If the queue is full, wait until a free slot is available before adding the item.
   */
  put(value: T): Promise<void>;
  /**
   * Remove and return an item from the queue. If queue is empty, wait until an item is available.
   */
  get(): Promise<T | undefined>;
  /**
   * Check the queue is full or not.
   * If the maxsize is less than or equal to zero, this is will be return false.
   */
  get full(): boolean;
  /**
   * Get the total size of queue.
   */
  get size(): number;
  /**
   * Check if the queue is empty or not.
   */
  get empty(): boolean;
  /**
   * Get the maxsize of the queue.
   */
  get maxsize(): number;
}
