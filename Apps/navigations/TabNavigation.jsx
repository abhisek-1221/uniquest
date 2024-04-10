import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator 
    screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:"#983bb8",
    }}
    >
        <Tab.Screen name="Home" component={HomeScreen} 
        options={{
            tabBarLabel: ({color, size}) => (
                <Text style={{color: color, fontSize:size, marginBottom:2}}>Home</Text>
            ),
            tabBarIcon: ({color, size}) => (
            <FontAwesome name="home" size={size} color={color} />          
          )
        }} />
        <Tab.Screen name="Explore" component={ExploreScreen} 
         options={{
            tabBarLabel: ({color, size}) => (
                <Text style={{color: color, fontSize:size, marginBottom:2}}>Explore</Text>
            ),
            tabBarIcon: ({color, size}) => (
        <MaterialIcons name="travel-explore" size={size} color={color} />
          )
        }} />
        <Tab.Screen name="Post" component={AddPostScreen} 
         options={{
            tabBarLabel: ({color, size}) => (
                <Text style={{color: color, fontSize:size, marginBottom:2}}>Post</Text>
            ),
            tabBarIcon: ({color, size}) => (
        <Ionicons name="add-circle-outline" size={size} color={color} />
)
        }} />
        <Tab.Screen name="Profile" component={ProfileScreen}
         options={{
            tabBarLabel: ({color, size}) => (
                <Text style={{color: color, fontSize:size, marginBottom:2}}>Profile</Text>
            ),
            tabBarIcon: ({color, size}) => (
        <Feather name="user" size={size} color={color} />
          )
        }}  />
    </Tab.Navigator>
  )
}

