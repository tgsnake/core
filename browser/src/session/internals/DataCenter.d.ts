export declare const DCTest: {
  1: string;
  2: string;
  3: string;
};
export declare const DCProd: {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  203: string;
};
export declare const WebDC: {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
};
export declare const DCProdMedia: {
  2: string;
  4: string;
};
export declare const DCTestIPV6: {
  1: string;
  2: string;
  3: string;
};
export declare const DCProdIPV6: {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  203: string;
};
export declare const DCProdMediaIPV6: {
  2: string;
  4: string;
};
export declare function DataCenter(
  dcId: number,
  testMode: boolean,
  ipv6: boolean,
  media: boolean,
): [ip: string, port: number];
