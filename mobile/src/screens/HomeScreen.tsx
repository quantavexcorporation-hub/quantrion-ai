import React, { useCallback, useState } from "react"
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import {
  BrainCircuit,
  Library,
  Sparkles,
  Zap,
  BookOpen,
  Bell,
} from "lucide-react-native"
import {
  GlassCard,
  OfflineBanner,
  QButton,
  Screen,
  ScreenHeader,
  SectionHeader,
} from "../components/ui/primitives"
import { colors, radius, spacing, typography } from "../theme/tokens"
import { useAuth } from "../providers/AuthProvider"
import { getNetworkOnline } from "../services/offline"
import type { MainTabParamList } from "../navigation/types"

const shortcuts = [
  { title: "Learn", subtitle: "Adaptive paths", icon: BookOpen, tab: "Learn" as const },
  { title: "QuickLearn", subtitle: "AI Shorts", icon: Zap, tab: "QuickLearn" as const },
  { title: "AI Tutor", subtitle: "Ask anything", icon: Sparkles, tab: "AI" as const },
  { title: "Library", subtitle: "Smart books", icon: Library, tab: "Library" as const },
]

export function HomeScreen() {
  const { user } = useAuth()
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>()
  const { width } = useWindowDimensions()
  const cols = width >= 900 ? 3 : width >= 600 ? 2 : 2
  const [offline, setOffline] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    setOffline(!(await getNetworkOnline()))
    setRefreshing(false)
  }, [])

  return (
    <Screen scroll refreshing={refreshing} onRefresh={onRefresh}>
      <OfflineBanner visible={offline} />
      <ScreenHeader
        title="Command Center"
        subtitle={`Hi ${user?.name ?? "learner"} — continue where you left off.`}
        right={
          <Pressable
            accessibilityLabel="Notifications"
            onPress={() => navigation.navigate("More")}
            style={styles.iconBtn}
          >
            <Bell color={colors.foreground} size={20} />
          </Pressable>
        }
      />

      <GlassCard style={styles.goal}>
        <Text style={styles.kicker}>Today&apos;s Goal</Text>
        <Text style={styles.goalTitle}>Complete 1 QuickLearn + 20 practice MCQs</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: "42%" }]} />
        </View>
        <Text style={styles.meta}>42% complete · streak 6 days</Text>
        <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
          <View style={{ flex: 1 }}>
            <QButton title="QuickLearn" onPress={() => navigation.navigate("QuickLearn")} />
          </View>
          <View style={{ flex: 1 }}>
            <QButton title="Ask AI" variant="secondary" onPress={() => navigation.navigate("AI")} />
          </View>
        </View>
      </GlassCard>

      <SectionHeader title="Jump in" subtitle="Core learning surfaces" />
      <View style={[styles.grid, { gap: spacing.md }]}>
        {shortcuts.map((item) => {
          const Icon = item.icon
          const cardWidth = cols === 3 ? "31%" : "48%"
          return (
            <GlassCard
              key={item.title}
              onPress={() => navigation.navigate(item.tab)}
              style={{ width: cardWidth as `${number}%`, flexGrow: 1 }}
            >
              <Icon color={colors.primary} size={22} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSub}>{item.subtitle}</Text>
            </GlassCard>
          )
        })}
      </View>

      <SectionHeader title="Intelligence" subtitle="Same signals as web" />
      <GlassCard
        onPress={() => navigation.navigate("More")}
        style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}
      >
        <BrainCircuit color={colors.accent} size={24} />
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Performance IQ & Knowledge DNA</Text>
          <Text style={styles.cardSub}>Open from More for full analytics modules</Text>
        </View>
      </GlassCard>
    </Screen>
  )
}

const styles = StyleSheet.create({
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  goal: { gap: spacing.sm },
  kicker: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  goalTitle: {
    color: colors.foreground,
    fontSize: typography.h3,
    fontWeight: "700",
    lineHeight: 24,
  },
  progressTrack: {
    height: 8,
    borderRadius: 99,
    backgroundColor: colors.secondary,
    overflow: "hidden",
    marginTop: spacing.sm,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 99,
  },
  meta: { color: colors.mutedForeground, fontSize: typography.caption },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cardTitle: {
    color: colors.foreground,
    fontWeight: "700",
    fontSize: typography.body,
    marginTop: spacing.sm,
  },
  cardSub: { color: colors.mutedForeground, fontSize: typography.caption, marginTop: 2 },
})
