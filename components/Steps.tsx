import React, { FC, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { StepIndicatorStyles } from 'react-native-step-indicator/lib/typescript/src/types';
import { scaled } from 'styles/scaled';

type Props = {
  labels: string[];
  currentStep: number;
  style: StyleProp<ViewStyle>;
  onPress?: (step: number) => void;
};

const customStyles: StepIndicatorStyles = {
  stepIndicatorSize: 23,
  currentStepIndicatorSize: 26,
  separatorStrokeWidth: 0,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#000',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#aaa',
  stepStrokeUnFinishedColor: '#aaa',
  separatorFinishedColor: '#000',
  separatorUnFinishedColor: '#aaa',
  stepIndicatorFinishedColor: '#aaa',
  stepIndicatorUnFinishedColor: '#aaa',
  stepIndicatorCurrentColor: '#000',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fff',
  stepIndicatorLabelFinishedColor: '#fff',
  stepIndicatorLabelUnFinishedColor: '#fff',
  labelColor: '#999',
  labelSize: scaled(10),
  currentStepLabelColor: '#000',
};

const Steps: FC<Props> = ({ labels, style, currentStep, onPress }) => {
  return (
    <View style={style}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentStep}
        stepCount={labels.length}
        labels={labels}
        onPress={onPress}
      />
    </View>
  );
};

export default Steps;
