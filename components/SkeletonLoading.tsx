import React, { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';
import { ICustomViewStyle } from 'react-native-skeleton-content/lib/Constants';

type Props = {
  isLoading: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  layout?: ICustomViewStyle[];
};

const SkeletonLoading: FC<Props> = ({
  isLoading,
  containerStyle,
  layout,
  children,
}) => {
  return (
    <SkeletonContent
      isLoading={isLoading}
      boneColor="#565656"
      highlightColor="#232323"
      animationType="pulse"
      containerStyle={[
        {
          flex: 1,
          width: '100%',
          flexDirection: 'row',
        },
        containerStyle,
      ]}
      layout={layout}
    >
      {children}
    </SkeletonContent>
  );
};

export default SkeletonLoading;
