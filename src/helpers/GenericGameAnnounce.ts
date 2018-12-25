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
  const lastMsg = await GetLastChannelMessage(discordGuild, channel);
  const logs = await container.logs({ since: timeStamp, stdout: true });

  const regexMatch = logs.match(regex);
  if (regexMatch !== null) {
    const thePlayer = `**${regexMatch[0]}** joined the server`;
    const debug = lastMsg !== thePlayer && logs.includes('joined');
    if (lastMsg !== thePlayer) {
      SendChannelMessage(discordGuild, channel, thePlayer)
        .then(() => {
          console.info(thePlayer);
        })
        .catch(err => {
          console.error(`The minecraft loop failed: ${err}`);
        });
    }
  }
}
