import stream from "stream";
import Docker from "dockerode";
import GetContainer from "../commands/GetContainer";
import { Guild } from "discord.js";
import SendChannelMessage from "../helpers/SendChannelMessage";

export default async function MinecraftListener(
  discordGuild: Guild,
  engine: Docker
) {
  const container = await GetContainer(
    "gscminecraft_minecraft-server_1",
    engine
  );
  const unixTimeStamp = Math.floor(+new Date() / 1000 - 30);
  containerLogs(container, unixTimeStamp, discordGuild);
}

function containerLogs(container, ts, discordGuild: Guild) {
  // create a single stream for stdin and stdout
  const logStream = new stream.PassThrough();
  logStream.on("data", function(chunk) {
    const blank = chunk.toString("utf8");
    const myregex = blank.match(/(?<=\bUUID\sof\splayer\s)(\w+)/);
    if (myregex !== null) {
      const thePlayer = `\`${myregex[0]}\` joined the server`;
      SendChannelMessage(discordGuild, "debug", thePlayer)
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
