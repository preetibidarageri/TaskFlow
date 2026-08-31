import React, { createContext, useContext, useEffect, useState } from 'react';

import { getAuth } from '@react-native-firebase/auth';

import {
  getFirestore,
  collection,
  addDoc,
  query,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from '@react-native-firebase/firestore';

import {
  scheduleDeadlineNotification,
  cancelDeadlineNotification,
} from '../utils/notificationService';

// ======================================================
// MONGODB BACKEND URL
// ======================================================

const API_URL = 'http://192.168.0.115:5000';

// ======================================================
// TYPES
// ======================================================

export type Priority = 'Low' | 'Medium' | 'High';

export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  dateTime: string;
  deadline: string;
  priority: Priority;
  completed: boolean;
};

type NewTask = Omit<Task, 'id' | 'completed'>;

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
  // FIRESTORE REAL-TIME LISTENER
  // ====================================================

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();

    let unsubscribeTasks: (() => void) | undefined;

    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      // ------------------------------------------------
      // REMOVE OLD LISTENER
      // ------------------------------------------------

      if (unsubscribeTasks) {
        unsubscribeTasks();
        unsubscribeTasks = undefined;
      }

      // ------------------------------------------------
      // NO USER
      // ------------------------------------------------

      if (!user) {
        setTasks([]);
        return;
      }

      console.log('Logged in user:', user.uid);

      // ------------------------------------------------
      // USER-SPECIFIC FIRESTORE COLLECTION
      // ------------------------------------------------

      const tasksCollection = collection(firestore, 'users', user.uid, 'tasks');

      const tasksQuery = query(tasksCollection);

      // ------------------------------------------------
      // REAL-TIME LISTENER
      // ------------------------------------------------

      unsubscribeTasks = onSnapshot(
        tasksQuery,
        snapshot => {
          const taskList: Task[] = snapshot.docs.map(document => {
            const data = document.data();

            return {
              id: document.id,

              userId: data.userId || user.uid,

              title: data.title || '',

              description: data.description || '',

              dateTime: data.dateTime || '',

              deadline: data.deadline || '',

              priority: data.priority || 'Medium',

              completed: data.completed ?? false,
            };
          });

          console.log(`Firestore tasks for ${user.uid}:`, taskList.length);

          setTasks(taskList);
        },

        error => {
          console.log('Firestore tasks error:', error);
        },
      );
    });

    // ------------------------------------------------
    // CLEANUP
    // ------------------------------------------------

    return () => {
      unsubscribeAuth();

      if (unsubscribeTasks) {
        unsubscribeTasks();
      }
    };
  }, []);

  // ====================================================
  // ADD TASK
  // ====================================================

  async function addTask(task: NewTask): Promise<string> {
    const auth = getAuth();
    const firestore = getFirestore();

    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error('User is not logged in');
    }

    try {
      // ==================================================
      // 1. SAVE TO FIRESTORE
      // ==================================================

      console.log('Saving task to Firestore...');

      const taskReference = await addDoc(
        collection(firestore, 'users', currentUser.uid, 'tasks'),
        {
          ...task,

          userId: currentUser.uid,

          completed: false,
        },
      );

      const firestoreId = taskReference.id;

      console.log('Task saved to Firestore:', firestoreId);

      // ==================================================
      // 2. SAVE TO MONGODB
      // ==================================================

      console.log('Saving task to MongoDB...');

      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          ...task,

          userId: currentUser.uid,

          completed: false,

          firestoreId: firestoreId,
        }),
      });

      // --------------------------------------------------
      // CHECK RESPONSE
      // --------------------------------------------------

      const data = await response.json();

      console.log('MongoDB response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save task to MongoDB');
      }

      console.log('Task saved to MongoDB successfully:', data.task?._id);

      // ==================================================
      // RETURN FIRESTORE ID
      // ==================================================

      return firestoreId;
    } catch (error) {
      console.log('Add task error:', error);

      throw error;
    }
  }

  // ====================================================
  // TOGGLE TASK
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
      // 1. UPDATE FIRESTORE
      // ==================================================

      console.log('Updating Firestore task:', id);

      await updateDoc(doc(firestore, 'users', currentUser.uid, 'tasks', id), {
        completed: newCompleted,
      });

      console.log('Firestore task updated:', id);

      // ==================================================
      // 2. UPDATE MONGODB
      // ==================================================

      console.log('Updating MongoDB task:', id);

      const response = await fetch(`${API_URL}/api/tasks/firestore/${id}`, {
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
        throw new Error(data.message || 'Failed to update task in MongoDB');
      }

      console.log('MongoDB task updated:', id);

      // ==================================================
      // 3. CANCEL NOTIFICATION
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
  // ====================================================

  async function deleteTask(id: string): Promise<void> {
    const auth = getAuth();
    const firestore = getFirestore();

    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log('No logged-in user');
      return;
    }

    try {
      // ==================================================
      // 1. CANCEL NOTIFICATION
      // ==================================================

      try {
        await cancelDeadlineNotification(id);

        console.log('Deadline notification cancelled:', id);
      } catch (notificationError) {
        console.log('Notification cancellation error:', notificationError);
      }

      // ==================================================
      // 2. DELETE FROM FIRESTORE
      // ==================================================

      await deleteDoc(doc(firestore, 'users', currentUser.uid, 'tasks', id));

      console.log('Task deleted from Firestore:', id);

      // ==================================================
      // 3. DELETE FROM MONGODB
      // ==================================================

      console.log('Deleting task from MongoDB:', id);

      const response = await fetch(
        `${API_URL}/api/tasks/firestore/${id}?userId=${encodeURIComponent(
          currentUser.uid,
        )}`,
        {
          method: 'DELETE',
        },
      );

      const data = await response.json();

      console.log('MongoDB delete response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete task from MongoDB');
      }

      console.log('Task deleted from MongoDB:', id);
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
