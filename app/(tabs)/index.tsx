import { MText } from "@/components/customText";
import { SearchBar } from "@/components/SearchBar";
import { SongListItem } from "@/components/SongListItem";
import { hp, wp } from "@/utils/responsiveness";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarText}>
          <Image
            style={styles.userIcon}
            source={require("@/assets/images/user-icon.png")}
          />
          <View>
            <MText style={styles.helloText}>Hello</MText>
            <MText style={styles.name}>John Doe</MText>
          </View>
        </View>
        <View style={styles.iconWrapper}>
          <Image source={require("@/assets/images/notification-icon.png")} />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <MText style={styles.title}>Explore New Podcasts</MText>
        <SearchBar />
        <MText style={styles.subtitle}>Podcasts</MText>

        <View style={styles.songList}>
          <SongListItem
            songTitle="Enjoy The Nature"
            songSubtitle="Webby • Episode 01"
            listImageSource={require("@/assets/images/icon.png")}
          />
          <SongListItem
            songTitle="Tech Talk"
            songSubtitle="Dev World • Episode 10"
            listImageSource={require("@/assets/images/icon.png")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatarText: { flexDirection: "row", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: wp(15),
    marginRight: wp(21),
    marginBottom: hp(17),
  },
  songList: {
    gap: hp(20),
    marginTop: hp(12),
  },
  bottomContainer: {
    paddingHorizontal: wp(20),
  },
  title: {
    fontSize: hp(20),
    fontWeight: "bold",
    color: "#fff",
  },
  iconWrapper: {
    width: wp(40),
    height: wp(40),
    borderWidth: wp(1),
    borderColor: "#373737",
    borderRadius: wp(40),
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: "#fff",
    fontSize: hp(12),
    fontWeight: "700",
  },
  userIcon: {
    width: wp(50),
    height: wp(50),
    marginRight: wp(7),
  },
  helloText: {
    color: "#fff",
    fontSize: hp(12),
    marginBottom: hp(1),
    opacity: 0.7,
  },
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  subtitle: {
    fontSize: hp(16),
    fontWeight: "bold",
    color: "#fff",
  },
});
