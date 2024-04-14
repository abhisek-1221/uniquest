import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from "../../firebaseConfig";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { Formik } from 'formik';
import { TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';



const AddPostScreen = () => {
  const db = getFirestore(app);
  const {user} = useUser();
  const storage = getStorage(app);
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(() => {
    getCategoryList();
  }, [])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  const getCategoryList = async () => {
    const querySnapshot = await getDocs(collection(db, "Category"));
    const newCategories = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      newCategories.push(doc.data());  // Collect all new categories
    });
    setCategoryList(newCategories);  // Set all at once
  }
    
    const onSubmitMethod = async (values) => {
      values.datetime = new Date().toISOString();
      values.image = image;
      const resp = await fetch(image);
      const blob = await resp.blob();
      const storageRef = ref(storage, 'images/' + Date.now()+"jpg");

      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
      }).then((resp)=>{
        getDownloadURL(storageRef).then(async(downloadUrl)=>{
          console.log(downloadUrl);
          values.image = downloadUrl;
          values.userName = user.fullName;
          values.userEmail = user.primaryEmailAddress.emailAddress;
          values.userImage = user.imageUrl;
          const docRef = await addDoc(collection(db, "userPosts"), values)
          if(docRef.id){
            console.log('Post added successfully');
          }
        })
        });
      }


  return (
    <ScrollView>
        <View className="bg-slate-800 h-screen">
      <View className="px-9">
      <View className="flex justify-center items-center gap-20 align-top mt-0.5 ">
      <Text className="text-[30px] font-bold  text-purple-200 mb-2">Add Post</Text>

      </View>
        <Formik
      initialValues={{title:'',description:'',datetime:'',category:'',image:'',userName:'',userEmail:'',userImage:''}} 
      onSubmit={(values) => onSubmitMethod(values)}      
          >
            {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
              <View>
                <TouchableOpacity onPress={pickImage}>
                {image?
              <Image source={{uri:image}} style={{width:80,height:80,borderRadius:15}}/>
              :<Image source={require('../../assets/upload.avif')} 
              style={{width: 330, height: 80, borderRadius: 10, marginTop:2}}
              />
              }
                
                </TouchableOpacity>
                
                <TextInput
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values?.title}
                  placeholder="Title"
                  placeholderTextColor="#ffffff"
                  style={styles.input}
                />
                <TextInput
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values?.description}
                  placeholder="Description"
                  placeholderTextColor="#ffffff"
                  style={[styles.input, { height: 100 }]}
                  multiline={true} 
                />
                <TextInput
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  value={values?.price}
                  keyboardType='number-pad'
                  placeholder="Price"
                  placeholderTextColor="#ffffff"
                  style={styles.input}
                />
                <TextInput
                  onChangeText={handleChange('location')}
                  onBlur={handleBlur('location')}
                  value={values?.location}
                  placeholder="Location"
                  placeholderTextColor="#ffffff"
                  style={styles.input}
                />
                <Picker
                selectedValue={values?.category}
                style={styles.input}
                onValueChange={itemValue=>setFieldValue('category',itemValue)}
                dropdownIconColor={'white'}
                selectionColor={'white'}
                >
                  {categoryList&&categoryList.map((item,index)=>( 
                  <Picker.Item key={index} 
                  label={item?.name}
                  labelStyle={{color:'white'}}
                  value={item?.name}/>
                  ))}
                </Picker>
                <TouchableOpacity className="p-4 bg-purple-600 rounded-full mt-10"
                  onPress={handleSubmit}>
                    <Text className="text-white text-center text-[16px]">Submit</Text>
                  </TouchableOpacity>
              </View>
            )}
        </Formik>
      </View>
    </View>
    </ScrollView>
    
  )
}

const styles = StyleSheet.create({
  input:{
    borderWidth: 1,
    borderColor: '#e6eaf0',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
    marginTop: 10,
  },
  }
)

export default AddPostScreen
