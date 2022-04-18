import { StackScreenProps } from '@react-navigation/stack';
import Heading from 'components/Heading';
import { CameraStackParamList } from 'navigation/CameraStack';
import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Button,
  Caption,
  DataTable,
  Paragraph,
} from 'react-native-paper';
import { scaled } from 'styles/scaled';
import { ReceiptDataParsed } from 'utils/parseReceiptData';
import { Text, TextProps, View } from '../../components/Themed';
import exampleItem from 'data/itemBlueprints/1';
import knowItemsObject from 'data/itemBlueprints/index';
import { Replace } from 'utils/types';
import { firestore } from 'config/firebase';
import { useAuthenticatedUser } from 'navigation/AuthenticatedUserProvider';
import Loading from 'components/Loading';

export type ItemBlueprint = Replace<
  typeof exampleItem,
  {
    itemExtra: null | string;
  }
>;

const knownItems = Object.values(knowItemsObject);

const Items: FC<{
  items: Array<ItemBlueprint>;
  prices: Array<number | null>;
  selectedIndices: Set<number>;
  addSelectedIndex: (index: number) => void;
  removeSelectedIndex: (index: number) => void;
}> = ({
  items,
  prices,
  selectedIndices,
  addSelectedIndex,
  removeSelectedIndex,
}) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item, k) => {
        const selected = selectedIndices && selectedIndices.has(k);
        return (
          <Pressable
            key={k}
            onPress={() => {
              if (!selected) {
                addSelectedIndex(k);
              } else {
                removeSelectedIndex(k);
              }
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingBottom: 10,
                opacity: selected ? 1 : 0.5,
              }}
            >
              <Image
                source={{ uri: item.itemImg[0] }}
                style={{
                  flex: 3,
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  marginBottom: 10,
                }}
                key={k}
              />
              <View
                style={{
                  flex: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 9,
                  borderTopWidth: 1,
                  borderTopColor: '#ccc',
                }}
              >
                <Heading
                  style={{
                    fontSize: scaled(14),
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  {item.itemName}
                </Heading>
                <Caption style={{ lineHeight: scaled(15) }}>
                  {item.itemColor}
                </Caption>
                <Caption style={{ lineHeight: scaled(15) }}>
                  {item.itemSize}
                </Caption>
                <Caption style={{ lineHeight: scaled(15) }}>
                  {prices[k] ? `${prices[k]} kr.` : 'Price unknown'}
                </Caption>
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const CustomHeading: FC<TextProps> = props => {
  return (
    <Heading
      {...props}
      style={{
        fontSize: scaled(18),
        lineHeight: scaled(18),
        width: '70%',
        ...(props.style as any),
      }}
    >
      {props.children}
    </Heading>
  );
};

const findItems = (
  receiptData: ReceiptDataParsed,
  knownItems: Array<ItemBlueprint>,
) => {
  let matchingBlueprints: Array<ItemBlueprint> = [];
  let prices: Array<number | null> = [];
  for (const lineItem of receiptData.lineItems) {
    console.log(
      { lineItem },
      knownItems.map(i => i.itemSKU),
    );
    if (lineItem.SKU) {
      const selectedItem = knownItems.find(i => i.itemSKU === lineItem.SKU);
      if (selectedItem) {
        matchingBlueprints.push(selectedItem);
        prices.push(lineItem.price ? lineItem.price : null);
      }
    }
  }
  return {
    matchingBlueprints,
    prices,
  };
};

export default function AddItemsScreen({
  navigation,
  route,
}: StackScreenProps<CameraStackParamList, 'AddItems'>) {
  const user = useAuthenticatedUser()!;
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
    new Set(),
  );
  const [addingItems, setAddingItems] = useState(false);
  const receiptData = route.params;

  const addItemsToWadrdrobe = useCallback(
    async (
      items: Array<ItemBlueprint>,
      prices: Array<number | null>,
      receiptDate: Date,
    ) => {
      setAddingItems(true);
      await firestore.newItems(user.uid, items, prices, receiptDate);
      setAddingItems(false);
    },
    [setAddingItems],
  );

  const { matchingBlueprints, prices } = useMemo(
    () => findItems(receiptData, knownItems),
    [receiptData],
  );

  // const selectedItems = knownItems;
  if (!matchingBlueprints.length) {
    return (
      <View style={styles.container}>
        <CustomHeading>
          No items from the receipt have been found in our database.
        </CustomHeading>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <CustomHeading style={{ paddingBottom: 20 }}>
        Select items you want to add to your wardrobe.
      </CustomHeading>
      <Items
        items={matchingBlueprints}
        prices={prices}
        selectedIndices={selectedIndices}
        addSelectedIndex={(index: number) => {
          setSelectedIndices(prevSet => {
            prevSet?.add(index);
            return new Set(prevSet);
          });
        }}
        removeSelectedIndex={(index: number) => {
          setSelectedIndices(prevSet => {
            prevSet?.delete(index);
            return new Set(prevSet);
          });
        }}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        {addingItems ? (
          <View
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator color="black" />
          </View>
        ) : (
          <>
            <Button
              mode="contained"
              color="black"
              style={{ width: '49%', borderRadius: 0 }}
              contentStyle={{ borderRadius: 0 }}
              theme={{ roundness: 0 }}
              labelStyle={{ fontSize: scaled(10) }}
              onPress={async () => {
                await addItemsToWadrdrobe(
                  matchingBlueprints,
                  prices,
                  receiptData.date,
                );
                navigation.getParent()?.navigate('Wardrobe');
              }}
              disabled={!selectedIndices.size || addingItems}
            >
              Add to wardrobe
            </Button>
            <Button
              mode="contained"
              color="#ccc"
              style={{ width: '49%', borderRadius: 0 }}
              contentStyle={{ borderRadius: 0 }}
              theme={{ roundness: 0 }}
              labelStyle={{ fontSize: scaled(10) }}
              onPress={() => navigation.goBack()}
            >
              Scan again
            </Button>
          </>
        )}
      </View>
      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'scroll',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
  },
  brandsRow: {
    display: 'flex',
    flexDirection: 'row',
    height: '50%',
    width: '100%',
  },
  brandImage: {
    flex: 1,
  },
  imageLeftBorder: {
    marginLeft: 4,
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
  itemsHeading: {
    paddingTop: 15,
    paddingLeft: 10,
  },
  itemsGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemsRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  itemImage: {
    height: 100,
  },
});
