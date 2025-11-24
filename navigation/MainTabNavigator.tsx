import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, Platform } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";

import EditorStackNavigator from "@/navigation/EditorStackNavigator";
import GalleryStackNavigator from "@/navigation/GalleryStackNavigator";
import { Colors } from "@/constants/theme";

export type MainTabParamList = {
  EditorTab: undefined;
  GalleryTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabBarIcon({
  focused,
  icon,
}: {
  focused: boolean;
  icon: keyof typeof Feather.glyphMap;
}) {
  const scale = useSharedValue(focused ? 1.15 : 1);

  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.15 : 1, {
      damping: 15,
      stiffness: 400,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Feather
        name={icon}
        size={24}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    </Animated.View>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="EditorTab"
      screenOptions={{
        tabBarActiveTintColor: Colors.tabIconSelected,
        tabBarInactiveTintColor: Colors.tabIconDefault,
        tabBarStyle: {
          position: "absolute",
          height: 70,
          backgroundColor: Platform.select({
            ios: "transparent",
            android: Colors.glass.secondary,
          }),
          borderTopWidth: 1,
          borderTopColor: Colors.glass.border,
          elevation: 0,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
          ) : (
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: Colors.glass.secondary },
              ]}
            />
          ),
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="EditorTab"
        component={EditorStackNavigator}
        options={{
          title: "Editor",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon="edit-3" />
          ),
        }}
      />
      <Tab.Screen
        name="GalleryTab"
        component={GalleryStackNavigator}
        options={{
          title: "Galeria",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon="image" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
