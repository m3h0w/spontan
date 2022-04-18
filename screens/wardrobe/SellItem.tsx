import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { InputField } from 'components';
import CustomDialog from 'components/Dialog';
import IconButtonComponent from 'components/IconButton';
import SmallItemImage from 'components/SmallItemImage';
import Steps from 'components/Steps';
import ViewColumn from 'components/ViewColumn';
import ViewRow from 'components/ViewRow';
import { useSwipe } from 'hooks/useSwipe';
import { WardrobeStackParamList } from 'navigation/WardrobeStack';
import React, { FC } from 'react';
import {
  Control,
  FieldValues,
  FormProvider,
  useController,
  useForm,
  useFormContext,
} from 'react-hook-form';
import {
  Alert,
  ImageSourcePropType,
  Platform,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Caption, Checkbox, Chip, Title } from 'react-native-paper';
import { fonts } from 'styles/fontConfig';
import { scaled } from 'styles/scaled';
import { Item } from 'types/User';

const SellItemTitleSection: FC<{
  imageSource: ImageSourcePropType;
  title: string;
  caption: string;
}> = ({ imageSource, title, caption }) => {
  return (
    <ViewRow>
      <SmallItemImage source={imageSource} />
      <ViewColumn
        style={{
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 15,
          marginTop: -7,
        }}
      >
        <Title
          style={{
            fontSize: scaled(18),
            lineHeight: scaled(19),
            width: '90%',
            textAlign: 'left',
          }}
        >
          {title}
        </Title>
        <Caption style={{ width: '90%', fontSize: scaled(12) }}>
          {caption}
        </Caption>
      </ViewColumn>
    </ViewRow>
  );
};

const CustomChip: FC<{
  style?: ViewStyle;
  name: string;
}> = ({ style, children, name }) => {
  const { field } = useController({
    control: useFormContext().control,
    defaultValue: false,
    name: name ?? 'default',
  });
  // const [selected, setSelected] = React.useState(false);
  return (
    <React.Fragment>
      <View
        style={
          Platform.OS === 'web'
            ? { display: 'none' }
            : {
                opacity: 0,
              }
        }
      >
        <Checkbox status={field.value ? 'checked' : 'unchecked'} />
      </View>
      <Chip
        onPress={() => field.onChange(!field.value)}
        style={[
          {
            borderRadius: 2,
            width: undefined,
            alignSelf: 'flex-start',
            flexGrow: 1,
            backgroundColor: field.value ? '#9EB19E' : '#c4c4c4',
            marginRight: 8,
          },
          style,
        ]}
        textStyle={{
          width: '100%',
          textAlign: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: scaled(12),
          fontFamily: fonts.regular.fontFamily,
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        {children}
      </Chip>
    </React.Fragment>
  );
};

const chipSectionDefinitions = [
  {
    title: 'In these seasons...',
    chips: [
      'Spring',
      'Summer',
      'Autumn',
      'Winter',
      'Year round',
      'Special occasions',
    ],
  },
  {
    title: `...I've worn the items...`,
    chips: [
      'Maybe once per month',
      '2-3 times a month',
      '3-5 times a month',
      'On a weekly basis',
    ],
  },
  {
    title: `Wait. I haven't worn the item as such, it is...`,
    chips: [
      'Only used one time',
      'Never used, no tag',
      'Unwashed',
      'Never used, with tag',
    ],
  },
  {
    title: `I would describe the item as in...`,
    chips: [
      'Mint condition',
      'As good as new',
      'Close-up visible use',
      'Visible use',
      'Well-worn',
      'Needs repair',
      'Needs deep clean',
    ],
  },
  {
    title: `Any secrets a buyer should know?`,
    chips: [
      'Never washed',
      'Has been dry cleaned',
      'Tiny hole in visible spot',
      'Tiny invisible hole',
      'Slight odor that should go with deep clean',
      'Slight odor that has stayed despite deep clean',
      'Heavy odor inside of the item',
      'Missing button',
      'Replaced button with non-original',
      'Broken zipper',
      'Zipper can be hard',
    ],
  },
];

const ChipSection: FC<{
  title: string;
  chips: string[];
  noBorderBottom?: boolean;
  style?: StyleProp<ViewStyle>;
  control: Control<FieldValues, any>;
  step: number;
}> = ({ title, chips, style, control, step, noBorderBottom = false }) => {
  return (
    <View style={style}>
      <ViewColumn
        style={{
          paddingTop: 8,
          paddingBottom: 8,
          marginLeft: 8,
        }}
      >
        <Title style={{ fontSize: scaled(12) }}>{title}</Title>
        <ViewRow style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {chips.map((chip, i) => (
            <CustomChip
              key={i}
              style={{ marginBottom: 8 }}
              name={`${step}.${title}.${chip}`}
            >
              {chip}
            </CustomChip>
          ))}
        </ViewRow>
      </ViewColumn>
      <View
        style={{
          borderBottomColor: '#ededed',
          borderBottomWidth: noBorderBottom ? 0 : 1,
          marginRight: 8,
          marginLeft: 8,
        }}
      ></View>
    </View>
  );
};

// type FormData = { [key: keyof typeof chipSectionDefinitions.map(v => v.chips)]: boolean };

const SellItemScreen: FC<
  StackScreenProps<WardrobeStackParamList, 'SellItem'>
> = ({ navigation, route }) => {
  const formMethods = useForm();
  const { control, handleSubmit } = formMethods;
  const [currentStep, setCurrentStep] = React.useState(0);
  const nextStep = () => {
    setCurrentStep(
      Math.min(currentStep + 1, chipSectionDefinitions.length - 1),
    );
  };
  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
  };
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);

  function onSwipeLeft() {
    console.log('SWIPE_LEFT');
    nextStep();
  }

  function onSwipeRight() {
    console.log('SWIPE_RIGHT');
    prevStep();
  }

  const { item } = route.params;

  const onSubmit = (data: any) => console.log({ data });

  return (
    <FormProvider {...formMethods}>
      <View
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: scaled(16),
          paddingRight: scaled(16),
          paddingBottom: scaled(16),
          height: '100%',
        }}
      >
        <Steps
          style={{
            width: '100%',
            paddingTop: 13,
            paddingBottom: 10,
            borderBottomColor: '#ededed',
            borderBottomWidth: 1,
          }}
          currentStep={currentStep}
          labels={['Condition', 'Hand-over & price', 'Review & post']}
          onPress={step => setCurrentStep(step)}
        />
        <ScrollView
          style={{
            backgroundColor: '#fff',
            height: '100%',
            paddingTop: 12,
          }}
        >
          <View
            style={
              currentStep !== 0
                ? Platform.OS === 'web'
                  ? { display: 'none' }
                  : {
                      opacity: 0,
                    }
                : {}
            }
          >
            <Step1
              item={item}
              nextStep={nextStep}
              navigation={navigation}
              control={control}
            />
          </View>
          <View
            style={
              currentStep !== 1
                ? Platform.OS === 'web'
                  ? { display: 'none' }
                  : {
                      opacity: 0,
                    }
                : {}
            }
          >
            <Step2
              item={item}
              prevStep={prevStep}
              nextStep={nextStep}
              control={control}
            />
          </View>
          <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
        </ScrollView>
      </View>
    </FormProvider>
  );
};

const Step2: FC<{
  item: Item;
  prevStep: () => void;
  nextStep: () => void;
  control: Control<FieldValues, any>;
}> = ({ item, prevStep, nextStep, control }) => {
  const PriceItem: FC<{
    label: string;
    number: number;
    thickerBorder?: boolean;
  }> = ({ label, number, thickerBorder = false }) => {
    return (
      <ViewRow
        borderBottom={true}
        borderColor={thickerBorder ? '#aaa' : '#fafafa'}
        style={{ marginBottom: 10, justifyContent: 'space-between' }}
      >
        <Caption
          style={{
            fontSize: scaled(11),
            lineHeight: scaled(12),
          }}
        >
          {label}
        </Caption>
        <Caption
          style={{
            fontSize: scaled(11),
            lineHeight: scaled(12),
          }}
        >
          {number.toFixed(2)}
        </Caption>
      </ViewRow>
    );
  };
  return (
    <React.Fragment>
      <SellItemTitleSection
        imageSource={{
          uri:
            item.blueprint.itemImg.length > 1
              ? item.blueprint.itemImg[1]
              : item.blueprint.itemImg[0],
        }}
        title="How do you prefer to hand-over the item?"
        caption="You may give multiple anwers."
      />
      <ChipSection
        key={'I would prefer to...'}
        noBorderBottom={true}
        title="I would prefer to..."
        chips={['Mail to buyer', 'Drop in store']}
        style={{ marginBottom: 15 }}
        control={control}
        step={2}
      />
      <Caption style={{ width: '90%', fontSize: scaled(10), marginBottom: 10 }}>
        Which stores are available for hand over?
      </Caption>
      <ViewColumn borderTop={true} style={{ marginBottom: 10 }}>
        <Title style={{ fontSize: scaled(13) }}>Price:</Title>
        <ViewRow style={{ marginBottom: 10 }}>
          <InputField
            containerStyle={{ padding: 0, paddingLeft: 10, paddingRight: 10 }}
            inputStyle={{ fontSize: scaled(14) }}
            defaultValue={String(item.price)}
            keyboardType="numeric"
            name={'2.price.price'}
          />
          <CustomChip
            style={{ marginLeft: 10 }}
            name={'2.price.Non-negotiable'}
          >
            Non-negotiable
          </CustomChip>
        </ViewRow>
        <Caption
          style={{ width: '90%', fontSize: scaled(11), lineHeight: scaled(12) }}
        >
          This is equivalent to a 60% discount of the item from the original
          price.
        </Caption>
      </ViewColumn>
      {item.price && (
        <ViewColumn
          borderTop={true}
          style={{ paddingTop: 10, marginBottom: 10 }}
        >
          <Title style={{ fontSize: scaled(14) }}>
            Your expected earnings...
          </Title>
          <PriceItem label={'Item price'} number={item.price} />
          <PriceItem label={'Platform fee (10%)'} number={0.1 * item.price} />
          <PriceItem label={'Est. shipment cost'} number={8.5} />
          <PriceItem label={'Payment fees'} number={1.5} />
          <PriceItem
            label={'Total'}
            number={item.price - 0.1 * item.price - 8.5 - 1.5}
            thickerBorder={true}
          />
        </ViewColumn>
      )}
      <ViewRow
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButtonComponent
          name="arrow-left"
          size={24}
          color="#444"
          onPress={prevStep}
          style={{ marginRight: 10 }}
        />
        <Button
          mode="contained"
          onPress={nextStep}
          color={'#222'}
          style={{
            marginTop: 5,
            borderRadius: 20,
            marginLeft: 8,
          }}
          labelStyle={{
            textTransform: 'none',
            fontSize: scaled(13),
            marginTop: 9,
            marginBottom: 9,
            fontFamily: fonts.medium.fontFamily,
            letterSpacing: 0.2,
          }}
        >
          Review & post
        </Button>
      </ViewRow>
    </React.Fragment>
  );
};

const Step1: FC<{
  item: Item;
  nextStep: () => void;
  navigation: StackNavigationProp<WardrobeStackParamList, 'SellItem'>;
  control: Control<FieldValues, any>;
}> = ({ item, nextStep, navigation, control }) => {
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);
  return (
    <React.Fragment>
      <SellItemTitleSection
        imageSource={{ uri: item.blueprint.itemImg[0] }}
        title="How frequently have you worn the item?"
        caption="Please select multiple anwers."
      />
      {chipSectionDefinitions.map((section, i) => (
        <ChipSection
          key={section.title}
          noBorderBottom={i === chipSectionDefinitions.length - 1}
          control={control}
          step={1}
          {...section}
        />
      ))}
      <ViewRow
        style={{
          paddingTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          mode="outlined"
          onPress={showDialog}
          color={'#222'}
          style={{
            marginTop: 5,
            borderRadius: 20,
          }}
          labelStyle={{
            textTransform: 'none',
            fontSize: scaled(13),
            marginTop: 9,
            marginBottom: 9,
            fontFamily: fonts.medium.fontFamily,
            letterSpacing: 0.2,
          }}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={nextStep}
          color={'#222'}
          style={{
            marginTop: 5,
            borderRadius: 20,
            marginLeft: 8,
          }}
          labelStyle={{
            textTransform: 'none',
            fontSize: scaled(13),
            marginTop: 9,
            marginBottom: 9,
            fontFamily: fonts.medium.fontFamily,
            letterSpacing: 0.2,
          }}
        >
          Hand-over & price
        </Button>
        <CustomDialog
          visible={dialogVisible}
          hideDialog={hideDialog}
          info={'Are you sure you want to cancel and return to the wardrobe?'}
          confirmText={'Yes'}
          cancelText={'No'}
          onConfirm={navigation.goBack}
        />
      </ViewRow>
    </React.Fragment>
  );
};

export default SellItemScreen;
