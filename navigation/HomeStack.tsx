import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogoSmall from 'assets/images/logo-small.png';
import DropdownComponent from 'components/HeaderDropdown';
import { AVAILABLE_FONTS } from 'hooks/useCachedResources';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Caption, Text, Title } from 'react-native-paper';
import { HomeScreen } from 'screens';
import CameraScreen from 'screens/camera/CameraScreen';
import AddEventScreen from 'screens/home/AddEventScreen';
import BrandScreen from 'screens/home/BrandScreen';
import EventScreen from 'screens/home/EventScreen';
import { scaled } from 'styles/scaled';
import { Brand } from 'types/Brand';
import { Event } from 'types/User';
import { Logo } from './AuthStack';

export type HomeStackParams = {
  Home: undefined;
  Brand: {
    brand: Brand;
    events: Event[];
  };
  Event: {
    event: Event;
  };
  AddEvent: undefined;
};

type Props = {
  ref: typeof CameraScreen;
};

export const SpontanHeaderTitle = () => {
  return (
    <View
      style={{
        marginLeft: -20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Logo />
      <View style={{ marginTop: 10 }}>
        <Title
          style={{
            marginBottom: 0,
            fontWeight: 'bold',
            lineHeight: 14,
          }}
        >
          SPONTAN
        </Title>
        <Caption
          style={{
            marginTop: -5,
            fontSize: 15,
            letterSpacing: 0.2,
            fontFamily: AVAILABLE_FONTS.DancingScript_700Bold,
          }}
        >
          Adventures await
        </Caption>
      </View>
    </View>
  );
};

const Stack = createStackNavigator<HomeStackParams>();

const HomeStack = (props: Props) => {
  // useForceNavigateToFirstEvent();

  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerMode: 'screen',
          title: 'Spontan',
          headerStyle: {
            height: 100,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: SpontanHeaderTitle,
          headerRight: DropdownComponent,
        }}
      />
      <Stack.Screen
        name="Brand"
        component={BrandScreen}
        options={({ route }) => ({
          title: route.params.brand.name,
          headerTitleAlign: 'center',
          headerTitle: props => {
            return (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Title style={{ flex: 1, fontWeight: 'bold' }}>
                  {props.children}
                </Title>
              </View>
            );
          },
          headerMode: 'screen',
          headerRight: DropdownComponent,
        })}
        getId={({ params }) => params.brand.name}
      />
      <Stack.Screen
        name="Event"
        component={EventScreen}
        options={({ route }) => ({
          title: route.params.event.name,
          headerTitleAlign: 'center',
          headerTitle: props => {
            return (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Title
                  style={{
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: scaled(14),
                    lineHeight: scaled(14),
                  }}
                >
                  {props.children}
                </Title>
              </View>
            );
          },
          headerRight: DropdownComponent,
        })}
        getId={({ params }) => params.event.name}
      />
      <Stack.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={({ route }) => ({
          title: 'New Event',
          headerTitleAlign: 'center',
          headerTitle: props => {
            return (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Title
                  style={{
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: scaled(14),
                    lineHeight: scaled(14),
                  }}
                >
                  {props.children}
                </Title>
              </View>
            );
          },
          headerRight: DropdownComponent,
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  logo: {
    marginRight: 15,
    width: 35,
    height: 35,
  },
});
