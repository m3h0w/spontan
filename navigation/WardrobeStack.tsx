import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import LogoSmall from 'assets/images/logo-small.png';
import DropdownComponent from 'components/HeaderDropdown';
import Heading from 'components/Heading';
import React from 'react';
import { Image, View } from 'react-native';
import SellItemScreen from 'screens/wardrobe/SellItem';
import Wardrobe from 'screens/wardrobe/Wardrobe';
import { Item } from 'types/User';
import { Logo } from './AuthStack';
import { SpontanHeaderTitle } from './HomeStack';

export type WardrobeStackParamList = {
  Wardrobe: undefined;
  SellItem: { item: Item };
};

const Stack = createStackNavigator<WardrobeStackParamList>();

const wardrobeHeaderOptions: StackNavigationOptions = {
  title: 'Your wardrobe',
  headerStyle: {
    height: 100,
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitle: props => {
    return (
      <View
        style={{
          marginLeft: -20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View>
          <Heading style={{ marginBottom: -5 }}>{props.children}</Heading>
        </View>
      </View>
    );
  },
};

function WardrobeStack(props: any) {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Wardrobe"
        component={Wardrobe}
        options={{
          ...wardrobeHeaderOptions,
          headerTitle: SpontanHeaderTitle,
          headerRight: DropdownComponent,
        }}
      />
      <Stack.Screen
        name="SellItem"
        component={SellItemScreen}
        options={{
          title: '',
          ...wardrobeHeaderOptions,
          headerTitle: SpontanHeaderTitle,
          headerRight: DropdownComponent,
        }}
      />
    </Stack.Navigator>
  );
}

export default WardrobeStack;
