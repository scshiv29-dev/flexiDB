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

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install node
npm install -g pnpm
pnpm install -w

# Seed Appwrite with Node.js
node /package/appwrite/seed.js

# Retrieve the server IP automatically
ip=$(curl -s http://checkip.amazonaws.com)

# Setup Traefik with user-provided domain or IP
read -p "Enter the domain (leave empty to use IP): " domain

if [[ -z $domain ]]; then
  echo "Using IP address: $ip"
else
  # Add Traefik configuration for the domain and IP
  echo "
  http:
    routers:
      $domain:
        rule: Host(\`$domain\`)
        service: $domain
        tls:
          certResolver: default
          domains:
            - main: $domain
  " >> traefik.yml

  # Install Traefik
  if ! command -v traefik &> /dev/null; then
    echo "Traefik is not installed. Installing Traefik..."
    docker network create traefik_proxy
    docker run -d \
      -v /var/run/docker.sock:/var/run/docker.sock \
      -v $PWD/traefik.yml:/etc/traefik/traefik.yml \
      -p 80:80 -p 443:443 -p 8080:8080 \
      --network traefik_proxy \
      --name traefik \
      traefik:v2.4
  fi
fi

# Save the server IP and domain in .env
echo "SERVER_IP=$ip" >> .env
echo "DOMAIN=$domain" >> .env

# Prompt the user to enter their email address for SSL certificate
read -p "Enter your email address for SSL certificate: " email

# Add SSL configuration to Traefik
echo "
providers:
  docker:
    endpoint: unix:///var/run/docker.sock
    network: traefik_proxy
certificatesResolvers:
  default:
    acme:
      email: $email
      storage: acme.json
      httpChallenge:
        entryPoint: http
" >> traefik.yml

# Restart Traefik to apply SSL configuration
docker restart traefik
