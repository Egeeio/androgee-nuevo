import stream from 'stream';
import { Guild } from 'discord.js';
import SendChannelMessage from './SendChannelMessage';
import GetLastChannelMessage from './GetLastChannelMessage';

export default async function GenericGameAnnounce(
  container: any,
  timeStamp: number,
  regex: RegExp,
  channel: string,
  discordGuild: Guild,
) {
  const logStream = new stream.PassThrough();
  const lastMsg = await GetLastChannelMessage(discordGuild, channel);
  logStream.on('data', chunk => {
    const line = chunk.toString('utf8');
    const regexMatch = line.match(regex);
    if (regexMatch !== null) {
      const thePlayer = `**${regexMatch[0]}** joined the server`;
      if (lastMsg !== thePlayer && line.includes('joined')) {
        SendChannelMessage(discordGuild, channel, thePlayer)
          .then(() => {
            console.info(thePlayer);
          })
          .catch(err => {
            console.error(`The minecraft loop failed: ${err}`);
          });
      }
    }
  });

  container.logs(
    {
      since: timeStamp,
      follow: true,
      stdout: true,
      stderr: true,
    },
    (err, stream) => {
      if (err) {
        return console.error(err.message);
      }
      container.modem.demuxStream(stream, logStream, logStream);
      stream.on('end', () => {
        logStream.end();
      });

      setTimeout(() => {
        stream.destroy();
      }, 2000);
    },
  );
}
