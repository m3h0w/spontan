import React from 'react';
import { View } from 'react-native';
import { Title, Caption } from 'react-native-paper';
import { scaled } from 'styles/scaled';

const NumberWithText = ({
  number,
  label,
  wide = false,
}: {
  number: number | string;
  label: string;
  wide?: boolean;
}) => (
  <View
    style={{
      flex: wide ? 2 : 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Title style={{ fontSize: scaled(14), lineHeight: scaled(14) }}>
      {number}
    </Title>
    <Caption style={{ fontSize: scaled(11), lineHeight: scaled(12) }}>
      {label}
    </Caption>
  </View>
);

export default NumberWithText;
