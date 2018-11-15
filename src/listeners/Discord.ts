import { Client } from "discord.js";
import MemberAnnounce from "../helpers/MemberAnnouce";
import MessageHandler from "../handlers/MessageHandlers";

export default function DiscordListener(discordClient: Client) {
  discordClient.on("message", msg => {
    if (msg.content.charAt(0) == process.env.PREFIX) MessageHandler(msg);
  });
  discordClient.on("guildMemberAdd", member => {
    // MemberAnnounce(member, "debug", "joined");
    console.log(`MESSAGE OBJ: ${member}`);
    console.log(`DISPLAYNAME: ${member.displayName}`);
    console.log(`USER OBJ: ${member.user}`);
  });
  discordClient.on("guildMemberRemove", member => {
    MemberAnnounce(member, "debug", "left");
  });
}
