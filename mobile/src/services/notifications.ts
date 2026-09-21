import * as Notifications from "expo-notifications"
import { Platform } from "react-native"
import * as Haptics from "expo-haptics"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export async function registerForPushNotifications(): Promise<string | null> {
  const { status: existing } = await Notifications.getPermissionsAsync()
  let final = existing
  if (existing !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync()
    final = status
  }
  if (final !== "granted") return null

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("study", {
      name: "Study reminders",
      importance: Notifications.AndroidImportance.DEFAULT,
    })
  }

  const token = await Notifications.getExpoPushTokenAsync()
  return token.data
}

export type ReminderKind =
  | "daily_study"
  | "revision"
  | "quicklearn"
  | "mock_test"
  | "performance"
  | "knowledge_dna"
  | "future_course"

export async function scheduleLocalReminder(opts: {
  kind: ReminderKind
  title: string
  body: string
  hour: number
  minute?: number
}): Promise<string> {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  return Notifications.scheduleNotificationAsync({
    content: {
      title: opts.title,
      body: opts.body,
      data: { kind: opts.kind },
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: opts.hour,
      minute: opts.minute ?? 0,
    },
  })
}

export async function cancelAllReminders(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync()
}
