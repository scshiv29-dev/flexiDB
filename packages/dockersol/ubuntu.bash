#!/bin/bash

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add the current user to the "docker" group to enable Docker operations without sudo
sudo usermod -aG docker $USER

# Install Traefik
docker run -d \
  -p 80:80 \
  -p 8080:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $PWD/traefik.yml:/etc/traefik/traefik.yml \
  --name traefik \
  --restart always \
  traefik:v2.4

# Open ports 9000-9100 in the firewall
sudo ufw allow 9000:9100/tcp

# Enable and start the firewall
sudo ufw enable

# Display Docker and Traefik versions
docker version
docker exec traefik traefik version
