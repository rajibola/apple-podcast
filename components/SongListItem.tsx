import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MText } from "@/components/customText";
import { hp, wp } from "@/utils/responsiveness";

type ActionButtonType = "favorite" | "download";

const actionButtonImages: Record<ActionButtonType, any> = {
  favorite: require("@/assets/images/favorite.png"),
  download: require("@/assets/images/download-icon.png"),
};

interface SongListItemProps {
  songTitle: string;
  songSubtitle: string;
  listImageSource: any;
  actionButtonType?: ActionButtonType;
}

export const SongListItem = ({
  songTitle,
  songSubtitle,
  listImageSource,
  actionButtonType = "favorite",
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
        <Image
          style={styles.icon}
          source={actionButtonImages[actionButtonType]}
        />
        <Image
          style={styles.icon}
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
  icon: {
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
    justifyContent: "space-between",
  },
  listImage: {
    width: wp(60.2),
    height: wp(56),
    backgroundColor: "#fff",
    borderRadius: wp(5),
  },
});
