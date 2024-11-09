import { Redirect, Stack, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Button } from "react-native";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  } else {
    return (
      <Stack
        screenOptions={{
          headerLeft: () => {
            return <Button onPress={router.back} title="Back"></Button>;
          },
        }}
      >
        <Stack.Screen options={{headerShown:true, title:"Sign Up"}} name="sign-up" />
        <Stack.Screen options={{headerShown:false}} name="index" />
        <Stack.Screen options={{headerShown:true, title:"Login"}} name="login" />

      </Stack>
    );
  }

 
}
