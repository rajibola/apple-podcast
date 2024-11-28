import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { MText } from "@/components/customText";
import { hp, wp } from "@/utils/responsiveness";

interface SongListItemProps {
  songTitle: string;
  songSubtitle: string;
  listImageSource: ImageSourcePropType;
  actionButtonImageSource?: ImageSourcePropType;
}

export const SongListItem = ({
  songTitle,
  songSubtitle,
  listImageSource,
  actionButtonImageSource = require("@/assets/images/favorite.png"),
}: SongListItemProps) => {
  return (
    <View style={styles.songList}>
      <View style={styles.imageText}>
        <Image style={styles.listImage} source={listImageSource} />
        <View style={styles.songText}>
          <MText style={styles.songTitle}>{songTitle}</MText>
          <MText style={styles.songSubtitle}>{songSubtitle}</MText>
        </View>
      </View>
      <View style={styles.flex}>
        <Image style={styles.favorite} source={actionButtonImageSource} />
        <Image
          style={styles.favorite}
          source={require("@/assets/images/playcircle.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    gap: wp(9),
  },
  favorite: {
    width: wp(26),
    height: wp(24),
  },
  imageText: {
    flexDirection: "row",
    alignItems: "center",
  },
  songSubtitle: {
    color: "#fff",
    fontSize: wp(14),
    opacity: 0.7,
  },
  songText: {
    marginLeft: wp(13.97),
    gap: hp(5),
  },
  songTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: wp(14),
  },
  songList: {
    flexDirection: "row",
    alignItems: "center",
    color: "#fff",
    justifyContent: "space-between",
  },
  listImage: {
    width: wp(60.2),
    height: wp(56),
    backgroundColor: "#fff",
    borderRadius: wp(5),
  },
});
