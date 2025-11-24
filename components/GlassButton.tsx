import React from "react";
import { Pressable, StyleSheet, ViewStyle, TextStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

import { ThemedText } from "./ThemedText";
import {
  Colors,
  GradientColors,
  BorderRadius,
  Spacing,
  Shadows,
} from "@/constants/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface GlassButtonProps {
  children: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function GlassButton({
  children,
  onPress,
  variant = "primary",
  style,
  textStyle,
}: GlassButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
    opacity.value = withSpring(0.85);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    opacity.value = withSpring(1);
  };

  if (variant === "primary") {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.button, Shadows.button, animatedStyle, style]}
      >
        <LinearGradient
          colors={GradientColors.primary.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <ThemedText type="body" style={[styles.text, textStyle]}>
            {children}
          </ThemedText>
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.button,
        styles.secondaryButton,
        Shadows.button,
        animatedStyle,
        style,
      ]}
    >
      <ThemedText type="body" style={[styles.text, textStyle]}>
        {children}
      </ThemedText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.button,
    overflow: "hidden",
    minHeight: Spacing.buttonHeight,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  secondaryButton: {
    backgroundColor: Colors.glass.secondary,
    borderWidth: 1,
    borderColor: Colors.glass.border,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  text: {
    color: Colors.text.primary,
    fontWeight: "600",
  },
});
