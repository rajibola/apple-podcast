import SearchIcon from "@/assets/svgs/SearchIcon";
import { hp, wp } from "@/utils/responsiveness";
import { StyleSheet, TextInput, View } from "react-native";

export const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search your favorite podcast..."
        placeholderTextColor="#656565"
      />
      <SearchIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: "100%",
  },
  container: {
    width: "100%",
    height: hp(50),
    marginTop: hp(18),
    marginBottom: hp(28),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(25),
    borderRadius: wp(50),
    backgroundColor: "#212121",
  },
});
