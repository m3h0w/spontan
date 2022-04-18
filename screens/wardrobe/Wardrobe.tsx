import { StackScreenProps } from '@react-navigation/stack';
import Heading from 'components/Heading';
import NumberWithText from 'components/NumberWithText';
import SmallItemImage from 'components/SmallItemImage';
import { useAuthenticatedUser } from 'navigation/AuthenticatedUserProvider';
import { BottomNavigationParams } from 'navigation/BottomTabNavigation';
import { WardrobeStackParamList } from 'navigation/WardrobeStack';
import React, { FC, useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Button, Caption } from 'react-native-paper';
import { fonts } from 'styles/fontConfig';
import { scaled } from 'styles/scaled';
import { Text, View } from '../../components/Themed';

const makeNumberLabel = (number: number | string, label: string) => ({
  number,
  label,
});

const fakeUserData = [
  makeNumberLabel(Math.round(Math.random() * 10), 'Acquired'),
  makeNumberLabel(Math.round(Math.random() * 10), 'Sold'),
  makeNumberLabel(`${Math.round(Math.random() * 100)}.00 kr.`, 'Earned'),
  makeNumberLabel(4.5, 'Rating'),
  makeNumberLabel(Math.round(Math.random() * 50), 'Pins'),
];

const EmptyWardrobePlaceholder: FC<{ goToCamera: () => void }> = ({
  goToCamera,
}) => {
  return (
    <View
      style={{
        height: '90%',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Heading
        style={{
          fontFamily: fonts.regular.fontFamily,
          fontWeight: 'normal',
          color: '#7b7b7b',
          marginBottom: '20%',
        }}
      >
        Seems like your wardrobe is empty.{' '}
        <Text style={{ color: '#000' }}>
          You can only sell apparel that is added to your wardobe.
        </Text>{' '}
        Follow the guides to start selling.
      </Heading>
      <Button
        color="black"
        mode="contained"
        style={{ width: '100%' }}
        labelStyle={{ textTransform: 'none' }}
        onPress={goToCamera}
      >
        Add by scanning a physical receipt
      </Button>
      <Caption>If you have the receipt from a purchase in a store</Caption>
    </View>
  );
};

type Props = StackScreenProps<WardrobeStackParamList, 'Wardrobe'>;

const Wardrobe: FC<Props> = ({ navigation }) => {
  const user = useAuthenticatedUser();
  if (!user) {
    return null;
  }
  const items = user.items;
  const noItemsYet = items.length === 0;

  useEffect(() => {
    if (items.length) {
      console.log('here');
      setTimeout(() => {
        navigation.navigate('SellItem', { item: items[0] });
      }, 100);
    }
  }, [items]);

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 8,
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderBottomColor: '#dedede',
        }}
      >
        {fakeUserData.map(({ number, label }, key) => (
          <NumberWithText key={label} number={number} label={label} />
        ))}
      </View>
      {noItemsYet ? (
        <EmptyWardrobePlaceholder
          goToCamera={() => navigation.navigate('CameraStack')}
        />
      ) : (
        <ScrollView
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 3,
          }}
        >
          {items.map((item, k) => {
            const { blueprint } = item;
            return (
              <Pressable
                key={k}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingBottom: 5,
                }}
                onPress={() =>
                  navigation.navigate('WardrobeStack', {
                    screen: 'SellItem',
                    params: { item },
                  })
                }
              >
                <SmallItemImage
                  source={{ uri: item.blueprint.itemImg[0] }}
                  style={{ marginTop: 8 }}
                />
                <View
                  style={{
                    flex: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: 9,
                    borderTopWidth: 1,
                    borderTopColor: k !== 0 ? '#ccc' : '#fff',
                  }}
                >
                  <Heading
                    style={{
                      fontSize: scaled(14),
                      paddingTop: 5,
                      paddingBottom: 10,
                    }}
                  >
                    {blueprint.itemName}
                  </Heading>
                  <Caption style={{ lineHeight: scaled(15) }}>
                    {blueprint.itemColor}
                  </Caption>
                  <Caption style={{ lineHeight: scaled(15) }}>
                    {blueprint.itemSize}
                  </Caption>
                  <Caption style={{ lineHeight: scaled(15) }}>
                    {`${
                      item.price ? item.price : Math.round(Math.random() * 100)
                    } kr.`}
                  </Caption>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'scroll',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingTop: 160,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  button: {
    width: '100%',
    backgroundColor: 'black',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: scaled(30),
    textAlign: 'center',
  },
});

export default Wardrobe;
