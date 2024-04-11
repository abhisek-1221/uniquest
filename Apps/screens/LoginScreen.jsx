import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import LottieView from 'lottie-react-native';


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
 

  // Join Forces with Peers Near and Far with UniQuest
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.hero}>
        <LottieView source={require('../../assets/animations/loganim.json')}
                     autoPlay loop style={styles.heroImage}
                     />
        </View>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text style={styles.title}>
            Join Forces with Peers Near and Far{'\n'}with{' '}
              <View style={styles.appName}>
                <Text style={styles.appNameText}>UniQuest</Text>
              </View>
            </Text>
            <Text style={styles.text}>
              A platform for students to connect, collaborate, and create
              together
            </Text>
          </View>
  
          <TouchableOpacity
            onPress={(onPress) 
            }>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Let's go</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    title: {
      fontSize: 28,
      fontWeight: '500',
      color: '#bee9eb',
      textAlign: 'center',
      marginBottom: 12,
      lineHeight: 40,
    },
    text: {
      fontSize: 15,
      lineHeight: 24,
      fontWeight: '400',
      color: '#9992a7',
      textAlign: 'center',
    },
    /** Hero */
    hero: {
      margin: 12,
      borderRadius: 16,
      padding: 16,
    },
    heroImage: {
      width: '100%',
      height: 400,
    },
    /** Content */
    content: {
      flex: 1,
      justifyContent: 'space-between',
      paddingVertical: 24,
      paddingHorizontal: 24,
    },
    contentHeader: {
      paddingHorizontal: 24,
    },
    appName: {
      backgroundColor: '#fff2dd',
      transform: [
        {
          rotate: '-5deg',
        },
      ],
      paddingHorizontal: 6,
    },
    appNameText: {
      fontSize: 28,
      fontWeight: '700',
      color: '#281b52',
    },
    /** Button */
    button: {
      backgroundColor: '#56409e',
      paddingVertical: 12,
      paddingHorizontal: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
    },
    buttonText: {
      fontSize: 15,
      fontWeight: '500',
      color: '#fff',
    },
  });


