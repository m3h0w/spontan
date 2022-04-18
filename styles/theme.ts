import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import {
  configureFonts,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import fontConfig from './fontConfig';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      myOwnColor?: string;
    }

    interface Theme {
      myOwnProperty?: boolean;
    }
  }
}

const PaperDefaultThemeExtended = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#00ff22',
    accent: '#de10a7',
    text: '#332d31',
    background: '#fff',
    surface: '#f2f2f2',
    disabled: '#aaa',
  },
  fonts: configureFonts(fontConfig),
};

export const CombinedDefaultTheme = merge(
  NavigationDefaultTheme,
  PaperDefaultThemeExtended,
);
export const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
