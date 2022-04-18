import { StackScreenProps } from '@react-navigation/stack';
import { IconButton } from 'components';
import SmallItemImage from 'components/SmallItemImage';
import { useBrandImage } from 'config/hooks';
import { HomeStackParams } from 'navigation/HomeStack';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Caption, Title } from 'react-native-paper';
import { scaled } from 'styles/scaled';
import { Brand } from 'types/Brand';
import { Item } from 'types/User';
import chunkArray from 'utils/chunkArray';

const BrandHeader = ({
  brand,
  imageHeight,
  goBack,
}: {
  brand: Brand;
  imageHeight?: number;
  goBack: () => void;
}) => {
  const brandImage = useBrandImage(brand.name);
  console.log({ brandImage });
  return (
    <ImageBackground
      source={{ uri: brandImage }}
      imageStyle={{
        resizeMode: 'cover',
        alignSelf: 'flex-start',
        width: undefined,
        height: undefined,
      }}
      style={{
        width: '100%',
        height: imageHeight ?? 250,
        marginBottom: 8,
        top: 0,
        bottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.65,
      }}
    >
      <View style={{ position: 'absolute', left: 20, top: 20 }}>
        <IconButton
          name="arrow-left"
          size={24}
          color="#444"
          onPress={goBack}
          style={{ marginRight: 10 }}
        />
      </View>
      <View
        style={{ position: 'absolute', left: 25, bottom: 25, width: '50%' }}
      >
        <Title>{brand.name}</Title>
        <Caption>{brand.description}</Caption>
      </View>
    </ImageBackground>
  );
};

const BrandScreen: FC<StackScreenProps<HomeStackParams, 'Brand'>> = ({
  navigation,
  route,
}) => {
  const [headerShown, setHeaderShown] = useState(false);
  const { brand, items } = route.params;
  const itemChunks = useMemo(() => chunkArray(items, 3), [items]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitleContainerStyle: {
        opacity: fadeAnim,
        height: fadeAnimHeight,
      },
      headerLeftContainerStyle: {
        opacity: fadeAnim,

        height: fadeAnimHeight,
      },
      headerRightContainerStyle: {
        opacity: fadeAnim,

        height: fadeAnimHeight,
      },
    });
  }, [headerShown]);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnimHeight, {
      toValue: 60,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnimHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ display: 'flex', flex: 1 }}>
      <Animated.View
        style={{
          height: fadeAnimHeight,
          backgroundColor: '#fff',
          opacity: 0.95,
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 100,
        }}
      ></Animated.View>
      <ScrollView
        style={styles.container}
        onScroll={event => {
          if (event.nativeEvent.contentOffset.y > 100) {
            fadeIn();
          } else {
            fadeOut();
          }
        }}
        scrollEventThrottle={20}
      >
        <BrandHeader brand={brand} goBack={navigation.goBack} />
        <View style={styles.itemsGrid}>
          {[...itemChunks, ...itemChunks].map(
            (items: Item[], rowNum: number) => {
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
                        <SmallItemImage
                          source={{ uri: item.blueprint.itemImg[0] }}
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
            },
          )}
        </View>
        {/* <View style={{ height: 500 }}></View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    position: 'absolute',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'scroll',
    backgroundColor: '#F0F4F3',
  },
  brandsRow: {
    display: 'flex',
    flexDirection: 'row',
    height: '50%',
    maxHeight: 250,
    width: '100%',
    flex: 1,
    flexGrow: 1,
  },
  brandImage: {
    height: 250,
    width: 150,
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

export default BrandScreen;
