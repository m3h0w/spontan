import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";

import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";

const auth = Firebase.auth;

export default function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log("In RootNavigator. User:", user);

  if (user) {
    return <HomeStack />;
  } else {
    return <AuthStack />;
  }

  //   return (
  //     <NavigationContainer>
  //       {user ? <HomeStack /> : <AuthStack />}
  //     </NavigationContainer>
  //   );
}
