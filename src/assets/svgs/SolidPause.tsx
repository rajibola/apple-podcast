import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default function SolidPause({style}: {style?: StyleProp<ViewStyle>}) {
  return (
    <Svg style={style} viewBox="0 0 24 24" fill="currentColor">
      <Path
        fillRule="evenodd"
        d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}
