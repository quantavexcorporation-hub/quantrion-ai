import React from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import { GlassCard, QButton, Screen, ScreenHeader, SectionHeader } from "../components/ui/primitives"
import { colors, spacing, typography } from "../theme/tokens"
import { useAuth } from "../providers/AuthProvider"
import {
  isBiometricAvailable,
  isBiometricEnabled,
  setBiometricEnabled,
} from "../services/biometrics"
import { registerForPushNotifications, scheduleLocalReminder } from "../services/notifications"

export function ProfileScreen() {
  const { user, signOut } = useAuth()

  return (
    <Screen scroll>
      <ScreenHeader title="Profile" subtitle="Account shared with the web platform." />
      <GlassCard>
        <Text style={styles.name}>{user?.name ?? "Student"}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.row}>
          <Chip label={`Plan · ${user?.plan ?? "free"}`} />
          <Chip label={`Role · ${user?.role ?? "student"}`} />
        </View>
      </GlassCard>

      <SectionHeader title="Security" />
      <GlassCard style={{ gap: spacing.sm }}>
        <QButton
          title="Enable biometric unlock"
          variant="secondary"
          onPress={async () => {
            if (!(await isBiometricAvailable())) return
            await setBiometricEnabled(true)
          }}
        />
        <QButton
          title="Check biometric status"
          variant="ghost"
          onPress={async () => {
            const on = await isBiometricEnabled()
            Alert.alert("Biometrics", on ? "Biometric unlock is ON" : "Biometric unlock is OFF")
          }}
        />
      </GlassCard>

      <SectionHeader title="Notifications" />
      <GlassCard style={{ gap: spacing.sm }}>
        <QButton
          title="Enable push"
          onPress={async () => {
            await registerForPushNotifications()
          }}
        />
        <QButton
          title="Schedule daily study reminder (7 PM)"
          variant="secondary"
          onPress={async () => {
            await scheduleLocalReminder({
              kind: "daily_study",
              title: "Quantrion study time",
              body: "Complete today’s goal — Learn + QuickLearn.",
              hour: 19,
            })
          }}
        />
      </GlassCard>

      <QButton title="Sign out" variant="danger" onPress={() => void signOut()} />
    </Screen>
  )
}

function Chip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  name: { color: colors.foreground, fontSize: typography.h2, fontWeight: "800" },
  email: { color: colors.mutedForeground, marginTop: 4 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.md },
  chip: {
    backgroundColor: colors.secondary,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: { color: colors.foreground, fontSize: typography.caption, fontWeight: "600" },
})
