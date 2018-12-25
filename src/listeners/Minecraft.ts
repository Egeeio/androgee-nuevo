import Docker from 'dockerode';
import { Guild } from 'discord.js';
import GetContainer from '../commands/GetContainer';
import GenericGameAnnounce from '../helpers/GenericGameAnnounce';

export default async function MinecraftListener(
  discordGuild: Guild,
  engine: Docker,
) {
  const container = await GetContainer(process.env.MINECRAFT_NAME, engine);
  const unixTimeStamp = Math.floor(+new Date() / 1000 - 30);
  const playerRegex = /(?<=\bUUID\sof\splayer\s)(\w+)/;
  await GenericGameAnnounce(
    container,
    unixTimeStamp,
    playerRegex,
    'minecraft',
    discordGuild,
  );
}
