import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogoSmall from 'assets/images/logo-small.png';
import DropdownComponent from 'components/HeaderDropdown';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, Title } from 'react-native-paper';
import { HomeScreen } from 'screens';
import CameraScreen from 'screens/camera/CameraScreen';
import BrandScreen from 'screens/home/BrandScreen';
import ItemScreen from 'screens/home/ItemScreen';
import { scaled } from 'styles/scaled';
import { Brand } from 'types/Brand';
import { Item } from 'types/User';
import useForceNavigateToFirstItem from 'utils/forceNavigateToFirstItem';

export type HomeStackParams = {
  Home: undefined;
  Brand: {
    brand: Brand;
    items: Item[];
  };
  Item: {
    item: Item;
  };
};

type Props = {
  ref: typeof CameraScreen;
};

const Stack = createStackNavigator<HomeStackParams>();

const HomeStack = (props: Props) => {
  // useForceNavigateToFirstItem();

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
          title: 'Shop resale',
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
                <Image source={LogoSmall} style={styles.logo} />
                <View style={{ marginTop: -5 }}>
                  <Title style={{ marginBottom: -3, fontWeight: 'bold' }}>
                    {props.children}
                  </Title>
                  <Text style={{ fontFamily: 'WorkSans_300Light' }}>
                    From trusted brands
                  </Text>
                </View>
              </View>
            );
          },
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
        name="Item"
        component={ItemScreen}
        options={({ route }) => ({
          title: route.params.item.blueprint.itemName,
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
        getId={({ params }) => params.item.blueprint.itemName}
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
