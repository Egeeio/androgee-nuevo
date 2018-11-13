import { Client } from "discord.js";
import Listeners from "./Listeners";

async function Main() {
  const token = process.env.TOKEN;
  const client = new Client();
  if (process.env.PREFIX === "") {
    console.error("Exiting - Double check your environment variables.");
    process.exit(1);
  }
  if (token !== "") {
    await client
      .login(token)
      .then(() => {
        console.info("Successfully logged into Discord.");
      })
      .catch(err => {
        throw new Error(`Error logging in: ${err}`);
      });
    console.info("Listening for events.");
    Listeners(client);
  } else {
    console.error("Unable to find Discord TOKEN.");
  }
}

Main();
