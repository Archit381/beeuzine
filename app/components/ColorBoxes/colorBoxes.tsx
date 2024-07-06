import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

type Props = {
  box_color: string;
  border_color: string;
  box_size: Double
  border_size: Double
};

const ColorBoxes = (props: Props) => {
  
  return (
      <View
        style={{
          height: props.border_size,
          width: props.border_size,
          borderRadius: 20,
          elevation: 1,
          borderWidth: 2,
          borderColor: `#${props.border_color}`,
          backgroundColor: "#fefefe",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: props.box_size,
            width: props.box_size,
            backgroundColor: `#${props.box_color}`,
            borderRadius: 18,
          }}
        />
      </View>
  );
};

export default ColorBoxes;
