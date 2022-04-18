import React, { FC } from 'react';

import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';

type Props = {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
};

const SmallItemImage: FC<Props> = ({ source, style }) => {
  return (
    <Image
      source={source}
      style={StyleSheet.flatten([
        {
          width: 100,
          height: 100,
          marginBottom: 5,
          borderRadius: 3,
        },
        style,
      ])}
    />
  );
};

export default SmallItemImage;
