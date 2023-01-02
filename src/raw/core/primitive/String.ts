/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2023 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { TLObject } from '../TLObject';
import { BytesIO } from '../BytesIO';
import { Bytes } from './Bytes';

export class String extends TLObject {
  static write(value: string): Buffer {
    return Bytes.write(Buffer.from(value, 'utf8')) as unknown as Buffer;
  }
  static read(data: BytesIO, ...args: Array<any>): string {
    return Bytes.read(data).toString('utf8');
  }
}
