import { View, Text, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AppNavigation from "../../navigation/appNavigation";
import { supabase } from "../../../lib/supabase";
import { Session } from "@supabase/supabase-js";

const SplashScreen = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("screen");
  // const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {

    const timeoutId = setTimeout(() => {

      supabase.auth.getSession().then(({ data: { session } }) => {
        if(session){
          navigation.navigate('InsideScreens')
        }else{
          navigation.navigate('Sign-up')
        }
      });

      console.log('done')

    }, 500);

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

      }}
    >
      <Image
        source={require("../../assets/BeeUpng.png")}
        style={{
          width: width*0.6,
          resizeMode: "contain",
          marginBottom: height * 0.13,
        }}
      />
    </View>
  );
};

export default SplashScreen;
