import Docker from "dockerode";
import GetContainer from "../commands/GetContainer";
import ContainerList from "../commands/ContainerList";

export default async function ContainerHandlers(message: string) {
  message = message.substr(11);
  const engine = new Docker({ host: process.env.HOST, port: 2376 });
  const containerName = message.split(" ")[1];
  const userCmd = message.split(" ")[0];
  let container;
  switch (userCmd) {
    case "list":
      return (
        "These are the containers on the game server: ```" +
        (await ContainerList(engine)) +
        "```"
      );
    case "restart":
      container = await GetContainer(containerName, engine);
      if (container.id !== undefined) {
        await container.restart();
        return "Server Restarting...";
      } else {
        return "Server not found";
      }
    case "update":
      container = await GetContainer(containerName, engine);
      if (container.id !== undefined) {
        const dockerExec = await container.exec({
          Cmd: ["update"],
          AttachStdout: true,
          AttachStderr: true
        });
        const update = await dockerExec.start({ Tty: true });
        if (update.output.statusCode === 200) {
          return "Server updating...";
        } else {
          return "Unable to update";
        }
      }
    case "logs":
      container = await GetContainer(containerName, engine);
      if (container.id !== undefined) {
        const logs = await container.logs({ tail: 40, stdout: true });
        return logs;
      } else {
        return "Server not found";
      }
    default:
      return "No such command";
  }
}
