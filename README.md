<div align="center">

# ProLink

### A professional discovery and hiring platform for showcasing talent, portfolios, and opportunity-ready profiles.

![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=111111)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-111111?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

---

## Overview

**ProLink** is a full-stack professional hiring page built to help people discover, evaluate, and connect with skilled professionals across multiple industries. The current product direction focuses on Nigeria-based talent discovery, with profile browsing, portfolio presentation, filtering, dashboards, authentication, and password recovery foundations already taking shape.

The project is organized as a modern split application:

- `frontend`: a Vite + React interface for browsing professionals, viewing profiles, and managing profile content.
- `backend`: an Express + TypeScript API for authentication, secure sessions, profile-ready account models, email flows, and API documentation.

---

## Current Highlights

| Area | What Exists So Far |
| --- | --- |
| Talent discovery | Home page, featured professionals, category browsing, search-first presentation |
| Explore flow | Filterable professionals list by name/title, location, skill, and availability |
| Profile pages | Public profile pages with portfolio, about, reviews, social/contact actions, and availability signals |
| Dashboard | Profile editor, portfolio project form, skills management, and settings panels |
| Authentication API | Signup, login, signout, refresh token, current profile, forgot password, and reset password routes |
| Security basics | HTTP-only cookies, JWT access/refresh tokens, bcrypt password hashing, Redis-backed refresh token storage |
| API docs | Swagger UI mounted at `/api-docs` in the backend server |

---

## Tech Stack

### Frontend

- **React 18**
- **Vite 6**
- **TypeScript**
- **React Router**
- **Tailwind CSS 4**
- **Radix UI primitives**
- **Lucide React icons**
- **MUI packages**
- **Sonner, Recharts, Motion, Vaul**, and other UI-support libraries

### Backend

- **Node.js**
- **Express 5**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT authentication**
- **bcrypt password hashing**
- **Upstash Redis**
- **Nodemailer**
- **Swagger JSDoc + Swagger UI**
- **cookie-parser + CORS**

---

## Project Structure

```text
.
|-- backend
|   |-- src
|   |   |-- controllers
|   |   |   `-- auth.controller.ts
|   |   |-- lib
|   |   |   |-- db.ts
|   |   |   |-- email.ts
|   |   |   `-- redis.ts
|   |   |-- middlewares
|   |   |   `-- auth.middleware.ts
|   |   |-- models
|   |   |   `-- user.model.ts
|   |   |-- routes
|   |   |   `-- auth.route.ts
|   |   |-- types
|   |   |   `-- express.d.ts
|   |   `-- index.ts
|   |-- package.json
|   `-- tsconfig.json
|
|-- frontend
|   |-- src
|   |   |-- app
|   |   |   |-- components
|   |   |   |-- data
|   |   |   |-- pages
|   |   |   |-- App.tsx
|   |   |   `-- routes.ts
|   |   |-- styles
|   |   `-- main.tsx
|   |-- package.json
|   `-- vite.config.ts
|
`-- README.md
```

---

## Getting Started

### Prerequisites

Install these before running the app locally:

- **Node.js** 20 or newer
- **npm** or **pnpm**
- A **MongoDB** database connection string
- An **Upstash Redis** REST database
- SMTP credentials for password reset emails

---

## Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token

SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password
EMAIL_FROM="ProLink <no-reply@example.com>"
```

> Keep real secrets out of version control. The values above are placeholders only.

---

## Installation

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

---

## Running Locally

Start the backend API:

```bash
cd backend
npm run dev
```

The API runs on:

```text
http://localhost:5000
```

Swagger documentation is available at:

```text
http://localhost:5000/api-docs
```

Start the frontend:

```bash
cd frontend
npm run dev
```

The frontend usually runs on:

```text
http://localhost:5173
```

---

## Available Scripts

### Backend

| Command | Description |
| --- | --- |
| `npm run dev` | Runs the Express API with `tsx watch` |
| `npm start` | Starts the compiled app from `dist/index.js` |
| `npm test` | Placeholder test command |

### Frontend

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the frontend for production |

---

## API Reference

Base route:

```text
/api/v1/auth
```

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| `POST` | `/signup` | Create a new account | Public |
| `POST` | `/login` | Sign in and set access/refresh cookies | Public |
| `POST` | `/signout` | Clear auth cookies and revoke stored refresh token | Cookie |
| `POST` | `/refresh-token` | Issue a new access token using a valid refresh token | Cookie |
| `GET` | `/getProfile` | Return the current authenticated user | Cookie |
| `POST` | `/forgot-password` | Send a password reset link when an account exists | Public |
| `POST` | `/reset-password/:token` | Reset password with a valid reset token | Public |

For interactive documentation, run the backend and open:

```text
http://localhost:5000/api-docs
```

---

## Data Model Snapshot

The backend currently defines three main MongoDB models:

| Model | Purpose |
| --- | --- |
| `Account` | Core identity, role, status, password hash, reset fields, and timestamps |
| `ProfessionalProfile` | Public-facing professional data such as title, bio, skills, services, reviews, projects, social links, CTA, and verification metadata |
| `AdminProfile` | Admin-specific profile data such as permissions and department |

Supported roles:

```text
superAdmin | admin | professional
```

Supported account statuses:

```text
active | disabled | pending
```

---

## Frontend Routes

| Route | Screen |
| --- | --- |
| `/` | Home page with search, featured professionals, and categories |
| `/explore` | Filterable professionals directory |
| `/profile/:id` | Public professional profile |
| `/dashboard` | Profile and portfolio management dashboard |
| `*` | Not found page |

---

## Security Notes

- Passwords are hashed with **bcrypt** before storage.
- Access and refresh tokens are delivered through **HTTP-only cookies**.
- Refresh tokens are stored in **Upstash Redis** with a 7-day expiry.
- Password reset tokens are generated with `crypto`, hashed before storage, and checked against an expiry timestamp.
- CORS is configured to allow the configured client URL and credentials.

---

## Roadmap Ideas

This project already has a strong base. Natural next steps include:

- Connect frontend auth screens to the backend auth API.
- Replace mock professional data with API-backed professional profile endpoints.
- Add profile creation and editing APIs for professionals.
- Add admin moderation flows for profile approval and verification.
- Add validation middleware for request bodies.
- Add automated tests for authentication, password reset, and protected routes.
- Add production build scripts for the backend TypeScript output.

---

## Development Notes

- The frontend currently uses local mock data from `frontend/src/app/data/mockData.ts`.
- Backend authentication is already route-based and documented with OpenAPI comments.
- The backend expects cookies for protected auth flows, so frontend requests should use credentials when calling the API.
- The backend `start` script expects compiled JavaScript in `dist`, but no build script is currently defined in `backend/package.json`.

---

## Author

Built by **Eolabode** as a professional hiring and talent discovery platform.

---

<div align="center">

**ProLink** brings professional identity, portfolio proof, and hiring discovery into one focused experience.

</div>
