import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import SplashScreen from "../screens/SplashScreen/splashScreen";
import Signin from "../screens/Auth/Sign-in/signin";
import Signup from "../screens/Auth/Sign-Up/signup";
import HomeScreen from "../screens/HomeScreen/homeScreen";
import AccountScreen from "../screens/AccountScreen/accountScreen";

type Props = {};

const Tab = createBottomTabNavigator();
const InsideStack = createNativeStackNavigator();
const OutsideStack = createNativeStackNavigator();

const AppNavigation = (props: Props) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    console.log(session);
    console.log(session?.user);
    console.log(session?.id);
  }, []);

  const InsideLayout = () => {
    return (
      <InsideStack.Navigator initialRouteName="Home">
        <InsideStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home Screen",
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <InsideStack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            title: "Account Screen",
            headerShown: false,
          }}
        />
      </InsideStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <OutsideStack.Navigator initialRouteName="Sign-up">
        {session ? (
          <OutsideStack.Screen
            name="InsideScreens"
            component={InsideLayout}
            options={{
              title: "Login Screen",
              headerShown: false,
            }}
          />
        ) : (
          <>
            <OutsideStack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                title: "Splash Screen",
                headerShown: false,
              }}
            />
            <OutsideStack.Screen
              name="Sign-in"
              component={Signin}
              options={{
                title: "Sign-in Screen",
                headerShown: false,
              }}
            />
            <OutsideStack.Screen
              name="Sign-up"
              component={Signup}
              options={{
                title: "Sign-up Screen",
                headerShown: false,
              }}
            />
          </>
        )}
      </OutsideStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
