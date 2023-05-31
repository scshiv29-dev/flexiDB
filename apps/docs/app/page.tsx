import { Button, Header } from "@flexidb/ui";

export default function Page() {
  return (
    <>
      <Header/>
      <Button />
      <code>
      #!/bin/bash

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add the current user to the 'docker' group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Allow incoming traffic on ports 1100-9000
sudo ufw allow 1100:9000/tcp

# Restart Docker service
sudo systemctl restart docker

# Display Docker and Docker Compose versions
docker version
docker-compose version

      </code>
    </>
  );
}
