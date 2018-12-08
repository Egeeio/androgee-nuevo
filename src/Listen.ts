import Docker from "dockerode";
import Connect from "./Connect";
import RustListener from "./listeners/Rust";
import DiscordListener from "./listeners/Discord";
import MinecraftListener from "./listeners/Minecraft";
import SevenDaysListener from "./listeners/SevenDays";

export default async function Listen() {
  const engine = new Docker({ host: process.env.HOST, port: 2376 });
  const remoteEngine = new Docker({
    host: process.env.SEVENDAYS_HOST,
    port: 2376
  });
  const discordClient = await Connect.Discord();
  const rustClient = await Connect.Rust();
  try {
    RustListener(rustClient, discordClient.guilds.first());
    DiscordListener(discordClient);
    setInterval(MinecraftListener, 30000, discordClient.guilds.first(), engine);
    setInterval(
      SevenDaysListener,
      30000,
      discordClient.guilds.first(),
      remoteEngine
    );
  } catch (err) {
    console.error(
      `Something went terribly wrong while setting up the Listeners: ${err}`
    );
  }
  console.info("Listening for events.");
}
