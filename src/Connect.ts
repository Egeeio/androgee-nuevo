import { Client } from 'discord.js';
import WebRcon from 'webrconjs';
import Rcon from 'rcon-ts';

export default class Connect {
  static async Discord(): Promise<Client> {
    const token = process.env.TOKEN;
    const client = new Client();
    if (token !== '') {
      await client
        .login(token)
        .then(() => {
          console.info('Successfully logged into Discord.');
        })
        .catch(err => {
          console.error(`Error logging in: ${err}`);
          process.exit(1);
        });
    } else {
      console.error('Unable to find Discord TOKEN.');
      process.exit(1);
    }
    return client;
  }
  static Rust() {
    const rustClient = new WebRcon(process.env.HOST, process.env.RUST_PORT);
    rustClient.connect(process.env.RUST_PASSWORD);
    return rustClient;
  }
  static async Minecraft() {
    const rcon = new Rcon({
      host: process.env.HOST,
      port: parseInt(process.env.MINECRAFT_PORT),
      password: process.env.MINECRAFT_PASSWORD,
      timeout: 5000,
    });
    rcon.connect();
    return rcon;
  }
}
