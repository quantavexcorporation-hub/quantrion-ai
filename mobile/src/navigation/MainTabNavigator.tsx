import React from "react"
import { Platform } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  BookOpen,
  Home,
  Library,
  MoreHorizontal,
  Sparkles,
  UserRound,
  Zap,
} from "lucide-react-native"
import type { MainTabParamList } from "./types"
import { colors } from "../theme/tokens"
import { HomeScreen } from "../screens/HomeScreen"
import { LearnScreen } from "../screens/LearnScreen"
import { QuickLearnScreen } from "../screens/QuickLearnScreen"
import { AITutorScreen } from "../screens/AITutorScreen"
import { LibraryScreen } from "../screens/LibraryScreen"
import { ProfileScreen } from "../screens/ProfileScreen"
import { MoreNavigator } from "../screens/MoreNavigator"
import { hapticSelection } from "../services/haptics"

const Tab = createBottomTabNavigator<MainTabParamList>()

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: colors.sidebar,
          borderTopColor: colors.border,
          height: Platform.OS === "ios" ? 88 : 64,
          paddingTop: 6,
          paddingBottom: Platform.OS === "ios" ? 28 : 10,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
      screenListeners={{
        tabPress: () => {
          void hapticSelection()
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="QuickLearn"
        component={QuickLearnScreen}
        options={{
          title: "Quick",
          tabBarIcon: ({ color, size }) => <Zap color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="AI"
        component={AITutorScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Sparkles color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Library color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <MoreHorizontal color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}
