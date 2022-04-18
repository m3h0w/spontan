import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import CaptureButton from 'components/CaptureButton';
import Heading from 'components/Heading';
import azureReceiptDatasObject from 'data/receipts/azureData';
import receiptsObject from 'data/receipts/images';
import {
  Camera,
  CameraCapturedPicture,
  CameraPictureOptions,
} from 'expo-camera';
import { CameraStackParamList } from 'navigation/CameraStack';
import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ActivityIndicator, Paragraph } from 'react-native-paper';
import { scaled } from 'styles/scaled';
import chunkArray from 'utils/chunkArray';
import parseReceiptData, { ReceiptDataParsed } from 'utils/parseReceiptData';
import { testInvoiceUrl } from '../testInvoiceUrl';

type Props = StackScreenProps<CameraStackParamList, 'Camera'>;

export interface CameraActions {
  snap: () => Promise<void>;
}

export const parseDate = (date: string) => {
  const parts = date.split('-');
  return new Date(
    parseInt(parts[2], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10),
  );
};

const images = Object.values(receiptsObject);
const receiptDatas = Object.values(azureReceiptDatasObject);
const imagesChunked = chunkArray(images, 3);

const Analyzing = () => {
  const [text, setText] = useState('Analyzing the receipt...');

  useEffect(() => {
    setTimeout(() => {
      setText('AI is reading your receipt...');

      setTimeout(() => {
        setText('Processing the vendor name and date...');

        setTimeout(() => {
          setText('Reading items and prices...');

          setTimeout(() => {
            setText('Almost there...');
          }, 5000);
        }, 4000);
      }, 3000);
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Text
        style={{ marginBottom: 10, fontSize: scaled(18), fontWeight: 'bold' }}
      >
        {text}
      </Text>
      <ActivityIndicator size="large" color={'black'} />
    </View>
  );
};

const CameraScreen: FC<Props> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [cameraNode, setCameraNode] = useState<Camera>();
  const [photo, setPhoto] = useState<CameraCapturedPicture | { uri: string }>();
  const [takingPicture, setTakingPicture] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptDataParsed>();
  const isFocused = useIsFocused();

  const validateReceiptData = (receiptData: ReceiptDataParsed) => {
    return receiptData;
  };

  const takeFakePhoto = async () => {
    if (cameraNode) {
      const resp = await fetch(testInvoiceUrl);
      const blob = await resp.blob();
      setPhoto({ uri: testInvoiceUrl });
    }
  };

  useEffect(() => {
    if (!isFocused) {
      setPhoto(undefined);
      setTakingPicture(false);
      setHasPermission(null);
    }
  }, [isFocused]);

  const snap = useCallback(async () => {
    if (cameraNode && !takingPicture && !photo) {
      setTakingPicture(true);
      const options: CameraPictureOptions = {
        quality: 0.5,
        base64: true,
        skipProcessing: true,
        onPictureSaved: (picture: CameraCapturedPicture) => {
          setPhoto(picture);
          setTakingPicture(false);
          // cameraNode?.resumePreview();
        },
      };
      cameraNode.takePictureAsync(options);
      // setTimeout(() => {
      //   cameraNode.pausePreview();
      // }, 100);
    }
  }, [cameraNode, setTakingPicture, setPhoto, photo]);

  // useEffect(() => {
  //   if (takingPicture) {
  //     cameraNode?.pausePreview();
  //   } else {
  //     cameraNode?.resumePreview();
  //   }
  // }, [takingPicture]);

  const cameraRef = (node: Camera) => {
    if (node !== null) {
      setCameraNode(node);
    }
  };

  useEffect(() => {
    if (!hasPermission) {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }
  }, [hasPermission]);

  if (hasPermission === null || cameraNode === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={'black'} />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  if (analyzing) {
    return <Analyzing />;
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      {!cameraNode && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={'black'} />
        </View>
      )}
      {!photo && isFocused && (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={cameraRef}
        >
          <CaptureButton takePicture={() => takeFakePhoto()} />
        </Camera>
      )}
      {photo && (
        <ScrollView contentContainerStyle={styles.itemsGrid}>
          <Heading>Click on a receipt to try it out</Heading>
          {imagesChunked.map((images: any[], rowNum: number) => {
            return (
              <View style={styles.itemsRow} key={rowNum}>
                {images.map((source: any, num: number) => {
                  const receiptNumber = rowNum * 3 + (num + 1);
                  return (
                    <View
                      key={num}
                      style={
                        num !== 0
                          ? styles.item
                          : [styles.item, styles.imageLeftBorder]
                      }
                    >
                      <Pressable
                        onPress={async () => {
                          setAnalyzing(true);
                          // const receiptDataParsed = parseReceiptData(await Analyze(source, true));
                          const receiptDataParsed = parseReceiptData(
                            receiptDatas[receiptNumber - 1].data.receiptData,
                          );

                          setTimeout(() => {
                            setReceiptData(receiptDataParsed);
                            setAnalyzing(false);
                            const validatedReceiptData =
                              validateReceiptData(receiptDataParsed);
                            navigation.navigate(
                              'AddItems',
                              validatedReceiptData,
                            );
                          }, 3000);
                        }}
                      >
                        <Image
                          source={source}
                          style={styles.itemImage}
                          key={num}
                          height={100}
                          width={100}
                          resizeMode="contain"
                        />
                      </Pressable>
                      <Paragraph>{receiptNumber}</Paragraph>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      )}
      {photo && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              setPhoto(undefined);
            }}
          >
            <Text style={styles.text}>Retake photo</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    // paddingTop: 50,
  },
  overlay: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: 'black',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: scaled(30),
    textAlign: 'center',
  },

  imageLeftBorder: {
    marginLeft: 4,
  },
  itemsGrid: {
    width: '90%',
    height: '90%',
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
    width: 100,
  },
});

export default CameraScreen;
