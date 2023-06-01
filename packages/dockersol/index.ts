import Docker from 'dockerode';
import { nanoid } from 'nanoid';
import { findOpenPort } from '@flexidb/execa';
import type { DBInfo ,EnvVariable} from './types';
import { createDatabase } from '@flexidb/appwrite';

const docker = new Docker();

export async function pullAndCreateContainer(
  dbInfo: {
    name: string;
    dockerImage: string;
    tag: string;
    ENV: EnvVariable[];
    PORT: number;
  },
): Promise<string> {
  const { dockerImage, tag, ENV, PORT } = dbInfo;
  const selectedTag = tag; // Select the first tag
  console.log(`Selected tag: ${selectedTag}`);
  console.log(`Pulling image: ${dockerImage}:${selectedTag}`);
  await new Promise<void>((resolve, reject) => {
    docker.pull(`${dockerImage}:${selectedTag}`, (error: any, stream: any) => {
      if (error) {
        reject(error);
        return;
      }

      docker.modem.followProgress(stream, (progressError, output) => {
        if (progressError) {
          reject(progressError);
        } else {
          resolve();
        }
      });
    });
  });
  console.log(`Successfully pulled image: ${dockerImage}:${selectedTag}`);

  const openPort = await findOpenPort(PORT,PORT+100);
  if (!openPort) {
    throw new Error('No open ports available.');
  }

 
  console.log(openPort);
  
  const container = await docker.createContainer({
    Image: `${dockerImage}:${selectedTag}`,
    name: dbInfo.name,
    Env: ENV.map((env) => `${env.name}=${env.value}`),
    HostConfig: {
      PortBindings: {
        [`${PORT}/tcp`]: [{ HostPort: openPort.toString() }],
      },
    },
  });

  await container.start();
  const containerId = container.id;
  const dbres=await createDatabase(dbInfo.name,dbInfo.dockerImage,dbInfo.tag,containerId)
  return dbres.$id;

}


export async function getContainerLogs(containerId: string): Promise<string> {
  const container = docker.getContainer(containerId);
  const logs = await container.logs({
    stdout: true,
    stderr: true,
    timestamps: true,
  });

  return logs.toString();
}

export async function stopContainer(containerId: string): Promise<void> {
  const container = docker.getContainer(containerId);
  await container.stop();
}

export async function deleteContainer(containerId: string): Promise<void> {
  const container = docker.getContainer(containerId);
  await container.remove();
}

export async function getContainerStatus(containerNameOrId: string): Promise<string | undefined> {
  try {
    const docker = new Docker();
    const container = docker.getContainer(containerNameOrId);

    const containerInfo = await container.inspect();
    return containerInfo.State?.Status;
  } catch (error) {
    console.error('Error retrieving container status:', error);
    return undefined;
  }
}

export async function getContainerInfo(containerId:string):Promise<any|undefined>{
  try {
    const docker = new Docker();
    const container = docker.getContainer(containerId);

    const containerInfo = await container.inspect();
    return containerInfo;
  } catch (error) {
    console.error('Error retrieving container status:', error);
    return undefined;
  }

}