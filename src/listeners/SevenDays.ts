import Docker from "dockerode";
import { Guild } from "discord.js";
import GetContainer from "../commands/GetContainer";
import GenericGameAnnounce from "../helpers/GenericGameAnnounce";

export default async function SevenDaysListener(
  discordGuild: Guild,
  engine: Docker
) {
  const container = await GetContainer(process.env.SEVENDAYS_NAME, engine);
  const unixTimeStamp = Math.floor(+new Date() / 1000 - 30);
  const playerRegex = /(?<=\sPlayer\s')(\w+)/;
  await GenericGameAnnounce(
    container,
    unixTimeStamp,
    playerRegex,
    "7-days-to-die",
    discordGuild
  );
}
