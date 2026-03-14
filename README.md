# Cloud Console Portfolio

A full-stack serverless portfolio application styled as a cloud infrastructure management console. Built with React 19, Java 21 Lambdas, and AWS CDK — hosted entirely on AWS.

## Architecture

```
CloudFront (CDN)
  └─ S3 (static site) ── React SPA

API Gateway (HTTP API, public)
  ├─ GET /experiences  → Lambda → DynamoDB
  ├─ GET /projects     → Lambda → DynamoDB
  └─ GET /cv           → Lambda → S3 (pre-signed URL)

API Gateway (REST API, admin)  ←  Cognito JWT authorizer
  ├─ POST/PUT /experiences → Lambda → DynamoDB
  └─ POST/PUT /projects    → Lambda → DynamoDB
```

## Project Structure

```
portfolio/
├── frontendv3/          React 19 + TypeScript + Vite SPA
├── services/
│   └── api/
│       ├── admin/       Admin CRUD Lambda handlers (Java 21)
│       ├── experiences/ Public experiences + CV download Lambdas (Java 21)
│       └── projects/    Public projects Lambda (Java 21)
├── infra/               AWS CDK stacks (Java)
│   └── openapi/         OpenAPI spec for admin API
└── scripts/             Python seed scripts (boto3)
```

## Tech Stack

| Layer          | Technologies                                      |
| -------------- | ------------------------------------------------- |
| Frontend       | React 19, Vite 6, TypeScript 5.8, Recharts        |
| Backend        | Java 21, Maven, AWS Lambda, Jackson                |
| Infrastructure | AWS CDK 2.x (Java), CloudFormation                 |
| AWS Services   | DynamoDB, S3, CloudFront, API Gateway, Lambda, Cognito |

## Prerequisites

- **Node.js** (LTS) & npm
- **Java 21** (e.g. Amazon Corretto)
- **Maven** 3.x
- **AWS CLI** configured with credentials
- **AWS CDK CLI** (`npm install -g aws-cdk`)
- **Python 3** + boto3 (for seed scripts)

## Build & Deploy

### Frontend

```bash
cd frontendv3
npm install
npm run dev      # local dev server on port 3000
npm run build    # production build → dist/
```

### Services

```bash
cd services/api/experiences
mvn package      # → target/experiences.jar

cd ../projects
mvn package      # → target/projects.jar

cd ../admin
mvn package      # → target/admin.jar
```

### Infrastructure

```bash
cd infra
cdk synth        # synthesize CloudFormation templates
cdk deploy --all # deploy all stacks
```

### Seed Data

```bash
cd scripts
pip install -r requirements.txt
python seed_experiencess.py
```

## CDK Stacks

| Stack            | Resources                                                        |
| ---------------- | ---------------------------------------------------------------- |
| PortfolioStack   | DynamoDB tables, S3 CV bucket, public Lambdas, HTTP API Gateway  |
| FrontendStack    | S3 static site bucket, CloudFront distribution, ACM certificate  |
| AdminApiStack    | Admin Lambdas, REST API Gateway, Cognito User Pool + authorizer  |
