import { Client } from "discord.js";
import WebRcon from "webrconjs";

import MemberAnnouncement from "./helpers/MemberAnnoucement";
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
    MemberAnnouncement(member, "general", "joined");
  });
  discordClient.on("guildMemberRemove", member => {
    MemberAnnouncement(member, "debug", "left");
  });
}
