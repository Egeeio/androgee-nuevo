import { GuildMember } from 'discord.js';
import SendChannelMessage from './SendChannelMessage';

export default function MemberAnnounce(
  member: GuildMember,
  channelName: string,
  event: string,
) {
  return new Promise((resolve, reject) => {
    SendChannelMessage(
      member.guild,
      channelName,
      `** ${member.displayName} ** has ${event} the server! 👋`,
    )
      .then(resolve)
      .catch(err => {
        reject(`Error annoucing: ${err}`);
      });
  });
}
