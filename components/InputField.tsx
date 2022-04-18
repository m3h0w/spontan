import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AVAILABLE_FONTS } from 'hooks/useCachedResources';
import React from 'react';
import {
  Control,
  FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Caption, TextInput } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { scaled } from 'styles/scaled';
import capitalizeFirstLetter from 'utils/capitalizeFirstLetter';

function InputField({
  leftIcon,
  iconColor = '#000',
  rightIcon,
  inputStyle,
  containerStyle,
  placeholderTextColor = '#444',
  handlePasswordVisibility,
  name,
  label,
  mode,
  value,
  right,
  rules,
  error,
  ...rest
}: {
  leftIcon?: any;
  iconColor?: string;
  right?: React.ReactNode;
  rightIcon?: any;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholderTextColor?: string;
  handlePasswordVisibility?: () => void;
  name: string;
  error?: string;
  value?: string;
  label?: string;
  mode?: 'flat' | 'outlined';
  rules?: any;
} & TextInputProps) {
  const { field } = useController({
    control: useFormContext().control,
    defaultValue: rest.defaultValue,
    name: name,
    rules: rules ?? {},
  });
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        {...rest}
        defaultValue={undefined}
        placeholderTextColor={placeholderTextColor ?? '#000'}
        style={[styles.input, inputStyle]}
        value={value ?? field.value}
        onChangeText={value ? undefined : field.onChange}
        onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          rest.onBlur && rest.onBlur(e);
          field.onBlur(e);
        }}
        disabled={value ? true : false}
        mode={mode ?? 'flat'}
        theme={{
          fonts: {
            regular: { fontFamily: AVAILABLE_FONTS.Montserrat_400Regular },
          },
        }}
        label={label ?? capitalizeFirstLetter(name)}
        left={
          leftIcon ? (
            <TextInput.Icon icon={leftIcon} size={20} color={iconColor} />
          ) : null
        }
        right={
          right ?? rightIcon ? (
            <TextInput.Icon
              icon={rightIcon}
              size={20}
              color={iconColor}
              onPress={
                handlePasswordVisibility ? handlePasswordVisibility : undefined
              }
            />
          ) : null
        }
      />
      {error ? (
        <Caption style={{ color: 'red' }}>
          {capitalizeFirstLetter(error)}
        </Caption>
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
    flexDirection: 'column',
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
    // width: '100%',
    // fontSize: scaled(14),
    // padding: scaled(2),
  },
  rightIcon: {
    alignSelf: 'center',
    marginLeft: 10,
  },
});

export default InputField;
