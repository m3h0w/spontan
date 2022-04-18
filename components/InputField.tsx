import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Control,
  FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

function InputField({
  leftIcon,
  iconColor = '#000',
  rightIcon,
  inputStyle,
  containerStyle,
  placeholderTextColor = '#444',
  handlePasswordVisibility,
  name,
  ...rest
}: {
  leftIcon?: any;
  iconColor?: string;
  rightIcon?: any;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholderTextColor?: string;
  handlePasswordVisibility?: () => void;
  name?: string;
} & TextInputProps) {
  const { field } = useController({
    control: useFormContext().control,
    defaultValue: rest.defaultValue,
    name: name ?? 'default',
  });
  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon ? (
        <MaterialCommunityIcons
          name={leftIcon}
          size={20}
          color={iconColor}
          style={styles.leftIcon}
        />
      ) : null}
      <TextInput
        {...rest}
        defaultValue={undefined}
        placeholderTextColor={placeholderTextColor ?? '#000'}
        style={[styles.input, inputStyle]}
        value={field.value}
        onChangeText={field.onChange}
      />
      {rightIcon ? (
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons
            name={rightIcon}
            size={20}
            color={iconColor}
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  leftIcon: ViewStyle;
  input: TextStyle;
  rightIcon: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    padding: 12,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    width: '100%',
    fontSize: 14,
  },
  rightIcon: {
    alignSelf: 'center',
    marginLeft: 10,
  },
});

export default InputField;
