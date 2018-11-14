import Connect from "./Connect";
import RustListener from "./listeners/Rust";
import DiscordListener from "./listeners/Discord";
import MinecraftListener from "./listeners/Minecraft";

export default async function Listen() {
  const discordClient = await Connect.Discord();
  const rustClient = await Connect.Rust();
  try {
    RustListener(rustClient, discordClient.guilds.first());
    DiscordListener(discordClient);
    // new MinecraftListener();
  } catch (err) {
    console.error(
      `Something went terribly wrong while setting up the Listeners: ${err}`
    );
  }
  console.info("Listening for events.");
}
