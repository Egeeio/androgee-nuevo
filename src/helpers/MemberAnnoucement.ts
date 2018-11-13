import { GuildMember } from "discord.js";
import SendChannelMessage from "./SendChannelMessage";

export default function MemberAnnouncement(
  member: GuildMember,
  channelName: string,
  event: string
) {
  return new Promise((resolve, reject) => {
    SendChannelMessage(
      member.guild,
      channelName,
      `** ${member.nickname} ** has ${event} the server! 👋`
    )
      .then(resolve)
      .catch(err => {
        reject(`Error annoucing: ${err}`);
      });
  });
}
