import { Client } from "discord.js";
import WebRcon from "webrconjs";

import SendChannelMessage from "./helpers/SendChannelMessage";
import MessageHandler from "./handlers/MessageHandlers";

export default function Listeners(discordClient: Client) {
  const rustConnection = new WebRcon(process.env.HOST, "28016");
  rustConnection.connect(process.env.RUST_PASSWORD);

  rustConnection.on("connect", function() {
    console.log("CONNECTED TO RUST SERVER");
  });

  rustConnection.on("message", msg => {
    console.log(msg);
  });

  discordClient.on("message", msg => {
    if (msg.content.charAt(0) == process.env.PREFIX) MessageHandler(msg);
  });
  discordClient.on("guildMemberAdd", member => {
    SendChannelMessage(
      member.guild,
      "general",
      `** ${member.nickname} ** has joined the server! 👋`
    ).catch(err => {
      console.error(err);
    });
  });
  discordClient.on("guildMemberRemove", member => {
    SendChannelMessage(
      member.guild,
      "debug",
      `** ${member.user.username} ** has left the server! 👋`
    ).catch(err => {
      console.error(err);
    });
  });
}
