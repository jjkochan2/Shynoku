import { Stack } from "expo-router";
import { COLORS } from "./constants/theme";
import { LevelProgressProvider } from "../../src/context/LevelProgressContext";

export default function RootLayout() {
  return (
    <LevelProgressProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="levelSelect"
          options={{
            headerShown: true,
            title: "Level Select",
            headerStyle: { backgroundColor: COLORS.background },
            headerTintColor: COLORS.primaryLight,
          }}
        />
        <Stack.Screen
          name="level/[id]"
          options={{ headerStyle: { backgroundColor: COLORS.background }, headerTintColor: COLORS.primaryDark }}
        />
      </Stack>
    </LevelProgressProvider>
  );
}
