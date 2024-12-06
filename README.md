<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Highly Available To-Do Application</title>
</head>
<body>
    <header>
        <h1>Highly Available To-Do Application 🚀</h1>
    </header>

    <section>
        <h2>Project Overview</h2>
        <p>This project demonstrates the deployment of a highly available, containerized To-Do application on AWS. The application includes a React-based frontend and a Node.js backend, deployed on multiple EC2 instances, with fault tolerance and scalability achieved using an Application Load Balancer (ALB).</p>
    </section>

    <section>
        <h2>Architecture Overview</h2>
        <h3>System Design Overview</h3>
        <p>The system is designed to ensure high availability and fault tolerance:</p>
        <ul>
            <li><strong>Frontend:</strong> React application served using Nginx, running in Docker containers.</li>
            <li><strong>Backend:</strong> Node.js RESTful API served in Docker containers.</li>
            <li><strong>Infrastructure:</strong> Multiple EC2 instances hosting the frontend and backend containers, with ALB for distributing traffic and ensuring availability even during failures.</li>
        </ul>

    </section>

    <section>
        <h2>Steps for Deployment 🛠️</h2>
        <h3>Prerequisites</h3>
        <ul>
            <li><strong>AWS Account:</strong> Ensure you have permissions to create EC2 instances and ALB.</li>
            <li><strong>Installed Tools:</strong>
                <ul>
                    <li>Node.js (v18+)</li>
                    <li>Docker (v20.10+)</li>
                    <li>AWS CLI (v2)</li>
                </ul>
            </li>
        </ul>

        <h3>Step 1: Build and Push Docker Images</h3>
        <h4>Frontend:</h4>
        <pre><code>docker build -t todo-frontend ./todo-frontend

docker tag todo-frontend sazit96/todo-frontend
docker push sazit96/todo-frontend</code></pre>

        <h4>Backend:</h4>
        <pre><code>docker build -t todo-backend ./todo-backend

docker tag todo-backend sazit96/todo-backend
docker push sazit96/todo-backend</code></pre>

        <h3>Step 2: Deploy Dockerized Applications to EC2</h3>
        <h4>Launch EC2 Instances:</h4>
        <p>Use the AWS Management Console or CLI to launch EC2 instances with Ubuntu 20.04 as the AMI.</p>

        <h4>Setup Docker on EC2 Instances:</h4>
        <pre><code>sudo bash Script-EC2-Instance.sh</code></pre>

        <h4>Verify Deployment:</h4>
        <pre><code>docker ps</code></pre>

        <h3>Step 3: Set Up Application Load Balancer</h3>
        <p>Create an ALB via the AWS Console or CLI. Add Target Groups:</p>
        <ul>
            <li><strong>Frontend:</strong> Route traffic to EC2 instances running the frontend.</li>
            <li><strong>Backend:</strong> Route traffic to EC2 instances running the backend.</li>
        </ul>
        <p>Configure Health Checks:</p>
        <ul>
            <li><strong>Frontend:</strong> HTTP on port 80.</li>
            <li><strong>Backend:</strong> HTTP on port 5000.</li>
        </ul>
        <p>Test the ALB by accessing its DNS in your browser to verify functionality.</p>
    </section>

    <section>
        <h2>Replication Steps 🔄</h2>
        <p>To replicate this project, follow these steps:</p>
        <h3>Clone the Repository:</h3>
        <pre><code>git clone https://github.com/sazit96/Highly-Available-Containerized-ToDo-App</code></pre>

        <h3>Build Docker Images:</h3>
        <pre><code>docker build -t todo-frontend ./todo-frontend

docker build -t todo-backend ./todo-backend</code></pre>

        <h3>Push Images to Docker Hub:</h3>
        <pre><code>docker tag todo-frontend your-docker-hub-id/todo-frontend

docker push your-docker-hub-id/todo-frontend
docker tag todo-backend your-docker-hub-id/todo-backend
docker push your-docker-hub-id/todo-backend</code></pre>

        <h3>Deploy on EC2 and Configure ALB:</h3>
        <p>Use the provided scripts and follow the setup steps in the repository.</p>
    </section>

    <section>
        <h2>Dependencies and Tools 📦</h2>
        <h3>Frontend:</h3>
        <ul>
            <li>React (v18+)</li>
            <li>Nginx (alpine)</li>
        </ul>

        <h3>Backend:</h3>
        <ul>
            <li>Node.js (v18+)</li>
            <li>Express.js</li>
        </ul>

        <h3>Infrastructure:</h3>
        <ul>
            <li>AWS EC2 (Ubuntu 20.04)</li>
            <li>AWS ALB</li>
            <li>Docker (v20.10+)</li>
        </ul>
    </section>

</body>
</html>
