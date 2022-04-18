import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

function IconButtonComponent({
  color,
  size,
  onPress = () => {},
  name,
  style = {},
  noBackground = false,
}: {
  color: string;
  size: number;
  onPress?: () => void;
  name: any;
  style?: ViewStyle;
  noBackground?: boolean;
}) {
  return (
    <Pressable
      style={args => {
        if (args.pressed) {
          return [
            styles.base,
            {
              backgroundColor: noBackground ? 'transparent' : '#fff',
              borderWidth: noBackground ? 0 : 1,
              width: size,
              height: size,
              ...style,
              opacity: 0.5,
            },
          ];
        }

        return [
          styles.base,
          {
            opacity: 1,
            backgroundColor: noBackground ? 'transparent' : '#fff',
            borderWidth: noBackground ? 0 : 1,
            width: size,
            height: size,
            ...style,
          },
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
    borderRadius: 50,
    borderColor: '#000',
  },
});

export default IconButtonComponent;
