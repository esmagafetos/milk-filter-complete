import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { GlassCard } from "@/components/GlassCard";
import Spacer from "@/components/Spacer";
import { Spacing } from "@/constants/theme";

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      <ScreenScrollView>
        <Animated.View entering={FadeInDown.duration(600).delay(100)}>
          <ThemedText type="h1" style={styles.title}>
            Galeria
          </ThemedText>
          <ThemedText type="caption" color="secondary" style={styles.subtitle}>
            Histórico de imagens processadas
          </ThemedText>
        </Animated.View>

        <Spacer height={Spacing.xl} />

        <Animated.View entering={FadeInDown.duration(600).delay(200)}>
          <GlassCard level={2}>
            <View style={styles.emptyState}>
              <ThemedText type="h3" style={styles.emptyTitle}>
                Nenhuma imagem processada
              </ThemedText>
              <Spacer height={Spacing.sm} />
              <ThemedText type="caption" color="secondary">
                Processe imagens na aba Editor para vê-las aqui
              </ThemedText>
            </View>
          </GlassCard>
        </Animated.View>

        <Spacer height={Spacing.xxl} />
      </ScreenScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
  },
  emptyTitle: {
    textAlign: "center",
  },
});
