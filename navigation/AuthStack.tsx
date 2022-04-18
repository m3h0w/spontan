import { createStackNavigator } from '@react-navigation/stack';
import LogoSmall from 'assets/images/logo-small.png';
import { AVAILABLE_FONTS } from 'hooks/useCachedResources';
import React from 'react';
import { Image } from 'react-native';
import { Caption, Title } from 'react-native-paper';
import { IntroScreen, LoginScreen, SignupScreen } from 'screens';
import { scaled } from 'styles/scaled';

export type AuthStackParamList = {
  Intro: undefined;
  Login: {
    email: string;
    password: string;
  };
  Signup: {
    email: string;
    password: string;
  };
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <Caption
            style={{
              borderRadius: 200,
              borderWidth: 1,
              borderColor: '#000',
              textAlign: 'center',
              paddingTop: 1,
              width: 25,
              height: 25,
              marginRight: 20,
              fontSize: scaled(31),
              paddingBottom: 20,
              color: '#000',
              fontFamily: AVAILABLE_FONTS.DancingScript_400Regular,
            }}
          >
            S
          </Caption>
        ),
      }}
    >
      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: 'Join us',
        }}
      />
    </Stack.Navigator>
  );
}
