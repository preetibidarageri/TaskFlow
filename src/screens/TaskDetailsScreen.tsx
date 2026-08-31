import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useTasks } from '../context/TaskContext';

type TaskDetailsScreenProps = {
  navigation: any;
  route: {
    params: {
      taskId: string;
    };
  };
};

export default function TaskDetailsScreen({
  navigation,
  route,
}: TaskDetailsScreenProps) {
  const { tasks } = useTasks();

  const task = tasks.find(item => item.id === route.params.taskId);

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Task not found</Text>

          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>

        <Text style={styles.heading}>Task Details</Text>

        <View style={styles.card}>
          <Text style={styles.title}>{task.title}</Text>

          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>
            {task.description || 'No description'}
          </Text>

          <Text style={styles.label}>Date & Time</Text>
          <Text style={styles.value}>{task.dateTime}</Text>

          <Text style={styles.label}>Deadline</Text>
          <Text style={styles.value}>{task.deadline}</Text>

          <Text style={styles.label}>Priority</Text>
          <Text style={styles.value}>{task.priority}</Text>

          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>
            {task.completed ? 'Completed ✓' : 'Pending'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F2',
  },

  content: {
    padding: 24,
  },

  back: {
    fontSize: 17,
    color: '#7B2525',
    fontWeight: '600',
    marginBottom: 25,
    marginTop: 25,
  },

  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: '#7B2525',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
    marginBottom: 25,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#888',
    marginTop: 15,
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    color: '#333',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    fontSize: 18,
    color: '#777',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#7B2525',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
