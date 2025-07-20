## Node JS Assignment

# ⚙️ Microservices Project: User & File Service

This project contains two Node.js microservices:

1. **User Service** – Handles user registration, login, and profile retrieval (with Redis caching).
2. **File Service** – Handles file uploads to AWS S3 using multipart upload (supports up to 2GB). 

---

## 📦 Requirements

- Node.js (>= 16.x)
- MongoDB (Cloud or local instance)
- Redis (Cloud or local instance)
- AWS Account with S3 bucket access

---

## 🔧 Prerequisites

Set the following environment variables in a `.env` file inside each service directory:

### ENV (for File Service):

AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=your_aws_region
AWS_BUCKET=your_s3_bucket_name
PORT = desired_port
MONGO_URI = connection_url
JWT_SECRET = secret_value


### ENV (for User Service):

REDIS_HOST = your_host
REDIS_PORT = your_port
REDIS_PASSWORD = your_password
PORT = desired_port
MONGO_URI = connection_url
JWT_SECRET = secret_value

## 🚀 How to Run

### User Service

```bash
cd user-service
npm install
npm run dev 

### File Service

cd file-service
npm install
npm run dev 

## 🧪 User Service

| Method | Endpoint             | Protected | Description                     |
| ------ | -------------------- | --------- | ------------------------------- |
| POST   | `/api/user/register` | ❌         | Register a new user             |
| POST   | `/api/user/login`    | ❌         | Login & get JWT token           |
| GET    | `/api/user/me`       | ✅         | Fetch user profile with caching |
| POST   | `/api/user/refresh`  | ✅         | Refresh token                   |
| GET    | `/health`            | ❌         | Health check endpoint           |

> 🔐 Protected routes require `Authorization: Bearer <token>`

---

## 🧪 File Service

| Method | Endpoint              | Protected | Description                              |
| ------ | --------------------- | --------- | ---------------------------------------- |
| POST   | `/api/files/initiate` | ✅         | Initiate multipart file upload           |
| POST   | `/api/files/complete` | ✅         | Complete multipart upload                |
| GET    | `/api/files/:fileId`  | ✅         | Fetch file by ID (returns presigned URL) |
| GET    | `/health`             | ❌         | Health check endpoint                    |


**Commands:**
To start the project. Use below cmd.
`npm run dev`


## 📦 Tech Stack

- express
- mongoose
- bcryptjs
- jsonwebtoken
- joi
- multer
- dotenv
- nodemon

---

## 🧼 Custom Response Format

- `res.sendSucess(statusCode, message, data)`
- `res.sendError(statusCode, error, req)`

---

## 📜 License
MIT
