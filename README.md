# Blog API

This is the backend API for the blog project. It provides endpoints for managing posts, comments, users, and authentication.

## Features

- User authentication (passport-jwt)
- CRUD operations for posts and comments
- Admin privileges for managing content
- PostgreSQL database managed using Prisma ORM
- API documentation (e.g., Swagger, Postman collection)

## Tech Stack

- Node.js, Express.js
- Prisma ORM
- PostgreSQL
- JWT for authentication
- CORS for cross-origin access

## Installation

1. Clone the repository
2. Install dependencies: npm install
3. Set up environment variables (.env file): SECRET and DATABASE_URL
4. Run database migration: npx prisma migrate dev
5. Start the API server: node app.js
