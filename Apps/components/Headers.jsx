import { View, Text,Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react' 
import {useUser} from'@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'; 
import {useTheme} from '@react-navigation/native' 
import Icons from "@expo/vector-icons/MaterialIcons"
import { SafeAreaView } from 'react-native';

export default function Header() { 
    const {colors}=useTheme();
  const {user}=useUser(); 
    return(   
            <SafeAreaView>
            <View
      style={{
      paddingHorizontal: 2,
      paddingVertical: 24,
      flexDirection: "row",
      gap: 8,
      }}
      >
      <Image
      source={{uri:user?.imageUrl}}
      style={{ width: 52, aspectRatio: 1, borderRadius: 52 }}
      resizeMode="cover"
      />
      <View style={{flex:1}}> 
      
     <Text className="text-[16px] text-white">Welcome!</Text>
      <Text style={{fontSize:17,fontWeight:"bold", marginBottom: 8, color: "white",paddingHorizontal:1,paddingVertical:4}} numberOfLines={1}
      >{user?.fullName}</Text>

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

        {/* Announcements */} 

      </View> 
        {/* Search bar */} 

      <View className="p-3 px-6 flex flex-row items-center mt-[-18] rounded-full border-[1px] border-gray-300 mb-3">
        <Ionicons name="search" size={20} color="gray" />
            <TextInput placeholder='Search' placeholderTextColor={"white"} 
            className="ml-2 text-[15px]"
            // save user input on change method 
            onChangeText={(value)=>console.log(value)}
            />
        </View> 
        
            </SafeAreaView>

    )
  
} 