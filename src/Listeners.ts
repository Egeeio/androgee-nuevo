import { Client } from "discord.js";
import SendChannelMessage from "./helpers/SendChannelMessage";
import MessageHandler from "./handlers/MessageHandlers";

export default function Listeners(client: Client) {
  client.on("message", msg => {
    const cfg = require("./config.json");
    if (msg.content.charAt(0) == cfg.prefix) MessageHandler(msg);
  });
  client.on("guildMemberAdd", member => {
    SendChannelMessage(
      member.guild,
      "general",
      `** ${member.user.username} ** has joined the server! 👋`
    ).catch(err => {
      console.error(err);
    });
  });
  client.on("guildMemberRemove", member => {
    SendChannelMessage(
      member.guild,
      "debug",
      `** ${member.user.username} ** has left the server! 👋`
    ).catch(err => {
      console.error(err);
    });
  });
}
