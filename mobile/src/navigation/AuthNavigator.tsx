import React, { useMemo, useState } from "react"
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useAuth } from "../providers/AuthProvider"
import { colors, radius, spacing, touch, typography } from "../theme/tokens"
import { GlassCard, QButton, Screen } from "../components/ui/primitives"
import type { AuthStackParamList } from "./types"
import { isSupabaseConfigured } from "../lib/env"

const Stack = createNativeStackNavigator<AuthStackParamList>()

function LoginScreen({ navigation }: NativeStackScreenProps<AuthStackParamList, "Login">) {
  const { signIn, demoSignIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const supabaseReady = useMemo(() => isSupabaseConfigured(), [])

  const onSubmit = async () => {
    setError(null)
    setLoading(true)
    try {
      await signIn(email.trim(), password)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen scroll contentStyle={{ justifyContent: "center", flexGrow: 1 }}>
      <Text style={styles.brand}>Quantrion</Text>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.sub}>Same account as the web platform — email, Google, or Apple.</Text>

      <GlassCard style={{ gap: spacing.md, marginTop: spacing.xl }}>
        <TextInput
          accessibilityLabel="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={colors.mutedForeground}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          accessibilityLabel="Password"
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={colors.mutedForeground}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <QButton title="Sign in" onPress={onSubmit} loading={loading} disabled={!email || !password} />
        {!supabaseReady ? (
          <QButton title="Continue with demo" variant="secondary" onPress={() => void demoSignIn()} />
        ) : (
          <QButton title="Try demo mode" variant="ghost" onPress={() => void demoSignIn()} />
        )}
      </GlassCard>

      <Pressable onPress={() => navigation.navigate("Signup")} style={styles.linkWrap}>
        <Text style={styles.link}>Create an account</Text>
      </Pressable>
    </Screen>
  )
}

function SignupScreen({ navigation }: NativeStackScreenProps<AuthStackParamList, "Signup">) {
  const { signUp } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setError(null)
    setLoading(true)
    try {
      await signUp(email.trim(), password, name.trim() || undefined)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign up failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Screen scroll contentStyle={{ justifyContent: "center", flexGrow: 1 }}>
      <Text style={styles.brand}>Quantrion</Text>
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.sub}>Join the same Quantrion learning OS used on web.</Text>
      <GlassCard style={{ gap: spacing.md, marginTop: spacing.xl }}>
        <TextInput
          accessibilityLabel="Name"
          placeholder="Name"
          placeholderTextColor={colors.mutedForeground}
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          accessibilityLabel="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={colors.mutedForeground}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          accessibilityLabel="Password"
          secureTextEntry
          placeholder="Password (min 8)"
          placeholderTextColor={colors.mutedForeground}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <QButton
          title="Create account"
          onPress={onSubmit}
          loading={loading}
          disabled={!email || password.length < 8}
        />
      </GlassCard>
      <Pressable onPress={() => navigation.goBack()} style={styles.linkWrap}>
        <Text style={styles.link}>Already have an account?</Text>
      </Pressable>
    </Screen>
  )
}

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  brand: {
    color: colors.accent,
    fontSize: typography.brand,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  title: {
    color: colors.foreground,
    fontSize: typography.h1,
    fontWeight: "700",
    marginTop: spacing.sm,
  },
  sub: {
    color: colors.mutedForeground,
    fontSize: typography.body,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  input: {
    minHeight: touch.min,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    color: colors.foreground,
    backgroundColor: colors.secondary,
    fontSize: typography.body,
  },
  error: { color: colors.destructive, fontSize: typography.caption },
  linkWrap: { marginTop: spacing.xl, alignItems: "center" },
  link: { color: colors.accent, fontWeight: "600" },
})

export function BiometricLockScreen() {
  const { unlockWithBiometrics, signOut } = useAuth()
  const [busy, setBusy] = useState(false)

  return (
    <Screen contentStyle={{ justifyContent: "center", padding: spacing.xl, gap: spacing.lg }}>
      <Text style={styles.brand}>Quantrion</Text>
      <Text style={styles.title}>Unlock</Text>
      <Text style={styles.sub}>Use Face ID / fingerprint to continue your session.</Text>
      {busy ? <ActivityIndicator color={colors.primary} /> : null}
      <QButton
        title="Unlock with biometrics"
        onPress={async () => {
          setBusy(true)
          await unlockWithBiometrics()
          setBusy(false)
        }}
      />
      <QButton title="Sign out" variant="ghost" onPress={() => void signOut()} />
    </Screen>
  )
}

export function OnboardingScreen() {
  const { completeOnboarding } = useAuth()
  const slides = [
    {
      title: "Your AI learning OS",
      body: "Dashboard, Learn, QuickLearn, AI Tutor, and Library — optimized for touch.",
    },
    {
      title: "Study anywhere",
      body: "Download videos, books, notes, and quizzes. Sync automatically when you are online.",
    },
    {
      title: "Stay sharp",
      body: "Daily reminders, Performance IQ alerts, and Knowledge DNA updates on your schedule.",
    },
  ]
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  return (
    <Screen contentStyle={{ justifyContent: "flex-end", padding: spacing.xl, gap: spacing.lg, flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.brand}>Quantrion</Text>
        <Text style={[styles.title, { marginTop: spacing.xl }]}>{slide.title}</Text>
        <Text style={styles.sub}>{slide.body}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 6, marginBottom: spacing.md }}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={{
              height: 6,
              flex: 1,
              borderRadius: 99,
              backgroundColor: i === index ? colors.primary : colors.border,
            }}
          />
        ))}
      </View>
      {index < slides.length - 1 ? (
        <QButton title="Next" onPress={() => setIndex((v) => v + 1)} />
      ) : (
        <QButton title="Get started" onPress={() => void completeOnboarding()} />
      )}
    </Screen>
  )
}
