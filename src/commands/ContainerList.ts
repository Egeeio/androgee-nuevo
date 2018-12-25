import Docker from 'dockerode';

export default async function DockerList(engine: Docker) {
  const gameServers = await engine.listContainers({ all: true });
  const containers = [];
  let formattedServerStatus = '';
  gameServers.forEach(server => {
    let containerName = server.Names.pop();
    containerName = containerName.substr(1, containerName.length);
    const containerStatus = containerName + ': ' + server.State;
    containers.push(containerStatus);
  });
  containers.forEach(server => {
    formattedServerStatus = formattedServerStatus + server + '\n\n';
  });
  return formattedServerStatus;
}
