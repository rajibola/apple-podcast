import React from "react";
import { Text, TextProps } from "react-native";

export const MText = (props: TextProps) => {
  return (
    <Text {...props} style={[props.style, { fontFamily: "Manrope" }]}>
      {props.children}
    </Text>
  );
};
