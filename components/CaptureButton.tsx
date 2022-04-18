import { TouchableOpacity, View } from 'react-native';

const CaptureButton = ({ takePicture }: { takePicture: () => {} }) => {
  return (
    <View
      style={{
        position: 'absolute',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 15,
        width: '100%',
      }}
    >
      <TouchableOpacity
        onPress={takePicture}
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: 'rgba(255,255,255,0.6)',
          borderColor: '#fff',
          borderWidth: 5,
        }}
      />
    </View>
  );
};

export default CaptureButton;
