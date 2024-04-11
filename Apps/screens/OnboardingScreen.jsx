import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function OnboardingScreen() {
    const navigation = useNavigation();
    const handleDone = () => {
        navigation.navigate('login');
    }
        return (
    <View style={styles.container}>
        <Onboarding
        onDone = {handleDone}
        onSkip = {handleDone}
        containerStyles={{paddingHorizontal: 15}}
        pages={[
            {
            backgroundColor: '#220f30',
            image: (
               <View style={styles.lottie} >
                     <LottieView source={require('../../assets/animations/trip.json')}
                     autoPlay loop style={styles.lottie}
                     />
               </View>
                ),
            title: 'Journey Awaits, Find Your Crew',
            titleStyles: styles.titleStyle,
            subtitle: 'Find your travel squad and make it happen! UniQuest connects you with fellow explorers',
            subTitleStyles: styles.subtitleStyle,
            },
            {
            backgroundColor: '#220f30',
            image: (
               <View style={styles.lottie}>
                     <LottieView source={require('../../assets/animations/room.json')}
                     autoPlay loop style={styles.lottie}
                     />
               </View>
                ),
            title: 'Roommate Matching, Redefined',
            titleStyles: styles.titleStyle,
            subtitle: 'Match with the perfect flatmates or roomies and create a space that feels like home',
            subTitleStyles: styles.subtitleStyle,
            },
            {
            backgroundColor: '#220f30',
            image: (
               <View style={styles.lottie}>
                     <LottieView source={require('../../assets/animations/outing.json')}
                     autoPlay loop style={styles.lottie}
                     />
               </View>
                ),
            title: 'Discover, Connect, Share Journeys',
            titleStyles: styles.titleStyle,
            subtitle: 'From weekend getaways to semester breaks, find your journey companions and share incredible experiences',
            subTitleStyles: styles.subtitleStyle,
            },
            {
            backgroundColor: '#220f30',
            image: (
               <View >
                     <LottieView source={require('../../assets/animations/team.json')}
                     autoPlay loop style={styles.lottie}
                     />
               </View>
                ),
            title: 'Projects That Inspire',
            titleStyles: styles.titleStyle,
            subtitle: 'Connect with students across campuses to work on projects that spark change',
            subTitleStyles: styles.subtitleStyle,
            },
        ]}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#220f30',
       
    },
    lottie:{
        width: width*0.9,
        height: width,
    },
    titleStyle: {
        fontWeight: 'bold', // Make the title bold
    },
    subtitleStyle: {
        fontStyle: 'italic', // Make the subtitle cursive (italic)
    }
})