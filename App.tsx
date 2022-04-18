import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import useCachedResources from 'hooks/useCachedResources';
import useColorScheme from 'hooks/useColorScheme';
import RootNavigator from 'navigation';
import { AuthenticatedUserProvider } from 'navigation/AuthenticatedUserProvider';
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CombinedDarkTheme, CombinedDefaultTheme } from 'styles/theme';

// e.g in your index.js
import {
  // en,
  // nl,
  // de,
  // pl,
  // pt,
  enGB,
  registerTranslation,
} from 'react-native-paper-dates';
// registerTranslation('en', en)
// registerTranslation('nl', nl)
// registerTranslation('pl', pl)
// registerTranslation('pt', pt)
// registerTranslation('de', de)
registerTranslation('en-GB', enGB);

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
        <PaperProvider
          theme={
            colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme
          }
        >
          <NavigationContainer
            theme={
              colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme
            }
          >
            <RootNavigator />
          </NavigationContainer>
          <StatusBar />
        </PaperProvider>
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
};

registerRootComponent(App);

export default App;
