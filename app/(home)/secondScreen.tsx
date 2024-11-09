import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import SignIn from "..";
import Login from "../(auth)/login";
import HomeScreen from "./homeScreen";

export default function Home() {

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
     
    
    </SafeAreaView>
  );
}
