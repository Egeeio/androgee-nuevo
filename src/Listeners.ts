import { Client, TextChannel, Guild } from "discord.js";

export function Listeners(client: Client) {
  client.on("guildMemberAdd", member => {
    const msg = `** ${member.user.username} ** +  has joined the server! 👋`;
    SendChannelMessage(member.guild, "general", msg).catch(err => {
      console.error(err);
    });
  });
  client.on("guildMemberRemove", member => {
    const msg = `** ${member.user.username} ** +  has left the server! 👋`;
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
