import React, { useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { GlassCard, Screen, ScreenHeader } from "../components/ui/primitives"
import { colors, spacing, typography } from "../theme/tokens"

const modules = [
  { id: "1", subject: "Physics", topic: "Electromagnetism", progress: 68 },
  { id: "2", subject: "Chemistry", topic: "Organic Mechanisms", progress: 41 },
  { id: "3", subject: "Math", topic: "Calculus — Integrals", progress: 77 },
  { id: "4", subject: "Biology", topic: "Genetics", progress: 54 },
]

export function LearnScreen() {
  const [refreshing, setRefreshing] = useState(false)

  return (
    <Screen>
      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <ScreenHeader
          title="Learn"
          subtitle="Adaptive learning paths from your Quantrion curriculum."
        />
      </View>
      <FlatList
        data={modules}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl, gap: spacing.md }}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true)
          setTimeout(() => setRefreshing(false), 600)
        }}
        renderItem={({ item }) => (
          <GlassCard>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.topic}>{item.topic}</Text>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${item.progress}%` }]} />
            </View>
            <Text style={styles.meta}>{item.progress}% mastery</Text>
          </GlassCard>
        )}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  subject: { color: colors.accent, fontSize: typography.caption, fontWeight: "700" },
  topic: { color: colors.foreground, fontSize: typography.h3, fontWeight: "700", marginTop: 4 },
  track: {
    height: 8,
    borderRadius: 99,
    backgroundColor: colors.secondary,
    marginTop: spacing.md,
    overflow: "hidden",
  },
  fill: { height: "100%", backgroundColor: colors.primary },
  meta: { color: colors.mutedForeground, marginTop: spacing.sm, fontSize: typography.caption },
})
