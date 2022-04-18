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

export type WardrobeStackParamList = {
  Wardrobe: undefined;
  SellItem: { item: Item };
};

const Stack = createStackNavigator<WardrobeStackParamList>();

const wardrobeHeaderOptions: StackNavigationOptions = {
  title: 'Your wardrobe',
  headerStyle: {
    height: 80,
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
    <Stack.Navigator
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
        name="Wardrobe"
        component={Wardrobe}
        options={{
          ...wardrobeHeaderOptions,
        }}
      />
      <Stack.Screen
        name="SellItem"
        component={SellItemScreen}
        options={{
          title: '',
          ...wardrobeHeaderOptions,
        }}
      />
    </Stack.Navigator>
  );
}

export default WardrobeStack;
