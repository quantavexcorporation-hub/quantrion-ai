import "react-native-gesture-handler"
import React, { useCallback, useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import * as SplashScreen from "expo-splash-screen"
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { AppProviders } from "./src/providers/AppProviders"
import { RootNavigator } from "./src/navigation/RootNavigator"
import { ErrorBoundary } from "./src/components/ui/ErrorBoundary"
import { colors } from "./src/theme/tokens"

SplashScreen.preventAutoHideAsync().catch(() => undefined)

export default function App() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (fontsLoaded) setReady(true)
  }, [fontsLoaded])

  const onLayout = useCallback(async () => {
    if (ready) await SplashScreen.hideAsync()
  }, [ready])

  if (!ready) return null

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }} onLayout={onLayout}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <AppProviders>
            <StatusBar style="light" />
            <RootNavigator />
          </AppProviders>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
