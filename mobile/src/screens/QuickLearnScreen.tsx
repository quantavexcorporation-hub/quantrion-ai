import React, { useRef, useState } from "react"
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewToken,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Volume2, VolumeX, Dna, Sparkles } from "lucide-react-native"
import { colors, radius, spacing, typography } from "../theme/tokens"
import { hapticSelection } from "../services/haptics"

const { height: SCREEN_H } = Dimensions.get("window")

const shorts = [
  {
    id: "ql-1",
    title: "Maxwell’s equations in 60s",
    subject: "Physics",
    tip: "Link flux → Faraday before memorizing forms",
  },
  {
    id: "ql-2",
    title: "SN1 vs SN2 — decide in one glance",
    subject: "Chemistry",
    tip: "Substrate + nucleophile strength first",
  },
  {
    id: "ql-3",
    title: "Integration by parts pattern",
    subject: "Math",
    tip: "LIATE ordering beats random substitution",
  },
]

export function QuickLearnScreen() {
  const insets = useSafeAreaInsets()
  const [index, setIndex] = useState(0)
  const [muted, setMuted] = useState(true)
  const itemHeight = SCREEN_H

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index != null) setIndex(viewableItems[0].index)
  }).current

  return (
    <View style={styles.root}>
      <FlatList
        data={shorts}
        keyExtractor={(i) => i.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
        getItemLayout={(_, i) => ({ length: itemHeight, offset: itemHeight * i, index: i })}
        renderItem={({ item }) => (
          <View style={[styles.slide, { height: itemHeight, paddingTop: insets.top + 12, paddingBottom: insets.bottom + 88 }]}>
            <Text style={styles.brand}>Quantrion · QuickLearn</Text>
            <View style={styles.stage}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.tip}>{item.tip}</Text>
            </View>
            <View style={styles.rail}>
              <Pressable
                accessibilityLabel={muted ? "Unmute" : "Mute"}
                onPress={async () => {
                  await hapticSelection()
                  setMuted((m) => !m)
                }}
                style={styles.railBtn}
              >
                {muted ? <VolumeX color="#fff" size={22} /> : <Volume2 color="#fff" size={22} />}
              </Pressable>
              <Pressable accessibilityLabel="AI explain" style={styles.railBtn}>
                <Sparkles color="#fff" size={22} />
              </Pressable>
              <Pressable accessibilityLabel="Sync Knowledge DNA" style={styles.railBtn}>
                <Dna color="#fff" size={22} />
              </Pressable>
            </View>
          </View>
        )}
      />
      <Text style={[styles.counter, { bottom: insets.bottom + 96 }]}>
        {index + 1} / {shorts.length} · swipe
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#05080F" },
  slide: {
    paddingHorizontal: spacing.lg,
    justifyContent: "space-between",
  },
  brand: {
    color: colors.accent,
    fontWeight: "700",
    fontSize: typography.caption,
    letterSpacing: 0.4,
  },
  stage: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 72,
    gap: spacing.md,
  },
  subject: { color: colors.primary, fontWeight: "700", fontSize: typography.caption },
  title: {
    color: colors.foreground,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
  },
  tip: { color: colors.mutedForeground, fontSize: typography.body, lineHeight: 22 },
  rail: {
    position: "absolute",
    right: spacing.lg,
    bottom: 140,
    gap: spacing.md,
  },
  railBtn: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: "rgba(14,21,36,0.75)",
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  counter: {
    position: "absolute",
    alignSelf: "center",
    color: colors.mutedForeground,
    fontSize: typography.caption,
  },
})
