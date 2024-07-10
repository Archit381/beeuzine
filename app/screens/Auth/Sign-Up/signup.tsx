import React, {useState} from 'react'
import { Alert, StyleSheet, View,Text, SafeAreaView, Dimensions, Platform, TouchableOpacity } from 'react-native'
import { supabase } from '../../../../lib/supabase'
import { Button, Input } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import AppNavigation from '../../../navigation/appNavigation'
import ColorBoxes from '../../../components/ColorBoxes/colorBoxes'
import LottieView from 'lottie-react-native'
import GradientButton from '../../../components/GradientButton/gradientButton'
import Loading from '../../../components/loader/loading'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();
  const { width, height } = Dimensions.get("screen");
  const platform = Platform.OS;

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
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

  <View style={{ display: "flex", flex: 1.4 }}>
    <View style={{ paddingHorizontal: width * 0.06 }}>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <Text
          style={{
            fontSize: height * 0.03,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Create an Account
        </Text>
        
      </View>

      <Text
        style={{
          fontSize: height * 0.02,
          fontWeight: "500",
          color: "gray",
          marginTop: 5,
        }}
      >
        Start your journey with us!
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
      </View>


      {loading ? (
            <View style={{ alignItems: "center" }}>
              <Loading height={height * 0.1} />
            </View>
          ) : (
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity onPress={signUpWithEmail}>
                <GradientButton button_text="SIGN UP" icon="backBtn" />
              </TouchableOpacity>
            </View>
          )}
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
        Already have an account?{" "}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Sign-in")}>
        <Text
          style={{
            fontSize: height * 0.015,
            fontWeight: "bold",
            color: "#f6c457",
          }}
        >
          Log in
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</SafeAreaView>
  )
}

export default Signup
