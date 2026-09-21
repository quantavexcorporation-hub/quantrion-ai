import * as Haptics from "expo-haptics"
import { AccessibilityInfo } from "react-native"

let reduceMotion = false
AccessibilityInfo.isReduceMotionEnabled?.().then((v) => {
  reduceMotion = Boolean(v)
})
AccessibilityInfo.addEventListener?.("reduceMotionChanged", (v) => {
  reduceMotion = Boolean(v)
})

export async function hapticLight() {
  if (reduceMotion) return
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
}

export async function hapticSelection() {
  if (reduceMotion) return
  await Haptics.selectionAsync()
}

export async function hapticSuccess() {
  if (reduceMotion) return
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
}
