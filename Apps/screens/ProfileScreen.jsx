import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { Octicons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user } = useUser(); 
  const navigation = useNavigation();

  const menuList = [
    {
      id: 1,
      name: 'My Posts',
      icon: 'Octicons', 
      path: 'my-posts'
    },
    {
      id: 2,
      name: 'Logout',
      icon: 'MaterialCommunityIcons',
    },
    {
      id: 3,
      name: 'Notification',
      icon: 'Ionicons',
    },
  ];

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Octicons':
        return <Octicons name="report" size={24} color="white" />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name="logout" size={24} color="white" />;
      case 'Ionicons':
        return <Ionicons name="notifications-circle-outline" size={24} color="white" />;
      default:
        return null;
    }
  };

  const onMenuPress = (item) => { 
    item?.path ? navigation.navigate(item.path) : null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
        <Text style={styles.profileName}>{user?.fullName}</Text>
        <Text style={styles.profileEmail}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

      <FlatList
        data={menuList}
        numColumns={3} 
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => onMenuPress(item)}
            style={styles.menuItem}
          >
            {renderIcon(item.icon)}
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Dark background for the entire screen
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'white', // Light text color for better visibility
  },
  profileEmail: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 50,
    color: '#ccc', // Light grey text color for email
  },
  menuItem: {
    flex: 1,
    padding: 15,
    marginTop: 20,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333', // Subtle border color
    backgroundColor: '#1e1e1e', // Slightly lighter dark color for menu items
    alignItems: 'center', // Center items in the menu block
  },
  menuText: {
    fontSize: 11,
    marginTop: 20,
    color: 'white', // White text for menu items
  },
});
