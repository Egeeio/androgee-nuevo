import Connect from "../Connect";
const JsDiff = require("diff");

export default class MinecraftListener {
  playerList: Array<string>;
  constructor() {
    setInterval(this.ListPlayers, 10000, this);
  }
  async ListPlayers(self) {
    const MinecraftClient = await Connect.Minecraft();
    const playerList = await MinecraftClient.send("list");
    const currentPlayers = playerList
      .match(":(.*)")[1]
      .trim()
      .split(",");
    let diff;
    diff = JsDiff.diffWords(self.playerList, currentPlayers);
    self.playerList = currentPlayers;
  }
}
