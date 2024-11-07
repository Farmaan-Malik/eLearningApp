import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { View } from "@/components/Themed";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { useCallback, useEffect } from "react";
import { Link } from "expo-router";

export const useWarmUpBrowser = () => {
    useEffect(() => {
      void WebBrowser.warmUpAsync();
      return () => {
        void WebBrowser.coolDownAsync();
      };
    }, []);
  };
  
  WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  
    const onPress = useCallback(async () => {
      try {
        const { createdSessionId, setActive } = await startOAuthFlow({
          redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
        });
  
        if (createdSessionId) {
          setActive!!({ session: createdSessionId });
        } else {
          // Handle the next steps for signIn or signUp (e.g., MFA)
          console.log('Session created but no further action taken');
        }
      } catch (err) {
        console.error('OAuth error', err);
      }
    }, [startOAuthFlow]);
  const [fonts] = useFonts({
    " Tiny": require("../../assets/fonts/Tiny5-Regular.ttf"),
    " Inter": require("../../assets/fonts/Inter-Regular.ttf"),
    "Inter-Light": require("../../assets/fonts/Inter-Light.ttf"),
    "Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
  });
  const homePage = require("../../assets/images/home.png");
  const google = require("../../assets/images/google.png");
  return (
        <View style={styles.container}>
        <Image
          // width={10} height={500}
          style={styles.image}
          source={homePage}
        />
        <View style={styles.bottomModal}>
          <Text style={styles.title}>{"</> \n Code Box"}</Text>
          <Text style={styles.subText}>
            {"Your Ultimate Programming \n Learning Box"}
          </Text>
          <TouchableOpacity onPress={onPress} style={styles.touchable}>
            <Image resizeMode="contain" style={styles.google} source={google} />
            <Text style={styles.googleText}>Sign In with Google</Text>
          </TouchableOpacity>
          
          <Link href='/(auth)/sign-up' asChild>
          <TouchableOpacity  style={styles.touchable}>
            <Text style={styles.googleText}>Sign Up using email</Text>
          </TouchableOpacity>
          </Link>
          <Link href='/(auth)/log-in' asChild>
          <TouchableOpacity  style={styles.touchable}>
            <Text style={styles.googleText}>Login using email</Text>
          </TouchableOpacity>
          </Link>
          
        </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontFamily: "Inter-Bold",
    fontSize: 40,
    textAlign: "center",
    marginTop: 20,
  },
  subText: {
    color: "#C2BAFF",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  image: {
    marginTop: 50,
  },
  bottomModal: {
    marginTop: -180,
    height: "50%",
    width: "100%",
    backgroundColor: "#6857E8",
  },
  touchable: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
    backgroundColor: "white",
    height: 50,
    width: "50%",
    marginStart: "25%",
    borderRadius: 50,
    paddingHorizontal: 20,
    gap: 10,
  },
  google: { width: 25, height: 25 },
  googleText: { color: "#6857E8" },
});
// import { useSignIn } from '@clerk/clerk-expo'
// import { Link, useRouter } from 'expo-router'
// import { Text, TextInput, Button, View } from 'react-native'
// import React from 'react'

// export default function Page() {
//   const { signIn, setActive, isLoaded } = useSignIn()
//   const router = useRouter()

//   const [emailAddress, setEmailAddress] = React.useState('')
//   const [password, setPassword] = React.useState('')

//   const onSignInPress = React.useCallback(async () => {
//     if (!isLoaded) {
//       return
//     }

//     try {
//       const signInAttempt = await signIn.create({
//         identifier: emailAddress,
//         password,
//       })

//       if (signInAttempt.status === 'complete') {
//         await setActive({ session: signInAttempt.createdSessionId })
//         router.replace('/')
//       } else {
//         // See https://clerk.com/docs/custom-flows/error-handling
//         // for more info on error handling
//         console.error(JSON.stringify(signInAttempt, null, 2))
//       }
//     } catch (err: any) {
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }, [isLoaded, emailAddress, password])

//   return (
//     <View>
//       <TextInput
//         autoCapitalize="none"
//         value={emailAddress}
//         placeholder="Email..."
//         onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
//       />
//       <TextInput
//         value={password}
//         placeholder="Password..."
//         secureTextEntry={true}
//         onChangeText={(password) => setPassword(password)}
//       />
//       <Button title="Sign In" onPress={onSignInPress} />
//       <View>
//         <Text>Don't have an account?</Text>
//         <Link href="/sign-up">
//           <Text>Sign up</Text>
//         </Link>
//       </View>
//     </View>
//   )
// }