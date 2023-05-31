const Docker = require('dockerode');

async function pullImages(imageList) {
  const docker = new Docker();

  for (const imageName of imageList) {
    console.log(`Pulling image: ${imageName}`);
    await new Promise((resolve, reject) => {
      docker.pull(imageName, (error, stream) => {
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
    console.log(`Successfully pulled image: ${imageName}`);
  }

  console.log('All images pulled successfully!');
}

  const main=async()=>{
    await pullImages(["postgres:latest","mongo:latest","redis:latest","mysql:latest","mariadb:lts","couchdb:latest"]);
    console.log("Docker Seeding Done");
  }

  main();