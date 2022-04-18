import * as React from 'react';
import Svg, { Circle, G, Path, Rect, SvgProps } from 'react-native-svg';

export default function CameraIcon(
  props: {
    size?: number;
    color: string;
    active?: boolean;
  } & SvgProps,
) {
  const { color, size, active } = props;
  return (
    <Svg height={35} width={36} viewBox="0 0 35 36">
      <G strokeWidth={2.5}>
        <Path
          d="M33.5416 28.2058C33.5416 28.9932 33.2343 29.7484 32.6873 30.3052C32.1403 30.862 31.3985 31.1748 30.6249 31.1748H4.37492C3.60137 31.1748 2.8595 30.862 2.31252 30.3052C1.76554 29.7484 1.45825 28.9932 1.45825 28.2058V11.8762C1.45825 11.0887 1.76554 10.3335 2.31252 9.77675C2.8595 9.21995 3.60137 8.90714 4.37492 8.90714H10.2083L13.1249 4.45361H21.8749L24.7916 8.90714H30.6249C31.3985 8.90714 32.1403 9.21995 32.6873 9.77675C33.2343 10.3335 33.5416 11.0887 33.5416 11.8762V28.2058Z"
          fill={active ? 'black' : 'white'}
          stroke={active ? 'black' : 'black'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.4999 25.2368C20.7216 25.2368 23.3333 22.5782 23.3333 19.2987C23.3333 16.0192 20.7216 13.3607 17.4999 13.3607C14.2783 13.3607 11.6666 16.0192 11.6666 19.2987C11.6666 22.5782 14.2783 25.2368 17.4999 25.2368Z"
          fill={active ? 'black' : 'white'}
          stroke={active ? 'white' : 'black'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
