import readline from 'node:readline';
import QRCode from 'qrcode'; // npm install qrcode
import { Client, Storages } from '../dist/mod.js';

process.env.LOGLEVEL = 'error';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter your API ID: ', (apiId) => {
  rl.question('Enter your API Hash: ', (apiHash) => {
    const client = new Client(new Storages.StringSession(''), String(apiHash), Number(apiId));
    client
      .start({
        qrHandler: async (token, experies) => {
          const terminalQr = await QRCode.toString(token, { type: 'terminal', small: true });
          console.log(terminalQr);
        },
        password: async () => {
          return new Promise((resolve) => {
            rl.question('Enter your 2FA password: ', (pass) => {
              resolve(pass);
            });
          });
        },
        recoveryCode: async () => {
          return new Promise((resolve) => {
            rl.question('Enter the recovery code: ', (pass) => {
              resolve(pass);
            });
          });
        },
      })
      .then(() => {
        console.log('Client started successfully!');
        client
          .exportSession()
          .then((session) => {
            console.log('Your session string:\n', session);
          })
          .finally(() => {
            rl.close();
          });
      })
      .catch((err) => {
        console.error('Error starting client:', err);
        rl.close();
      });
  });
});
