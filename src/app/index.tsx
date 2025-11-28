import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "./constants/theme";

const shynokuFontSize = 64

export default function Index() {
  return ( 
    <View
      	style={styles.screen}
    >
      <Text style={{ color: COLORS.primaryLight, fontSize: shynokuFontSize }}>Shynoku</Text>

      <Link href="/levelSelect" push style={{
        marginTop: 20,
        position: "absolute",
        bottom: 200,
        }}
      >
        <Text style={{
          color: COLORS.primaryDark,
          fontSize: 40,
          }}
        >
          Play
        </Text>
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  }
});