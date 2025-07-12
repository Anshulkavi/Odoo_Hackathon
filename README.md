# 🔁 SkillSwap Platform

> A web application that connects people to exchange skills — learn what you want, teach what you know.

---

## 🧩 Features

- 👤 User signup & login (JWT Auth)
- 🔐 Secure password hashing (bcrypt)
- 📦 MongoDB Atlas integration
- ⚛️ Built with Next.js (frontend)
- ⚙️ Node.js + Express (backend)
- 🌐 CORS-enabled API
- 🔄 Auth state persistence with `localStorage`

---

## 📁 Project Structure

skillswap-backend/
├── models/
│ └── User.js
├── routes/
│ └── auth.js
├── server.js
├── .env
└── package.json

frontend/
├── app/
│ └── page.tsx
├── contexts/
│ └── auth-context.tsx
├── components/
├── styles/
├── public/
└── next.config.js

yaml
Copy code

---

## 🚀 Getting Started

### 🛠️ Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Yarn or npm 

---

### 🔧 Backend Setup (`skillswap-backend`)

1. **Install dependencies**:

```bash
cd skillswap-backend
npm install
Configure environment:

Create a .env file:

env
Copy code
PORT=8000
MONGODB_URI=mongodb+srv://<your-mongo-uri>
JWT_SECRET=your_jwt_secret
Run server:

bash
Copy code
node server.js
API is now running at http://localhost:8000/api
🌐 Frontend Setup (skillswap-frontend)
Install dependencies:

bash
Copy code
cd skillswap-frontend
npm install
Run frontend:

bash
Copy code
npm run dev
App is now available at http://localhost:3000

🔐 API Endpoints
Method	Route	Description
POST	/api/signup	Register user
POST	/api/login	Login user
GET	/api/me	Get current user

🛡️ Security
Passwords are hashed with bcrypt

Authentication uses JWT tokens

Tokens stored in localStorage (client-side)

📄 License
This project is licensed under the MIT License.

🙌 Contributing
Feel free to fork, improve, and send pull requests.

vbnet
Copy code

Let me know if you'd like this in downloadable form or want a badge/header/logo added.
