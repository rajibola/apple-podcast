import React from 'react';
import {SearchIcon} from '../assets/svgs';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {hp, wp} from '../utils';

export const SearchBar = (props: TextInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search your favorite podcast..."
        placeholderTextColor="#656565"
        {...props}
      />
      <SearchIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: '100%',
    color: '#fff',
  },
  container: {
    width: '100%',
    height: hp(50),
    marginTop: hp(18),
    marginBottom: hp(28),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(25),
    borderRadius: wp(50),
    backgroundColor: '#212121',
  },
});
