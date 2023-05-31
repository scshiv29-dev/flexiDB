import {execa }from 'execa';

export async function findOpenPort(startPort: number, endPort: number): Promise<number> {
  for (let port = startPort; port <= endPort; port++) {
    try {
      await execa('lsof', ['-i', `:${port}`]);
    } catch (error) {
      return port; // Port is not in use, return it
    }
  }
  throw new Error('No open ports available');
}

const startPort = 1100;
const endPort = 9000;

findOpenPort(startPort, endPort)
  .then((port) => {
    console.log(`Open port found: ${port}`);
  })
  .catch((error) => {
    console.error(error.message);
  });
