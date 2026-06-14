import readline from 'node:readline';
import { Client, Storages } from '../dist/mod.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter your API ID: ', (apiId) => {
  rl.question('Enter your API Hash: ', (apiHash) => {
    const client = new Client(new Storages.StringSession(''), String(apiHash), Number(apiId));
    client
      .start({
        code: async () => {
          return new Promise((resolve) => {
            rl.question('Enter the code you received: ', (code) => {
              resolve(code);
            });
          });
        },
        password: async () => {
          return new Promise((resolve) => {
            rl.question('Enter your 2FA password: ', (pass) => {
              resolve(pass);
            });
          });
        },
        phoneNumber: async () => {
          return new Promise((resolve) => {
            rl.question('Enter your phone number: ', (phone) => {
              resolve(phone);
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
