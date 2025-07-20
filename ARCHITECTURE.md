🧭 System Overview
This project uses a microservices architecture split into:

🧑‍💻 User Service – Authentication, JWT issuance, and Redis-based caching

📁 File Service – Secure, scalable multipart file uploads to AWS S3

🧵 Shared Infra – MongoDB, Redis, and AWS S3

📊 System Diagram

 +------------+       +------------+       +------------------+
 |            |       |            |       |                  |
 |   Client   +<----->+  API GW /  +<----->+  User Service     |
 | (Postman)  |       |  NGINX     |       | (JWT, Mongo, Redis)|
 |            |       |            |       |                  |
 +------------+       +------------+       +---------+--------+
                                                      |
                                                      v
                                         +------------+------------+
                                         |                         |
                                         |     File Service        |
                                         | (Multipart + AWS S3)    |
                                         +------------+------------+
                                                      |
                                                      v
                                            +-------------------+
                                            |      AWS S3       |
                                            +-------------------+


🧩 Components
✅ Auth/User Service
Handles:

/register

/login

/refresh

/me

Uses:

JWT for stateless auth

Redis for token and profile caching

MongoDB for storing user info

📁 File Service
Handles:

/initiate (multipart upload initiation)

/complete (merge parts)

/files/:id (presigned GET URL)

Uses:

AWS S3 (multipart upload)

JWT for auth

MongoDB for file metadata

🔄 Data Flow
POST /user/register → MongoDB stores user

POST /user/login → JWT issued

GET /user/me → Redis cache used if available

POST /files/initiate → AWS S3 createMultipartUpload

Client uploads parts using presigned URLs

POST /files/complete → S3 completeMultipartUpload

GET /files/:id → Returns presigned GET URL

💡 Tech Choices
Component	Why?
JWT	Stateless, scalable auth across services
Redis TTL	Fast lookup & caching with time-bound freshness
MongoDB	Flexible schema, rapid iteration
S3 Multipart Upload	Efficient large file uploads (supports up to 5TB)
Presigned URLs	Offload actual file transfers to S3, keeping backend stateless

🔐 Security & 🔁 Scalability
🔒 Security
JWT Signing: HMAC SHA-256 (HS256), stored securely in .env

Key Rotation: Can implement rotating secrets + refresh token strategy

Redis: Secured with password; can use TLS

MongoDB: Unique indexes on email/userId

S3 Policies:

Limit access to specific actions (uploadPart, getObject, complete)

Presigned URLs with expiration (1–15 min)

📈 Scaling
Horizontally scalable services via containerization (Docker, K8s)

Redis Clustering: Scales cache horizontally

MongoDB Replica Set: For read-heavy workloads

S3: Auto-scales storage and bandwidth


