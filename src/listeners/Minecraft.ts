import Connect from "../Connect";
var stream = require("stream");
import Docker from "dockerode";
import GetContainer from "../commands/GetContainer";
import { Guild } from "discord.js";
import SendChannelMessage from "../helpers/SendChannelMessage";

export default class MinecraftListener {
  playerList: Array<string>;
  guild: Guild;
  containerName: String;
  engine: Docker;
  constructor(Guild: Guild) {
    this.guild = Guild;
    this.playerList = [];
    this.engine = new Docker({ host: process.env.HOST, port: 2376 });
    this.containerName = "gscminecraft_minecraft-server_1";
    setInterval(this.test, 60000, this);
  }
  async test(self) {
    const container = await GetContainer(self.containerName, self.engine);
    const ts = Math.floor(+new Date() / 1000 - 60);
    self.containerLogs(container, ts);
  }

  containerLogs(container, ts) {
    // create a single stream for stdin and stdout
    const logStream = new stream.PassThrough();
    const myArray = [];
    logStream.on("data", function(chunk) {
      const blank = chunk.toString("utf8");
      const myregex = blank.match(/(?<=\bUUID\sof\splayer\s)(\w+)/);
      if (myregex !== null) {
        console.log("We got a match!" + myregex[0]);
        myArray.push(myregex);
      }
    });

    container.logs(
      {
        since: ts,
        follow: true,
        stdout: true,
        stderr: true
      },
      (err, stream) => {
        if (err) {
          return console.error(err.message);
        }
        container.modem.demuxStream(stream, logStream, logStream);
        stream.on("end", () => {
          logStream.end();
        });

        setTimeout(() => {
          stream.destroy();
        }, 2000);
      }
    );
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
      await SendChannelMessage(self.guild, "minecraft-server", thePlayers)
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
