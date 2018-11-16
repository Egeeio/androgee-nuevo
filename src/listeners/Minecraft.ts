import Connect from "../Connect";
import { Guild } from "discord.js";
import SendChannelMessage from "../helpers/SendChannelMessage";

export default class MinecraftListener {
  playerList: Array<string>;
  guild: Guild;
  constructor(Guild: Guild) {
    this.guild = Guild;
    this.playerList = [];
    setInterval(this.ListPlayers, 60000, this);
  }
  async ListPlayers(self) {
    let intersection = [];
    let thePlayers = "";
    const MinecraftClient = await Connect.Minecraft();
    const playerList = await MinecraftClient.send("list");
    const currentPlayers = playerList
      .match(":(.*)")[1]
      .split(",")
      .sort();
    if (JSON.stringify(self.playerList) === JSON.stringify(currentPlayers))
      return;
    intersection = currentPlayers.filter(
      player => !self.playerList.includes(player)
    );
    if (intersection.length > 0 && intersection[0] !== " ") {
      intersection.forEach(player => {
        thePlayers = `${thePlayers} \`${player.trim()}\``;
      });
      thePlayers = `${thePlayers} joined the server`;
      await SendChannelMessage(self.guild, "debug", thePlayers)
        .then(() => {
          console.info(thePlayers);
        })
        .catch(err => {
          console.log(`The minecraft loop failed: ${err}`);
        });
    }
    self.playerList = currentPlayers;
  }
}
