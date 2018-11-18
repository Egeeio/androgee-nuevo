import SendChannelMessage from "./SendChannelMessage";
import GetLastChannelMessage from "./GetLastChannelMessage";

export default async function RustAnnounce(
  rustClient: any,
  guild: any,
  message: string
) {
  if (message.includes("joined [")) {
    const playerName = message.match(/([^/]*)\s*\s/);
    const playerNameNormalized = playerName.pop().trim();
    let discordAnnoucement = playerNameNormalized.replace(
      "joined",
      "logged in to"
    );
    const serverAnnoucement = playerName.pop().trim() + " the server";
    const lastMsg = await GetLastChannelMessage(guild, "rust");
    discordAnnoucement = `${discordAnnoucement} the server`;
    rustClient.run("say " + serverAnnoucement);
    if (lastMsg !== discordAnnoucement) {
      SendChannelMessage(guild, "rust", discordAnnoucement).catch(err => {
        console.error(`Error announcing: ${err}`);
      });
    }
  }
}
