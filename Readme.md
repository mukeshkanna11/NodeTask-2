# User Authentication with JWT

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication

## Setup

1. Clone the repository.
2. Install dependencies:
3. Create a `.env` file with the following:

## env
mongodb+srv://agriculturistmukesh11:Mukeshkanna%4011@atlas.gdo2x.mongodb.net/register
JWT_SECRET=your_jwt_secret_key

## API Endpoints//

## Register User

POST /api/auth/register
Request body: { username, email, password }
Response: { message: "User registered successfully", user }

## Login User
POST /api/auth/login
Request body: { email, password }
Response: { message: "Login successful", token }

## Get User Info (Protected Route)
GET /api/auth/user
Headers: { Authorization: Bearer <JWT-TOKEN> }
Response: { _id, username, email }

## Detailed documentation for each API endpoint in Postman
https://documenter.getpostman.com/view/38564093/2sAYBRGttf
