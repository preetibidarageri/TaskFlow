import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import { TaskProvider } from './src/context/TaskContext';
import { initializeNotifications } from './src/utils/notificationService';

export default function App() {
  useEffect(() => {
    initializeNotifications();
  }, []);

  return (
    <TaskProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </TaskProvider>
  );
}
