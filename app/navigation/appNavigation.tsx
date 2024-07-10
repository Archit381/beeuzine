import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import SplashScreen from "../screens/SplashScreen/splashScreen";
import Signin from "../screens/Auth/Sign-in/signin";
import Signup from "../screens/Auth/Sign-Up/signup";
import HomeScreen from "../screens/HomeScreen/homeScreen";
import AccountScreen from "../screens/AccountScreen/accountScreen";
import ForgotPassword from "../screens/Auth/ForgotPass/forgotPassword";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import SearchScreen from "../screens/SearchScreen/searchScreen";
import FeaturedScreen from "../screens/FeaturedScreen/featuredScreen";
import UploadScreen from "../screens/UploadScreen/uploadScreen";

type Props = {};

const Tab = createBottomTabNavigator();
const InsideStack = createNativeStackNavigator();
const OutsideStack = createNativeStackNavigator();
const { width, height } = Dimensions.get("screen");
const platform = Platform.OS;

const AppNavigation = (props: Props) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const TabNavigator = () => {
    const navigation = useNavigation();
    const tabOffsetValue = useRef(new Animated.Value(0)).current;

    function getWidth() {
      let width = Dimensions.get("screen").width;

      width = width - width * 0.33;

      return width / 4;
    }

    return (
      <>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "white",
              position: "relative",
              // bottom: height * 0.02,
              bottom: platform=="android" ?  height * 0.02: height * 0.035,
              width: width * 0.67,
              height: height * 0.07,
              borderRadius: 50,
              left: width * 0.06,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    position: "absolute",
                    top: platform=="android" ? null : height*0.02
                  }}
                >
                  <FontAwesome5
                    name="home"
                    size={20}
                    color={focused ? "#fdc018" : "gray"}
                  ></FontAwesome5>
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: 0,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    position: "absolute",
                    top: platform=="android" ? null : height*0.02
                  }}
                >
                  <FontAwesome5
                    name="search"
                    size={20}
                    color={focused ? "#fdc018" : "gray"}
                  ></FontAwesome5>
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth(),
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
          <Tab.Screen
            name="Featured"
            component={FeaturedScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    position: "absolute",
                    top: platform=="android" ? null : height*0.02
                  }}
                >
                  <FontAwesome5
                    name="bookmark"
                    size={20}
                    color={focused ? "#fdc018" : "gray"}
                  />
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 2,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
          <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    position: "absolute",
                    top: platform=="android" ? null : height*0.02
                  }}
                >
                  <FontAwesome5
                    name="user-alt"
                    size={20}
                    color={focused ? "#fdc018" : "gray"}
                  />
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 3,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
        </Tab.Navigator>
        <Animated.View
          style={{
            width: 5,
            height: 5,
            backgroundColor: "#fdc018",
            position: "absolute",
            bottom: platform=="android" ?  height * 0.03: height * 0.045,
            left: width * 0.138,
            borderRadius: 50,
            transform: [{ translateX: tabOffsetValue }],
          }}
        ></Animated.View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Upload")}
          style={{
            bottom: platform=="android" ?  height * 0.02: height * 0.035,
            position: "absolute",
            right: width * 0.07,
            height: height * 0.07,
            width: height * 0.07,
            borderRadius: 50,
            backgroundColor: "#fdc018",
            alignItems: "center",
            justifyContent: "center",
            elevation: 1,
          }}
        >
          <AntDesign name="plus" size={height*0.03} color="gray" />
        </TouchableOpacity>
      </>
    );
  };

  const InsideLayout = () => {
    return (
      <InsideStack.Navigator initialRouteName="Splash">
        <InsideStack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            title: "Splash Screen",
            headerShown: false,
          }}
        />
        <InsideStack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{
            title: "Bottom Tab Nav",
            headerShown: false,
          }}
        />
        <InsideStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home Screen",
            headerShown: false,
          }}
        />
        <InsideStack.Screen
          name="Upload"
          component={UploadScreen}
          options={{
            title: "Uploading Content Screen",
            headerShown: false,
          }}
        />
      </InsideStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <OutsideStack.Navigator initialRouteName="Splash">
        {session ? (
          <>
            <OutsideStack.Screen
              name="InsideScreens"
              component={InsideLayout}
              options={{
                title: "Inside Stack",
                headerShown: false,
              }}
            />
          </>
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
            <OutsideStack.Screen
              name="ForgotPass"
              component={ForgotPassword}
              options={{
                title: "Forgot Password Screen",
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
