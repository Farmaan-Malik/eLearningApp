import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo';

const HomeScreen = () => {
const user = useUser();
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert(
        "Sign Out Error",
        "There was an error signing out. Please try again."
      );
      console.error("Sign Out Error:", error);
    }
  };
  return (
    <View>
        <TouchableOpacity onPress={handleSignOut}>
          <Text>Sign Out</Text>
        </TouchableOpacity>

    </View>
  )
}

export default HomeScreen