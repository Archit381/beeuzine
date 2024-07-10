import { Image } from "react-native";
import React from "react";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import LottieView from "lottie-react-native";

type Props = {
  height: Double;
};

const Loading = ({ height }: Props) => {
  return (
    <>
      {/* <Image
        source={require("../../assets/loading_3.gif")}
        style={{
          height: height,
          width: height,
          resizeMode: "contain",
        }}
      /> */}
      <LottieView
        source={require("../../assets/lottie/loading_4.json")}
        style={{ height: height, width: height, marginLeft: 10 }}
        autoPlay
        loop
      />
    </>
  );
};

export default Loading;
