import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

export function DownloadIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Rect
        x="0.25"
        y="0.25"
        width="23.5"
        height="23.5"
        stroke="black"
        strokeWidth="0.5"
      />
      <Path
        d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3"
        stroke="#B3B3B3"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
