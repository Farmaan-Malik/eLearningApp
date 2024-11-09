import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { View } from "@/components/Themed";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { useCallback, useEffect } from "react";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    console.log("ioio")
    void WebBrowser.warmUpAsync();
    return () => {
      console.log("ioio")
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
      });

      if (createdSessionId) {
        setActive!!({ session: createdSessionId });
      } else {
        // Handle the next steps for signIn or signUp (e.g., MFA)
        console.log("Session created but no further action taken");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startOAuthFlow]);
  const [fonts] = useFonts({
    " Tiny": require("@/assets/fonts/Tiny5-Regular.ttf"),
    " Inter": require("@/assets/fonts/Inter-Regular.ttf"),
    "Inter-Light": require("@/assets/fonts/Inter-Light.ttf"),
    "Inter-SemiBold": require("@/assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("@/assets/fonts/Inter-Bold.ttf"),
  });
  const homePage = require("@/assets/images/home.png");
  const google = require("@/assets/images/google.png");
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={homePage}
      />
      <View style={styles.bottomModal}>
        <Text style={styles.title}>{"</> \n Code Box"}</Text>
        <Text style={styles.subText}>
          {"Your Ultimate Programming \n Learning Box"}
        </Text>
        <View
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              router.push("/(auth)/login");
            }}
          >
            <Text style={styles.googleText}>Login using email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              router.push("/(auth)/sign-up");
            }}
          >
            <Text style={styles.googleText}>Sign Up</Text>
          </TouchableOpacity>
         
        </View>
        <TouchableOpacity
            onPress={onPress}
            style={[styles.touchable, { width: "10%", height: "10%" }]}
          >
            <Image resizeMode="contain" style={styles.google} source={google} />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    marginTop: 25,
  },
  subText: {
    color: Colors.LIGHT_PRIMARY,
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
    marginTop: -200,
    height: '60%',
    width: "100%",
    backgroundColor:Colors.PRIMARY,
    alignItems: "center",
  },
  touchable: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: "white",
    height: 50,
    width: "30%",
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  google: { 
    width: 25, 
    height: 25 
  },
  googleText: { 
    color: Colors.PRIMARY, 
    textAlign: "center", 
    fontFamily:'Inter-SemiBold' ,
    fontSize:12
  },
  buttonContainer:{
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
    justifyContent:'center',
    width: "100%",
    flexDirection:'row',
    flexWrap:'wrap',
    gap:50,
    marginTop:5
  }
});

