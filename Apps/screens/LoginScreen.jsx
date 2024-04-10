import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
WebBrowser.maybeCompleteAuthSession();


export default function LoginScreen() {
    
    useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });


  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
 


  return (
    <View>
      <Image
        source={require('./../../assets/log2.png')}
        className="w-full h-[400px] object-cover"
      />
    <View className="p-9 rounded-t-3xl shadow-md">
        <Text className="text-[30px] text-center font-bold">UniQuest</Text>
        <Text className="text-[18px] text-slate-500 mt-3 p-6 mb-10 text-center">Join Forces with Peers Near and Far with UniQuest</Text> 
        <TouchableOpacity onPress={onPress} className="p-4 bg-purple-400 rounded-full ">
            <Text className="text-white text-center text-[20px] align-middle">Get Started</Text>
        </TouchableOpacity>
    </View>
    </View>
  )
};


