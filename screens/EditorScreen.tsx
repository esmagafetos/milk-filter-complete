import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";

import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";
import { ThemedText } from "@/components/ThemedText";
import { GlassCard } from "@/components/GlassCard";
import { ImageUploadCard } from "@/components/ImageUploadCard";
import Spacer from "@/components/Spacer";
import { useImageFilter, FilterOptions } from "@/hooks/useImageFilter";
import { MilkFilters, Colors, Spacing, BorderRadius } from "@/constants/theme";

export default function EditorScreen() {
  const {
    originalImage,
    setOriginalImage,
    filteredImage,
    options,
    updateFilterOptions,
    applyFilter,
    isProcessing,
    reset,
  } = useImageFilter();

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setOriginalImage(uri);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleApplyFilter = async () => {
    if (originalImage) {
      await applyFilter(originalImage);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  return (
    <ScreenKeyboardAwareScrollView>
      <Animated.View entering={FadeInDown.duration(600).delay(100)}>
        <ThemedText type="h1" style={styles.title}>
          Milk Filter
        </ThemedText>
        <ThemedText type="caption" color="secondary" style={styles.subtitle}>
          Processamento Artístico de Imagens
        </ThemedText>
      </Animated.View>

      <Spacer height={Spacing.xl} />

      {!originalImage ? (
        <ImageUploadCard onUpload={handlePickImage} isLoading={isProcessing} />
      ) : (
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.imagePreviewContainer}
        >
          <GlassCard level={2} style={styles.previewCard}>
            <Image
              source={{ uri: originalImage }}
              style={styles.previewImage}
              resizeMode="cover"
            />
            <Spacer height={Spacing.md} />
            <Pressable
              onPress={reset}
              style={[styles.resetButton, { backgroundColor: Colors.primary }]}
            >
              <Feather name="x" size={20} color="#fff" />
              <ThemedText type="caption" style={styles.resetButtonText}>
                Novo Upload
              </ThemedText>
            </Pressable>
          </GlassCard>
        </Animated.View>
      )}

      {originalImage && (
        <>
          <Spacer height={Spacing.lg} />

          <Animated.View entering={FadeInDown.duration(600).delay(300)}>
            <GlassCard level={2}>
              <ThemedText type="h3" style={styles.sectionTitle}>
                Filtros
              </ThemedText>
              <Spacer height={Spacing.md} />

              <View style={styles.filterOptions}>
                {(Object.keys(MilkFilters) as Array<keyof typeof MilkFilters>).map(
                  (key) => (
                    <Pressable
                      key={key}
                      onPress={() => {
                        updateFilterOptions({ filterType: key });
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }}
                      style={[
                        styles.filterButton,
                        options.filterType === key && styles.filterButtonActive,
                      ]}
                    >
                      <View
                        style={[
                          styles.colorPreview,
                          {
                            backgroundColor:
                              MilkFilters[key].colors[1],
                          },
                        ]}
                      />
                      <ThemedText type="caption">
                        {MilkFilters[key].name}
                      </ThemedText>
                    </Pressable>
                  )
                )}
              </View>

              <Spacer height={Spacing.lg} />

              <View style={styles.toggleSection}>
                <ThemedText type="body">Pointillism</ThemedText>
                <Pressable
                  onPress={() => {
                    updateFilterOptions({
                      pointillism: !options.pointillism,
                    });
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={[
                    styles.toggle,
                    options.pointillism && styles.toggleActive,
                  ]}
                >
                  <View
                    style={[
                      styles.toggleThumb,
                      options.pointillism && styles.toggleThumbActive,
                    ]}
                  />
                </Pressable>
              </View>

              <Spacer height={Spacing.lg} />

              <ThemedText type="body" style={styles.sliderLabel}>
                Compressão: {options.compression}%
              </ThemedText>
              <Spacer height={Spacing.sm} />
              <View style={styles.sliderPlaceholder}>
                <ThemedText type="small" color="secondary" style={styles.sliderText}>
                  Slider: 0 - 100%
                </ThemedText>
              </View>
            </GlassCard>
          </Animated.View>

          <Spacer height={Spacing.lg} />

          <Animated.View entering={FadeInDown.duration(600).delay(400)}>
            <Pressable
              onPress={handleApplyFilter}
              disabled={isProcessing}
              style={[
                styles.applyButton,
                { backgroundColor: Colors.primary },
                isProcessing && styles.applyButtonDisabled,
              ]}
            >
              {isProcessing ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Feather name="magic-wand" size={20} color="#fff" />
                  <ThemedText type="body" style={styles.applyButtonText}>
                    Aplicar Filtro
                  </ThemedText>
                </>
              )}
            </Pressable>
          </Animated.View>

          {filteredImage && (
            <>
              <Spacer height={Spacing.lg} />

              <Animated.View entering={FadeInDown.duration(600).delay(500)}>
                <GlassCard level={2}>
                  <ThemedText type="h3" style={styles.sectionTitle}>
                    Resultado
                  </ThemedText>
                  <Spacer height={Spacing.md} />

                  <Image
                    source={{ uri: filteredImage }}
                    style={styles.resultImage}
                    resizeMode="cover"
                  />

                  <Spacer height={Spacing.md} />

                  <View style={styles.resultActions}>
                    <Pressable
                      style={[
                        styles.actionButton,
                        { backgroundColor: Colors.primary },
                      ]}
                    >
                      <Feather name="download" size={20} color="#fff" />
                      <ThemedText type="caption" style={styles.actionButtonText}>
                        Download
                      </ThemedText>
                    </Pressable>

                    <Pressable
                      style={[
                        styles.actionButton,
                        { borderColor: Colors.primary, borderWidth: 1 },
                      ]}
                    >
                      <Feather name="share-2" size={20} color={Colors.primary} />
                      <ThemedText type="caption" color="primary">
                        Compartilhar
                      </ThemedText>
                    </Pressable>
                  </View>
                </GlassCard>
              </Animated.View>
            </>
          )}
        </>
      )}

      <Spacer height={Spacing.xxl} />
    </ScreenKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  imagePreviewContainer: {
    alignItems: "center",
  },
  previewCard: {
    padding: Spacing.lg,
  },
  previewImage: {
    width: "100%",
    height: 300,
    borderRadius: BorderRadius.card,
    backgroundColor: Colors.card.dark,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.button,
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  sectionTitle: {
    marginBottom: 0,
  },
  filterOptions: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  filterButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.button,
    borderWidth: 2,
    borderColor: "transparent",
  },
  filterButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: "rgba(137, 0, 40, 0.1)",
  },
  colorPreview: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.button,
    marginBottom: Spacing.xs,
  },
  toggleSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  toggleThumbActive: {
    alignSelf: "flex-end",
  },
  sliderLabel: {
    marginBottom: 0,
  },
  sliderPlaceholder: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: BorderRadius.input,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderText: {
    fontStyle: "italic",
  },
  applyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.button,
  },
  applyButtonDisabled: {
    opacity: 0.6,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  resultImage: {
    width: "100%",
    height: 300,
    borderRadius: BorderRadius.card,
    backgroundColor: Colors.card.dark,
  },
  resultActions: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.button,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
