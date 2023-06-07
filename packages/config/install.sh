#!/bin/bash

# Check if Git is installed, and install if necessary
if ! command -v git &> /dev/null; then
  echo "Git is not installed. Installing Git..."
  apt-get update
  apt-get install -y git
fi

# Check if Docker is installed, and install if necessary
if ! command -v docker &> /dev/null; then
  echo "Docker is not installed. Installing Docker..."
  apt-get update
  apt-get install -y docker.io
fi

# Check if Traefik is installed, and install if necessary
if ! command -v traefik &> /dev/null; then
  echo "Traefik is not installed. Installing Traefik..."
  docker network create traefik_proxy
  docker run -d \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v $PWD/traefik.yml:/etc/traefik/traefik.yml \
    -p 80:80 -p 8080:8080 \
    --network traefik_proxy \
    --name traefik \
    traefik:v2.4
fi

# Open ports 9000-9100
echo "Opening ports 9000-9100..."
iptables -A INPUT -p tcp --dport 9000:9100 -j ACCEPT

# Prompt the user to choose default or custom values for environment variables
read -p "Do you want to use default values for environment variables? (Y/N): " useDefault

# Function to prompt for custom values
promptCustomValues() {
  read -p "Enter the value for $1: " value
  echo "$1=$value" >> .env
}

if [[ $useDefault =~ ^[Yy]$ ]]; then
  # Use default values for environment variables
  echo "Using default values for environment variables..."
  
  echo "APPWRITE_URL=https://cloud.appwrite.io/v1" >> .env
  echo "APPWRITE_PROJECT_ID=flexidb" >> .env
  echo "APPWRITE_API_KEY=e2e07610b030bc960f14b7959ed63f424ee8e135cef0fa4b39969e5c0083c48cb5ed4c4a28584de94db2f929bf1945e17b5d78a5392504ae0582de3c1e1500b06c8f12e9c4cc6054abbfa13026ae97dfbd6beb86262e014817a8c348eb21b940946a197e78ecc1aa0b58ead812322988f6aec9246a06bfe3a093d72702071f30" >> .env
  echo "APPWRITE_DB_ID=appwrite-flexiDB" >> .env
  echo "APPWRITE_DB_COLLECTION_DB_ID=flexiDB-databses" >> .env
else
  # Prompt the user for custom values
  echo "Enter custom values for environment variables..."
  
  promptCustomValues "APPWRITE_URL"
  promptCustomValues "APPWRITE_PROJECT_ID"
  promptCustomValues "APPWRITE_API_KEY"
  promptCustomValues "APPWRITE_DB_ID"
  promptCustomValues "APPWRITE_DB_COLLECTION_DB_ID"
fi

# Pull the code from git
git clone https://github.com/scshiv29-dev/flexiDB.git && cd flexiDB

# Install Node.js and modules
# Assuming you're using Node Version Manager (NVM)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install node
npm install -g pnpm
pnpm install

# Seed Appwrite with Node.js
node /package/appwrite/seed.js

# Setup Traefik with user-provided domain and IP
read -p "Enter the domain: " domain
read -p "Enter the IP address: " ip

# Add Traefik configuration for the domain and IP
echo "
http:
  routers:
    $domain:
      rule: Host(\`$domain\`)
      service: $domain
  services:
    $domain:
      loadBalancer:
        servers:
          - url: http://$ip:3000
" >> traefik.yml

# Save the server IP in .env
echo "SERVER_IP=$ip" >> .env
