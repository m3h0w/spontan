import { StackScreenProps } from '@react-navigation/stack';
import SpontanHeadline from 'components/SpontanHeadline';
import { auth } from 'config/firebase';
import { AVAILABLE_FONTS } from 'hooks/useCachedResources';
import { AuthStackParamList } from 'navigation/AuthStack';
import React, { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Button as PaperButton, Caption } from 'react-native-paper';
import { ErrorMessage, InputField } from '../components';
import { scaled } from '../styles/scaled';
import { ParticleBackgroundContainer } from './IntroScreen';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginScreen: FC<StackScreenProps<AuthStackParamList, 'Login'>> = ({
  navigation,
  route,
}) => {
  const formMethods = useForm<LoginFormData>({
    defaultValues: {
      email: route.params?.email ?? '',
      password: route.params?.password ?? '',
    },
  });
  const { handleSubmit, getValues, formState } = formMethods;
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async (data: LoginFormData) => {
    const { email, password } = data;
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError(
          `Caught and unknown error type: ${JSON.stringify(error)}`,
        );
      }
    }
  };

  return (
    <FormProvider {...formMethods}>
      <ParticleBackgroundContainer>
        <SpontanHeadline style={{ marginBottom: 20 }} />
        <Caption
          style={{
            fontSize: scaled(25),
            paddingBottom: 20,
            fontFamily: AVAILABLE_FONTS.DancingScript_400Regular,
          }}
        >
          Spontaneous adventures await.
        </Caption>
        <InputField
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 20,
            width: '80%',
          }}
          leftIcon="email"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus
          name={'email'}
        />
        <InputField
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 15,
            width: '80%',
          }}
          leftIcon="lock"
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          handlePasswordVisibility={handlePasswordVisibility}
          name={'password'}
        />
        {loginError ? <ErrorMessage error={loginError} visible /> : null}
        <PaperButton
          mode="contained"
          onPress={handleSubmit(onLogin)}
          color={'#222'}
          style={{
            marginTop: 5,
            width: '80%',
          }}
          loading={formState.isSubmitting}
          disabled={formState.isSubmitting}
          icon={formState.isSubmitting ? 'loading' : undefined}
        >
          Login
        </PaperButton>
        <PaperButton
          onPress={() =>
            navigation.navigate('Signup', {
              email: getValues('email'),
              password: getValues('password'),
            })
          }
          labelStyle={{ fontSize: scaled(14) }}
          color={'#999'}
          disabled={formState.isSubmitting}
        >
          Don't have an account? Sign up
        </PaperButton>
      </ParticleBackgroundContainer>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   paddingTop: 50,
  //   paddingHorizontal: 20,
  // },
  title: {
    fontSize: 24,
    // fontWeight: '600',
    color: '#444',
    alignSelf: 'center',
    paddingBottom: 40,
  },
});

export default LoginScreen;
