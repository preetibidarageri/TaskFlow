import React, { useState } from 'react';

import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { getAuth } from '@react-native-firebase/auth';

import { useTasks } from '../context/TaskContext';

import { scheduleDeadlineNotification } from '../utils/notificationService';

import styles from '../styles/addTaskStyles';

type AddTaskScreenProps = {
  navigation: any;
};

export default function AddTaskScreen({ navigation }: AddTaskScreenProps) {
  const { addTask } = useTasks();

  // =========================
  // TASK DETAILS
  // =========================

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // =========================
  // TASK DATE & TIME
  // =========================

  const [taskDate, setTaskDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState(new Date());

  // =========================
  // DEADLINE DATE & TIME
  // =========================

  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [deadlineTime, setDeadlineTime] = useState(new Date());

  // =========================
  // DATE PICKERS
  // =========================

  const [showTaskDatePicker, setShowTaskDatePicker] = useState(false);

  const [showTaskTimePicker, setShowTaskTimePicker] = useState(false);

  const [showDeadlineDatePicker, setShowDeadlineDatePicker] = useState(false);

  const [showDeadlineTimePicker, setShowDeadlineTimePicker] = useState(false);

  // =========================
  // PRIORITY
  // =========================

  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');

  // =========================
  // LOADING
  // =========================

  const [loading, setLoading] = useState(false);

  // =========================
  // SUCCESS MODAL
  // =========================

  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // =========================
  // FORMAT DATE
  // =========================

  function formatDate(date: Date) {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  // =========================
  // FORMAT TIME
  // =========================

  function formatTime(date: Date) {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  // =========================
  // TASK DATE CHANGE
  // =========================

  function handleTaskDateChange(event: any, selectedDate?: Date) {
    setShowTaskDatePicker(false);

    if (selectedDate) {
      setTaskDate(selectedDate);
    }
  }

  // =========================
  // TASK TIME CHANGE
  // =========================

  function handleTaskTimeChange(event: any, selectedTime?: Date) {
    setShowTaskTimePicker(false);

    if (selectedTime) {
      setTaskTime(selectedTime);
    }
  }

  // =========================
  // DEADLINE DATE CHANGE
  // =========================

  function handleDeadlineDateChange(event: any, selectedDate?: Date) {
    setShowDeadlineDatePicker(false);

    if (selectedDate) {
      setDeadlineDate(selectedDate);
    }
  }

  // =========================
  // DEADLINE TIME CHANGE
  // =========================

  function handleDeadlineTimeChange(event: any, selectedTime?: Date) {
    setShowDeadlineTimePicker(false);

    if (selectedTime) {
      setDeadlineTime(selectedTime);
    }
  }

  // =========================
  // ADD TASK
  // =========================

  async function handleAddTask() {
    // -------------------------
    // TITLE VALIDATION
    // -------------------------

    if (!title.trim()) {
      setErrorModal('Missing Title', 'Please enter a task title.');
      return;
    }

    // -------------------------
    // CURRENT USER
    // -------------------------

    const currentUser = getAuth().currentUser;

    if (!currentUser) {
      setErrorModal('Not Logged In', 'Please login before adding a task.');
      return;
    }

    // -------------------------
    // CREATE TASK DATE + TIME
    // -------------------------

    const taskDateTime = new Date(taskDate);

    taskDateTime.setHours(taskTime.getHours(), taskTime.getMinutes(), 0, 0);

    // -------------------------
    // CREATE DEADLINE DATE + TIME
    // -------------------------

    const completeDeadline = new Date(deadlineDate);

    completeDeadline.setHours(
      deadlineTime.getHours(),
      deadlineTime.getMinutes(),
      0,
      0,
    );

    // -------------------------
    // DEADLINE VALIDATION
    // -------------------------

    if (completeDeadline <= taskDateTime) {
      setErrorModal(
        'Invalid Deadline',
        'Deadline must be after the task date and time.',
      );
      return;
    }

    // -------------------------
    // DEADLINE MUST BE FUTURE
    // -------------------------

    if (completeDeadline <= new Date()) {
      setErrorModal('Invalid Deadline', 'Please select a future deadline.');
      return;
    }

    // -------------------------
    // START LOADING
    // -------------------------

    setLoading(true);

    try {
      // ==================================================
      // 1. SAVE TASK
      // ==================================================

      console.log('==============================');
      console.log('STARTING TASK SAVE');
      console.log('==============================');

      const taskId = await addTask({
        userId: currentUser.uid,
        title: title.trim(),
        description: description.trim(),
        dateTime: taskDateTime.toISOString(),
        deadline: completeDeadline.toISOString(),
        priority,
      });

      console.log('TASK SAVED SUCCESSFULLY');
      console.log('Firestore ID:', taskId);

      // ==================================================
      // 2. SCHEDULE NOTIFICATION
      // ==================================================

      // Notification failure should NOT mean
      // task saving failed.
      try {
        console.log('Scheduling deadline notification...');

        await scheduleDeadlineNotification(
          taskId,
          title.trim(),
          completeDeadline.toISOString(),
        );

        console.log('Notification scheduled successfully');
      } catch (notificationError) {
        console.log('Notification scheduling failed:', notificationError);

        // We DON'T throw here.
        // The task is already saved.
      }

      // ==================================================
      // 3. TASK SAVE SUCCESS
      // ==================================================

      setLoading(false);

      setSuccessModalVisible(true);
    } catch (error) {
      // ==================================================
      // TASK SAVE FAILED
      // ==================================================

      setLoading(false);

      console.log('================================');
      console.log('TASK SAVE FAILED');
      console.log('================================');
      console.log('Error:', error);

      setErrorModal(
        'Unable to Save Task',
        'Something went wrong while saving your task. Please check your connection and try again.',
      );
    }
  }
  // =========================
  // ERROR MODAL
  // =========================

  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function setErrorModal(title: string, message: string) {
    setErrorTitle(title);
    setErrorMessage(message);
    setErrorModalVisible(true);
  }

  // =========================
  // UI
  // =========================

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* =========================
              HEADER
          ========================= */}

          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backText}>‹</Text>
            </Pressable>

            <Text style={styles.headerTitle}>Add Task</Text>

            <View style={styles.headerSpace} />
          </View>

          {/* =========================
              TITLE
          ========================= */}

          <Text style={styles.label}>Task Title</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
          />

          {/* =========================
              DESCRIPTION
          ========================= */}

          <Text style={styles.label}>Description</Text>

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Describe your task"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />

          {/* =========================
              TASK DATE
          ========================= */}

          <Text style={styles.label}>Date</Text>

          <Pressable
            style={styles.dateButton}
            onPress={() => setShowTaskDatePicker(true)}
          >
            <Text style={styles.dateIcon}>📅</Text>

            <View>
              <Text style={styles.dateLabel}>Task Date</Text>

              <Text style={styles.dateValue}>{formatDate(taskDate)}</Text>
            </View>
          </Pressable>

          {showTaskDatePicker && (
            <DateTimePicker
              value={taskDate}
              mode="date"
              display="calendar"
              onChange={handleTaskDateChange}
            />
          )}

          {/* =========================
              TASK TIME
          ========================= */}

          <Text style={styles.label}>Time</Text>

          <Pressable
            style={styles.dateButton}
            onPress={() => setShowTaskTimePicker(true)}
          >
            <Text style={styles.dateIcon}>⏰</Text>

            <View>
              <Text style={styles.dateLabel}>Task Time</Text>

              <Text style={styles.dateValue}>{formatTime(taskTime)}</Text>
            </View>
          </Pressable>

          {showTaskTimePicker && (
            <DateTimePicker
              value={taskTime}
              mode="time"
              display="clock"
              onChange={handleTaskTimeChange}
            />
          )}

          {/* =========================
              DEADLINE DATE
          ========================= */}

          <Text style={styles.label}>Deadline Date</Text>

          <Pressable
            style={styles.dateButton}
            onPress={() => setShowDeadlineDatePicker(true)}
          >
            <Text style={styles.dateIcon}>📅</Text>

            <View>
              <Text style={styles.dateLabel}>Deadline Date</Text>

              <Text style={styles.dateValue}>{formatDate(deadlineDate)}</Text>
            </View>
          </Pressable>

          {showDeadlineDatePicker && (
            <DateTimePicker
              value={deadlineDate}
              mode="date"
              display="calendar"
              onChange={handleDeadlineDateChange}
            />
          )}

          {/* =========================
              DEADLINE TIME
          ========================= */}

          <Text style={styles.label}>Deadline Time</Text>

          <Pressable
            style={styles.dateButton}
            onPress={() => setShowDeadlineTimePicker(true)}
          >
            <Text style={styles.dateIcon}>⏰</Text>

            <View>
              <Text style={styles.dateLabel}>Deadline Time</Text>

              <Text style={styles.dateValue}>{formatTime(deadlineTime)}</Text>
            </View>
          </Pressable>

          {showDeadlineTimePicker && (
            <DateTimePicker
              value={deadlineTime}
              mode="time"
              display="clock"
              onChange={handleDeadlineTimeChange}
            />
          )}

          {/* =========================
              PRIORITY
          ========================= */}

          <Text style={styles.label}>Priority</Text>

          <View style={styles.priorityContainer}>
            {/* LOW */}

            <Pressable
              style={[
                styles.priorityButton,
                priority === 'Low' && styles.lowSelected,
              ]}
              onPress={() => setPriority('Low')}
            >
              <Text
                style={[
                  styles.priorityText,
                  priority === 'Low' && styles.selectedText,
                ]}
              >
                Low
              </Text>
            </Pressable>

            {/* MEDIUM */}

            <Pressable
              style={[
                styles.priorityButton,
                priority === 'Medium' && styles.mediumSelected,
              ]}
              onPress={() => setPriority('Medium')}
            >
              <Text
                style={[
                  styles.priorityText,
                  priority === 'Medium' && styles.selectedText,
                ]}
              >
                Medium
              </Text>
            </Pressable>

            {/* HIGH */}

            <Pressable
              style={[
                styles.priorityButton,
                priority === 'High' && styles.highSelected,
              ]}
              onPress={() => setPriority('High')}
            >
              <Text
                style={[
                  styles.priorityText,
                  priority === 'High' && styles.selectedText,
                ]}
              >
                High
              </Text>
            </Pressable>
          </View>

          {/* =========================
              ADD BUTTON
          ========================= */}

          <Pressable
            style={[styles.addButton, loading && styles.disabledButton]}
            onPress={handleAddTask}
            disabled={loading}
          >
            <Text style={styles.addButtonText}>
              {loading ? 'Saving...' : '+ Add Task'}
            </Text>
          </Pressable>

          {/* =========================
              CANCEL
          ========================= */}

          <Pressable
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* =========================
          SUCCESS MODAL
      ========================= */}

      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.messageModal}>
            <View
              style={[
                styles.messageIconContainer,
                styles.successIconBackground,
              ]}
            >
              <Text style={[styles.messageIcon, styles.successIcon]}>✓</Text>
            </View>

            <Text style={styles.messageTitle}>Task Added!</Text>

            <Text style={styles.messageText}>
              Your task has been saved successfully.
              {'\n\n'}
              You'll receive a notification when the deadline is reached if the
              task is still pending.
            </Text>

            <Pressable
              style={[styles.messageButton, styles.successButton]}
              onPress={() => {
                setSuccessModalVisible(false);
                navigation.goBack();
              }}
            >
              <Text style={styles.messageButtonText}>View My Tasks</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* =========================
          ERROR MODAL
      ========================= */}

      <Modal
        visible={errorModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setErrorModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.messageModal}>
            <View
              style={[styles.messageIconContainer, styles.errorIconBackground]}
            >
              <Text style={[styles.messageIcon, styles.errorIcon]}>!</Text>
            </View>

            <Text style={styles.messageTitle}>{errorTitle}</Text>

            <Text style={styles.messageText}>{errorMessage}</Text>

            <Pressable
              style={[styles.messageButton, styles.errorButton]}
              onPress={() => setErrorModalVisible(false)}
            >
              <Text style={styles.messageButtonText}>Try Again</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
