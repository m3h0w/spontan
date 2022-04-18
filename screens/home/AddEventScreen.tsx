import React, { FC, useEffect, useRef, useState } from 'react';
import {
  FormProvider,
  useController,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { ParticleBackgroundContainer } from 'screens/IntroScreen';
import { EventDTO } from 'types/User';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import Datepicker from 'components/DatePickerInput';
import TimePickerInput from 'components/TimePickerInput';
import DatePickerInput from 'components/DatePickerInput';
import { Button, Caption, Title } from 'react-native-paper';
import ViewColumn from 'components/ViewColumn';
import { InputField } from 'components';
import ViewRow from 'components/ViewRow';
import Unsplash from 'components/Unsplash';
import shadowStyle from 'utils/shadowStyle';
import Layout from 'constants/Layout';
import { ScrollView } from 'react-native-gesture-handler';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import navigation from 'navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from 'navigation/HomeStack';
import IconButtonComponent from 'components/IconButton';
import { firestore } from 'config/firebase';
import { useAuthenticatedUser } from 'navigation/AuthenticatedUserProvider';
import capitalizeFirstLetter from 'utils/capitalizeFirstLetter';

type Props = {};

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string(),
    date: yup.date().required(),
    time: yup
      .object({
        hours: yup.number().required(),
        minutes: yup.number().required(),
      })
      .required(),
    imageUrl: yup.string(),
  })
  .required();

const UnsplashInput: FC<{ photoName: string }> = ({ photoName }) => {
  const { field } = useController({
    control: useFormContext().control,
    defaultValue: '',
    name: 'imageUrl',
  });
  return (
    <Unsplash
      width={Layout.window.width}
      height={150}
      expand={true}
      keywords={photoName}
      onUrlChange={field.onChange}
      img
    />
  );
};

const AddEventScreen: FC<StackScreenProps<HomeStackParams, 'AddEvent'>> = ({
  navigation,
  route,
}) => {
  const [photoName, setPhotoName] = useState('kitten');
  const user = useAuthenticatedUser();
  const [inputDate, setInputDate] = React.useState<Date | undefined>(undefined);
  console.log({ photoName });

  const formMethods = useForm<EventDTO>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      date: new Date(),
      time: {
        hours: (new Date().getHours() + 1) % 24,
        minutes: 0,
      },
      imageUrl: '',
    },
  });
  const { handleSubmit, getValues, formState } = formMethods;
  const { errors } = formState;
  console.log(formState);

  const [headerShown, setHeaderShown] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimHeight = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitleContainerStyle: {
        opacity: fadeAnim,
        height: fadeAnimHeight,
      },
      headerLeftContainerStyle: {
        opacity: fadeAnim,

        height: fadeAnimHeight,
      },
      headerRightContainerStyle: {
        opacity: fadeAnim,

        height: fadeAnimHeight,
      },
    });
  }, [headerShown]);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnimHeight, {
      toValue: 60,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnimHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  if (formState.isSubmitSuccessful) {
    navigation.goBack();
  }

  return (
    <FormProvider {...formMethods}>
      <ParticleBackgroundContainer>
        <View style={{ position: 'absolute', left: 15, top: 15, zIndex: 100 }}>
          <IconButtonComponent
            name="arrow-left"
            size={24}
            color="#000"
            onPress={navigation.goBack}
            style={{ marginRight: 10 }}
            noBackground={true}
          />
        </View>
        <Animated.View
          style={{
            height: fadeAnimHeight,
            backgroundColor: '#fff',
            opacity: 0.95,
            position: 'absolute',
            top: 0,
            width: '100%',
            zIndex: 100,
          }}
        ></Animated.View>

        <ScrollView
          style={{
            display: 'flex',
            // paddingTop: 20,
            paddingBottom: 20,
            flex: 1,
            zIndex: 1,
          }}
          onScroll={event => {
            if (event.nativeEvent.contentOffset.y > 50) {
              fadeIn();
            } else {
              fadeOut();
            }
          }}
          scrollEventThrottle={20}
        >
          <ViewRow
            style={{
              justifyContent: 'center',
              // flex: 1,
              width: '100%',
              height: 150,
              ...shadowStyle,
            }}
          >
            <UnsplashInput photoName={photoName} />
          </ViewRow>
          <ViewColumn
            style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: 20 }}
          >
            <InputField
              name="name"
              label="Event Name"
              rules={{ required: true }}
              containerStyle={styles.space}
              error={errors.name ? errors.name.message : undefined}
              onBlur={() => {
                if (
                  photoName !== getValues('name') &&
                  getValues('name') !== ''
                ) {
                  setPhotoName(getValues('name'));
                }
              }}
            />
            <InputField
              name="description"
              label="Event Description"
              multiline={true}
              error={
                errors.description ? errors.description.message : undefined
              }
              containerStyle={[styles.space]}
            />

            <DatePickerInput name="date" style={styles.space} />
            <TimePickerInput name="time" style={styles.space} />
            <Button
              mode="contained"
              onPress={handleSubmit(async data => {
                if (!user?.uid) {
                  return false;
                }
                return await firestore.newEvent({
                  ...data,
                  ownerId: user?.uid!,
                });
              })}
              color={'#222'}
              style={{
                marginTop: 5,
                width: '100%',
              }}
              loading={formState.isSubmitting}
              disabled={formState.isSubmitting}
              icon={formState.isSubmitting ? 'loading' : undefined}
            >
              Add Event
            </Button>
          </ViewColumn>
        </ScrollView>
      </ParticleBackgroundContainer>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  space: {
    paddingBottom: 20,
  },
});

export default AddEventScreen;
