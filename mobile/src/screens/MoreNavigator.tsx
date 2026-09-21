import React, { useCallback, useState } from "react"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  BrainCircuit,
  ClipboardList,
  Download,
  GraduationCap,
  HelpCircle,
  Layers3,
  NotebookPen,
  Rocket,
  Settings,
  Bell,
  BarChart3,
  FileQuestion,
  Search,
  Sparkle,
} from "lucide-react-native"
import {
  EmptyState,
  GlassCard,
  QButton,
  Screen,
  ScreenHeader,
  SectionHeader,
} from "../components/ui/primitives"
import { colors, spacing, typography } from "../theme/tokens"
import type { MoreStackParamList } from "../navigation/types"
import { clearDownloadsByKind, formatBytes, listDownloads, removeDownload } from "../services/downloads"
import type { DownloadItem } from "../lib/types"
import {
  isBiometricEnabled,
  setBiometricEnabled,
} from "../services/biometrics"
import { cancelAllReminders } from "../services/notifications"

const Stack = createNativeStackNavigator<MoreStackParamList>()

const moreLinks: {
  title: string
  subtitle: string
  icon: typeof Settings
  route: keyof MoreStackParamList
}[] = [
  { title: "Performance IQ", subtitle: "Progress intelligence", icon: BrainCircuit, route: "PerformanceIQ" },
  { title: "Knowledge DNA", subtitle: "Concept graph", icon: BrainCircuit, route: "KnowledgeDNA" },
  { title: "Study Material", subtitle: "Notes & packs", icon: NotebookPen, route: "StudyMaterial" },
  { title: "Mock Tests", subtitle: "Full exams", icon: Layers3, route: "MockTests" },
  { title: "Practice", subtitle: "MCQ drills", icon: FileQuestion, route: "Practice" },
  { title: "Analytics", subtitle: "Trends", icon: BarChart3, route: "Analytics" },
  { title: "Exams", subtitle: "Q1 gateway", icon: ClipboardList, route: "Exams" },
  { title: "Future of Industries", subtitle: "Frontier", icon: GraduationCap, route: "FutureCourses" },
  { title: "Explore Industries", subtitle: "Q2", icon: Rocket, route: "Industrial" },
  { title: "Downloads", subtitle: "Offline library", icon: Download, route: "Downloads" },
  { title: "Notifications", subtitle: "Reminders", icon: Bell, route: "Notifications" },
  { title: "Search", subtitle: "Find anything", icon: Search, route: "Search" },
  { title: "Settings", subtitle: "Preferences", icon: Settings, route: "Settings" },
  { title: "Help", subtitle: "Support", icon: HelpCircle, route: "Help" },
  { title: "Upgrade", subtitle: "Plans", icon: Sparkle, route: "Upgrade" },
]

function MoreHome({ navigation }: NativeStackScreenProps<MoreStackParamList, "MoreHome">) {
  return (
    <Screen scroll>
      <ScreenHeader title="More" subtitle="Everything else from the Quantrion platform." />
      {moreLinks.map((item) => {
        const Icon = item.icon
        return (
          <GlassCard
            key={item.route}
            onPress={() => navigation.navigate(item.route)}
            style={styles.row}
          >
            <Icon color={colors.primary} size={22} />
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowSub}>{item.subtitle}</Text>
            </View>
          </GlassCard>
        )
      })}
    </Screen>
  )
}

function FeatureScreen({
  title,
  subtitle,
  body,
}: {
  title: string
  subtitle: string
  body: string
}) {
  return (
    <Screen scroll>
      <ScreenHeader title={title} subtitle={subtitle} />
      <GlassCard>
        <Text style={styles.body}>{body}</Text>
      </GlassCard>
      <Text style={styles.hint}>
        Wired to the same product module as web. Mobile layouts use native lists, sheets, and gestures.
      </Text>
    </Screen>
  )
}

function DownloadsScreen() {
  const [items, setItems] = useState<DownloadItem[]>([])
  const load = useCallback(async () => {
    setItems(await listDownloads())
  }, [])

  React.useEffect(() => {
    void load()
  }, [load])

  return (
    <Screen scroll onRefresh={load} refreshing={false}>
      <ScreenHeader title="Downloads" subtitle="Offline videos, books, notes, quizzes." />
      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        <View style={{ flex: 1 }}>
          <QButton title="Refresh" variant="secondary" onPress={() => void load()} />
        </View>
        <View style={{ flex: 1 }}>
          <QButton
            title="Clear all"
            variant="danger"
            onPress={() =>
              Alert.alert("Clear downloads?", "This removes offline catalog entries.", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Clear",
                  style: "destructive",
                  onPress: async () => {
                    await clearDownloadsByKind()
                    await load()
                  },
                },
              ])
            }
          />
        </View>
      </View>
      {!items.length ? (
        <EmptyState title="No downloads yet" subtitle="Download from Smart Library, Learn, or Mock Tests." />
      ) : (
        items.map((item) => (
          <GlassCard key={item.id} style={{ gap: 4 }}>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={styles.rowSub}>
              {item.kind} · {formatBytes(item.sizeBytes)} · {Math.round(item.progress * 100)}%
            </Text>
            <Pressable onPress={() => void removeDownload(item.id).then(load)}>
              <Text style={{ color: colors.destructive, marginTop: 8, fontWeight: "600" }}>Remove</Text>
            </Pressable>
          </GlassCard>
        ))
      )}
    </Screen>
  )
}

function SettingsScreen() {
  return (
    <Screen scroll>
      <ScreenHeader title="Settings" subtitle="Security, reminders, accessibility." />
      <SectionHeader title="Security" />
      <GlassCard style={{ gap: spacing.sm }}>
        <QButton
          title="Toggle biometric unlock"
          onPress={async () => {
            const on = await isBiometricEnabled()
            await setBiometricEnabled(!on)
            Alert.alert("Biometrics", !on ? "Enabled" : "Disabled")
          }}
        />
      </GlassCard>
      <SectionHeader title="Notifications" />
      <GlassCard>
        <QButton title="Cancel all local reminders" variant="secondary" onPress={() => void cancelAllReminders()} />
      </GlassCard>
      <SectionHeader title="Accessibility" />
      <GlassCard>
        <Text style={styles.body}>
          Dynamic type follows system font scale. Reduce Motion disables haptics and heavy animation.
        </Text>
      </GlassCard>
    </Screen>
  )
}

export function MoreNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.sidebar },
        headerTintColor: colors.foreground,
        headerTitleStyle: { fontWeight: "700" },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="MoreHome" component={MoreHome} options={{ headerShown: false }} />
      <Stack.Screen name="PerformanceIQ">
        {() => (
          <FeatureScreen
            title="Performance IQ"
            subtitle="Progress intelligence"
            body="Tracks readiness, weak concepts, and revision pressure — same signals as web Progress IQ."
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="KnowledgeDNA">
        {() => (
          <FeatureScreen
            title="Knowledge DNA"
            subtitle="Concept mastery graph"
            body="Your concept genome updates as you Learn, QuickLearn, and practice."
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="StudyMaterial">
        {() => (
          <FeatureScreen
            title="Study Material"
            subtitle="Notes & packs"
            body="Browse and download study packs for offline revision."
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Downloads" component={DownloadsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Help">
        {() => (
          <FeatureScreen
            title="Help"
            subtitle="Support"
            body="Reach Quantrion support, FAQs, and status. Deep-link: quantrion://help"
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Notifications">
        {() => (
          <FeatureScreen
            title="Notifications"
            subtitle="Study reminders"
            body="Daily study, revision, QuickLearn, mock tests, Performance alerts, Knowledge DNA, Future of Industries."
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="MockTests">
        {() => (
          <FeatureScreen
            title="Mock Tests"
            subtitle="Full-length exams"
            body="Timed mocks with offline save and sync when online."
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Exams">
        {() => (
          <FeatureScreen title="Exams" subtitle="Q1" body="Exam division gateway — same Q1 product surface." />
        )}
      </Stack.Screen>
      <Stack.Screen name="FutureCourses">
        {() => (
          <FeatureScreen
            title="Future of Industries"
            subtitle="Frontier"
            body="Learn what will create tomorrow's industries — plus personal development."
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Industrial">
        {() => (
          <FeatureScreen
            title="Explore Industries"
            subtitle="Q2"
            body="Learn today's industry domains — healthcare, IT & AI, manufacturing, and more."
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Practice">
        {() => (
          <FeatureScreen title="Practice" subtitle="MCQs" body="Generate and drill MCQs via /api/mcq." />
        )}
      </Stack.Screen>
      <Stack.Screen name="Analytics">
        {() => (
          <FeatureScreen title="Analytics" subtitle="Trends" body="Performance charts optimized for phone and tablet." />
        )}
      </Stack.Screen>
      <Stack.Screen name="Search">
        {() => (
          <FeatureScreen title="Search" subtitle="Global" body="Search lessons, books, tests, and AI history." />
        )}
      </Stack.Screen>
      <Stack.Screen name="Upgrade">
        {() => (
          <FeatureScreen
            title="Upgrade"
            subtitle="Plans"
            body="Stripe checkout continues via the existing web API when payments are configured."
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  rowTitle: { color: colors.foreground, fontWeight: "700", fontSize: typography.body },
  rowSub: { color: colors.mutedForeground, fontSize: typography.caption, marginTop: 2 },
  body: { color: colors.foreground, lineHeight: 22, fontSize: typography.body },
  hint: { color: colors.mutedForeground, fontSize: typography.caption, marginTop: spacing.sm },
})
