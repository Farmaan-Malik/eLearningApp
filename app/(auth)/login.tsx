import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import style from "../../assets/styles/auth/styles.js"

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert(err.errors[0].message);
      console.log("Error", err.errors[0].message);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <SafeAreaView style={style.container}>
      <Text
        style={style.logo}
      >
        {"</>"}
      </Text>
      <TextInput
        style={style.textInput}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        style={style.textInput}
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity style={style.login} onPress={onSignInPress}>
        <Text style={style.loginText}>Login</Text>
      </TouchableOpacity>
      <View style={style.bottomContainer}>
        <Text style={{ textAlign: "left", fontFamily: "Inter", marginTop: 8, fontSize:15 }}>
          Don't have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/sign-up");
          }}
        >
          <Text style={{ textAlign: "left", marginTop: 8, color: "#6857E8" }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

