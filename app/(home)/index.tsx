import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import TabOneScreen from "../(auth)/sign-in";
import SignIn from "../(auth)/sign-in";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { user } = useUser();
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
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SignedIn>
        <TouchableOpacity onPress={handleSignOut}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </SafeAreaView>
  );
}
