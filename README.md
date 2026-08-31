# TaskFlow 📱

TaskFlow is a **React Native task management application** that helps users create, manage, prioritize, and complete tasks with deadline notifications.

The application uses **Firebase Authentication and Firestore** for user authentication and real-time task management, while **Node.js, Express, and MongoDB** provide backend task storage.

## 🚀 Features

* 🔐 User Registration and Login
* 🔥 Firebase Authentication
* ☁️ Firestore real-time task storage
* 🍃 MongoDB backend storage
* ➕ Create tasks
* ✏️ Update task status
* ✅ Mark tasks as completed
* 🗑️ Delete tasks
* 📅 Select task date and time
* ⏰ Set task deadlines
* 🔔 Deadline notifications
* 🎯 Task priorities:

  * Low
  * Medium
  * High
* 📊 Pending, Completed, and Total task summary
* 👤 User-specific tasks
* 🚪 Secure logout
* 📱 Android mobile application

## 🛠️ Technologies Used

### Frontend

* React Native
* TypeScript
* React Navigation
* React Native Firebase
* React Native DateTimePicker

### Backend

* Node.js
* Express.js
* Mongoose
* MongoDB Atlas
* CORS
* dotenv

### Database & Authentication

* Firebase Authentication
* Firebase Firestore
* MongoDB Atlas

## 📂 Project Structure

```text
TaskFlow/
│
├── android/
├── ios/
│
├── src/
│   ├── context/
│   │   └── TaskContext.tsx
│   │
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── RegistrationScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── AddTaskScreen.tsx
│   │   └── TaskDetailsScreen.tsx
│   │
│   ├── styles/
│   │
│   └── utils/
│       └── notificationService.ts
│
├── backend/
│   ├── models/
│   │   └── Task.js
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── App.tsx
├── package.json
└── README.md
```

## 🔄 Application Flow

```text
User
 │
 ▼
Firebase Authentication
 │
 ▼
TaskFlow React Native App
 │
 ▼
TaskContext
 │
 ├──────────────► Firebase Firestore
 │                 └── User-specific tasks
 │
 └──────────────► Node.js / Express API
                       │
                       ▼
                    MongoDB
```

## 🔥 Firestore Structure

Tasks are stored separately for each authenticated user:

```text
users
 └── {userId}
      └── tasks
           ├── {taskId}
           ├── {taskId}
           └── {taskId}
```

This ensures that users see only their own Firestore tasks.

## 🍃 MongoDB Structure

MongoDB stores a copy of each task with the Firebase user ID:

```text
Task
 ├── userId
 ├── firestoreId
 ├── title
 ├── description
 ├── dateTime
 ├── deadline
 ├── priority
 ├── completed
 ├── createdAt
 └── updatedAt
```

The `userId` connects the MongoDB task with the authenticated Firebase user.

## 🔌 Backend API

The Express backend runs on port `5000`.

### Test API

```http
GET /
```

Response:

```json
{
  "message": "TaskFlow API is running"
}
```

### Create Task

```http
POST /api/tasks
```

### Get User Tasks

```http
GET /api/tasks/user/:userId
```

### Update Task

```http
PUT /api/tasks/firestore/:firestoreId
```

### Delete Task

```http
DELETE /api/tasks/firestore/:firestoreId
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/preetibidarageri/TaskFlow.git
```

Go to the project:

```bash
cd TaskFlow
```

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

## 🔐 Environment Variables

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

**Do not commit `.env` to GitHub.**

The `.gitignore` file already excludes environment files.

## ▶️ Running the Application

### Start Backend

Open Terminal 1:

```bash
cd ~/Projects/TaskFlow/backend
npm run dev
```

Expected output:

```text
MongoDB connected successfully
Server running on http://localhost:5000
```

### Start Metro

Open Terminal 2:

```bash
cd ~/Projects/TaskFlow
npm start
```

### Run Android

Open Terminal 3:

```bash
cd ~/Projects/TaskFlow
npm run android
```

## 📱 Mobile Development

When running the application on a physical Android device, the phone must be able to access the laptop running the backend.

For local development, update the API URL in:

```text
src/context/TaskContext.tsx
```

Example:

```ts
const API_URL = 'http://192.168.0.115:5000';
```

Replace the IP address if your laptop gets a new IP address after connecting to another Wi-Fi network.

## 🧪 Testing

The application can be tested by:

1. Registering a new user.
2. Logging in.
3. Creating a task.
4. Checking that the task appears in Firestore.
5. Checking that the task appears in MongoDB.
6. Marking the task as completed.
7. Checking the updated `completed` value in both databases.
8. Deleting the task.
9. Confirming that it is removed from both databases.
10. Creating another Firebase user and verifying that users see only their own tasks.

## 🔒 Security

The project uses Firebase Authentication to identify users.

Each task contains:

```text
userId
```

which identifies the Firebase authenticated user.

Firestore stores tasks under:

```text
users/{userId}/tasks
```

MongoDB also stores the same Firebase `userId`.

For production deployment, authentication and authorization should also be enforced on the backend API rather than trusting a client-supplied `userId`.

## 📌 Future Improvements

* Backend Firebase token verification
* JWT/API authentication
* Task editing screen
* Search tasks
* Filter by priority
* Sort by deadline
* Cloud deployment
* Production MongoDB configuration
* Backend authorization
* Task categories
* Recurring tasks

## 👩‍💻 Author

**Preeti D Bidarageri**

GitHub:

https://github.com/preetibidarageri

## 📄 License

This project is created for learning and portfolio purposes.
