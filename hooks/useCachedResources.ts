import {
  Montserrat_100Thin,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import {
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import {
  WorkSans_200ExtraLight,
  WorkSans_300Light,
  WorkSans_500Medium,
  WorkSans_700Bold,
} from '@expo-google-fonts/work-sans';
import {
  JosefinSans_100Thin,
  JosefinSans_300Light,
  JosefinSans_400Regular,
  JosefinSans_700Bold,
} from '@expo-google-fonts/josefin-sans';
import {
  DancingScript_400Regular,
  DancingScript_700Bold,
} from '@expo-google-fonts/dancing-script';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

const _AVAILABLE_FONTS = {
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold,
  Montserrat_100Thin,
  Montserrat_400Regular,
  Montserrat_700Bold,
  WorkSans_200ExtraLight,
  WorkSans_300Light,
  WorkSans_500Medium,
  WorkSans_700Bold,
  JosefinSans_100Thin,
  JosefinSans_300Light,
  JosefinSans_400Regular,
  JosefinSans_700Bold,
  DancingScript_400Regular,
  DancingScript_700Bold,
};
const keys = Object.keys(_AVAILABLE_FONTS) as Array<
  keyof typeof _AVAILABLE_FONTS
>;
export const AVAILABLE_FONTS = Object.fromEntries(
  keys.map(key => [key, key]),
) as { [key in keyof typeof _AVAILABLE_FONTS]: keyof typeof _AVAILABLE_FONTS };

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [fontsLoaded] = useFonts(_AVAILABLE_FONTS);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete && fontsLoaded;
}
