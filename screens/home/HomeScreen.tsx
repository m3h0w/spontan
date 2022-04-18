import { StackScreenProps } from '@react-navigation/stack';
import EventPlaceholderImage from 'assets/images/eventPlaceholder.jpg';
import GroupImage1 from 'assets/images/groups/group1.png';
import GroupImage2 from 'assets/images/groups/group2.png';
import GroupImageX from 'assets/images/groups/groupX.png';
import SkeletonLoading from 'components/SkeletonLoading';
import { timeToString } from 'components/TimePickerInput';
import { firestore } from 'config/firebase';
import { StatusBar } from 'expo-status-bar';
import { useAuthenticatedUser } from 'navigation/AuthenticatedUserProvider';
import { HomeStackParams } from 'navigation/HomeStack';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Caption, FAB, Title } from 'react-native-paper';
import { ParticleBackgroundContainer } from 'screens/IntroScreen';
import { scaled } from 'styles/scaled';
import { Event, Group } from 'types/User';
import chunkArray from 'utils/chunkArray';
import shadowStyle from 'utils/shadowStyle';

const groupImages = [GroupImage1, GroupImage2, GroupImageX];

const chooseRandomFromArray = (array: any[]) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const Groups: FC<{
  groupsState?: Group[];
  getGroupEvents: (group: Group) => Event[];
  navigation: any;
}> = ({ groupsState, navigation, getGroupEvents }) => {
  const groupSkeleton = {
    width: BRAND_IMAGE_WIDTH,
    height: BRAND_IMAGE_HEIGHT,
    marginLeft: 6,
    borderRadius: 0,
  };

  return (
    <SkeletonLoading
      isLoading={!groupsState}
      containerStyle={{
        height: BRAND_IMAGE_HEIGHT,
        backgroundColor: 'transparent',
      }}
      layout={[
        { ...groupSkeleton, marginLeft: 0 },
        groupSkeleton,
        groupSkeleton,
        groupSkeleton,
      ]}
    >
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.groupsRow}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2.65,
          backgroundColor: 'transparent',
        }}
      >
        {groupsState &&
          [...groupsState, ...groupsState].map((group, k) => {
            const style: StyleProp<ImageStyle>[] = [styles.groupImage];
            if (k !== 0) {
              style.push(styles.imageLeftBorder);
            }
            return (
              <Pressable
                key={k}
                onPress={() =>
                  navigation.navigate('Group', {
                    group,
                    events: getGroupEvents(group),
                  })
                }
              >
                <Image source={groupImages[k % 3]} style={style} />
              </Pressable>
            );
          })}
      </ScrollView>
    </SkeletonLoading>
  );
};

const Events: FC<{ eventsState?: Event[]; navigation: any }> = ({
  eventsState,
  navigation,
}) => {
  const eventChunks = useMemo(
    () => (eventsState ? chunkArray(eventsState, 3) : []),
    [eventsState],
  );

  const EventRowSkeleton: FC = ({ children }) => {
    const eventSkeleton = {
      flex: 1,
      width: ITEM_IMAGE_SIZE,
      height: ITEM_IMAGE_SIZE,
      marginLeft: 6,
      marginBottom: 20,
      borderRadius: 3,
    };
    return (
      <SkeletonLoading
        isLoading={!eventsState}
        containerStyle={styles.eventsGrid}
        layout={[
          { ...eventSkeleton, marginLeft: 0 },
          eventSkeleton,
          eventSkeleton,
        ]}
      >
        {children}
      </SkeletonLoading>
    );
  };

  return (
    <View style={{ backgroundColor: 'transparent' }}>
      <View style={styles.eventsHeading}>
        <Title style={{ fontSize: scaled(17), lineHeight: scaled(20) }}>
          {eventsState && eventsState.length == 0
            ? 'No events found'
            : 'Your events'}
        </Title>
      </View>
      <EventRowSkeleton>
        {eventsState &&
          eventsState.map((event: Event, num: number) => {
            const classes = [styles.event] as ViewStyle[];
            if (num !== 0) {
              classes.push(styles.imageLeftBorder);
            }
            return (
              <Pressable
                key={num}
                onPress={() => {
                  console.log(event.name);
                  navigation.navigate('Event', { event });
                }}
                style={classes}
              >
                <Image
                  source={
                    event.imageUrl
                      ? {
                          uri: event.imageUrl,
                        }
                      : EventPlaceholderImage
                  }
                  style={styles.eventImage}
                />
                <View
                  style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingBottom: 5,
                    backgroundColor: 'transparent',
                  }}
                >
                  <Title
                    style={{
                      fontSize: scaled(12),
                      lineHeight: scaled(13),
                    }}
                  >
                    {event.name} |{' '}
                    {new Date(event.date.seconds * 1000).toDateString()},
                    {` ${timeToString(event.time.hours)}:${timeToString(
                      event.time.minutes,
                    )}`}
                  </Title>
                  <Caption
                    style={{
                      fontSize: scaled(9),
                      lineHeight: scaled(10),
                    }}
                  >
                    {event.description}
                  </Caption>
                </View>
              </Pressable>
            );
          })}
      </EventRowSkeleton>
    </View>
  );
};

export default function HomeScreen({
  navigation,
}: StackScreenProps<HomeStackParams, 'Home'>) {
  const user = useAuthenticatedUser();
  if (!user) {
    return null;
  }
  const [eventsState, setEventsState] = useState<Array<Event>>();
  const [groupsState, setGroupsState] = useState<Array<Group>>();
  useEffect(() => {
    const f = async () => {
      const groups = await firestore.getAllGroups();
      setTimeout(() => {
        setGroupsState(groups);
      }, 0);
    };
    f();
  }, []);
  useEffect(() => {
    const f = async () => {
      const events = await firestore.getEvents();
      setTimeout(() => {
        setEventsState(events);
      }, 0);
    };
    f();

    const unsubscribe = firestore.listenToEvents(
      user?.uid,
      (events: Array<Event>) => {
        setEventsState(events);
      },
    );
    return unsubscribe;
  }, [user?.uid]);
  return (
    <ParticleBackgroundContainer>
      <View style={{ flex: 1, height: '100%', backgroundColor: 'transparent' }}>
        <ScrollView style={styles.container}>
          <StatusBar />
          <Groups
            navigation={navigation}
            groupsState={groupsState}
            getGroupEvents={useCallback(
              (group: Group) =>
                eventsState
                  ? eventsState.filter(v => v.name === group.name)
                  : [],
              [eventsState],
            )}
          />
          <Events eventsState={eventsState} navigation={navigation} />
        </ScrollView>
        <CustomFAB
          onPress={() => navigation.navigate('AddEvent')}
          // label={'Add event'}
        />
      </View>
    </ParticleBackgroundContainer>
  );
}

const CustomFAB: FC<{ onPress: () => void; label?: string }> = ({
  onPress,
  label,
}) => (
  <FAB
    style={{
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    }}
    small
    icon="plus"
    onPress={onPress}
    label={label}
  />
);

const ITEM_IMAGE_SIZE = 100;
const BRAND_IMAGE_HEIGHT = 250;
const BRAND_IMAGE_WIDTH = 150;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'transparent',
  },
  groupsRow: {
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
    backgroundColor: 'transparent',
  },
  groupImage: {
    height: BRAND_IMAGE_HEIGHT,
    width: BRAND_IMAGE_WIDTH,
  },
  imageLeftBorder: {
    // borderLeftColor: '#fff',
    // borderLeftWidth: 4,
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
  eventsHeading: {
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 10,
    backgroundColor: 'transparent',
  },
  eventsGrid: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'transparent',
  },
  event: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
    ...shadowStyle,
    marginBottom: 10,
  },
  eventImage: {
    height: 100,
    marginBottom: 5,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
});
