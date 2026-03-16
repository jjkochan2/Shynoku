import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router"

const styles = StyleSheet.create({
  titleScreen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0077ffff",
    borderWidth: 2,
    borderColor: "green"
  },

  topSpacer: {
    flex: 1,
    borderWidth: 2,
    borderColor: "red"
  },

  bottomSpacer: {
    
  }

  title: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "orange",
  },

  titleText: {
    fontSize: 64,
    color: "white",
    fontWeight: "600",
  },

  levelSelectButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "yellow",
    justifyContent: "center",
  },

  levelSelectButtonText: {
    fontSize: 32,
    fontWeight: "600"
  }

});

export default function TitleScreen() {
  const router = useRouter();
  return (
    <View style={styles.titleScreen}>

      <View style={styles.spacer}></View>

      <View style={styles.title}>
        <Text style={styles.titleText}>
        Shynoku
        </Text>
      </View>

      <View style={styles.spacer}>
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
