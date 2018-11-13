import { Client } from "discord.js";
import MemberAnnouncement from "../helpers/MemberAnnoucement";
import MessageHandler from "../handlers/MessageHandlers";

export default function DiscordListeners(discordClient: Client) {
  discordClient.on("message", msg => {
    if (msg.content.charAt(0) == process.env.PREFIX) MessageHandler(msg);
  });
  discordClient.on("guildMemberAdd", member => {
    MemberAnnouncement(member, "general", "joined");
  });
  discordClient.on("guildMemberRemove", member => {
    MemberAnnouncement(member, "debug", "left");
  });
}
