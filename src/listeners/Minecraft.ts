import Connect from "../Connect";
var stream = require("stream");
import Docker from "dockerode";
import GetContainer from "../commands/GetContainer";
import { Guild } from "discord.js";
import SendChannelMessage from "../helpers/SendChannelMessage";

export default class MinecraftListener {
  playerList: Array<string>;
  guild: Guild;
  constructor(Guild: Guild) {
    this.guild = Guild;
    this.playerList = [];
    const engine = new Docker({ host: process.env.HOST, port: 2376 });
    this.test("gscminecraft_minecraft-server_1", engine);
    // setInterval(this.ListPlayers, 60000, this);
  }
  async test(containerName: string, engine: Docker) {
    const container = await GetContainer(containerName, engine);
    const ts = Math.floor(+new Date() / 1000 - 6000);
    this.containerLogs(container, ts);

    // const logs = await container.logs({ since: ts, stdout: true });
    // let blank = "" + logs;
    // blank = blank.trim();
    // console.log(blank);
  }

  containerLogs(container, ts) {
    // create a single stream for stdin and stdout
    const logStream = new stream.PassThrough();
    let myArray = [];
    logStream.on("data", function(chunk) {
      let blank = chunk.toString("utf8");
      myArray.push(blank);
      console.log(blank);
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
