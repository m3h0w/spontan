import React, { FC } from 'react';
import { Dimensions, Platform, TextStyle, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Text } from 'react-native-paper';
import LoadingIndicator from 'assets/images/loading-indicator.gif';
import LoadingStyles from './Loading.css';
import AnimatedLoader from 'react-native-animated-loader';

type IndicatorProps = {
  size?: number;
};

export const Indicator: FC<IndicatorProps> = ({ size = 30 }) => {
  if (Platform.OS === 'web') {
    return <ActivityIndicator size={size} color="black" />;
  }
  return (
    <AnimatedLoader
      visible={true}
      overlayColor="rgba(255,255,255,0.75)"
      animationStyle={{ height: size, width: size }}
      speed={1}
    >
      <Text>Doing something...</Text>
    </AnimatedLoader>
  );
};

const styles = {};

type LoadingProps = {
  size?: number;
  text?: string;
  textStyle?: TextStyle;
};

const Loading: FC<LoadingProps> = ({
  size = 30,
  text = 'Loading...',
  textStyle,
}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
        position: 'absolute',
        height: Dimensions.get('screen').height,
        width: '100%',
        zIndex: 999999,
        elevation: 1,
      }}
    >
      <Indicator size={size} />
      {text ? <Text style={textStyle}>{text}</Text> : null}
    </View>
  );
};

export default Loading;
