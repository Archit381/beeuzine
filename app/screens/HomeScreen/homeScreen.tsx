import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/themed';

const HomeScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>HomeScreen</Text>
      <Button
            title="Accounts page"
            onPress={() => navigation.navigate('Account')}
          />
    </View>
  )
}

export default HomeScreen