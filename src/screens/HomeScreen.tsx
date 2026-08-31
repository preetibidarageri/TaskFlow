import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import { getAuth, signOut } from '@react-native-firebase/auth';

import { useTasks, Task } from '../context/TaskContext';
import styles from '../styles/homeStyles';

function HomeScreen({ navigation }: any) {
  const { tasks, toggleTask, deleteTask } = useTasks();

  // Profile menu open / close
  const [profileOpen, setProfileOpen] = useState(false);

  // Current Firebase user
  const currentUser = getAuth().currentUser;

  // Show only current user's tasks
  const userTasks = [...tasks].sort((a, b) => {
    // Completed tasks go below pending tasks
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // Newest task first
    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
  });
  const completedTasks = userTasks.filter(task => task.completed).length;

  const pendingTasks = userTasks.length - completedTasks;

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString();
  }

  function formatTime(dateString: string) {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // =========================
  // LOGOUT
  // =========================

  function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            const auth = getAuth();

            await signOut(auth);

            setProfileOpen(false);

            // Replace Home with Login
            // so user cannot go back to Home
            navigation.replace('Login');
          } catch (error) {
            console.log('Logout error:', error);

            Alert.alert(
              'Logout Failed',
              'Something went wrong. Please try again.',
            );
          }
        },
      },
    ]);
  }

  function renderTask({ item }: { item: Task }) {
    return (
      <Pressable
        style={styles.taskCard}
        onPress={() =>
          navigation.navigate('TaskDetails', {
            taskId: item.id,
          })
        }
      >
        <View style={styles.taskTop}>
          {/* CHECKBOX */}

          <Pressable
            style={[
              styles.checkbox,
              item.completed && styles.checkboxCompleted,
            ]}
            onPress={() => toggleTask(item.id)}
          >
            {item.completed && <Text style={styles.check}>✓</Text>}
          </Pressable>

          {/* TASK INFORMATION */}

          <View style={styles.taskInfo}>
            <Text
              style={[styles.taskTitle, item.completed && styles.completedText]}
            >
              {item.title}
            </Text>

            {item.description ? (
              <Text style={styles.taskDescription}>{item.description}</Text>
            ) : null}
          </View>
        </View>

        {/* DATE AND TIME */}

        <View style={styles.dateRow}>
          <Text style={styles.dateText}>📅 {formatDate(item.dateTime)}</Text>

          <Text style={styles.dateText}>⏰ {formatTime(item.dateTime)}</Text>
        </View>

        {/* DEADLINE AND PRIORITY */}

        <View style={styles.deadlineRow}>
          <Text style={styles.deadlineText}>
            Deadline: {formatDate(item.deadline)} {formatTime(item.deadline)}
          </Text>

          <Text
            style={[
              styles.priority,

              item.priority === 'High' && styles.highPriority,

              item.priority === 'Medium' && styles.mediumPriority,

              item.priority === 'Low' && styles.lowPriority,
            ]}
          >
            {item.priority}
          </Text>
        </View>

        {/* STATUS AND DELETE */}

        <View style={styles.taskBottom}>
          <Text
            style={[
              styles.status,

              item.completed ? styles.completedStatus : styles.pendingStatus,
            ]}
          >
            {item.completed ? 'Completed' : 'Pending'}
          </Text>

          <Pressable onPress={() => deleteTask(item.id)}>
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* =========================
          HEADER
      ========================= */}

      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>TaskFlow</Text>

          <Text style={styles.welcomeText}>Welcome back 👋</Text>
        </View>

        {/* PROFILE */}

        <View>
          <Pressable
            style={styles.profile}
            onPress={() => setProfileOpen(!profileOpen)}
          >
            <Text style={styles.profileText}>
              {currentUser?.displayName
                ? currentUser.displayName.charAt(0).toUpperCase()
                : currentUser?.email?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </Pressable>

          {/* PROFILE MENU */}

          {profileOpen && (
            <View style={styles.profileMenu}>
              {/* USER NAME */}

              <Text style={styles.profileName}>
                {currentUser?.displayName || 'User'}
              </Text>

              {/* USER EMAIL */}

              <Text style={styles.profileEmail} numberOfLines={1}>
                {currentUser?.email || 'No email'}
              </Text>

              <View style={styles.menuDivider} />

              {/* LOGOUT */}

              <Pressable style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutIcon}>↪</Text>

                <Text style={styles.logoutText}>Logout</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      {/* =========================
          SUMMARY
      ========================= */}

      <View style={styles.summary}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryNumber}>{pendingTasks}</Text>

          <Text style={styles.summaryLabel}>Pending</Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryNumber}>{completedTasks}</Text>

          <Text style={styles.summaryLabel}>Completed</Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryNumber}>{userTasks.length}</Text>

          <Text style={styles.summaryLabel}>Total</Text>
        </View>
      </View>

      {/* =========================
          TASK HEADER
      ========================= */}

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>My Tasks</Text>

        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.addButtonText}>+ Add Task</Text>
        </Pressable>
      </View>

      {/* =========================
          EMPTY / TASK LIST
      ========================= */}

      {userTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📝</Text>

          <Text style={styles.emptyTitle}>No tasks yet</Text>

          <Text style={styles.emptyText}>
            Create your first task and start getting things done.
          </Text>

          <Pressable
            style={styles.emptyButton}
            onPress={() => navigation.navigate('AddTask')}
          >
            <Text style={styles.emptyButtonText}>Create Task</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={userTasks}
          keyExtractor={item => item.id}
          renderItem={renderTask}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;
