/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */

import { TLObject } from '../TLObject.ts';
import { BytesIO } from '../BytesIO.ts';
import { Bytes } from './Bytes.ts';
import { Buffer } from '../../../platform.deno.ts';

export class String extends TLObject {
  static write(value: string): Buffer {
    return Bytes.write(Buffer.from(value, 'utf8')) as unknown as Buffer;
  }
  static async read(data: BytesIO, ...args: Array<any>): Promise<string> {
    return (await Bytes.read(data)).toString('utf8');
  }
}
