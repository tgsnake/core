export declare class FileError extends Error {
  message: string;
  description?: string;
  constructor(message: string, description?: string);
  /** @ignore */
  toJSON(): {
    [key: string]: any;
  };
  /** @ignore */
  toString(): string;
}
export declare class FileUploadZero extends FileError {
  constructor();
}
export declare class FileUploadBigger extends FileError {
  constructor(limit: number, size: number);
}
