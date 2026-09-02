import React, { createContext, useContext, useEffect, useState } from 'react';

import { getAuth } from '@react-native-firebase/auth';

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from '@react-native-firebase/firestore';

import {
  scheduleDeadlineNotification,
  cancelDeadlineNotification,
} from '../utils/notificationService';

// ======================================================
// MONGODB BACKEND URL
// ======================================================

const API_URL = 'http://127.0.0.1:5000';

// ======================================================
// TYPES
// ======================================================

export type Priority = 'Low' | 'Medium' | 'High';

export type Task = {
  id: string;
  firestoreId: string;
  userId: string;
  title: string;
  description: string;
  dateTime: string;
  deadline: string;
  priority: Priority;
  completed: boolean;
};

type NewTask = Omit<Task, 'id' | 'firestoreId' | 'completed'>;

// ======================================================
// CONTEXT TYPE
// ======================================================

type TaskContextType = {
  tasks: Task[];

  addTask: (task: NewTask) => Promise<string>;

  toggleTask: (id: string) => Promise<void>;

  deleteTask: (id: string) => Promise<void>;
};

// ======================================================
// CONTEXT
// ======================================================

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// ======================================================
// PROVIDER
// ======================================================

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  // ====================================================
  // LOAD TASKS FROM MONGODB
  // ====================================================

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = auth.onAuthStateChanged(async user => {
      if (!user) {
        console.log('No logged-in user');
        setTasks([]);
        return;
      }

      console.log('Logged in user:', user.uid);

      try {
        console.log('Loading tasks from MongoDB...');

        const response = await fetch(
          `${API_URL}/api/tasks/user/${encodeURIComponent(user.uid)}`,
        );

        const data = await response.json();

        console.log('MongoDB tasks response:', data);

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load tasks from MongoDB');
        }

        const mongoTasks = data.tasks || [];

        const taskList: Task[] = mongoTasks.map((item: any) => ({
          id: item._id,

          firestoreId: item.firestoreId || '',

          userId: item.userId || user.uid,

          title: item.title || '',

          description: item.description || '',

          dateTime: item.dateTime || '',

          deadline: item.deadline || '',

          priority: item.priority || 'Medium',

          completed: item.completed ?? false,
        }));

        console.log(`MongoDB tasks for ${user.uid}:`, taskList.length);

        setTasks(taskList);
      } catch (error) {
        console.log('Load MongoDB tasks error:', error);

        setTasks([]);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  // ====================================================
  // ADD TASK
  // FIRESTORE -> MONGODB
  // ====================================================

  async function addTask(task: NewTask): Promise<string> {
    const auth = getAuth();

    const firestore = getFirestore();

    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error('User is not logged in');
    }

    let firestoreId: string | null = null;

    try {
      // ==================================================
      // STEP 1: SAVE TASK UNDER CURRENT USER IN FIRESTORE
      // ==================================================

      console.log('================================');
      console.log('STEP 1: SAVING TASK TO FIRESTORE');
      console.log('================================');

      console.log('Firestore path:', `users/${currentUser.uid}/tasks`);

      const firestoreTask = await addDoc(
        collection(firestore, 'users', currentUser.uid, 'tasks'),
        {
          userId: currentUser.uid,

          title: task.title,

          description: task.description,

          dateTime: task.dateTime,

          deadline: task.deadline,

          priority: task.priority,

          completed: false,

          createdAt: new Date().toISOString(),
        },
      );

      firestoreId = firestoreTask.id;

      console.log('Firestore task created successfully');

      console.log('Firestore ID:', firestoreId);

      // ==================================================
      // STEP 2: SAVE SAME TASK TO MONGODB
      // ==================================================

      console.log('================================');
      console.log('STEP 2: SAVING TASK TO MONGODB');
      console.log('================================');

      const taskData = {
        userId: currentUser.uid,

        firestoreId: firestoreId,

        title: task.title,

        description: task.description,

        dateTime: task.dateTime,

        deadline: task.deadline,

        priority: task.priority,

        completed: false,
      };

      console.log('MongoDB task data:', taskData);

      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(taskData),
      });

      const data = await response.json();

      console.log('MongoDB HTTP status:', response.status);

      console.log('MongoDB response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save task to MongoDB');
      }

      // ==================================================
      // GET MONGODB TASK
      // ==================================================

      const mongoTask = data.task;

      if (!mongoTask || !mongoTask._id) {
        throw new Error('MongoDB did not return task ID');
      }

      const mongoId = mongoTask._id;

      // ==================================================
      // SUCCESS
      // ==================================================

      console.log('================================');
      console.log('TASK SAVED TO BOTH DATABASES');
      console.log('================================');

      console.log('Firebase User:', currentUser.uid);

      console.log(
        'Firestore Path:',
        `users/${currentUser.uid}/tasks/${firestoreId}`,
      );

      console.log('Firestore ID:', firestoreId);

      console.log('MongoDB ID:', mongoId);

      // ==================================================
      // UPDATE LOCAL STATE
      // ==================================================

      const savedTask: Task = {
        id: mongoId,

        firestoreId: firestoreId,

        userId: currentUser.uid,

        title: task.title,

        description: task.description,

        dateTime: task.dateTime,

        deadline: task.deadline,

        priority: task.priority,

        completed: false,
      };

      setTasks(previousTasks => [...previousTasks, savedTask]);

      return mongoId;
    } catch (error) {
      console.log('================================');

      console.log('TASK SAVE FAILED');

      console.log('================================');

      console.log('Error:', error);

      // ==================================================
      // ROLLBACK FIRESTORE
      // ==================================================

      if (firestoreId) {
        try {
          console.log('MongoDB failed. Removing Firestore task...');

          await deleteDoc(
            doc(firestore, 'users', currentUser.uid, 'tasks', firestoreId),
          );

          console.log('Firestore rollback successful');
        } catch (rollbackError) {
          console.log('Firestore rollback failed:', rollbackError);
        }
      }

      throw error;
    }
  }

  // ====================================================
  // TOGGLE TASK
  // MONGODB + FIRESTORE
  // ====================================================

  async function toggleTask(id: string): Promise<void> {
    const auth = getAuth();

    const firestore = getFirestore();

    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log('No logged-in user');

      return;
    }

    const task = tasks.find(item => item.id === id);

    if (!task) {
      console.log('Task not found:', id);

      return;
    }

    const newCompleted = !task.completed;

    try {
      // ==================================================
      // UPDATE MONGODB
      // ==================================================

      console.log('Updating MongoDB task:', id);

      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          completed: newCompleted,

          userId: currentUser.uid,
        }),
      });

      const data = await response.json();

      console.log('MongoDB update response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update task');
      }

      // ==================================================
      // UPDATE FIRESTORE
      // ==================================================

      if (task.firestoreId) {
        try {
          await updateDoc(
            doc(firestore, 'users', currentUser.uid, 'tasks', task.firestoreId),
            {
              completed: newCompleted,
            },
          );

          console.log('Firestore task updated:', task.firestoreId);
        } catch (firestoreError) {
          console.log('Firestore update error:', firestoreError);
        }
      }

      // ==================================================
      // UPDATE LOCAL STATE
      // ==================================================

      setTasks(previousTasks =>
        previousTasks.map(item =>
          item.id === id
            ? {
                ...item,
                completed: newCompleted,
              }
            : item,
        ),
      );

      console.log('Task updated successfully:', id);

      // ==================================================
      // CANCEL NOTIFICATION
      // ==================================================

      if (newCompleted) {
        try {
          await cancelDeadlineNotification(id);

          console.log('Deadline notification cancelled:', id);
        } catch (notificationError) {
          console.log('Notification cancellation error:', notificationError);
        }
      }
    } catch (error) {
      console.log('Toggle task error:', error);
    }
  }

  // ====================================================
  // DELETE TASK
  // MONGODB + FIRESTORE
  // ====================================================

  async function deleteTask(id: string): Promise<void> {
    const auth = getAuth();

    const firestore = getFirestore();

    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log('No logged-in user');

      return;
    }

    const task = tasks.find(item => item.id === id);

    if (!task) {
      console.log('Task not found:', id);

      return;
    }

    try {
      // ==================================================
      // CANCEL NOTIFICATION
      // ==================================================

      try {
        await cancelDeadlineNotification(id);

        console.log('Deadline notification cancelled:', id);
      } catch (notificationError) {
        console.log('Notification cancellation error:', notificationError);
      }

      // ==================================================
      // DELETE FROM MONGODB
      // ==================================================

      console.log('Deleting task from MongoDB:', id);

      const response = await fetch(
        `${API_URL}/api/tasks/${id}?userId=${encodeURIComponent(
          currentUser.uid,
        )}`,
        {
          method: 'DELETE',

          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();

      console.log('MongoDB delete response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete task');
      }

      // ==================================================
      // DELETE FROM FIRESTORE
      // ==================================================

      if (task.firestoreId) {
        try {
          await deleteDoc(
            doc(firestore, 'users', currentUser.uid, 'tasks', task.firestoreId),
          );

          console.log('Firestore task deleted:', task.firestoreId);
        } catch (firestoreError) {
          console.log('Firestore delete error:', firestoreError);
        }
      }

      // ==================================================
      // REMOVE FROM LOCAL STATE
      // ==================================================

      setTasks(previousTasks => previousTasks.filter(item => item.id !== id));

      console.log('Task deleted successfully:', id);
    } catch (error) {
      console.log('Delete task error:', error);
    }
  }

  // ====================================================
  // PROVIDER
  // ====================================================

  return (
    <TaskContext.Provider
      value={{
        tasks,

        addTask,

        toggleTask,

        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// ======================================================
// CUSTOM HOOK
// ======================================================

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider');
  }

  return context;
}
