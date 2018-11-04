import { Client, TextChannel, Guild } from "discord.js";

export function Listeners(client: Client) {
  client.on("guildMemberAdd", member => {
    const msg =
      "**" + member.user.username + "**" + " has joined the server! 👋";
    SendChannelMessage(member.guild, "general", msg);
  });
  client.on("guildMemberRemove", member => {
    const msg = "**" + member.user.username + "**" + " has left the server. 👋";
    SendChannelMessage(member.guild, "debug", msg);
  });
}

function SendChannelMessage(
  guild: Guild,
  channelName: string,
  message: string
) {
  const channel = guild.channels.find("name", channelName) as TextChannel;
  channel
    .sendMessage(message)
    .then(() => {
      console.info(message);
    })
    .catch(err => {
      console.error("Error sending message to channel: " + err);
    });
}
