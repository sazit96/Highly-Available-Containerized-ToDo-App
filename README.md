Highly Available To-Do Application 🚀
This project demonstrates the deployment of a highly available, containerized To-Do application on AWS. The application includes a React-based frontend and a Node.js backend, deployed on multiple EC2 instances, with fault tolerance and scalability achieved using an Application Load Balancer (ALB).

Architecture Overview
System Design Overview
The system is designed to ensure high availability and fault tolerance:

Frontend: React application served using Nginx, running in Docker containers.
Backend: Node.js RESTful API served in Docker containers.
Infrastructure:
Multiple EC2 instances hosting the frontend and backend containers.
ALB for distributing traffic and ensuring system availability even during failures.

Steps for Deployment 🛠️
Prerequisites
AWS Account: Ensure you have permissions to create EC2 instances and ALB.
Installed Tools:
Node.js (v18+)
Docker (v20.10+)
AWS CLI (v2)
Step 1: Build and Push Docker Images
Frontend:
bash
Copy code
docker build -t todo-frontend ./todo-frontend
docker tag todo-frontend sazit96/todo-frontend
docker push sazit96/todo-frontend
Backend:
bash
Copy code
docker build -t todo-backend ./todo-backend
docker tag todo-backend sazit96/todo-backend
docker push sazit96/todo-backend
Step 2: Deploy Dockerized Applications to EC2
Launch EC2 Instances:
Use the AWS Management Console or CLI.
Choose Ubuntu 20.04 as the AMI.
Setup Docker on EC2 Instances:
Run the provided Script-EC2-Instance.sh to install Docker and deploy the containers.
bash
Copy code
sudo bash Script-EC2-Instance.sh
Verify Deployment:
bash
Copy code
docker ps
Step 3: Set Up Application Load Balancer
Create an ALB via the AWS Console or CLI.

Add Target Groups for:

Frontend: Route traffic to EC2 instances running the frontend.
Backend: Route traffic to EC2 instances running the backend.
Configure Health Checks:

For frontend: HTTP on port 80.
For backend: HTTP on port 5000.
Test ALB: Access the ALB DNS in your browser to verify functionality.

Replication Steps 🔄
Follow these steps to replicate the project:

Clone the Repository:
bash
Copy code
git clone <https://github.com/sazit96/Highly-Available-Containerized-ToDo-App>
Build Docker Images:
bash
Copy code
docker build -t todo-frontend ./todo-frontend
docker build -t todo-backend ./todo-backend
Push Images to Docker Hub:
bash
Copy code
docker tag todo-frontend your-docker-hub-id/todo-frontend
docker push your-docker-hub-id/todo-frontend
docker tag todo-backend your-docker-hub-id/todo-backend
docker push your-docker-hub-id/todo-backend
Deploy on EC2 and Configure ALB:
Use the provided scripts and follow the setup steps.
Dependencies and Tools 📦
Frontend:
React (v18+)
Nginx (alpine)
Backend:
Node.js (v18+)
Express.js
Infrastructure:
AWS EC2 (Ubuntu 20.04)
AWS ALB
Docker (v20.10+)
