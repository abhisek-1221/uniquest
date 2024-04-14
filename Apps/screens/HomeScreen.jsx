import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react' 
import { collection, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import Icons from "@expo/vector-icons/MaterialIcons"
import { useTheme } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import Header from '../components/Headers';
import { MaterialIcons } from '@expo/vector-icons';

 
const POSTS = [
  {
    id: 1,
    avatar: 'https://www.bootdey.com/img/Content/avatar/avatar2.png',
    name: 'Gautam',
    date: 'April 10, 2024',
    image: 'https://i.ytimg.com/vi/fJ9aq9uhyLk/maxresdefault.jpg',
    description: 'Looking for roomates in Gaur Atulyam, Greater Noida. Please contact me if you are interested. 3BHK , 2 attached bathrooms, Rent 5k per person.',
    Interested: 122,
    Contacted: 32,
  },
  {
    id: 2,
    avatar: 'https://www.bootdey.com/img/Content/avatar/avatar8.png',
    name: 'Manya',
    date: 'April 13, 2024',
    image: 'https://www.lazymonkadventure.com/wp-content/uploads/2021/10/Kasol-Kheerganga-Trek-3-scaled.jpg',
    description: 'Looking for a travel buddy for Kasol-Kheerganga trek. Please contact me if you are interested. Expected date of travel: 27th April 2024. 3 days trip. Budget: 7k per person.',
    Interested: 243,
    Contacted: 77,
  },
  // ...
];

export default function HomeScreen() { 
  const db=getFirestore(app);  
const {colors} = useTheme();
  
  return (
<ScrollView style={{ backgroundColor: darkThemeColors.background }}>
        <View className="py-8 px-6 flex-1">
      <Header/>
      <View style={styles.container}>
      <FlatList
      data={POSTS}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <View style={styles.header}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
          <Text style={styles.description}>{item.description}</Text>
          {item.image && <Image source={{ uri: item.image }} style={{ height: 200, width: '100%' }} />}
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
            <AntDesign name="like1" size={20} color={"white"} />
              <Text style={styles.actionText}>Interested</Text>
              <Text style={styles.actionCount}>{item.Interested}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
              <MaterialIcons name="connect-without-contact" size={24} color="white" style={{marginLeft:3}} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={item => item.id.toString()}
    />
    </View>
    </View>
    </ScrollView>
    
  )
};
const darkThemeColors = {
  background: '#121212', // Very dark (mostly black) background
  text: '#e0e0e0', // Light grey text for high contrast
  accent: '#bb86fc', // Purple accent for elements like buttons and icons
  subtleText: '#999', // Subtle text for less important information
  cardBackground: '#1e1e1e', // Dark grey for card backgrounds
  divider: '#333', // Slightly lighter grey for dividers
};


const styles = StyleSheet.create({
  post: {
    marginHorizontal: 10,
    backgroundColor: darkThemeColors.cardBackground, // Use dark background for posts
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: darkThemeColors.divider, // Divider color for dark theme
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: darkThemeColors.text, // Light color text for readability
    marginLeft: 10,
  },
  date: {
    fontSize: 14,
    color: darkThemeColors.subtleText, // Subtle color for less important text
    marginLeft: 10,
  },
  description: {
    color: darkThemeColors.text, // Ensure descriptions are readable
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 18,
    color: darkThemeColors.accent, // Use accent color for action text
    marginLeft: 5,
  },
  actionCount: {
    fontSize: 18,
    color: darkThemeColors.text, // Ensure numbers are readable
    marginLeft: 5,
  },
});
