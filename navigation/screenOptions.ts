import { Platform } from "react-native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import { Colors } from "@/constants/theme";

interface ScreenOptionsParams {
  transparent?: boolean;
}

export const getCommonScreenOptions = ({
  transparent = true,
}: ScreenOptionsParams = {}): NativeStackNavigationOptions => ({
  headerTitleAlign: "center",
  headerTransparent: transparent,
  headerBlurEffect: "dark",
  headerTintColor: Colors.text.primary,
  headerStyle: {
    backgroundColor: Platform.select({
      ios: "transparent",
      android: transparent ? "transparent" : Colors.glass.secondary,
      web: transparent ? "transparent" : Colors.glass.secondary,
    }),
  },
  gestureEnabled: true,
  gestureDirection: "horizontal",
  fullScreenGestureEnabled: true,
  contentStyle: {
    backgroundColor: "transparent",
  },
  headerShadowVisible: false,
});
