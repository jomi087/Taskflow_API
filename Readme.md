TaskFlow API - CI/CD with GitHub Actions, PM2 & AWS EC2
Overview

This project demonstrates the implementation of a complete CI/CD pipeline for a Node.js application using GitHub Actions, PM2, and AWS EC2.

The goal is to automate:

Code Testing (Continuous Integration)
Application Deployment (Continuous Deployment)
Server Process Management using PM2

Whenever code is pushed to the main branch, GitHub Actions automatically deploys the latest version of the application to an EC2 instance.

Tech Stack
Node.js
Express.js
Jest
Supertest
GitHub Actions
AWS EC2
PM2
CI/CD Workflow
Developer Pushes Code
        ↓
GitHub Actions Triggered
        ↓
Install Dependencies
        ↓
Run Automated Tests
        ↓
SSH Into EC2
        ↓
Pull Latest Code
        ↓
Install Dependencies
        ↓
Restart Application Using PM2
Continuous Integration (CI)

The CI pipeline automatically runs whenever:

A Pull Request is created for the main branch
Code is pushed to the main branch
CI Steps
Checkout Repository
Setup Node.js Environment
Install Dependencies
Run Test Cases

Example Workflow:

name: CI Pipeline

on:
  pull_request:
    branches:
      - main

  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - run: npm install

      - run: npm test
Automated Testing

Testing is implemented using:

Jest
Supertest

Example:

import request from "supertest";
import { app } from "./app.js";

describe("POST /tasks", () => {
  test("should create task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Learn CI/CD",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });
});

The tests validate application functionality before deployment.

Continuous Deployment (CD)

Once all tests pass, GitHub Actions automatically deploys the latest version to AWS EC2.

Deployment includes:

git pull origin main
npm install
pm2 restart taskflow_api
GitHub Secrets

The following repository secrets are required:

Secret	Description
EC2_HOST	Public IP of EC2 Instance
EC2_USERNAME	SSH Username (ubuntu)
EC2_PRIVATE_KEY	Contents of PEM File

Location:

Repository
└── Settings
    └── Secrets and Variables
        └── Actions
Deployment Workflow
name: Deploy to EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy Application
        uses: appleboy/ssh-action@v1.0.3

        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USERNAME }}
          key: ${{ secrets.EC2_PRIVATE_KEY }}

          script: |
            cd /home/ubuntu/taskflow-api

            git pull origin main

            npm install

            # Uncomment for TypeScript Projects
            # npm run build

            pm2 restart taskflow_api
Initial Server Setup

Before automated deployments can work, the EC2 server must be configured once.

Install Node.js
sudo apt update
sudo apt install nodejs npm -y
Install PM2
npm install -g pm2
Clone Repository
git clone <repository-url>
Install Dependencies
npm install
Start Application
pm2 start server.js --name taskflow_api
PM2 Commands
View Running Applications
pm2 list
View Logs
pm2 logs taskflow_api
Restart Application
pm2 restart taskflow_api
Stop Application
pm2 stop taskflow_api
Project Structure
.
├── .github
│   └── workflows
│       ├── ci.yml
│       └── deploy.yml
│
├── src
│   ├── app.js
│   ├── server.js
│   └── routes
│
├── tests
│   └── task.test.js
│
├── package.json
└── README.md
Learning Outcomes

Through this project, the following concepts were implemented and understood:

Continuous Integration (CI)
Continuous Deployment (CD)
GitHub Actions Workflows
Automated Testing with Jest
Automated Deployment using SSH
AWS EC2 Hosting
PM2 Process Management
GitHub Secrets Management
Production Deployment Workflow
Author

Developed as a hands-on learning project to understand real-world CI/CD workflows using Node.js, GitHub Actions, PM2, and AWS EC2.