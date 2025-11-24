import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_STORAGE_KEY = "@glassmorphism_app:profile";

export interface ProfileData {
  name: string;
  avatar: number;
}

const DEFAULT_PROFILE: ProfileData = {
  name: "",
  avatar: 1,
};

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<ProfileData>) => {
    try {
      const newProfile = { ...profile, ...updates };
      await AsyncStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(newProfile)
      );
      setProfile(newProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return {
    profile,
    updateProfile,
    isLoading,
  };
}
