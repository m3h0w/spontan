import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

function IconButtonComponent({
  color,
  size,
  onPress = () => {},
  name,
  style,
}: {
  color: string;
  size: number;
  onPress?: () => void;
  name: any;
  style: ViewStyle;
}) {
  return (
    <Pressable
      style={args => {
        if (args.pressed) {
          return [
            styles.base,
            {
              opacity: 0.5,
              backgroundColor: 'transparent',
            },
          ];
        }

        return [
          styles.base,
          { opacity: 1, backgroundColor: 'transparent', ...style },
        ];
      }}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconButtonComponent;
