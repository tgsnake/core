/**
 * tgsnake - Telegram MTProto library for javascript or typescript.
 * Copyright (C) 2025 tgsnake <https://github.com/tgsnake>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the GPL v3 License as published.
 */

import { TLObject } from '../TLObject.ts';
import { BytesIO } from '../BytesIO.ts';
import { Bytes } from './Bytes.ts';
import { Buffer } from '../../../platform.deno.ts';

export class String extends TLObject {
  static override write(value: string): Buffer {
    return Bytes.write(Buffer.from(value, 'utf8')) as unknown as Buffer;
  }
  static override async read(data: BytesIO, ..._args: Array<any>): Promise<string> {
    return (await Bytes.read(data)).toString('utf8');
  }
}
