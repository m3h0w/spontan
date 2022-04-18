import { createStackNavigator } from '@react-navigation/stack';
import LogoSmall from 'assets/images/logo-small.png';
import React, { forwardRef } from 'react';
import { Image } from 'react-native';
import { IntroScreen, LoginScreen, SignupScreen } from 'screens';
import AddItemsScreen from 'screens/camera/AddItemsScreen';
import CameraScreen from 'screens/camera/CameraScreen';
import { ReceiptDataParsed } from 'utils/parseReceiptData';

export type CameraStackParamList = {
  Camera: undefined;
  AddItems: ReceiptDataParsed;
};

type Props = {
  ref: typeof CameraScreen;
};

const Stack = createStackNavigator<CameraStackParamList>();

function CameraStack(props: Props) {
  return (
    <Stack.Navigator
      //   initialRouteName="AddItems"
      screenOptions={{
        headerRight: () => (
          <Image
            source={LogoSmall}
            style={{ width: 25, height: 25, marginRight: 20 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddItems"
        component={AddItemsScreen}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
}

export default CameraStack;
