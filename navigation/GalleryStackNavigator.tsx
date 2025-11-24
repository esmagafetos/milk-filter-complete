import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GalleryScreen from "@/screens/GalleryScreen";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type GalleryStackParamList = {
  Gallery: undefined;
};

const Stack = createNativeStackNavigator<GalleryStackParamList>();

export default function GalleryStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={getCommonScreenOptions({ transparent: true })}
    >
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          headerTitle: "Galeria",
        }}
      />
    </Stack.Navigator>
  );
}
