import * as React from 'react';
import Svg, { Circle, G, Line, Path, Rect, SvgProps } from 'react-native-svg';

export default function WardrobeIcon(
  props: {
    size?: number;
    color: string;
    active?: boolean;
  } & SvgProps,
) {
  const { color, size, active } = props;
  return (
    <Svg height={28} width={29} viewBox="0 0 28 29">
      <G strokeWidth={2.5}>
        <Path
          d="M14 3.56274V24.9397M14 3.56274H22.1667C22.7855 3.56274 23.379 3.81299 23.8166 4.25843C24.2542 4.70387 24.5 5.30801 24.5 5.93796V22.5644C24.5 23.1944 24.2542 23.7985 23.8166 24.244C23.379 24.6894 22.7855 24.9397 22.1667 24.9397H14V3.56274ZM14 3.56274H5.83333C5.21449 3.56274 4.621 3.81299 4.18342 4.25843C3.74583 4.70387 3.5 5.30801 3.5 5.93796V22.5644C3.5 23.1944 3.74583 23.7985 4.18342 24.244C4.621 24.6894 5.21449 24.9397 5.83333 24.9397H14V3.56274Z"
          fill={active ? 'black' : 'white'}
          stroke={active ? 'black' : 'black'}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line
          x1="14"
          y1="3"
          x2="14"
          y2="25"
          stroke={active ? 'white' : 'black'}
          strokeWidth="2"
        />
        <Line
          x1="17.3052"
          y1="17.2871"
          x2="10.1795"
          y2="17.2871"
          stroke={active ? 'white' : 'black'}
          strokeWidth="2"
        />
      </G>
    </Svg>
  );
}
