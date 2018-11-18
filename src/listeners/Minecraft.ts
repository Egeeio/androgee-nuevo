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
    setInterval(this.test, 30000, this);
  }
  async test(self) {
    const container = await GetContainer(self.containerName, self.engine);
    const ts = Math.floor(+new Date() / 1000 - 30);
    self.containerLogs(container, ts, self);
  }

  containerLogs(container, ts, self) {
    // create a single stream for stdin and stdout
    const logStream = new stream.PassThrough();
    logStream.on("data", function(chunk) {
      const blank = chunk.toString("utf8");
      const myregex = blank.match(/(?<=\bUUID\sof\splayer\s)(\w+)/);
      if (myregex !== null) {
        const thePlayer = `\`${myregex[0]}\` joined the server`;
        SendChannelMessage(self.guild, "debug", thePlayer)
          .then(() => {
            console.info(thePlayer);
          })
          .catch(err => {
            console.log(`The minecraft loop failed: ${err}`);
          });
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
}
