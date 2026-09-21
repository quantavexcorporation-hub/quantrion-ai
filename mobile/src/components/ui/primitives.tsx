import React from "react"
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ScrollViewProps,
  type ViewStyle,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { colors, radius, spacing, touch, typography } from "../../theme/tokens"
import { hapticSelection } from "../../services/haptics"

export function Screen({
  children,
  scroll,
  refreshing,
  onRefresh,
  style,
  contentStyle,
  edges = ["top", "left", "right"],
}: {
  children: React.ReactNode
  scroll?: boolean
  refreshing?: boolean
  onRefresh?: () => void
  style?: ViewStyle
  contentStyle?: ViewStyle
  edges?: ("top" | "right" | "bottom" | "left")[]
}) {
  if (scroll) {
    return (
      <SafeAreaView style={[styles.safe, style]} edges={edges}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, contentStyle]}
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={Boolean(refreshing)}
                onRefresh={onRefresh}
                tintColor={colors.primary}
                colors={[colors.primary]}
              />
            ) : undefined
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={[styles.safe, style]} edges={edges}>
      <View style={[styles.fill, contentStyle]}>{children}</View>
    </SafeAreaView>
  )
}

export function GlassCard({
  children,
  style,
  onPress,
  onLongPress,
}: {
  children: React.ReactNode
  style?: ViewStyle
  onPress?: () => void
  onLongPress?: () => void
}) {
  if (onPress || onLongPress) {
    return (
      <Pressable
        onPress={async () => {
          await hapticSelection()
          onPress?.()
        }}
        onLongPress={onLongPress}
        style={({ pressed }) => [
          styles.card,
          style,
          pressed && { opacity: 0.92, transform: [{ scale: 0.995 }] },
        ]}
        accessibilityRole="button"
      >
        {children}
      </Pressable>
    )
  }
  return <View style={[styles.card, style]}>{children}</View>
}

export function QButton({
  title,
  onPress,
  variant = "primary",
  disabled,
  loading,
}: {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "ghost" | "danger"
  disabled?: boolean
  loading?: boolean
}) {
  const bg =
    variant === "primary"
      ? colors.primary
      : variant === "secondary"
        ? colors.secondary
        : variant === "danger"
          ? colors.destructive
          : "transparent"
  const color =
    variant === "ghost" ? colors.accent : colors.primaryForeground

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={async () => {
        await hapticSelection()
        onPress()
      }}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: bg, borderColor: variant === "ghost" ? colors.border : bg },
        (disabled || loading) && { opacity: 0.5 },
        pressed && { opacity: 0.88 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <Text style={[styles.btnText, { color }]}>{title}</Text>
      )}
    </Pressable>
  )
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: React.ReactNode
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sectionSub}>{subtitle}</Text> : null}
      </View>
      {action}
    </View>
  )
}

export function EmptyState({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: React.ReactNode
}) {
  return (
    <View style={styles.empty} accessibilityRole="summary">
      <Text style={styles.emptyTitle}>{title}</Text>
      {subtitle ? <Text style={styles.emptySub}>{subtitle}</Text> : null}
      {action ? <View style={{ marginTop: spacing.lg }}>{action}</View> : null}
    </View>
  )
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <View style={styles.empty}>
      <ActivityIndicator color={colors.primary} size="large" />
      <Text style={[styles.emptySub, { marginTop: spacing.md }]}>{label}</Text>
    </View>
  )
}

export function OfflineBanner({ visible }: { visible: boolean }) {
  if (!visible) return null
  return (
    <View style={styles.offline} accessibilityLiveRegion="polite">
      <Text style={styles.offlineText}>Offline — showing downloaded content</Text>
    </View>
  )
}

export function ScreenHeader({
  title,
  subtitle,
  right,
}: {
  title: string
  subtitle?: string
  right?: React.ReactNode
}) {
  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        <Text style={styles.brand} accessibilityRole="header">
          Quantrion
        </Text>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle ? <Text style={styles.headerSub}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fill: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.glassFill,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: spacing.lg,
  },
  btn: {
    minHeight: touch.min,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
  },
  btnText: {
    fontSize: typography.body,
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    color: colors.foreground,
    fontSize: typography.h3,
    fontWeight: "700",
  },
  sectionSub: {
    color: colors.mutedForeground,
    fontSize: typography.caption,
    marginTop: 2,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    color: colors.foreground,
    fontSize: typography.h3,
    fontWeight: "700",
    textAlign: "center",
  },
  emptySub: {
    color: colors.mutedForeground,
    fontSize: typography.caption,
    textAlign: "center",
    marginTop: spacing.sm,
    lineHeight: 18,
  },
  offline: {
    backgroundColor: colors.yellow,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  offlineText: {
    color: "#0B1220",
    fontSize: typography.caption,
    fontWeight: "600",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  brand: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  headerTitle: {
    color: colors.foreground,
    fontSize: typography.h1,
    fontWeight: "700",
    marginTop: 2,
  },
  headerSub: {
    color: colors.mutedForeground,
    fontSize: typography.caption,
    marginTop: 4,
    lineHeight: 18,
  },
})

export type { ScrollViewProps }
