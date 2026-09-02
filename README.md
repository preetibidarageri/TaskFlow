# 📱 TaskFlow – Task Management App

TaskFlow is a mobile task management application built with **React Native**. It allows users to create, manage, complete, and delete their personal tasks.

The application uses **Firebase Authentication and Firestore** for user authentication and cloud task storage, while **MongoDB Atlas** provides backend database storage through a Node.js/Express API deployed on Render.

## 🚀 Live Backend

**Backend API:**
https://taskflow-g0qv.onrender.com

The backend is deployed on **Render** and connected to **MongoDB Atlas**.

## 📥 APK / Demo

Download and install the TaskFlow Android APK:

**[Download TaskFlow APK / Demo](https://drive.google.com/file/d/1Zqt_U06O6_kXJwp9eDNQ2bduiQ0T5H4I/view?usp=drivesdk)**

> Android device required to install the APK.

## ✨ Features

* 🔐 User Registration
* 🔑 User Login
* 👤 Firebase Authentication
* ➕ Create Tasks
* 📝 Task Description
* 📅 Date and Time
* ⏰ Deadline
* 🚦 Task Priority

  * Low
  * Medium
  * High
* ✅ Mark tasks as completed
* 🗑️ Delete tasks
* 👤 User-specific tasks
* ☁️ Firestore cloud storage
* 🍃 MongoDB Atlas database
* 🌐 REST API using Node.js and Express
* 🚀 Backend deployed on Render

## 🛠️ Technologies Used

### Frontend

* React Native
* TypeScript
* JavaScript

### Backend

* Node.js
* Express.js
* REST API
* Mongoose

### Database & Authentication

* Firebase Authentication
* Firebase Firestore
* MongoDB Atlas

### Deployment

* Render
* GitHub

## 🏗️ Application Architecture

```text
                ┌─────────────────────┐
                │   React Native APK  │
                │      TaskFlow       │
                └──────────┬──────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
     ┌─────────────────┐       ┌─────────────────┐
     │ Firebase Auth   │       │   Firestore     │
     │                 │       │                 │
     │ User Login      │       │ User Tasks      │
     │ Registration    │       │ Cloud Storage   │
     └─────────────────┘       └─────────────────┘
                                     
                           │
                           ▼
                 ┌─────────────────────┐
                 │   Render Backend    │
                 │ Node.js + Express   │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │    MongoDB Atlas    │
                 │                     │
                 │      Tasks DB       │
                 └─────────────────────┘
```

## 📂 Project Structure

```text
TaskFlow/
│
├── android/
│
├── src/
│   ├── components/
│   ├── context/
│   │   └── TaskContext.tsx
│   ├── screens/
│   └── ...
│
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── package.json
└── README.md
```

## 🔥 Firebase Structure

Tasks are stored under each authenticated user's UID:

```text
users/
   └── {userId}/
        └── tasks/
             └── {taskId}
```

This ensures that each user can access their own tasks.

## 🍃 MongoDB Structure

Each task stored in MongoDB contains information such as:

```text
userId
firestoreId
title
description
dateTime
deadline
priority
completed
createdAt
updatedAt
```

The `userId` connects the task to the Firebase authenticated user, while `firestoreId` links the MongoDB record with its corresponding Firestore task.

## 🔄 Task Saving Flow

When a user creates a task:

```text
User creates task
       ↓
Firebase Firestore
       ↓
Firestore task created
       ↓
Render REST API
       ↓
Node.js + Express
       ↓
MongoDB Atlas
       ↓
Task successfully stored
```

If the MongoDB request fails after Firestore creation, the application removes the Firestore task to prevent inconsistent data.

## 🌐 API Endpoints

### Get User Tasks

```http
GET /api/tasks/user/:userId
```

### Create Task

```http
POST /api/tasks
```

### Update Task

```http
PUT /api/tasks/:id
```

### Update Task Using Firestore ID

```http
PUT /api/tasks/firestore/:firestoreId
```

### Delete Task

```http
DELETE /api/tasks/:id
```

### Delete Task Using Firestore ID

```http
DELETE /api/tasks/firestore/:firestoreId
```

## ⚙️ Local Backend Setup

Clone the repository:

```bash
git clone https://github.com/preetibidarageri/TaskFlow.git
```

Go into the project:

```bash
cd TaskFlow
```

Install frontend dependencies:

```bash
npm install
```

Go to the backend:

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

## 📱 Running the Mobile App

From the project root:

```bash
npm start
```

For Android development:

```bash
npx react-native run-android
```

For a release APK:

```bash
cd android
./gradlew assembleRelease
```

The APK will be generated at:

```text
android/app/build/outputs/apk/release/app-release.apk
```

## 🔒 Security

Sensitive configuration such as MongoDB credentials should be stored in environment variables.

The `.env` file should **not** be committed to GitHub.

```text
.env
backend/.env
```

are included in `.gitignore`.

## 📌 Deployment

The backend is deployed using:

* **GitHub** – Source code repository
* **Render** – Node.js/Express backend hosting
* **MongoDB Atlas** – Cloud database
* **Firebase** – Authentication and Firestore

The deployed backend is available at:

```text
https://taskflow-g0qv.onrender.com
```

## 👩‍💻 Author

**Preeti D Bidarageri**

BE – Computer Science Engineering

## ⭐ Future Improvements

* 🔔 Push notifications
* 📊 Task statistics
* 🔎 Task search and filtering
* 📆 Calendar view
* 🔄 Better offline synchronization
* 🌙 Dark mode
* 👥 Task sharing
* ⏰ Reminder notifications

---

⭐ If you like this project, consider giving the repository a star!
