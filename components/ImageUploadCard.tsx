import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";

import { ThemedText } from "./ThemedText";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";

interface ImageUploadCardProps {
  onUpload: () => void;
  isLoading?: boolean;
}

export function ImageUploadCard({ onUpload, isLoading }: ImageUploadCardProps) {
  return (
    <Animated.View entering={FadeIn.duration(500)}>
      <Pressable
        onPress={onUpload}
        disabled={isLoading}
        style={[styles.uploadZone, isLoading && styles.uploadZoneDisabled]}
      >
        <View style={styles.uploadContent}>
          <View style={styles.iconContainer}>
            <Feather name="upload-cloud" size={48} color={Colors.primary} />
          </View>
          <ThemedText type="h3" style={styles.uploadTitle}>
            Upload de Imagem
          </ThemedText>
          <ThemedText type="caption" color="secondary" style={styles.uploadText}>
            Toque para selecion ar da galeria ou câmera
          </ThemedText>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  uploadZone: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Colors.primary,
    borderRadius: BorderRadius.card,
    padding: Spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadZoneDisabled: {
    opacity: 0.5,
  },
  uploadContent: {
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: Spacing.md,
  },
  uploadTitle: {
    marginBottom: Spacing.xs,
    textAlign: "center",
  },
  uploadText: {
    textAlign: "center",
  },
});
