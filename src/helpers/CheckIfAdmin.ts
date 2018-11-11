import { GuildMember } from "discord.js";

export default async function CheckIfAdmin(user: GuildMember) {
  const hasRole = await user.roles.find("name", "Demigods (Game-Admins)");
  if (hasRole !== undefined) {
    return true;
  } else {
    return false;
  }
}
