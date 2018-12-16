import { Client } from 'discord.js';
import WebRcon from 'webrconjs';
import Rcon from 'rcon-ts';

export default class Connect {
  static async Discord(): Promise<Client> {
    const token = process.env.TOKEN;
    const client = new Client();
    await client
      .login(token)
      .then(() => {
        console.info('Successfully logged into Discord.');
      })
      .catch(err => {
        console.error(`Error logging in: ${err}`);
        process.exit(1);
      });
    return client;
  }
  static Rust() {
    const rustClient = new WebRcon(process.env.HOST, process.env.RUST_PORT);
    rustClient.connect(process.env.RUST_PASSWORD);
    return rustClient;
  }
}
