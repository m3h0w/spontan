import { StackScreenProps } from '@react-navigation/stack';
import { ErrorMessage, InputField } from 'components';
import B from 'components/B';
import SpontanHeadline from 'components/SpontanHeadline';
import ViewColumn from 'components/ViewColumn';
import { auth } from 'config/firebase';
import { StatusBar } from 'expo-status-bar';
import { AVAILABLE_FONTS } from 'hooks/useCachedResources';
import { AuthStackParamList } from 'navigation/AuthStack';
import React, { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button as PaperButton, Caption, Text } from 'react-native-paper';
import { scaled } from 'styles/scaled';
import DividerWithText from '../components/DividerWithText';
import { ParticleBackgroundContainer } from './IntroScreen';

type SignupFormData = {
  email: string;
  password: string;
};

const SignupScreen: FC<StackScreenProps<AuthStackParamList, 'Signup'>> = ({
  navigation,
  route,
}) => {
  const formMethods = useForm<SignupFormData>({
    defaultValues: {
      email: route.params?.email ?? '',
      password: route.params?.password ?? '',
    },
  });
  const { handleSubmit, getValues, formState } = formMethods;

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [signupError, setSignupError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async (data: SignupFormData) => {
    const { email, password } = data;
    try {
      if (email !== '' && password !== '') {
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (error: any) {
      console.error(error);
      setSignupError(error.message);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <ParticleBackgroundContainer>
        <ViewColumn
          style={[
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center ',
            },
          ]}
        >
          <SpontanHeadline style={{ marginBottom: 20 }} />
          <Caption
            style={{
              fontSize: scaled(25),
              paddingBottom: 20,
              fontFamily: AVAILABLE_FONTS.DancingScript_400Regular,
            }}
          >
            Stop planning. Start living. Join us!
          </Caption>
          <InputField
            inputStyle={{
              fontSize: 14,
            }}
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
            name="email"
            mode="outlined"
          />
          <InputField
            inputStyle={{
              fontSize: 14,
            }}
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
            name="password"
            mode="outlined"
          />
          {signupError ? <ErrorMessage error={signupError} visible /> : null}
          <PaperButton
            mode="contained"
            onPress={handleSubmit(onHandleSignup)}
            color={'#222'}
            style={{
              marginTop: 5,
              width: '80%',
            }}
            loading={formState.isSubmitting}
            disabled={formState.isSubmitting}
            icon={formState.isSubmitting ? 'loading' : undefined}
          >
            Sign up
          </PaperButton>

          <View style={styles.loginSection}>
            <DividerWithText style={{ marginBottom: 0 }}>
              Already with us?
            </DividerWithText>
            <PaperButton
              mode={'contained'}
              onPress={() =>
                navigation.navigate('Login', {
                  email: getValues('email'),
                  password: getValues('password'),
                })
              }
              color="#fff"
              disabled={formState.isSubmitting}
            >
              Login
            </PaperButton>
          </View>
        </ViewColumn>
      </ParticleBackgroundContainer>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    // fontWeight: '600',
    color: '#444',
    alignSelf: 'center',
    paddingBottom: 40,
  },
  loginSection: {
    paddingTop: 40,
  },
});

export default SignupScreen;
