import React, { useState } from "react"
import { Alert, FlatList, StyleSheet, Text, View } from "react-native"
import * as Sharing from "expo-sharing"
import * as Clipboard from "expo-clipboard"
import { GlassCard, QButton, Screen, ScreenHeader } from "../components/ui/primitives"
import { colors, spacing, typography } from "../theme/tokens"
import { upsertDownload } from "../services/downloads"
import { hapticSuccess } from "../services/haptics"

const books = [
  { id: "b1", title: "Intelligence Physics Vol. 1", pages: 240, tag: "JEE" },
  { id: "b2", title: "Organic Reaction Atlas", pages: 180, tag: "NEET" },
  { id: "b3", title: "Calculus Mastery Notes", pages: 96, tag: "Boards" },
]

export function LibraryScreen() {
  const [refreshing, setRefreshing] = useState(false)

  const downloadBook = async (id: string, title: string) => {
    await upsertDownload({
      id,
      title,
      kind: "book",
      uri: `offline://book/${id}`,
      sizeBytes: 2_400_000,
      progress: 1,
    })
    await hapticSuccess()
    Alert.alert("Downloaded", `${title} is available offline in Downloads.`)
  }

  return (
    <Screen>
      <View style={{ paddingHorizontal: spacing.lg }}>
        <ScreenHeader
          title="Smart Library"
          subtitle="Intelligence books with mobile reading & offline downloads."
        />
      </View>
      <FlatList
        data={books}
        keyExtractor={(b) => b.id}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true)
          setTimeout(() => setRefreshing(false), 500)
        }}
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.md }}
        renderItem={({ item }) => (
          <GlassCard
            onLongPress={async () => {
              await Clipboard.setStringAsync(item.title)
              Alert.alert("Copied", "Title copied to clipboard")
            }}
          >
            <Text style={styles.tag}>{item.tag}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>{item.pages} pages · long-press to copy</Text>
            <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
              <View style={{ flex: 1 }}>
                <QButton title="Open" onPress={() => Alert.alert("Reader", "Cinematic reader opens here.")} />
              </View>
              <View style={{ flex: 1 }}>
                <QButton title="Download" variant="secondary" onPress={() => void downloadBook(item.id, item.title)} />
              </View>
            </View>
            <View style={{ marginTop: spacing.sm }}>
              <QButton
                title="Share"
                variant="ghost"
                onPress={async () => {
                  if (await Sharing.isAvailableAsync()) {
                    Alert.alert("Share", "Wire file URI when content is cached locally.")
                  }
                }}
              />
            </View>
          </GlassCard>
        )}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  tag: { color: colors.accent, fontWeight: "700", fontSize: typography.caption },
  title: { color: colors.foreground, fontWeight: "700", fontSize: typography.h3, marginTop: 4 },
  meta: { color: colors.mutedForeground, marginTop: 4, fontSize: typography.caption },
})
