import { StackScreenProps } from '@react-navigation/stack';
import BrandImage1 from 'assets/images/brands/brand1.png';
import BrandImage2 from 'assets/images/brands/brand2.png';
import BrandImageX from 'assets/images/brands/brandX.png';
import Loading, { Indicator } from 'components/Loading';
import { firestore } from 'config/firebase';
import { StatusBar } from 'expo-status-bar';
import navigation from 'navigation';
import { HomeStackParams } from 'navigation/HomeStack';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Caption, Title } from 'react-native-paper';
import { scaled } from 'styles/scaled';
import { Brand } from 'types/Brand';
import { Item } from 'types/User';
import chunkArray from 'utils/chunkArray';
import { View } from '../../components/Themed';
import SkeletonContent from 'react-native-skeleton-content';
import { PreStyleSheet } from 'types/Styles';
import items from 'data/items';
import SkeletonLoading from 'components/SkeletonLoading';

const brandImages = [BrandImage1, BrandImage2, BrandImageX];

const chooseRandomFromArray = (array: any[]) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const Brands: FC<{
  brandsState: Brand[];
  getBrandItems: (brand: Brand) => Item[];
  navigation: any;
}> = ({ brandsState, navigation, getBrandItems }) => {
  // if (brandsState.length === 0) {
  //   <ActivityIndicator size="large" />;
  // }

  console.log(styles.brandImage);

  const brandSkeleton = {
    width: BRAND_IMAGE_WIDTH,
    height: BRAND_IMAGE_HEIGHT,
    marginLeft: 6,
    borderRadius: 0,
  };

  return (
    // <SkeletonContent
    //   isLoading={brandsState.length === 0}
    //   boneColor="#565656"
    //   highlightColor="#232323"
    //   animationType="pulse"
    //   containerStyle={{
    //     flex: 1,
    //     width: '100%',
    //     height: BRAND_IMAGE_WIDTH,
    //     flexDirection: 'row',
    //   }}
    //   layout={[
    //     { ...brandSkeleton, marginLeft: 0 },
    //     brandSkeleton,
    //     brandSkeleton,
    //     brandSkeleton,
    //   ]}
    // >
    <SkeletonLoading
      isLoading={brandsState.length === 0}
      containerStyle={{ height: BRAND_IMAGE_HEIGHT }}
      layout={[
        { ...brandSkeleton, marginLeft: 0 },
        brandSkeleton,
        brandSkeleton,
        brandSkeleton,
      ]}
    >
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.brandsRow}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2.65,
        }}
      >
        {[...brandsState, ...brandsState].map((brand, k) => {
          const style: StyleProp<ImageStyle>[] = [styles.brandImage];
          if (k !== 0) {
            style.push(styles.imageLeftBorder);
          }
          return (
            <Pressable
              key={k}
              onPress={() =>
                navigation.navigate('Brand', {
                  brand,
                  items: getBrandItems(brand),
                })
              }
            >
              <Image source={brandImages[k % 3]} style={style} />
            </Pressable>
          );
        })}
      </ScrollView>
    </SkeletonLoading>
  );
};

const Items: FC<{ itemsState: Item[]; navigation: any }> = ({
  itemsState,
  navigation,
}) => {
  const itemChunks = useMemo(() => chunkArray(itemsState, 3), [itemsState]);

  const ItemRowSkeleton: FC = ({ children }) => {
    const itemSkeleton = {
      flex: 1,
      width: ITEM_IMAGE_SIZE,
      height: ITEM_IMAGE_SIZE,
      marginLeft: 6,
      marginBottom: 20,
      borderRadius: 3,
    };
    return (
      <SkeletonLoading
        isLoading={itemsState.length === 0}
        containerStyle={styles.itemsGrid}
        layout={[
          { ...itemSkeleton, marginLeft: 0 },
          itemSkeleton,
          itemSkeleton,
        ]}
      >
        {children}
      </SkeletonLoading>
    );
  };

  return (
    <View>
      <View style={styles.itemsHeading}>
        <Title style={{ fontSize: scaled(17), lineHeight: scaled(20) }}>
          Just in from resellers
        </Title>
      </View>
      <ItemRowSkeleton>
        {itemChunks.map((items: Item[], rowNum: number) => {
          return (
            <View style={styles.itemsRow} key={rowNum}>
              {items.map((item: Item, num: number) => {
                const classes = [styles.item] as ViewStyle[];
                if (num !== 0) {
                  classes.push(styles.imageLeftBorder);
                }
                return (
                  <Pressable
                    key={num}
                    onPress={() => {
                      navigation.navigate('Item', { item });
                    }}
                    style={classes}
                  >
                    <Image
                      source={{
                        uri: chooseRandomFromArray(item.blueprint.itemImg),
                      }}
                      style={styles.itemImage}
                    />
                    <View
                      style={{
                        paddingLeft: 5,
                        paddingRight: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <Title
                        style={{
                          fontSize: scaled(12),
                          lineHeight: scaled(13),
                        }}
                      >
                        {item.blueprint.itemName}
                      </Title>
                      <Caption
                        style={{
                          fontSize: scaled(9),
                          lineHeight: scaled(10),
                        }}
                      >
                        {item.brandName} | {item.price} kr.
                      </Caption>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          );
        })}
        {/* </View> */}
      </ItemRowSkeleton>
      <ItemRowSkeleton />
      <ItemRowSkeleton />
    </View>
  );
};

export default function HomeScreen({
  navigation,
}: StackScreenProps<HomeStackParams, 'Home'>) {
  const [itemsState, setItemsState] = useState<Array<Item>>([]);
  const [brandsState, setBrandsState] = useState<Array<Brand>>([]);
  useEffect(() => {
    const f = async () => {
      const brands = await firestore.getAllBrands();
      setTimeout(() => {
        setBrandsState(brands);
      }, 1000);
    };
    f();
  }, []);
  useEffect(() => {
    const f = async () => {
      const items = await firestore.getItems();
      setTimeout(() => {
        setItemsState(items);
      }, 2000);
    };
    f();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <Brands
        navigation={navigation}
        brandsState={brandsState}
        getBrandItems={useCallback(
          (brand: Brand) => itemsState.filter(v => v.brandName === brand.name),
          [itemsState],
        )}
      />
      <Items itemsState={itemsState} navigation={navigation} />
    </ScrollView>
  );
}

const ITEM_IMAGE_SIZE = 100;
const BRAND_IMAGE_HEIGHT = 250;
const BRAND_IMAGE_WIDTH = 150;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#fff',
  },
  brandsRow: {
    display: 'flex',
    flexDirection: 'row',
    height: '50%',
    maxHeight: BRAND_IMAGE_HEIGHT,
    width: '100%',
    flex: 1,
    flexGrow: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.65,
  },
  brandImage: {
    height: BRAND_IMAGE_HEIGHT,
    width: BRAND_IMAGE_WIDTH,
    // flex: 1,
  },
  imageLeftBorder: {
    borderLeftColor: '#fff',
    borderLeftWidth: 4,
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
    paddingBottom: 5,
    paddingLeft: 10,
  },
  itemsGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
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
    paddingBottom: 6,
  },
  itemImage: {
    height: 100,
    marginBottom: 5,
    borderRadius: 3,
  },
});
