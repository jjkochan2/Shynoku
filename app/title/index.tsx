import { Text, View, StyleSheet, Pressable } from "react-native";

const styles = StyleSheet.create({
  titleScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0077ffff",
  },
});

export default function TitleScreen() {
  return (
    <View style={styles.titleScreen}>
      <Text
        style={{
          fontSize: 64,
          color: "white",
          fontWeight: "600",
        }}
      >
        Shynoku
      </Text>
      <Pressable>
        <Text>Levels</Text>
      </Pressable>
    </View>
  );
}
