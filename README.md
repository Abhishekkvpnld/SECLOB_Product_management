# 🛒 Product Management Web App

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing products, categories, and variants with user authentication and secure CRUD operations.

---

## 📦 Features

- ✅ **Add / Update / Delete Products**
- 📚 **Category & Subcategory Selection**
- 🧩 **Dynamic Variant Management** (RAM, price, quantity)
- 🖼️ **Image Upload & Preview**
- 🔐 **JWT-based User Authentication**
- 🌐 **Role-based Authorization (Admin / User)**
- 📃 **Detailed Product View**
- 🧾 **Toast Notifications for User Feedback**

---

## 🛠️ Tech Stack

| Frontend  | Backend       | Database | Others                          |
|-----------|---------------|----------|----------------------------------|
| React.js  | Node.js       | MongoDB  | JWT, Axios, Tailwind CSS         |
| Redux     | Express.js    |          | Cloudinary (for images)          |

---

## 🚀 Live Demo

🔗 [View Deployed App](https://seclob-product-management.vercel.app/)

---

## 📂 Project Structure

```
client/                 # React frontend
  └── components/       # UI Components
  └── pages/            # Routes
  └── helpers/          # Image uploader, utils
server/                 # Express backend
  └── models/           # Mongoose schemas
  └── controllers/      # Logic for routes
  └── routes/           # API endpoints
  └── middleware/       # JWT & error handling
```

---

## 🧪 Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/your-username/product-management-app.git
cd product-management-app
```

2. **Install dependencies**
```bash
# For frontend
cd client
npm install

# For backend
cd ../server
npm install
```

3. **Add `.env` file**
```env
# server/.env
PORT=5000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET_KEY=your_secret_key
FRONTEND_URL= frontend_url
```

4. **Add `.env` file**
```env
# client/.env
VITE_BACKEND_URL= backend_uri
VITE_APP_CLOUD_URL=https://api.cloudinary.com/v1_1/<cloudnary_name>/image/upload
VITE_APP_CLOUD_NAME_CLOUDINARY=add_cloudnary_name
VITE_CLOUDINARY_FOLDER_NAME=add_folder_name
VITE_CLOUDINARY_UPLOAD_PRESET_NAME = add_preset_name
```

5. **Run the app**
```bash
# Backend
cd server
npm start

# Frontend
cd client
npm run dev
```
