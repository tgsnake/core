# Location of logger

If you set logger to `debug` or any logger level then see number in the array that is at the beginning of the message to the logger.  
You will se like this : `[n] message`.  
So, if you want to know the location of the logger called, please see the list below.

`1 – 2, 106` : level is `(debug,error)` located on `src/connection/connection.ts`  
`3` : level is `(debug)` located on `src/connection/webSocket.ts` _(removed)_  
`4 – 7` : level is `(debug)` located on `src/crypto/Aes.ts`  
`8 – 9` : level is `(debug)` as RPCError, parent class located on`src/errors/RPCError.ts`  
`10` : level is `(debug)` located on `src/raw/core/TLObject.ts`  
`11 – 32` : level is `(debug,error)` located on `src/session/Auth.ts`  
`32 – 72, 107 - 108` : level is `(debug,error,warning,info)` located on `src/session/Session.ts`  
`73 – 80` : level is `(debug,info)` as BaseSession, parent class located on `src/storage/Session.ts`  
`81 – 99` : level is `(debug)` located on `src/storage/StringSession.ts`  
`100 – 105` : level is `(info,warning)` located on `src/Client`

## Why this file is created

I created this file for you or the developer if the app crashes and makes it easier to find where the crash occurred. So that developers can easily overcome these crashes.

## Why any flags `as <class>`?

Because there is a possibility if the class is extended, and the logger is run in another function. an example is RPCError which can generate logger errors in its child files.

## Why any flags `(removed)`?

Because the file has been deleted, so we don't want to rewrite the number from the beginning, so we provide these flags so we can continue the numbers. So there will be a possibility that the numbers will jump out of order or be lost.
