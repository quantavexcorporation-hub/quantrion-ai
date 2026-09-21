import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { colors, spacing, typography } from "../../theme/tokens"
import { QButton } from "./primitives"

type Props = {
  children: React.ReactNode
}

type State = { hasError: boolean; message?: string }

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.wrap} accessibilityRole="alert">
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.sub}>{this.state.message ?? "Please try again."}</Text>
          <QButton title="Retry" onPress={() => this.setState({ hasError: false })} />
        </View>
      )
    }
    return this.props.children
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xxl,
    gap: spacing.md,
  },
  title: {
    color: colors.foreground,
    fontSize: typography.h2,
    fontWeight: "700",
  },
  sub: {
    color: colors.mutedForeground,
    textAlign: "center",
    marginBottom: spacing.md,
  },
})
