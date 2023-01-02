/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { TimeoutError } from './errors';

export interface OnTimeout {
  /**
   * Handle when function is got timeout.
   * @param {Number} timeout - Passed time for running the function.
   * @param {Number} index - Position of task.
   */
  (timeout: number, index: number): any;
}
export class Timeout {
  private _task: Array<any> = [];
  constructor() {}
  /**
   * Run the promised function with timeout, it will be throw TimeoutError when function running more than given time.
   * @param {Promise} task - Function will be running.
   * @param {Number} time - Max time execution for function.
   * @param {Function} onTimeout - When function running more than time, this function will be called.
   */
  run(task: Promise<any>, time: number, onTimeout?: OnTimeout) {
    if (time === Infinity) return task;
    return new Promise((res, rej) => {
      let index = this._task.length;
      let timeout = setTimeout(() => {
        if (onTimeout) {
          onTimeout(time, index);
        } else {
          rej(new TimeoutError(time));
        }
        task.finally(() => {
          return 'Running timeout';
        });
      }, time);
      this._task.push(timeout);
      task
        .then(res)
        .catch(rej)
        .finally(() => {
          clearTimeout(timeout);
          this._task = this._task.filter((t) => !t._destroyed);
        });
    });
  }
  /**
   * Clear all timeout task.
   */
  clear() {
    for (let i = 0; i < this._task.length; i++) {
      let task = this._task[i];
      if (!task._destroyed) {
        clearTimeout(task);
      }
      this._task.splice(i, 1);
    }
  }
}
