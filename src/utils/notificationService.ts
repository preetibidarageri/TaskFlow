import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

export async function initializeNotifications() {
  // Ask notification permission
  await notifee.requestPermission();

  // Create Android notification channel
  await notifee.createChannel({
    id: 'taskflow-deadlines',
    name: 'TaskFlow Deadlines',
    importance: AndroidImportance.HIGH,
  });
}

export async function scheduleDeadlineNotification(
  taskId: string,
  taskTitle: string,
  deadline: string,
) {
  const deadlineTime = new Date(deadline).getTime();

  // Don't schedule notifications for deadlines that already passed
  if (deadlineTime <= Date.now()) {
    return;
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: deadlineTime,
  };

  await notifee.createTriggerNotification(
    {
      id: `deadline-${taskId}`,
      title: '⏰ Task Deadline Reached',
      body: `"${taskTitle}" is still pending. Your deadline has arrived.`,
      android: {
        channelId: 'taskflow-deadlines',
        pressAction: {
          id: 'default',
        },
      },
    },
    trigger,
  );
}

export async function cancelDeadlineNotification(taskId: string) {
  await notifee.cancelNotification(`deadline-${taskId}`);
}
