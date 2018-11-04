import { Client, TextChannel } from "discord.js";
import { Listeners } from "./Listeners";

function Main() {
  const token = process.env.TOKEN;
  const client = new Client();
  if (process.env.TOKEN !== "") {
    client
      .login(token)
      .then(() => {
        console.info("Successfully logged into the Discord servers");
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    console.error("Unable to find Discord TOKEN.");
  }
  client.on("ready", () => {
    Listeners(client);
    console.info("I'm in.");
  });
}

Main();
