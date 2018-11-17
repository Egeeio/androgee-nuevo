import { Client } from "discord.js";
import MemberAnnounce from "../helpers/MemberAnnouce";
import MessageHandler from "../handlers/MessageHandlers";

export default function DiscordListener(discordClient: Client) {
  discordClient.on("message", msg => {
    if (msg.content.charAt(0) == process.env.PREFIX) MessageHandler(msg);
  });
  discordClient.on("guildMemberAdd", member => {
    MemberAnnounce(member, "general", "joined")
      .then(() => {
        console.log(`MESSAGE OBJ: ${member.nickname}`);
        console.log(`DISPLAYNAME: ${member.displayName}`);
        console.log(`USER OBJ: ${member.user.username}`);
      })
      .catch(err => {
        console.error(`guildMemberAdd failed: ${err}`);
      });
  });
  discordClient.on("guildMemberRemove", member => {
    MemberAnnounce(member, "debug", "left")
      .then(() => {
        console.info(`member.displayColor left the server`);
      })
      .catch(err => {
        console.error(`guildMemberRemove failed: ${err}`);
      });
  });
}
