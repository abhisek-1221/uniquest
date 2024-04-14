import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'
import Icons from "@expo/vector-icons/MaterialIcons"
import { useState } from 'react'
 const avt = "https://static.vecteezy.com/system/resources/thumbnails/000/580/521/small_2x/sarmi10-07.jpg"

 const propertyData = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    theme: 'Trip Companions',
    location: 'Delhi NCR',
    collegeCollabs: '13',
    searching: '6',
    Ongoing: '2',
    Collaborated: '34'
  },
  {
    id: '2',
    image: 'https://plus.unsplash.com/premium_photo-1661573729122-6619f62ef0ea?q=80&w=2815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    theme: 'Project Collaborators',
    location: 'Delhi NCR',
    collegeCollabs: '8',
    searching: '5',
    Ongoing: '2',
    Collaborated: '27'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1613687194025-417d0e1783aa?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    theme: 'Roommate Finder',
    location: 'Delhi NCR',
    collegeCollabs: '21',
    searching: '12',
    Ongoing: '2',
    Collaborated: '77'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    theme: 'Inter-college Meetups',
    location: 'Delhi NCR',
    collegeCollabs: '45',
    searching: '6',
    Ongoing: '2',
    Collaborated: '83'
  },

];


export default function ExploreScreen() {
  const {colors} = useTheme();

  // list items
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.theme}>{item.theme}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.collegeCollabs}>{item.collegeCollabs} Inter College Collborations</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.searching}>{item.searching} People Searching</Text>
        <Text style={styles.Collaborated}>{item.Collaborated} Collaborated</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredData = propertyData.filter((item) => {
    return item.location.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <ScrollView>
    <View
      style={{
      paddingHorizontal: 24,
      paddingVertical: 48,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: "black",
    }}
      >
      <Image
      source={{
      uri: avt,
      }}
      style={{ width: 52, aspectRatio: 1, borderRadius: 52 }}
      resizeMode="cover"
      />
      <View style={{flex:1, backgroundColor:"black"}}>
      <Text style={{fontSize:17,fontWeight:"bold", marginBottom: 8, color: "white"}} numberOfLines={1}
      >Explore Communities</Text>
      <Text style={{fontSize:11, color: "white", opacity: 0.6}}>Lookout for People in different categories</Text>
      </View>
      {/* notifications */}

          <TouchableOpacity
          style={{
          width: 52,
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 52,
          borderWidth: 1,
          borderColor: colors.border,
          }}
          >
            <Icons name="notifications" size={24} color={"white"} />
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', paddingHorizontal: 24, gap: 12, backgroundColor:"black", marginTop:-13}}>
      <TouchableOpacity
      style={{
      flex: 1,
      height: 52,
      alignItems: "center",
      borderRadius: 52,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 24,
      flexDirection: "row",
      gap: 12,
      marginBottom: 16,
      }}
      >
        <Icons name='search' size={24} color={"white"} />
        <TextInput
        placeholder="Search for communities"
        placeholderTextColor={"white"} // Adjust opacity for better visibility
        style={{
          flex: 1,
          fontSize: 16,
          color: "white",
          opacity: 0.6,
        }}
      />
      </TouchableOpacity>
      <TouchableOpacity
      style={{
      width: 52,
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 52,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: "black"
      }}
      >
        <Icons name="tune" size={24} color={"white"} />
    </TouchableOpacity>
      </View>
      <Text style={{fontSize: 17, fontWeight: "bold", paddingHorizontal: 24, color: "white", backgroundColor:"black"}}>Trending Communities</Text>
      <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.propertyListContainer}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#121212', // Dark background for the screen
    },
    searchInputContainer: {
      paddingHorizontal: 20,
    },
    searchInput: {
      height: 40,
      borderWidth: 1,
      borderColor: '#555', // Darker border color
      backgroundColor: '#333', // Darker background for input
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      color: '#fff' // Light text color
    },
    propertyListContainer: {
      paddingHorizontal: 20,
    },
    card: {
      backgroundColor: '#1e1e1e', // Dark background for cards
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    image: {
      height: 150,
      marginBottom: 10,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    cardBody: {
      marginBottom: 10,
      padding: 10,
    },
    theme: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#fff' // Light text color
    },
    location: {
      fontSize: 16,
      marginBottom: 5,
      color: '#ccc' // Lighter text color
    },
    collegeCollabs: {
      fontSize: 14,
      marginBottom: 5,
      color: '#999' // Grey text color for less emphasis
    },
    cardFooter: {
      padding: 10,
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: '#333', // Dark border color
      justifyContent: 'space-between',
    },
    searching: {
      fontSize: 16,
      color: '#ff8c00', // Red-ish text for emphasis
      fontWeight: 'bold'
    },
    Ongoing: {
      fontSize: 16,
      color: '#ff8c00', // Orange text for ongoing
      fontWeight: 'bold'
    },
    Collaborated: {
      fontSize: 16,
      color: '#0a0', // Green text for Collaborated
      fontWeight: 'bold'
    }
  });
  