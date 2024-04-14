import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from "../../firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Formik } from 'formik';
import { TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const AddPostScreen = () => {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, [])

  const getCategoryList = async () => {
    setCategoryList([]);
const querySnapshot = await getDocs(collection(db, "Category"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setCategoryList([...categoryList, doc.data()]);
      });
  }
  return (
    <View className="bg-slate-800 h-screen">
      <View className="p-12">
      <View className="flex flex-row gap-20 align-top mt-1">
      <Text className="text-[30px] font-bold textAlign-center text-purple-200 ">Add Post</Text>
      <Ionicons className="flex flex-row align-right" name="add-circle-outline" size={30} color="white" />

      </View>
        <Formik
          initialValues={{name: '', description: '', category: '', price: '', image: ''}}
          onSubmit={(values) => {
            console.log(values);}
        }      
          >
            {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
              <View>
                <TouchableOpacity onPress={()=>console.log("Image Select")}>
                <Image source={require('../../assets/upload.avif')} 
                style={{width: 330, height: 80, borderRadius: 10, marginTop:2}}
                />
                </TouchableOpacity>
                
                <TextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values?.name}
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


