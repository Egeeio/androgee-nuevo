import { Client } from "discord.js";
import MemberAnnounce from "../helpers/MemberAnnouce";
import MessageHandler from "../handlers/MessageHandlers";

export default function DiscordListeners(discordClient: Client) {
  discordClient.on("message", msg => {
    if (msg.content.charAt(0) == process.env.PREFIX) MessageHandler(msg);
  });
  discordClient.on("guildMemberAdd", member => {
    MemberAnnounce(member, "general", "joined");
  });
  discordClient.on("guildMemberRemove", member => {
    MemberAnnounce(member, "debug", "left");
  });
}
