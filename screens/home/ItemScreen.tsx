import { StackScreenProps } from '@react-navigation/stack';
import Heading from 'components/Heading';
import IconButtonComponent from 'components/IconButton';
import NumberWithText from 'components/NumberWithText';
import { firestore } from 'config/firebase';
import { HomeStackParams } from 'navigation/HomeStack';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Button,
  Caption,
  IconButton,
  Paragraph,
  Text,
  Title,
} from 'react-native-paper';
import { fonts } from 'styles/fontConfig';
import { scaled } from 'styles/scaled';
import { FirestoreUser, Item } from 'types/User';
import { parseDate } from 'utils/parseReceiptData';

const getSeason = (d: Date) =>
  ['Winter', 'Spring', 'Summer', 'Autumn'][
    Math.floor((d.getMonth() / 12) * 4) % 4
  ];

const ItemScreen: FC<StackScreenProps<HomeStackParams, 'Item'>> = ({
  navigation,
  route,
}) => {
  const [owner, setOwner] = useState<FirestoreUser | null | undefined>(
    undefined,
  );
  const { item } = route.params;

  useEffect(() => {
    if (item) {
      const f = async () => {
        const user = await firestore.getUser(item.ownerId);
        setOwner(user as FirestoreUser);
      };

      f();
    }
  }, [item]);

  const [headerShown, setHeaderShown] = useState(false);
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

  const releaseDate = parseDate(item.blueprint.itemReleaseDate);

  return (
    <View style={{ display: 'flex', flex: 1 }}>
      <View style={{ position: 'absolute', left: 15, top: 15, zIndex: 100 }}>
        <IconButtonComponent
          name="arrow-left"
          size={24}
          color="#444"
          onPress={navigation.goBack}
          style={{ marginRight: 10 }}
        />
      </View>
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
            marginBottom: 20,
          }}
        >
          {item.blueprint.itemImg.map((img, k) => {
            const style: StyleProp<ImageStyle>[] = [styles.itemImage];
            if (k !== 0) {
              style.push(styles.imageLeftBorder);
            }
            return <Image key={k} source={{ uri: img }} style={style} />;
          })}
        </ScrollView>
        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 5,
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <Heading
              style={{
                fontSize: scaled(18),
                lineHeight: scaled(19),
                fontWeight: 'bold',
              }}
            >
              {item.blueprint.itemName}
            </Heading>
            <Text
              style={{
                fontSize: scaled(12),
                lineHeight: scaled(13),
                // fontWeight: 'bold',
                marginBottom: 5,
              }}
            >
              {item.blueprint.itemColor}, {item.blueprint.itemSize}
            </Text>
            <Title
              style={{
                fontSize: scaled(19),
                lineHeight: scaled(20),
                fontFamily: fonts.light.fontFamily,
                fontWeight: 'bold',
              }}
            >
              {item.price} kr.
            </Title>
          </View>

          <View
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 12 }}
          >
            <Button
              mode="contained"
              color="#9EB19E"
              labelStyle={{
                color: 'white',
                fontSize: scaled(14),
                fontWeight: 'bold',
              }}
              style={{ flex: 4 }}
            >
              Connect to buy
            </Button>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Caption style={{ lineHeight: scaled(12) }}>
                {getSeason(releaseDate)} {releaseDate.getFullYear()}
              </Caption>
              <Caption style={{ lineHeight: scaled(12) }}>Seller: 4.6</Caption>
            </View>
          </View>
          <View style={{ marginBottom: 8 }}>
            <Paragraph
              style={{
                fontSize: scaled(13),
                lineHeight: scaled(15),
                paddingRight: 20,
                fontFamily: fonts.light.fontFamily,
                color: '#17191B',
              }}
            >
              {item.blueprint.itemDescription}
            </Paragraph>
          </View>
          <View>
            <Title style={{ fontSize: scaled(15) }}>
              Seller information about the item
            </Title>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTopColor: '#ddd',
                borderTopWidth: 1,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <Title
                style={{
                  fontSize: scaled(13),
                  lineHeight: scaled(15),
                  flex: 2,
                  paddingRight: 15,
                }}
              >
                Seller's est. period and intensity of use
              </Title>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 4 }}>
                <InfoBadge>Spring</InfoBadge>
                <InfoBadge>Autumn</InfoBadge>
                <InfoBadge>Maybe once per month</InfoBadge>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderTopColor: '#ddd',
                borderTopWidth: 1,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <Title
                style={{
                  fontSize: scaled(13),
                  lineHeight: scaled(15),
                  flex: 2,
                  paddingRight: 15,
                }}
              >
                Other information
              </Title>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 4 }}>
                <InfoBadge>Close-up visible use</InfoBadge>
                <InfoBadge>Never washed</InfoBadge>
                <InfoBadge>N/A</InfoBadge>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderTopColor: '#ddd',
                borderTopWidth: 1,
                paddingTop: 15,
                paddingBottom: 5,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column' }}>
                  <Caption
                    style={{ fontSize: scaled(12), lineHeight: scaled(12) }}
                  >
                    Seller
                  </Caption>
                  <Title
                    style={{
                      fontSize: scaled(19),
                      lineHeight: scaled(20),
                      fontWeight: 'bold',
                    }}
                  >
                    {owner?.name && owner?.lastName
                      ? `${owner.name} ${owner.lastName}`
                      : owner?.email}
                  </Title>
                  <Caption
                    style={{ lineHeight: scaled(12), fontSize: scaled(11) }}
                  >
                    Member since
                    {owner?.createdAt
                      ? ` ${owner?.createdAt.toDate().toLocaleDateString()}`
                      : " May, '21"}
                  </Caption>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  paddingBottom: 15,
                  borderBottomColor: '#ddd',
                  borderBottomWidth: 1,
                }}
              >
                <NumberWithText number={2} label="Sold" />
                <NumberWithText number={4.5} label="Rating" />
                <NumberWithText
                  number={'5 hour'}
                  label="Avg. response time"
                  wide={true}
                />
                <NumberWithText number={3} label="For sale" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const InfoBadge: FC<{
  style?: StyleProp<ViewStyle>;
}> = ({ style, children }) => {
  return (
    <Button
      disabled={true}
      mode="contained"
      labelStyle={{
        color: 'white',
        fontSize: scaled(13),
        fontWeight: 'bold',
        margin: 6,
        textTransform: 'none',
      }}
      style={{
        margin: 2,
        borderColor: 'white',
        borderWidth: 1,
        padding: 0,
        backgroundColor: '#c4c4c4',
      }}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
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
  imageLeftBorder: {
    borderLeftColor: '#fff',
    borderLeftWidth: 4,
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // paddingBottom: 6,
  },
  itemImage: {
    height: scaled(300),
    width: 200,
    // marginBottom: 5,
  },
});

export default ItemScreen;
