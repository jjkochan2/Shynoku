import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router"

const styles = StyleSheet.create({
  titleScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0077ffff",
  },
});

export default function TitleScreen() {
  const router = useRouter();
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
      <Pressable
        onPress={() => {router.navigate('/levelSelect')}}
      >
        <Text>Levels</Text>
      </Pressable>
    </View>
  );
}
