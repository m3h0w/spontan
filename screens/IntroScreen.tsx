import { StackScreenProps } from '@react-navigation/stack';
import SpontanHeadline from 'components/SpontanHeadline';
import ViewColumn from 'components/ViewColumn';
import { StatusBar } from 'expo-status-bar';
import { AVAILABLE_FONTS } from 'hooks/useCachedResources';
import { AuthStackParamList } from 'navigation/AuthStack';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Caption } from 'react-native-paper';
import ParticleBackground from 'react-native-particle-background';
import { scaled } from 'styles/scaled';

type Props = StackScreenProps<AuthStackParamList, 'Intro'>;

export const ParticleBackgroundContainer: FC = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={{
          flex: 1,
          zIndex: -1,
        }}
      >
        <ParticleBackground
          particleColor="#rgba(0, 255, 34, 0.5)"
          particleSize={8}
          particleDispersion={32}
          backgroundColor="white"
        ></ParticleBackground>
      </View>
      <View
        style={{
          position: 'absolute',
          flex: 1,
          display: 'flex',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
      >
        {children}
      </View>
    </View>
  );
};

const IntroScreen: FC<Props> = ({ navigation }) => {
  return (
    <ParticleBackgroundContainer>
      <ViewColumn
        style={[
          styles.column,
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center ',
          },
        ]}
      >
        <SpontanHeadline
          style={{
            fontSize: scaled(43),
            fontFamily: AVAILABLE_FONTS.JosefinSans_700Bold,
            paddingBottom: 5,
          }}
        />
        <Caption
          style={{
            fontSize: scaled(35),
            paddingBottom: 20,
            fontFamily: AVAILABLE_FONTS.DancingScript_400Regular,
          }}
        >
          Unplan yourself.
        </Caption>
        <Button
          color={'#fff'}
          onPress={() => navigation.navigate('Login')}
          mode="contained"
        >
          Get started
        </Button>
      </ViewColumn>
    </ParticleBackgroundContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#444',
  },
  logo: {
    marginRight: 10,
    width: 35,
    height: 35,
  },
});

export default IntroScreen;
