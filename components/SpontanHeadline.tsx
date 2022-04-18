import { AVAILABLE_FONTS } from 'hooks/useCachedResources';
import { FC } from 'react';
import { TextProps } from 'react-native';
import { Text } from 'react-native-paper';
import { scaled } from 'styles/scaled';

const SpontanHeadline: FC<TextProps> = props => {
  return (
    <Text
      {...props}
      style={{
        fontSize: scaled(43),
        fontFamily: AVAILABLE_FONTS.JosefinSans_700Bold,
        paddingBottom: 5,
      }}
    >
      SPONTAN
    </Text>
  );
};

export default SpontanHeadline;
