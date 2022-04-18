import { Text, TextProps } from './Themed';

function StyledText(props: TextProps) {
  return <Text {...props} style={[props.style]} />;
}

export default StyledText;
