import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { ThemedText } from "./ThemedText";
import { Colors, BorderRadius, Spacing, FontFamily } from "@/constants/theme";

interface GlassInputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
}

export function GlassInput({
  label,
  containerStyle,
  style,
  ...props
}: GlassInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const scale = useSharedValue(1);
  const borderWidth = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderWidth: borderWidth.value,
  }));

  const handleFocus = () => {
    setIsFocused(true);
    scale.value = withSpring(1.02, { damping: 15, stiffness: 400 });
    borderWidth.value = withSpring(2);
  };

  const handleBlur = () => {
    setIsFocused(false);
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    borderWidth.value = withSpring(1);
  };

  return (
    <View style={containerStyle}>
      {label ? (
        <ThemedText type="caption" color="secondary" style={styles.label}>
          {label}
        </ThemedText>
      ) : null}
      <Animated.View
        style={[
          styles.inputContainer,
          {
            backgroundColor: Colors.glass.tertiary,
            borderColor: isFocused
              ? Colors.text.accent
              : Colors.glass.border,
          },
          animatedStyle,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: Colors.text.primary,
              fontFamily: FontFamily.poppinsRegular,
            },
            style,
          ]}
          placeholderTextColor={Colors.text.tertiary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: Spacing.sm,
    fontWeight: "600",
  },
  inputContainer: {
    borderRadius: BorderRadius.input,
    borderWidth: 1,
    overflow: "hidden",
  },
  input: {
    height: Spacing.inputHeight,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
  },
});
