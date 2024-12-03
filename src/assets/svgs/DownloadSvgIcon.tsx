import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default function DownloadSvgIcon({
  style,
}: {
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={style}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </Svg>
  );
}
