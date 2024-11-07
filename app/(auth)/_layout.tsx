import { Redirect, Stack, useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { Button } from 'react-native'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }else{
    
  }

  return (<Stack screenOptions={{headerShown:true,headerLeft:()=>{
    return(
    <Button onPress={router.back} title='Back'></Button>)
  }}}>
    <Stack.Screen
    name='sign-up'/>
  </Stack>)
}