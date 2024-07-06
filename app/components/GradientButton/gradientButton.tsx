import { View, Text, Dimensions } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  button_text: string;
  icon: string;
};

const GradientButton = (props: Props) => {
  const { width, height } = Dimensions.get("screen");

  return (
    <LinearGradient
      colors={["#ffdf5a", "#ffe059", "#f7c457"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{
        width: width * 0.35,
        paddingVertical: height * 0.02,
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", color: "#ffffff" }}>
        {props.button_text}
      </Text>

      {props.icon == "backBtn" ? (
        <AntDesign
          style={{ marginLeft: 15 }}
          name="arrowright"
          size={24}
          color="white"
        />
      ) : null}
    </LinearGradient>
  );
};

export default GradientButton;
