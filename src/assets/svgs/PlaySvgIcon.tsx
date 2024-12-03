import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export function PlaySvgIcon({style}: {style?: StyleProp<ViewStyle>}) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      style={style}>
      <Path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
      <Path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
      />
    </Svg>
  );
}
