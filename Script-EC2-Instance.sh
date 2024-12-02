# Update and install Docker
sudo apt update -y
sudo apt install -y docker.io

# Start Docker and enable it to run on boot
sudo systemctl start docker
sudo systemctl enable docker

# Add the current user to the Docker group
sudo usermod -aG docker $USER
newgrp docker

# Pull and run the backend Docker image
docker pull sazit96/todo-backend:latest
docker run -d -p 5000:5000 --name backend-container sazit96/todo-backend:latest

# Pull and run the frontend Docker image
docker pull sazit96/todo-frontend:latest
docker run -d -p 80:80 --name frontend-container sazit96/todo-frontend:latest
