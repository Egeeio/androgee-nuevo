import WebRcon from "webrconjs";
import { Client } from "discord.js";
import RustListeners from "./listeners/Rust";
import DiscordListeners from "./listeners/Discord";

export default function Listen(discordClient: Client, rustClient: WebRcon) {
  try {
    RustListeners(rustClient);
    DiscordListeners(discordClient);
    console.info("Listening for events.");
  } catch (err) {
    console.error(
      `Something went terribly wrong while setting up the Listeners: ${err}`
    );
  }
}
