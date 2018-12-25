import Docker from 'dockerode';

export default async function GetContainer(
  containerName: string,
  engine: Docker,
) {
  const gameServers = await engine.listContainers({ all: true });
  const containers = new Map();
  gameServers.forEach(container => {
    const name = container.Names.pop();
    if (name !== undefined)
      containers.set(name.substr(1, name.length), container.Id);
  });
  const container = await engine.getContainer(containers.get(containerName));
  return container;
}
