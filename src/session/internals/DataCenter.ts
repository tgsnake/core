/**
 * tgsnake - Telegram MTProto framework for nodejs.
 * Copyright (C) 2024 butthx <https://github.com/butthx>
 *
 * THIS FILE IS PART OF TGSNAKE
 *
 * tgsnake is a free software : you can redistribute it and/or modify
 * it under the terms of the MIT License as published.
 */
import { isBrowser } from '../../platform.deno.ts';

export const DCTest = {
  1: '149.154.175.10',
  2: '149.154.167.40',
  3: '149.154.175.117',
};
export const DCProd = {
  1: '149.154.175.53',
  2: '149.154.167.51',
  3: '149.154.175.100',
  4: '149.154.167.91',
  5: '91.108.56.130',
  203: '91.105.192.100',
};
export const WebDC = {
  1: 'pluto.web.telegram.org',
  2: 'venus.web.telegram.org',
  3: 'aurora.web.telegram.org',
  4: 'vesta.web.telegram.org',
  5: 'flora.web.telegram.org',
};
export const DCProdMedia = {
  2: '149.154.167.151',
  4: '149.154.164.250',
};
export const DCTestIPV6 = {
  1: '2001:b28:f23d:f001::e',
  2: '2001:67c:4e8:f002::e',
  3: '2001:b28:f23d:f003::e',
};
export const DCProdIPV6 = {
  1: '2001:b28:f23d:f001::a',
  2: '2001:67c:4e8:f002::a',
  3: '2001:b28:f23d:f003::a',
  4: '2001:67c:4e8:f004::a',
  5: '2001:b28:f23f:f005::a',
  203: '2a0a:f280:0203:000a:5000:0000:0000:0100',
};
export const DCProdMediaIPV6 = {
  2: '2001:067c:04e8:f002:0000:0000:0000:000b',
  4: '2001:067c:04e8:f004:0000:0000:0000:000b',
};
export function DataCenter(
  dcId: number,
  testMode: boolean,
  ipv6: boolean,
  media: boolean,
): [ip: string, port: number] {
  // @ts-ignore: browser compatibility
  if (isBrowser) {
    return [
      `${WebDC[dcId as keyof typeof WebDC] as string}:$PORT/apiws${testMode ? '_test' : ''}`,
      443,
    ];
  } else {
    if (testMode) {
      return [
        ipv6 ? DCTestIPV6[dcId as keyof typeof DCTestIPV6] : DCTest[dcId as keyof typeof DCTest],
        80,
      ];
    } else {
      if (media) {
        return [
          ipv6
            ? (DCProdMediaIPV6[dcId as keyof typeof DCProdMediaIPV6] ??
              DCProdIPV6[dcId as keyof typeof DCProdIPV6])
            : (DCProdMedia[dcId as keyof typeof DCProdMedia] ??
              DCProd[dcId as keyof typeof DCProd]),
          443,
        ];
      } else {
        return [
          ipv6 ? DCProdIPV6[dcId as keyof typeof DCProdIPV6] : DCProd[dcId as keyof typeof DCProd],
          443,
        ];
      }
    }
  }
}
