import Connect from "../Connect";

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
    self.playerList = currentPlayers;
  }
}
