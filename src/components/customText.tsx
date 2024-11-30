import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

export const MText = (props: TextProps) => {
  return (
    <Text {...props} style={[props.style, styles.text]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {fontFamily: 'Manrope'},
});
