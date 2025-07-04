# 📰 Sikhazone - Full-Featured Article Platform

Sikhazone is a modern MERN stack article/blog platform designed for both readers and content creators. Built with powerful technologies like React, Firebase, and MongoDB, it offers a seamless and engaging experience for publishing, browsing, and interacting with articles.

---

## 🚀 Features

- 🔐 **Firebase Authentication** – Secure login and registration
- 📝 **Create, Edit, Delete Articles** – Full CRUD functionality
- 🔍 **Advanced Search & Sorting** – Search articles by title, tags, category, author, and sort by latest, oldest, or most liked
- 📌 **Bookmark System** – Save your favorite articles
- ❤️ **Like System** – Like articles (one like per user)
- 💬 **Comments** – Engage with article authors and other readers
- 👀 **View Counter** – Track article popularity
- 📊 **Admin Dashboard** – Manage all content
- 🧠 **Responsive Design & Animations** – Built with Tailwind CSS + Framer Motion
- 🔒 **Protected Routes** – Firebase Admin SDK for server-side auth verification

---



## 📁 Folder Structure

```
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       ├── hooks/
│       └── App.jsx
├── server/
│   └── index.js
```

---

## 🛠️ Tech Stack

### Frontend

- React
- Tailwind CSS + DaisyUI
- Axios
- React Router
- React Query
- Framer Motion
- Firebase Authentication

### Backend

- Node.js
- Express.js
- MongoDB (native driver)
- Firebase Admin SDK (JWT verification)

---

## ⚙️ Setup Instructions

### Clone the repo:

```bash
git clone https://github.com/alvinmonir411/Sikkha-Zone-Client
cd sikhazone
```

### Install Client:

```bash
cd client
npm install
```

Create a `.env` file in `client/`:

```env
...firebase secret key
VITE_API_URL=http://localhost:3000/
```

### Install Server:

```bash
cd ../server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
Fb_Service_key=your_base64_encoded_firebase_service_key
```

> 📌 Your Firebase service key must be base64 encoded JSON.

---

## ▶️ Running the App

### Start frontend:

```bash
cd client
npm run dev
```

### Start backend:

```bash
cd server
node index.js
```

---

## 📦 API Overview

- `GET /Articles` – All articles
- `GET /Articles/search?q=...&sort=...` – Search + sort
- `GET /Articles/id/:id` – Get single article
- `POST /Articles` – Create article (auth)
- `PUT /Articles/:id` – Update article (auth)
- `DELETE /Articles/id/:id` – Delete article (auth)
- `PATCH /articles/:id/visit` – Increment visit count
- `POST /Articles/id/:id/like` – Like article
- `POST /Articles/id/:id/comment` – Add comment
- `GET /bookmarks/:email` – Get user bookmarks
- `POST /bookmarks` – Add a bookmark
- `DELETE /bookmarks` – Remove bookmark

---

## 🔐 Authentication & Authorization

- Firebase Authentication (client)
- Firebase Admin SDK (server – verify tokens)
- Role-based route protection

---



---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 📢 Contact

**Author:** Alvin Monir
📧 Email: [alvinmonir411@gmail.com](mailto:alvinmonir411@gmail.com)
🌐 Portfolio: https://alvinmonir.netlify.app/
