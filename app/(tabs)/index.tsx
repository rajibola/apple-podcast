import { Image, StyleSheet, Platform, Text, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "@/utils/responsiveness";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={styles.userIcon}
          source={require("@/assets/images/user-icon.png")}
        />
        <Text style={styles.text}>Hello</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userIcon: {
    width: wp(50),
    height: wp(50),
    marginLeft: wp(15),
  },
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  text: {
    color: "#fff",
    fontSize: hp(30),
    fontFamily: "Manrope",
  },
});
