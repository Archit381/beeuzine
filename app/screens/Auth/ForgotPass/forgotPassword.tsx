import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../../../lib/supabase";
import { Input } from "@rneui/themed";
import GradientButton from "../../../components/GradientButton/gradientButton";

const ForgotPassword = () => {
  const { width, height } = Dimensions.get("screen");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const platform = Platform.OS;

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
    } catch (error) {}
  };

  return (
    <SafeAreaView style={{ width: width, flex: 1, backgroundColor: "#fefefe" }}>
      <View
        style={{ marginTop: height * 0.06, paddingHorizontal: width * 0.06 }}
      >
        <Text
          style={{
            fontSize: height * 0.03,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Reset Password
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

      {otpSent ? (
        <TouchableOpacity
          style={{ display: "flex", flex: 1, alignItems: "center" }}
          onPress={signInWithOtp}
        >
          <GradientButton button_text="CONFIRM" icon="none" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ display: "flex", flex: 1, alignItems: "center" }}
          onPress={getOTP}
        >
          <GradientButton button_text="Get OTP" icon="none" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default ForgotPassword;
