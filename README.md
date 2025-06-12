# 📘 ShikkhaZone – Knowledge Sharing Platform

Welcome to **ShikkhaZone**, a full-stack MERN-based knowledge-sharing platform where students and learners can share articles, gain insights, and engage in meaningful discussions.

## 🌐 Live Site

👉 https://sikka-zone.netlify.app/

---

## 📖 Project Purpose

ShikkhaZone was developed as part of an assignment project to assess full-stack development, user authentication, CRUD operations, secure routing, and overall application architecture. The platform provides a clean, responsive, and secure experience where users can:

- Read and post articles
- Comment on discussions
- Like content
- Filter articles by category
- Manage personal articles securely

---

## 🚀 Key Features

- 🔐 **Authentication** using Firebase (Email/Password and Google Sign-In)
- 📑 **Post, Edit, and Delete** personal articles
- 🗂️ Filter and view articles by **Category**
- 💬 **Comment and Like** system (stored in MongoDB)
- 🌙 **Dark/Light Theme Toggle**
- 👤 **User Dashboard** to manage content
- ❌ Custom **404 Error Page**
- 🖼️ Fully **Responsive Design**
- 🌈 Smooth UI Animations using **Framer Motion**

---

## 🛠️ Tech Stack

### Frontend

- **React.js** (v19+)
- **React Router DOM** (v7)
- **Tailwind CSS** (v4)
- **DaisyUI**
- **Framer Motion** – animation
- **Lottie React** – animation
- **React Toastify** – notifications
- **React CountUp** – counter animations
- **SweetAlert2** – alerts/modals
- **Swiper** – sliders

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Firebase Authentication**
- **JWT (JSON Web Tokens)** – for secure private route protection
- **CORS & Dotenv** – for secure server configuration

---

## 📦 Used NPM Packages

### Frontend Dependencies

```json
"framer-motion": "^12.16.0",
"lottie-react": "^2.4.1",
"react": "^19.1.0",
"react-countup": "^6.5.3",
"react-dom": "^19.1.0",
"react-icons": "^5.5.0",
"react-router-dom": "^7.6.2",
"swiper": "^11.2.8"
```

Security Measures
All Firebase and MongoDB credentials stored in .env files

JWT tokens stored securely in localStorage

Protected routes for posting/editing articles and viewing "My Articles"
