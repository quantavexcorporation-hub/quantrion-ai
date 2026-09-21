import React, { useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as DocumentPicker from "expo-document-picker"
import { Camera, Paperclip, Send } from "lucide-react-native"
import { ScreenHeader } from "../components/ui/primitives"
import { colors, radius, spacing, touch, typography } from "../theme/tokens"
import { aiApi } from "../lib/api"
import { hapticSelection } from "../services/haptics"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Msg = { id: string; role: "user" | "assistant"; text: string }

export function AITutorScreen() {
  const insets = useSafeAreaInsets()
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "I am your Quantrion AI Tutor — same intelligence as web. Ask a doubt, generate MCQs, or attach a problem photo.",
    },
  ])

  const send = async () => {
    const q = input.trim()
    if (!q || busy) return
    await hapticSelection()
    setInput("")
    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", text: q }
    setMessages((m) => [...m, userMsg])
    setBusy(true)
    try {
      const res = (await aiApi.doubt({ question: q })) as { answer?: string; explanation?: string }
      const text =
        res.answer ||
        res.explanation ||
        (typeof res === "object" ? JSON.stringify(res).slice(0, 800) : "Response received.")
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: "assistant", text }])
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          text:
            e instanceof Error
              ? `Could not reach AI API (${e.message}). Ensure EXPO_PUBLIC_API_URL points at your Quantrion web server.`
              : "AI request failed.",
        },
      ])
    } finally {
      setBusy(false)
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    })
    if (!result.canceled && result.assets[0]) {
      setInput((v) => `${v}${v ? " " : ""}[Attached image: ${result.assets[0].fileName ?? "photo"}]`)
    }
  }

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync()
    if (!perm.granted) return
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 })
    if (!result.canceled && result.assets[0]) {
      setInput((v) => `${v}${v ? " " : ""}[Camera capture attached]`)
    }
  }

  const pickDoc = async () => {
    const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true })
    if (!result.canceled && result.assets?.[0]) {
      setInput((v) => `${v}${v ? " " : ""}[Document: ${result.assets[0].name}]`)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={8}
    >
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: insets.top + 8 }}>
        <ScreenHeader title="AI Tutor" subtitle="Doubts, MCQs, adaptive explanations." />
      </View>
      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.role === "user" ? styles.user : styles.assistant,
            ]}
          >
            <Text style={styles.bubbleText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={[styles.composer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <View style={styles.tools}>
          <Pressable accessibilityLabel="Camera" onPress={() => void takePhoto()} style={styles.tool}>
            <Camera color={colors.foreground} size={18} />
          </Pressable>
          <Pressable accessibilityLabel="Image" onPress={() => void pickImage()} style={styles.tool}>
            <Paperclip color={colors.foreground} size={18} />
          </Pressable>
          <Pressable accessibilityLabel="Document" onPress={() => void pickDoc()} style={styles.tool}>
            <Text style={{ color: colors.mutedForeground, fontSize: 11, fontWeight: "700" }}>DOC</Text>
          </Pressable>
        </View>
        <TextInput
          accessibilityLabel="Ask AI Tutor"
          style={styles.input}
          placeholder="Ask a doubt…"
          placeholderTextColor={colors.mutedForeground}
          value={input}
          onChangeText={setInput}
          multiline
        />
        <Pressable
          accessibilityLabel="Send"
          onPress={() => void send()}
          style={[styles.send, (!input.trim() || busy) && { opacity: 0.5 }]}
          disabled={!input.trim() || busy}
        >
          {busy ? <ActivityIndicator color="#fff" /> : <Send color="#fff" size={18} />}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "92%",
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 1,
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  assistant: {
    alignSelf: "flex-start",
    backgroundColor: colors.card,
    borderColor: colors.border,
  },
  bubbleText: { color: colors.foreground, fontSize: typography.body, lineHeight: 21 },
  composer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    backgroundColor: colors.sidebar,
  },
  tools: { flexDirection: "row", gap: 4, marginBottom: 4 },
  tool: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  input: {
    flex: 1,
    minHeight: touch.min,
    maxHeight: 120,
    color: colors.foreground,
    fontSize: typography.body,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  send: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
})
