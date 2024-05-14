import { net, Mutex, SocksClient, isBrowser, inspect, Buffer } from '../platform.browser.js';
import { Logger } from '../Logger.js';
import { WSError } from '../errors/index.js';
const mutex = new Mutex();
class Socket {
  _client;
  _data;
  _read;
  _promisedReading;
  /**
   * The timeout used to run the function of the {@link net.Socket Socket}. If more than the time has been found, it will return a TimeoutError error.
   */
  timeout;
  /**
   * Whether the current connection is running or not.
   */
  _connectionClosed;
  constructor(timeout) {
    this._data = Buffer.alloc(0);
    this._connectionClosed = true;
    this.timeout = timeout;
  }
  /**
   * Connecting {@link net.Socket Socket} to the server asynchronously.
   * @param {String} ip - IP Server
   * @param {Number} port - Port server
   */
  async connect(ip, port, proxy) {
    if (isBrowser) {
      if (proxy && !('server' in proxy && 'port' in proxy && 'secret' in proxy)) {
        throw new WSError.ProxyUnsupported();
      }
      if (port === 443) {
        this._client = new WebSocket(`wss://${ip.replace('$PORT', String(port))}`);
      } else {
        this._client = new WebSocket(`ws://${ip.replace('$PORT', String(port))}`);
      }
      this._connectionClosed = false;
      this._read = new Promise((resolve) => {
        this._promisedReading = resolve;
      });
      return new Promise((resolve, reject) => {
        this._client.onopen = () => {
          this.recv();
          resolve(this);
        };
        this._client.onerror = (error) => {
          return error.message ? reject(new WSError.WebSocketError(error.message)) : reject(error);
        };
        this._client.onclose = () => {
          if (this._client.destroyed) {
            if (this._promisedReading) this._promisedReading(false);
            this._connectionClosed = true;
          }
        };
      });
    } else {
      if (
        proxy &&
        !('server' in proxy && 'port' in proxy && 'secret' in proxy) &&
        'hostname' in proxy &&
        'port' in proxy &&
        'socks' in proxy
      ) {
        const ws = await SocksClient.createConnection({
          proxy: {
            host: proxy.hostname,
            port: proxy.port,
            type: proxy.socks < 4 || proxy.socks > 5 ? 5 : proxy.socks,
            userId: proxy.username,
            password: proxy.password,
          },
          command: 'connect',
          timeout: this.timeout,
          destination: {
            host: ip,
            port,
          },
        });
        this._client = ws.socket;
        this._client.setTimeout(this.timeout);
        this._connectionClosed = false;
        this._read = new Promise((resolve) => {
          this._promisedReading = resolve;
        });
        return new Promise((resolve, reject) => {
          this._client.on('error', (error) => {
            return error.message
              ? reject(new WSError.WebSocketError(error.message))
              : reject(error);
          });
          this._client.on('close', () => {
            if (this._client.destroyed) {
              if (this._promisedReading) this._promisedReading(false);
              this._connectionClosed = true;
            }
          });
          this.recv();
          resolve(this);
        });
      } else {
        this._client = new net.Socket();
        this._client.setTimeout(this.timeout);
        this._connectionClosed = false;
        this._read = new Promise((resolve) => {
          this._promisedReading = resolve;
        });
        return new Promise((resolve, reject) => {
          this._client.connect(port, ip, () => {
            this.recv();
            resolve(this);
          });
          this._client.on('error', (error) => {
            return error.message
              ? reject(new WSError.WebSocketError(error.message))
              : reject(error);
          });
          this._client.on('close', () => {
            if (this._client.destroyed) {
              if (this._promisedReading) this._promisedReading(false);
              this._connectionClosed = true;
            }
          });
        });
      }
    }
  }
  /**
   * Disconnect {@link net.Socket Socket} from server.
   */
  async destroy() {
    if (this._client && !this._connectionClosed) {
      this._connectionClosed = true;
      this._read = new Promise((resolve) => {
        this._promisedReading = resolve;
      });
      if (isBrowser) {
        await this._client.close();
      } else {
        await this._client.destroy();
        await this._client.unref();
      }
    }
    return this._connectionClosed;
  }
  /**
   * Receive data updates from the server asynchronously.
   * If the client is not connected to the client, it will return an {@link WSError.Disconnected} error.
   */
  async recv() {
    if (this._client && !this._connectionClosed) {
      if (isBrowser) {
        this._client.onmessage = async (data) => {
          const release = await mutex.acquire();
          try {
            Logger.debug(`[3] Receive ${data.length} bytes data`);
            this._data = Buffer.concat([this._data, data]);
            if (this._promisedReading) this._promisedReading(true);
          } finally {
            release();
          }
        };
      } else {
        this._client.on('data', async (data) => {
          const release = await mutex.acquire();
          try {
            Logger.debug(`[3] Receive ${data.length} bytes data`);
            this._data = Buffer.concat([this._data, data]);
            if (this._promisedReading) this._promisedReading(true);
          } finally {
            release();
          }
        });
      }
    } else {
      throw new WSError.Disconnected();
    }
  }
  /**
   * Send request to the server asynchronously.
   * If the client is not connected to the client, it will return an {@link WSError.Disconnected} error.
   * @param {Buffer} data - The request will be sent to the server. Data must be a buffer.
   */
  async send(data) {
    if (this._client && !this._connectionClosed) {
      const release = await mutex.acquire();
      try {
        if (isBrowser) {
          this._client.send(data);
        } else {
          this._client.write(data);
        }
      } finally {
        release();
      }
    } else {
      throw new WSError.Disconnected();
    }
  }
  /**
   * Read data updates from the server asynchronously.
   * If the client is not connected to the client, it will return an {@link WSError.ReadClosed} error.
   * @param {Number} length - How many bytes of data to read.
   */
  async read(length) {
    if (this._connectionClosed) {
      throw new WSError.ReadClosed();
    }
    await this._read;
    if (this._connectionClosed) {
      throw new WSError.ReadClosed();
    }
    let tr = this._data.slice(0, length);
    this._data = this._data.slice(length);
    if (this._data.length <= 0) {
      this._read = new Promise((resolve) => {
        this._promisedReading = resolve;
      });
    }
    return tr;
  }
  /**
   * Read data updates from the server asynchronously.
   * If the client is not connected to the client, it will return an {@link WSError.ReadClosed} error.
   * @param {Number} length - How many bytes of data to read.
   */
  async reading(length) {
    if (this._client && !this._connectionClosed) {
      let data = Buffer.alloc(0);
      while (!this._connectionClosed) {
        let readed = await this.read(length);
        data = Buffer.concat([data, readed]);
        length = length - readed.length;
        if (!length) return data;
      }
    } else {
      throw new WSError.ReadClosed();
    }
  }
  /** @ignore */
  [Symbol.for('nodejs.util.inspect.custom')]() {
    const toPrint = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== void 0 && value !== null) {
          toPrint[key] = value;
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  [Symbol.for('Deno.customInspect')]() {
    return String(inspect(this[Symbol.for('nodejs.util.inspect.custom')](), { colors: true }));
  }
  /** @ignore */
  toJSON() {
    const toPrint = {
      _: this.constructor.name,
    };
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        const value = this[key];
        if (!key.startsWith('_') && value !== void 0 && value !== null) {
          if (typeof value === 'bigint') {
            toPrint[key] = String(value);
          } else if (Array.isArray(value)) {
            toPrint[key] = value.map((v) => (typeof v === 'bigint' ? String(v) : v));
          } else {
            toPrint[key] = value;
          }
        }
      }
    }
    return toPrint;
  }
  /** @ignore */
  toString() {
    return `[constructor of ${this.constructor.name}] ${JSON.stringify(this, null, 2)}`;
  }
}
export { Socket };
