import {
  Alert,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "../../../components/GradientButton/gradientButton";
import ColorBoxes from "../../../components/ColorBoxes/colorBoxes";
import LottieView from "lottie-react-native";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { width, height } = Dimensions.get("screen");
  const platform = Platform.OS;

  const navigation = useNavigation();

  async function signInWithEmail() {
    setLoading(true);

    try {
      if (email.includes("@bennett.edu.in")) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) {
          Alert.alert(error.message);
        } else {
          navigation.navigate("Home");
        }
      } else {
        Alert.alert("Please use a Bennett email.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ width: width, flex: 1, backgroundColor: "#fefefe" }}>
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            paddingHorizontal: width * 0.01,
            paddingTop: height * 0.03,
          }}
        >
          <ColorBoxes
            box_color="ffe059"
            border_color="ffe059"
            box_size={height * 0.12}
            border_size={height * 0.13}
          />

          <View style={{ right: width * 0.1, zIndex: 5, top: -height * 0.05 }}>
            <ColorBoxes
              box_color="ffe335"
              border_color="ffe335"
              box_size={height * 0.12}
              border_size={height * 0.13}
            />
          </View>

          <View style={{ top: -height * 0.1 }}>
            <ColorBoxes
              box_color="ffd635"
              border_color="ffd635"
              box_size={height * 0.12}
              border_size={height * 0.13}
            />
          </View>
          <View style={{ top: -height * 0.15, right: width * 0.1 }}>
            <ColorBoxes
              box_color="ffdf1e"
              border_color="ffdf1e"
              box_size={height * 0.12}
              border_size={height * 0.13}
            />
          </View>
        </View>
      </View>

      <View style={{ display: "flex", flex: 1.5 }}>
        <View style={{ paddingHorizontal: width * 0.06 }}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Text
              style={{
                fontSize: height * 0.04,
                fontWeight: "bold",
                color: "black",
              }}
            >
              Login
            </Text>
            <LottieView
              source={require("../../../assets/lottie/bee_2.json")}
              style={{ height: height*0.1, width: height*0.1, marginLeft: 10 }}
              autoPlay
              loop
            />
          </View>

          <Text
            style={{
              fontSize: height * 0.02,
              fontWeight: "500",
              color: "gray",
              marginTop: 5,
            }}
          >
            Please sign in to continue
          </Text>

          <View
            style={{
              paddingTop: 4,
              paddingBottom: 4,
              alignSelf: "stretch",
              marginTop: 20,
            }}
          >
            <Input
              label="Email"
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="enrollment@bennett.edu.in"
              autoCapitalize={"none"}
            />
          </View>
          <View
            style={{
              paddingTop: 4,
              paddingBottom: 4,
              paddingRight: width * 0.15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Input
              label="Password"
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={"none"}
            />
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>
              <Text
                style={{
                  fontSize: height * 0.015,
                  fontWeight: "bold",
                  color: "#f6c457",
                }}
              >
                FORGOT
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity onPress={signInWithEmail}>
              <GradientButton button_text="LOGIN" icon="backBtn" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            display: "flex",
            flex: 1,
            flexDirection: "row",
            marginBottom: platform == "android" ? height * 0.02 : 0,
          }}
        >
          <Text
            style={{
              fontSize: height * 0.015,
              fontWeight: "500",
              color: "gray",
            }}
          >
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Sign-up")}>
            <Text
              style={{
                fontSize: height * 0.015,
                fontWeight: "bold",
                color: "#f6c457",
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signin;
