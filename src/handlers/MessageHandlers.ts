import { Message } from "discord.js";
import CheckIfAdmin from "../helpers/CheckIfAdmin";
import ContainerHandlers from "./ContainerHandlers";

export default async function MessageHandler(message: Message) {
  message.content = message.content
    .trimLeft()
    .trimRight()
    .toLowerCase();
  const usrCmd = message.content.split(" ")[0].substr(1);
  const isAdmin = await CheckIfAdmin(message.member);
  switch (usrCmd) {
    case "container":
      if (isAdmin == true)
        message.channel.send(await ContainerHandlers(message.content));
      break;
  }
}
