import { Alert, StyleSheet, View, Text } from "react-native";
import { Button, Input } from "@rneui/themed";
import React, { useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { useNavigation } from "@react-navigation/native";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function signInWithEmail() {
    
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert(error.message);
      } else {
        navigation.navigate('Home')
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{marginTop: 40,padding: 12}}>
      <Text>Signin</Text>
      <View style={{paddingTop: 4, paddingBottom: 4, alignSelf: "stretch", marginTop: 20}}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={{paddingTop: 4, paddingBottom: 4, alignSelf: "stretch"}}>
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

      <View>
        
        <View style={{paddingTop: 4, paddingBottom: 4, alignSelf: "stretch", marginTop: 20}}>
          <Button
            title="Sign in"
            disabled={loading}
            onPress={() => signInWithEmail()}
          />
        </View>
      </View>
    </View>
  );
};

export default Signin;

