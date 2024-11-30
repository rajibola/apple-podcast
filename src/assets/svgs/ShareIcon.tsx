import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

export default function ShareIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 8C16.4477 8 16 7.55229 16 7C16 6.44772 16.4477 6 17 6H18C20.2091 6 22 7.79086 22 10V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18L2 9.99306C2 7.78392 3.79086 5.99306 6 5.99306H7C7.55229 5.99306 8 6.44077 8 6.99306C8 7.54534 7.55229 7.99306 7 7.99306H6C4.89543 7.99306 4 8.88849 4 9.99306V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V10C20 8.89543 19.1046 8 18 8H17Z"
        fill="#D4D4D8"
      />
      <Rect
        width="2"
        height="12"
        rx="1"
        transform="matrix(-1 0 0 1 13 2)"
        fill="#D4D4D8"
      />
      <Path
        d="M12 2.41421L14.2929 4.70711C14.6834 5.09763 15.3166 5.09763 15.7071 4.70711C16.0976 4.31658 16.0976 3.68342 15.7071 3.29289L12.7071 0.292893C12.3166 -0.097631 11.6834 -0.097631 11.2929 0.292893L8.29289 3.29289C7.90237 3.68342 7.90237 4.31658 8.29289 4.70711C8.68342 5.09763 9.31658 5.09763 9.70711 4.70711L12 2.41421Z"
        fill="#D4D4D8"
      />
    </Svg>
  );
}