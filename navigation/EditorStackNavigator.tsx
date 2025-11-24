import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EditorScreen from "@/screens/EditorScreen";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type EditorStackParamList = {
  Editor: undefined;
};

const Stack = createNativeStackNavigator<EditorStackParamList>();

export default function EditorStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={getCommonScreenOptions({ transparent: true })}
    >
      <Stack.Screen
        name="Editor"
        component={EditorScreen}
        options={{
          headerTitle: "Editor",
        }}
      />
    </Stack.Navigator>
  );
}
