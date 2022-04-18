import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

const DividerWithText: FC<{ style?: StyleProp<ViewStyle> }> = props => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      ...(props.style as {}),
    }}
  >
    <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
    <View>
      <Text style={{ textAlign: 'center', margin: 10, color: '#888' }}>
        {props.children}
      </Text>
    </View>
    <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
  </View>
);

export default DividerWithText;
