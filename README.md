# 🚀 Highly Available Containerized To-Do Application

## Overview

This project demonstrates a robust, highly available To-Do application deployed on AWS, showcasing containerization, microservices architecture, and cloud infrastructure best practices.

## 🏗️ Architecture Overview

### System Design Highlights

- **Frontend**: React application served via Nginx in Docker containers
- **Backend**: Node.js RESTful API containerized and scalable
- **Infrastructure**: Multi-instance EC2 deployment
- **Load Balancing**: AWS Application Load Balancer for traffic distribution and high availability

## 🛠️ Technologies Used

### Frontend

- React (v18+)
- Nginx (alpine)
- Docker

### Backend

- Node.js (v18+)
- Express.js
- Docker

### Infrastructure

- AWS EC2 (Ubuntu 20.04)
- AWS Application Load Balancer
- Docker (v20.10+)

## 📋 Prerequisites

Before you begin, ensure you have:

- AWS Account with necessary permissions
- Installed:
  - Node.js (v18+)
  - Docker (v20.10+)
  - AWS CLI (v2)

## 🚀 Deployment Steps

### 1. Build Docker Images

#### Frontend

```bash
docker build -t todo-frontend ./todo-frontend
docker tag todo-frontend your-docker-hub-id/todo-frontend
docker push your-docker-hub-id/todo-frontend
```

#### Backend

```bash
docker build -t todo-backend ./todo-backend
docker tag todo-backend your-docker-hub-id/todo-backend
docker push your-docker-hub-id/todo-backend
```

### 2. Deploy to EC2

1. Launch EC2 Instances (Ubuntu 20.04)
2. Run Docker installation script

```bash
sudo bash Script-EC2-Instance.sh
```

3. Verify deployment

```bash
docker ps
```

### 3. Configure Application Load Balancer

- Create ALB via AWS Console/CLI
- Add Target Groups:
  - Frontend: Route traffic to frontend EC2 instances
  - Backend: Route traffic to backend EC2 instances
- Configure Health Checks:
  - Frontend: HTTP on port 80
  - Backend: HTTP on port 5000

## 🔄 Replication Steps

1. Clone the repository

```bash
git clone https://github.com/sazit96/Highly-Available-Containerized-ToDo-App
```

2. Build and push Docker images (see Deployment Steps)

3. Deploy on EC2 and configure ALB using provided scripts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Contact

- sazitislam96@gmail.com
