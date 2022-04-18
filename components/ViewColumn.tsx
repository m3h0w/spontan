import React, { FC } from 'react';

import { StyleProp, View, ViewStyle } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  borderTop?: boolean;
  borderBottom?: boolean;
  borderColor?: string;
};

const ViewColumn: FC<Props> = ({
  style,
  children,
  borderTop,
  borderBottom,
  borderColor,
}) => {
  return (
    <View
      style={[
        {
          display: 'flex',
          flexDirection: 'column',
          borderTopWidth: borderTop ? 1 : 0,
          borderTopColor: borderColor ?? '#ededed',
          borderBottomWidth: borderBottom ? 1 : 0,
          borderBottomColor: borderColor ?? '#ededed',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default ViewColumn;
