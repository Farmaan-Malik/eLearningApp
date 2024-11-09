import React, { useEffect } from 'react';
import { Link, Slot, Stack, useRouter, useSegments } from 'expo-router';
import { ClerkLoaded, ClerkProvider, useAuth} from "@clerk/clerk-expo";
import * as SecureStore from 'expo-secure-store'
import Login from './(auth)/login';
import Home from './(home)/secondScreen';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';


export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>
  saveToken: (key: string, token: string) => Promise<void>
  clearToken?: (key: string) => void
}

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}
const InitialLayout=()=> {

  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.

  useEffect(() => {
    console.log("triggred");
    
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(home)';

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(home)/homeScreen');
    } else if (!isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return <Stack>
  <Stack.Screen name='(home)' options={{headerShown:false}}/>
  <Stack.Screen name='(auth)' options={{
      title: '',
      headerBackTitle: '',
      headerShadowVisible: false,
      headerStyle: { backgroundColor: Colors.PRIMARY },
      headerLeft: () => (
        <TouchableOpacity onPress={router.back}>
          <Ionicons name="arrow-back" size={28} color={Colors.PRIMARY} />
        </TouchableOpacity>
      ),
    }}/>
      <Stack.Screen name='index' options={{headerShown:false}}/>

  {/* <Stack.Screen name='login' options={
    {
      title: '',
      headerBackTitle: '',
      headerShadowVisible: false,
      // headerStyle: { backgroundColor: Colors.background },
      headerLeft: () => (
        <TouchableOpacity onPress={router.back}>
          <Ionicons name="arrow-back" size={34} color={Colors.PRIMARY} />
        </TouchableOpacity>
      ),
    }
  } />
    <Stack.Screen name="help" options={{ title: 'Help', presentation: 'modal' }} />
    <Stack.Screen
        name="verify/[phone]"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          // headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.PRIMARY} />
            </TouchableOpacity>
          ),
        }}
      />
       <Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown: false }} />
       <Stack.Screen
        name="(authenticated)/crypto/[id]"
        options={{
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerLargeTitle: true,
          headerTransparent: true,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" color={Colors.dark} size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="star-outline" color={Colors.dark} size={30} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
       <Stack.Screen
        name="(authenticated)/(modals)/lock"
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="(authenticated)/(modals)/account"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="close-outline" size={34} color={'#fff'} />
            </TouchableOpacity>
          ),
        }}
      /> */}
  </Stack>;
}

export default function StackLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
       <InitialLayout/>
      </ClerkLoaded>
    </ClerkProvider>
  )
}