import Svg, { G, Path, SvgProps } from 'react-native-svg';

export default function HomeIcon(
  props: {
    size: number;
    color: string;
    active?: boolean;
  } & SvgProps,
) {
  const { color, size, active } = props;

  return (
    <Svg height={26} width={25} viewBox="0 0 26 25">
      <G strokeWidth={2.5}>
        <Path
          d="M12.8963 1.04398C12.9263 1.01409 12.9649 1 13 1C13.0351 1 13.0737 1.01408 13.1037 1.04398L24.4196 12.3207C24.7932 12.693 25 13.1921 25 13.7146V22.4769C25 22.9047 24.6474 23.2611 24.2095 23.2611H17.7214C17.2954 23.2611 16.9545 22.9165 16.9545 22.5004V17.2007C16.9545 15.0198 15.1799 13.2563 13 13.2563C10.8201 13.2563 9.04545 15.0198 9.04545 17.2007V22.5004C9.04545 22.9165 8.70463 23.2611 8.27864 23.2611H1.79045C1.35265 23.2611 1 22.9047 1 22.4769V13.7146C1 13.1921 1.20679 12.693 1.58042 12.3207L12.8963 1.04398Z"
          fill={active ? 'black' : 'white'}
          stroke={active ? 'black' : 'black'}
          strokeWidth="2"
        />
      </G>
    </Svg>
  );
}
