import Docker from "dockerode";

export default async function ContainerHandlers(message: string) {
  message = message.substr(11);
  const engine = new Docker({ host: "192.168.1.130", port: 2376 });
  const gameServers = await engine.listContainers({ all: true });
  const containerName = message.split(" ")[1];
  const userCmd = message.split(" ")[0];
  let container;
  switch (userCmd) {
    case "list":
      return (
        "These are the containers on the game server: ```" +
        (await DockerList()) +
        "```"
      );
    case "restart":
      container = await GetContainer(containerName);
      if (container.id !== undefined) {
        await container.restart();
        return "Server Restarting...";
      } else {
        return "Server not found";
      }
    case "update":
      container = await GetContainer(containerName);
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
      container = await GetContainer(containerName);
      if (container.id !== undefined) {
        const logs = await container.logs({ tail: 40, stdout: true });
        return logs;
      } else {
        return "Server not found";
      }
    default:
      break;
  }
  async function GetContainer(containerName: string) {
    const containers = new Map();
    gameServers.forEach(container => {
      const name = container.Names.pop();
      if (name !== undefined)
        containers.set(name.substr(1, name.length), container.Id);
    });
    const container = await engine.getContainer(containers.get(containerName));
    return container;
  }
  async function DockerList() {
    const containers = [];
    let formattedServerStatus = "";
    gameServers.forEach(server => {
      let containerName = server.Names.pop();
      containerName = containerName.substr(1, containerName.length);
      const containerStatus = containerName + ": " + server.State;
      containers.push(containerStatus);
    });
    containers.forEach(server => {
      formattedServerStatus = formattedServerStatus + server + "\n\n";
    });
    return formattedServerStatus;
  }
}
