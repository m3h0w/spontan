import { IconButton } from 'components';
import { AVAILABLE_FONTS } from 'hooks/useCachedResources';
import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';
import { Caption, Title } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { scaled } from 'styles/scaled';
import B from './B';
import ViewRow from './ViewRow';

export const timeToString = (time: number) => {
  return time < 10 ? `0${time}` : `${time}`;
};

export default function TimePickerInput({
  name,
  defaultValue,
  style,
}: {
  name: string;
  defaultValue?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const { field } = useController({
    control: useFormContext().control,
    defaultValue,
    name,
  });
  const { hours, minutes } = field.value || { hours: 6, minutes: 6 };

  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      console.log({ hours, minutes });
      field.onChange({ hours, minutes });
    },
    [setVisible],
  );

  return (
    <React.Fragment>
      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={hours} // default: current hours
        minutes={minutes} // default: current minutes
        label="Select time" // optional, default 'Select time'
        uppercase={false} // optional, default is true
        cancelLabel="Cancel" // optional, default: 'Cancel'
        confirmLabel="Ok" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
        locale="en" // optional, default is automically detected by your system
      />
      <ViewRow style={[style, {}]}>
        <IconButton
          color="#000"
          name="clock"
          size={30}
          onPress={() => setVisible(true)}
          style={{ marginRight: 10 }}
        ></IconButton>
        <Title
          style={{
            marginTop: -1,
            fontSize: scaled(20),
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: AVAILABLE_FONTS.Montserrat_400Regular,
          }}
        >
          Time:&nbsp;
          <B>
            {timeToString(hours)}:{timeToString(minutes)}
          </B>
        </Title>
      </ViewRow>
    </React.Fragment>
  );
}
