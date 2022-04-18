import { AVAILABLE_FONTS } from 'hooks/useCachedResources';

export const fonts = {
  regular: {
    fontFamily: AVAILABLE_FONTS.JosefinSans_400Regular,
  },
  medium: {
    fontFamily: AVAILABLE_FONTS.JosefinSans_700Bold,
  },
  light: {
    fontFamily: AVAILABLE_FONTS.DancingScript_700Bold,
  },
  thin: {
    fontFamily: AVAILABLE_FONTS.DancingScript_400Regular,
  },
};

const fontConfig = {
  web: fonts,
  ios: fonts,
  android: fonts,
};

export default fontConfig;
