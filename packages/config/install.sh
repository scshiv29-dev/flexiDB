#!/bin/bash

# Function to generate a random 10-digit value for USERID
generateUserID() {
  echo $((RANDOM % 9000000000 + 1000000000))
}

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
  docker pull traefik:v2.4
fi


# Check if the Docker network traefik_proxy exists, and create if necessary
if ! docker network inspect traefik_proxy &> /dev/null; then
  echo "Creating Docker network traefik_proxy..."
  docker network create traefik_proxy
fi

# Start Traefik container
echo "Starting Traefik container..."
docker run -d -p 80:80 -p 443:443 --name traefik --network traefik_proxy -v $PWD/traefik.yml:/etc/traefik/traefik.yml -v $PWD/acme.json:/acme.json traefik:v2.4

# Open ports 9000-9100
echo "Opening ports 9000-9100..."
iptables -A INPUT -p tcp --dport 9000:9100 -j ACCEPT

# Prompt the user to choose default or custom values for environment variables

# Pull the code from git
git clone https://github.com/scshiv29-dev/flexiDB.git
cd flexiDB
touch .env

# Function to prompt for custom values and trim whitespace
promptCustomValue() {
  read -p "Enter the value for $1: " value < /dev/tty
  trimmedValue=$(echo $value | tr -d '[:space:]')
  echo "$1=$trimmedValue" >> .env
}

# Prompt the user for ENV values
echo "Enter  values for environment variables..." < /dev/tty

# Prompt for USERID (with random 10-digit value)
randomUserID=$(generateUserID)
echo "Generated random USERID: $randomUserID"
echo "USERID=$randomUserID" >> .env

promptCustomValue "APPWRITE_URL"
promptCustomValue "APPWRITE_PROJECT_ID"
promptCustomValue "APPWRITE_API_KEY"
promptCustomValue "APPWRITE_DB_ID"
promptCustomValue "APPWRITE_DB_COLLECTION_DB_ID"

read -p "Enter your email address: " email < /dev/tty
echo "USER_EMAIL=$email" >> .env

read -p "Enter your phone number (include country code): " phone < /dev/tty
echo "USER_PHONE=$phone" >> .env

read -p "Enter your password: " password < /dev/tty
echo "USER_PASSWORD=$password" >> .env

read -p "Enter your name: " name < /dev/tty
echo "USER_NAME=$name" >> .env

# Install Node.js and modules
# Assuming you're using Node Version Manager (NVM)

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install node
npm install -g pnpm
pnpm install
pnpm build
pnpm start

# Seed Appwrite with Node.js
node /packages/appwrite/seed.js

# Retrieve the server IP automatically
ip=$(curl -s http://checkip.amazonaws.com)

# Setup Traefik with user-provided domain or IP
read -p "Enter the domain (leave empty to use IP): " domain < /dev/tty

if [[ -z $domain ]]; then
  # Use IP as the domain
  domain=$ip
else
  # Add Traefik configuration for the domain
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
fi

# Save the server IP in .env
echo "SERVER_IP=$ip" >> .env

# Prompt the user to enter their email address for SSL certificate
read -p "Enter your email address for SSL certificate: " email < /dev/tty

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
