import { TimeoutError } from './errors/index.js';
class Timeout {
  _task = [];
  constructor() {}
  /**
   * Run the promised function with timeout, it will be throw TimeoutError when function running more than given time.
   * @param {Promise} task - Function will be running.
   * @param {Number} time - Max time execution for function.
   * @param {Function} onTimeout - When function running more than time, this function will be called.
   */
  run(task, time, onTimeout) {
    if (time === Infinity) return task;
    return new Promise((res, rej) => {
      let index = this._task.length;
      let timeout = setTimeout(() => {
        if (onTimeout) {
          onTimeout(time, index);
        } else {
          rej(new TimeoutError(time));
        }
        task.catch(rej).finally(() => {
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
export { Timeout };
