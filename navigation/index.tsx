/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { View } from 'components/Themed';
import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import AuthStack from './AuthStack';
import { BottomTabNavigator } from './BottomTabNavigation';
import HomeStack from './HomeStack';

const RootNavigator = () => {
  const { user } = React.useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <BottomTabNavigator /> : <AuthStack />;
};

export default RootNavigator;

// const HomeIcon = () => {
//   return <img src={HomeIconBlack} />;
// };
