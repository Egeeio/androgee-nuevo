import { TextChannel, Guild } from 'discord.js';

export default async function GetLastChannelMessage(
  guild: Guild,
  channelName: string,
): Promise<string> {
  const channel = guild.channels.find(
    channel => channel.name === channelName,
  ) as TextChannel;
  const lastMessage = await channel.fetchMessages({ limit: 1 });
  return lastMessage.first().content;
}
