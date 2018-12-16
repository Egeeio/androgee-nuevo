import { TextChannel, Guild } from 'discord.js';

export default function SendChannelMessage(
  guild: Guild,
  channelName: string,
  message: string,
) {
  const channel = guild.channels.find(
    channel => channel.name === channelName,
  ) as TextChannel;
  return new Promise((resolve, reject) => {
    channel
      .send(message)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(`Error sending message to channel: ${err}`);
      });
  });
}
