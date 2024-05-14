/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
export interface OnTimeout {
  /**
   * Handle when function is got timeout.
   * @param {Number} timeout - Passed time for running the function.
   * @param {Number} index - Position of task.
   */
  (timeout: number, index: number): any;
}
export declare class Timeout {
  private _task;
  constructor();
  /**
   * Run the promised function with timeout, it will be throw TimeoutError when function running more than given time.
   * @param {Promise} task - Function will be running.
   * @param {Number} time - Max time execution for function.
   * @param {Function} onTimeout - When function running more than time, this function will be called.
   */
  run(task: Promise<any>, time: number, onTimeout?: OnTimeout): Promise<any>;
  /**
   * Clear all timeout task.
   */
  clear(): void;
}
