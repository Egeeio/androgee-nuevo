import { Client, TextChannel, Guild } from "discord.js";
import MessageHandler from "./handlers/MessageHandlers";

export default function Listeners(client: Client) {
  client.on("message", msg => {
    const cfg = require("./config.json");
    if (msg.content.charAt(0) == cfg.prefix) MessageHandler(msg);
  });
  client.on("guildMemberAdd", member => {
    const msg = `** ${member.user.username} ** has joined the server! 👋`;
    SendChannelMessage(member.guild, "general", msg).catch(err => {
      console.error(err);
    });
  });
  client.on("guildMemberRemove", member => {
    const msg = `** ${member.user.username} ** has left the server! 👋`;
    SendChannelMessage(member.guild, "debug", msg).catch(err => {
      console.error(err);
    });
  });
}

function SendChannelMessage(
  guild: Guild,
  channelName: string,
  message: string
) {
  const channel = guild.channels.find("name", channelName) as TextChannel;
  return new Promise((resolve, reject) => {
    channel
      .send(message)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(`Error sending message to channel: ${err}`);
      });
  });
}
