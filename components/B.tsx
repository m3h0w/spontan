import { FC } from 'react';
import { TextProps } from 'react-native';
import { Text } from 'react-native-paper';

const B: FC<TextProps> = props => {
  return (
    <Text {...props} style={{ fontWeight: 'bold', ...(props.style as {}) }}>
      {props.children}
    </Text>
  );
};

export default B;
