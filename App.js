import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Apps/screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from "expo-constants"


export default function App() {
  return (
    <ClerkProvider publishableKey={Constants.expoConfig.extra.clerkPublishableKey}>
      <View>
      <SignedIn>
          <Text>You are Signed in</Text>
      </SignedIn>
        <SignedOut>
        <LoginScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  
  );
}

