import { StackScreenProps } from '@react-navigation/stack';
import Heading from 'components/Heading';
import IconButtonComponent from 'components/IconButton';
import NumberWithText from 'components/NumberWithText';
import EventPlaceholderImage from 'assets/images/eventPlaceholder.jpg';

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
import { FirestoreUser, Event } from 'types/User';
import { parseDate } from 'utils/parseReceiptData';

const getSeason = (d: Date) =>
  ['Winter', 'Spring', 'Summer', 'Autumn'][
    Math.floor((d.getMonth() / 12) * 4) % 4
  ];

const EventScreen: FC<StackScreenProps<HomeStackParams, 'Event'>> = ({
  navigation,
  route,
}) => {
  const [owner, setOwner] = useState<FirestoreUser | null | undefined>(
    undefined,
  );
  const { event } = route.params;

  useEffect(() => {
    if (event) {
      const f = async () => {
        const user = await firestore.getUser(event.ownerId);
        setOwner(user as FirestoreUser);
      };

      f();
    }
  }, [event]);

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

  return (
    <View style={{ display: 'flex', flex: 1 }}>
      <View style={{ position: 'absolute', left: 15, top: 15, zIndex: 100 }}>
        <IconButtonComponent
          name="arrow-left"
          size={24}
          color="#000"
          onPress={navigation.goBack}
          style={{ marginRight: 10 }}
          noBackground={true}
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
        <View
          style={[
            styles.brandsRow,
            {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 2.65,
              marginBottom: 20,
            },
          ]}
        >
          <Image
            source={
              event.imageUrl ? { uri: event.imageUrl } : EventPlaceholderImage
            }
            style={styles.eventImage}
          />
        </View>
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
                lineHeight: scaled(1),
                fontWeight: 'bold',
              }}
            >
              {event.name}
            </Heading>
            <Title
              style={{
                fontSize: scaled(19),
                lineHeight: scaled(20),
                fontFamily: fonts.light.fontFamily,
                fontWeight: 'bold',
              }}
            >
              {new Date(event.date.seconds * 1000).toDateString()}
            </Title>
            <Text
              style={{
                fontSize: scaled(12),
                lineHeight: scaled(13),
                // fontWeight: 'bold',
                marginBottom: 5,
              }}
            >
              {event.description}
            </Text>
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
    maxHeight: 150,
    width: '100%',
    flex: 1,
    flexGrow: 1,
  },
  imageLeftBorder: {
    borderLeftColor: '#fff',
    borderLeftWidth: 4,
  },
  event: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // paddingBottom: 6,
  },
  eventImage: {
    height: 150,
    width: '100%',
    // marginBottom: 5,
  },
});

export default EventScreen;
