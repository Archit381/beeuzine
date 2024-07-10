import { View, Text, Image, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../../lib/supabase";

const SplashScreen = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("screen");

  useEffect(() => {

    const timeoutId = setTimeout(() => {

      supabase.auth.getSession().then(({ data: { session } }) => {
        if(session){
          navigation.navigate('Home')
        }else{
          navigation.navigate('Sign-up')
        }
      });

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
