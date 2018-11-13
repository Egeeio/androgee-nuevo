import { Client } from "discord.js";
import WebRcon from "webrconjs";

export default class Connect {
  static async Discord(): Promise<Client> {
    const token = process.env.TOKEN;
    const client = new Client();
    if (token !== "") {
      await client
        .login(token)
        .then(() => {
          console.info("Successfully logged into Discord.");
        })
        .catch(err => {
          console.error(`Error logging in: ${err}`);
          process.exit(1);
        });
    } else {
      console.error("Unable to find Discord TOKEN.");
      process.exit(1);
    }
    return client;
  }
  static Rust(address: string, port: string, password: string) {
    const rustClient = new WebRcon(address, port);
    rustClient.connect(password);
    return rustClient;
  }
}
