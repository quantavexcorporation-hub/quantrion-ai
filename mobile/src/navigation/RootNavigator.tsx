import React, { useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"
import { NavigationContainer, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as Linking from "expo-linking"
import { useAuth } from "../providers/AuthProvider"
import type { RootStackParamList } from "./types"
import { AuthNavigator, BiometricLockScreen, OnboardingScreen } from "./AuthNavigator"
import { MainTabNavigator } from "./MainTabNavigator"
import { colors } from "../theme/tokens"

const Stack = createNativeStackNavigator<RootStackParamList>()

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.card,
    primary: colors.primary,
    text: colors.foreground,
    border: colors.border,
    notification: colors.accent,
  },
}

const linking = {
  prefixes: [Linking.createURL("/"), "quantrion://", "https://quantrion.ai", "https://www.quantrion.ai"],
  config: {
    screens: {
      Main: {
        screens: {
          Home: "home",
          Learn: "learn",
          QuickLearn: "quick-learn",
          AI: "ai",
          Library: "library",
          Profile: "profile",
          More: {
            screens: {
              MoreHome: "more",
              KnowledgeDNA: "knowledge-dna",
              PerformanceIQ: "performance-iq",
              Downloads: "downloads",
              Settings: "settings",
            },
          },
        },
      },
      Auth: {
        screens: {
          Login: "login",
          Signup: "signup",
        },
      },
    },
  },
}

function SplashGate() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  )
}

export function RootNavigator() {
  const { loading, user, locked, onboardingDone } = useAuth()
  const [boot, setBoot] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setBoot(false), 600)
    return () => clearTimeout(t)
  }, [])

  if (loading || boot) {
    return <SplashGate />
  }

  return (
    <NavigationContainer theme={navTheme} linking={linking as never}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
        {!onboardingDone ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !user ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : locked ? (
          <Stack.Screen name="BiometricLock" component={BiometricLockScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
