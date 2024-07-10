import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Platform,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../../../lib/supabase";
import { Input } from "@rneui/themed";
import GradientButton from "../../../components/GradientButton/gradientButton";
import { MaterialIcons } from "@expo/vector-icons";
import Loading from "../../../components/loader/loading";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const platform = Platform.OS;
  const { width, height } = Dimensions.get("screen");
  const navigation = useNavigation();

  const getOTP = async () => {
    setLoading(true);

    try {
      if (email.includes("@bennett.edu.in")) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(
          email
        );

        if (error) {
          Alert.alert(error.message);
        } else {
          Alert.alert("Check you mail box for OTP");
          setOtpSent(true);
        }
      } else {
        Alert.alert("Please use a Bennett email.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const signInWithOtp = async () => {
    setLoading(true)
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) {
        Alert.alert(error.message);
      } else {
        console.log(session);
      }
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  };

  return (
    <SafeAreaView style={{ width: width, flex: 1, backgroundColor: "#fefefe" }} >
      <View
        style={{ marginTop: platform=="android" ? height*0.06 : height*0.02, paddingHorizontal: width * 0.06 }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={height * 0.03}
            color="black"
          />
          <Text
            style={{
              fontSize: height * 0.03,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Reset Password
          </Text>
        </TouchableOpacity>

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
            alignSelf: "stretch",
            marginTop: 5,
          }}
        >
          {otpSent ? (
            <Input
              label="OTP"
              onChangeText={(text) => setOtp(text)}
              value={otp}
            />
          ) : null}
        </View>
      </View>

      <View style={{ display: "flex", alignItems: "center" }}>
        {loading ? (
          <Loading height={height * 0.1} />
        ) : (
          <>
            {otpSent ? (
              <TouchableOpacity onPress={signInWithOtp}>
                <GradientButton button_text="CONFIRM" icon="none" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={getOTP}>
                <GradientButton button_text="Get OTP" icon="none" />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
