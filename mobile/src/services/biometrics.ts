import * as LocalAuthentication from "expo-local-authentication"
import * as SecureStore from "expo-secure-store"
import * as Haptics from "expo-haptics"

const BIOMETRIC_ENABLED_KEY = "quantrion_biometric_enabled"

export async function isBiometricAvailable(): Promise<boolean> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync()
  const enrolled = await LocalAuthentication.isEnrolledAsync()
  return hasHardware && enrolled
}

export async function isBiometricEnabled(): Promise<boolean> {
  const v = await SecureStore.getItemAsync(BIOMETRIC_ENABLED_KEY)
  return v === "1"
}

export async function setBiometricEnabled(enabled: boolean): Promise<void> {
  await SecureStore.setItemAsync(BIOMETRIC_ENABLED_KEY, enabled ? "1" : "0")
}

export async function authenticateWithBiometrics(
  reason = "Unlock Quantrion"
): Promise<boolean> {
  const available = await isBiometricAvailable()
  if (!available) return false
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: reason,
    cancelLabel: "Cancel",
    disableDeviceFallback: false,
  })
  if (result.success) {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  }
  return result.success
}
