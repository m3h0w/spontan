import { Foundation, Ionicons } from '@expo/vector-icons';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  NavigationAction,
  NavigationContainerProps,
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LogoSmall from 'assets/images/logo-small.png';
import { IconButton } from 'components';
import DropdownComponent from 'components/HeaderDropdown';
import Heading from 'components/Heading';
import { auth } from 'config/firebase';
import CameraIcon from 'icons/CameraIcon';
import HomeIcon from 'icons/HomeIcon';
import WardrobeIcon from 'icons/WardrobeIcon';
import React, { FC, ReactElement } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Menu, Paragraph, Text, Title } from 'react-native-paper';
import { HomeScreen } from 'screens';
import { CameraActions } from 'screens/camera/CameraScreen';
import Wardrobe from 'screens/wardrobe/Wardrobe';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import CameraStack from './CameraStack';
import HomeStack from './HomeStack';
import WardrobeStack, { WardrobeStackParamList } from './WardrobeStack';

export type BottomNavigationParams = {
  HomeStack: undefined;
  CameraStack: undefined;
  WardrobeStack: {
    screen: keyof WardrobeStackParamList;
    params: WardrobeStackParamList[keyof WardrobeStackParamList];
  };
};

const BottomTab = createBottomTabNavigator<BottomNavigationParams>();

export function BottomTabNavigator() {
  const { user } = React.useContext(AuthenticatedUserContext);
  const [menuVisible, setMenuVisible] = React.useState(false);

  const handleSignOut = async () => {
    console.log('handling sign out');
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };
  if (!user) {
    return <View>No user!</View>;
  }

  return (
    <BottomTab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          borderTopColor: '#eee',
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: Platform.OS !== 'web' ? 10 : 0,
          height: 65,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
        },
      }}
    >
      <BottomTab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <HomeIcon color={color} size={size} active={focused} />
          ),
          tabBarLabelStyle:
            Platform.OS === 'web'
              ? { display: 'none' }
              : {
                  opacity: 0,
                },
        }}
      />
      {/* <BottomTab.Screen
        name="CameraStack"
        component={CameraStack}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ focused, color, size }) => {
            return <CameraIcon color={color} active={focused} size={size} />;
          },
        }}
      /> */}
      <BottomTab.Screen
        name="WardrobeStack"
        component={WardrobeStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <WardrobeIcon active={focused} color={'white'} size={size} />
          ),
          headerRight: DropdownComponent,
          headerShown: false,
          tabBarLabelStyle:
            Platform.OS === 'web'
              ? { display: 'none' }
              : {
                  opacity: 0,
                },
        }}
      />
      {/* <BottomTab.Screen
        name="Tab Four"
        component={TabTwoScreen}
        options={({ navigation }): BottomTabNavigationOptions => ({
          title: 'Tab Four',
          tabBarIconStyle: { display: 'none' },
          tabBarItemStyle: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarLabelStyle: {
            textAlignVertical: 'center',
          },
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginRight: 10,
              })}
            >
              <IconButton
                name="logout"
                size={24}
                color="#444"
                onPress={handleSignOut}
              />
            </Pressable>
          ),
        })}
      /> */}
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginRight: 15,
    width: 35,
    height: 35,
  },
});

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Foundation>['name'];
  color: string;
}) {
  return <Foundation size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconCircle(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  cameraActionsRef: React.RefObject<CameraActions>;
}) {
  const { name, cameraActionsRef, ...otherProps } = props;
  const size = 55;
  const iconMargin = Platform.OS !== 'web' ? 6 : 0;
  return (
    <TouchableOpacity>
      <Ionicons.Button
        name={name}
        onPress={e => {
          e.preventDefault();
          cameraActionsRef?.current?.snap();
        }}
        size={size}
        color="white"
        borderRadius={55}
        style={{
          textAlign: 'center',
          margin: 0,
          marginLeft: iconMargin,
          height: size * 1.4 + iconMargin,
          width: size * 1.4,
          justifyContent: 'center',
          elevation: 3,
        }}
        iconStyle={{ margin: 0 }}
        backgroundColor="black"
        {...otherProps}
      />
    </TouchableOpacity>
  );
}
