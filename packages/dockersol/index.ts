import Docker from 'dockerode';

const docker = new Docker();

// Function to fetch Docker images
async function fetchImages(): Promise<Docker.ImageInfo[]> {
  const images = await docker.listImages();
  return images;
}

// Function to create and run a Docker container from an image
async function createAndRunContainer(
  imageName: string,
  containerName: string,
  command: string[]
): Promise<Docker.Container> {
  const container = await docker.createContainer({
    Image: imageName,
    name: containerName,
    Cmd: command,
    Tty: true,
  });

  await container.start();
  return container;
}

// Function to fetch logs from a container
async function fetchContainerLogs(containerId: string): Promise<string> {
  const container = docker.getContainer(containerId);
  const logs = await container.logs({ stdout: true, stderr: true });
  return logs.toString('utf-8');
}

// Function to stop a container
async function stopContainer(containerId: string): Promise<void> {
  const container = docker.getContainer(containerId);
  await container.stop();
}

// Function to get the status of a container
async function getContainerStatus(containerId: string): Promise<string> {
  const container = docker.getContainer(containerId);
  const containerInfo = await container.inspect();
  return containerInfo.State.Status;
}

// Function to remove a container
async function removeContainer(containerId: string): Promise<void> {
    const container = docker.getContainer(containerId);
    await container.remove();
    }