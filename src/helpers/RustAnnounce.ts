import SendChannelMessage from "./SendChannelMessage";

export default function RustAnnounce(
  rustClient: any,
  guild: any,
  message: string
) {
  if (message.includes("joined [")) {
    const playerName = message.match(/([^/]*)\s*\s/);
    const playerNameNormalized = playerName.pop().trim();
    const discordAnnoucement = playerNameNormalized.replace(
      "joined",
      "logged in to"
    );
    const serverAnnoucement = playerName.pop().trim() + " the server";
    rustClient.run("say " + serverAnnoucement);
    SendChannelMessage(guild, "rust", `${discordAnnoucement} the server`).catch(
      err => {
        console.error(`Error announcing: ${err}`);
      }
    );
  }
}
