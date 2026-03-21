import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router"

const styles = StyleSheet.create({
  titleScreen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0077ffff",
  },

  topSpacer: {
    flex: 1,
  },

  bottomSpacer: {
    flex: 1,
    justifyContent: "center"
  },

  title: {
    flex: 1,
    justifyContent: "center",
  },

  titleText: {
    fontSize: 64,
    color: "white",
    fontWeight: "600",
  },

  levelSelectButton: {
    justifyContent: "center",
    backgroundColor: "black",
    padding: "3%",
    borderRadius: 999

  },

  levelSelectButtonText: {
    fontSize: 32,
    fontWeight: "600",
    color: "white"
  }

});

export default function TitleScreen() {
  const router = useRouter();
  return (
    <View style={styles.titleScreen}>

      <View style={styles.topSpacer}></View>

      <View style={styles.title}>
        <Text style={styles.titleText}>
        Shynoku
        </Text>
      </View>

      <View style={styles.bottomSpacer}>
        <Pressable
          style={styles.levelSelectButton}
          onPress={() => {router.navigate('/levelSelect')}}
        >
          <Text style={styles.levelSelectButtonText}>Levels</Text>
        </Pressable>
      </View>

    </View>
  );
}
