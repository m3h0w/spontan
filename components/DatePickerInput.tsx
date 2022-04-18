import { AVAILABLE_FONTS } from 'hooks/useCachedResources';
import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';
import { Caption, Title } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { scaled } from 'styles/scaled';
import B from './B';
import IconButtonComponent from './IconButton';
import ViewRow from './ViewRow';

export default function Datepicker({
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
  // const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    params => {
      setOpen(false);
      // setDate(params.date);
      field.onChange(params.date);
    },
    [setOpen],
  );

  const today = new Date();
  const endRange = new Date();
  endRange.setDate(today.getDate() + 3);

  return (
    <React.Fragment>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={field.value}
        onConfirm={onConfirmSingle}
        validRange={{
          startDate: today, // optional
          endDate: endRange, // optional
        }}
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // uppercase={false} // optional, default is true
        label="Select date"
        // animationType="slide"
        // optional, default is 'slide' on ios/android and 'none' on web
      />
      <ViewRow style={[style]}>
        <IconButtonComponent
          color="#000"
          name="calendar"
          size={30}
          onPress={() => setOpen(true)}
          style={{ marginRight: 10 }}
        ></IconButtonComponent>
        <Title
          style={{
            marginTop: -1,
            fontSize: scaled(20),
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: AVAILABLE_FONTS.Montserrat_400Regular,
          }}
        >
          Date:&nbsp;
          <B>{(field.value as Date).toLocaleDateString()}</B>
        </Title>
      </ViewRow>
    </React.Fragment>
  );
}
