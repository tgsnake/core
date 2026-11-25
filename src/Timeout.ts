/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2026 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { Skema } from './deps.js';

/**
 * Callback interface triggered when a promise execution times out.
 */
export interface OnTimeout {
  /**
   * Handles the timeout event for a running task.
   *
   * @param {number} timeout - The timeout limit in milliseconds.
   * @param {number} index - The index/position of the task in the execution list.
   * @returns {any} Any result produced by the timeout handler.
   */
  (timeout: number, index: number): any;
}

/**
 * A utility class to manage and run tasks with execution timeouts.
 *
 * Supports executing a `Promise` with a maximum timeout limit, custom callback
 * handlers on timeout, and clearing/canceling all active timeout timers.
 */
export class Timeout {
  /** Stores a set of active setTimeout timers. */
  private _task: Set<any> = new Set<any>();

  /**
   * Creates an instance of the Timeout manager.
   */
  constructor() {}

  /**
   * Runs an asynchronous task with a specified timeout limit.
   *
   * If the execution time exceeds the specified limit, it will either trigger
   * the provided `onTimeout` callback or throw a `TimeoutError`.
   *
   * @param {Promise<any>} task - The asynchronous task/Promise to execute.
   * @param {number} time - The maximum execution time in milliseconds. If set to `Infinity`, timeout checks are skipped.
   * @param {OnTimeout} [onTimeout] - Optional callback function to invoke if a timeout occurs.
   * @returns {Promise<any>} A promise that resolves with the task's result or rejects upon timeout/failure.
   * @throws {TimeoutError} Thrown if the timeout is reached and no `onTimeout` handler is specified.
   */
  run(task: Promise<any>, time: number, onTimeout?: OnTimeout): Promise<any> {
    if (time === Infinity) return task;
    return new Promise((res, rej) => {
      let index = this._task.size;
      let timeout = setTimeout(() => {
        this._task.delete(timeout);
        if (onTimeout) {
          onTimeout(time, index);
        } else {
          rej(new Skema.TimeoutError(time));
        }
        task.catch(rej).finally(() => {
          return 'Running timeout';
        });
      }, time);
      this._task.add(timeout);
      task
        .then(res)
        .catch(rej)
        .finally(() => {
          clearTimeout(timeout);
          this._task.delete(timeout);
        });
    });
  }

  /**
   * Cancels and clears all active timeout timers currently managed by this instance.
   */
  clear(): void {
    for (const task of this._task) {
      clearTimeout(task);
    }
    this._task.clear();
  }
}
