// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';

// import styles from '../../styles/MainStyle';

// export default function AddMenu() {
//   return (
//     <View style={styles.container}>
//       <Text>AddMenu</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform
} from "react-native";

import CheckBox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";

import Header from "../../layout/Header";
import styles from "../../styles/MainStyle";
import { useIsFocused } from "@react-navigation/native";
import Colours from "../../constants/Colours";
import Url from "../../constants/Url";

export default function AddMenu({ props, navigation }) {
  const [categoryData, setCategoryData] = useState([]);
  const [name, setName] = useState("");
  const [description, SetDescription] = useState("");
  const [price, SetPrice] = useState("");
  const [photo, SetPhoto] = useState("");
  const [availability, setAvailability] = useState(false);
  const [special,setSpecial] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessages] = useState("");
  const [dietaryFlags, setDietaryFlags] = useState({});


  const isFocused = useIsFocused();

  const toggleDietaryFlag = (item) => {
    setDietaryFlags((currentState) => ({
      ...currentState,
      [item]: !currentState[item],
    }));
  };
  

  //I added [] dependancy
  useEffect(() => {
    if (isFocused) {
      getCategories();
      getMenu();
    }
  }, [props, isFocused]);

  const getCategories = async () => {
    console.log("getCategories method is called");

    var url = `${Url.url}/categories`;
    var header = new Headers({});
    var options = {
      method: "GET",
      headers: header,
    };
    try {
      const response = await fetch(url, options);
      console.log(response);
      //I added await
      const data = await response.json();
      console.log(data);
      setCategoryData(data);
      console.log(data[0]);
      setCategoryName(data[0].name);
      setCategoryId(data[0]._id);
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };

  const getMenu = async () => {
    var url = `${Url.url}/MenuItems`;
    var header = new Headers({});
    var options = {
      method: "GET",
      headers: header,
    };
    try {
      const response = await fetch(url, options);
      console.log(response);
      //I added await
      const data = await response.json();
      const dietaryNames = Object.keys(data[0].dietaryFlags).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      console.log(data);
      console.log(dietaryNames);
      setDietaryFlags(dietaryNames);
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };

  const addMenuItem = () => {
    console.log("add menu item when method is clicked");

    var menuItem = {
      name: name,
      description: description,
      price: price,
      photo: photo,
      availability: availability,
      special: special,
      dietaryFlags: dietaryFlags,
      categoryId: categoryId,
      categoryName: categoryName,
  
    };
console.log(menuItem);
    var url = `${Url.url}/menuitems`;
    var header = new Headers({});
    header.append("Content-Type", "application/json");
    var options = {
      method: "POST",
      headers: header,
      body: JSON.stringify(menuItem),
    };
    try {
     const values = Object.values(menuItem);
     const check = values.every(value=>value!==""); 
      if (!check) {
           setMessages("Please make sure that every field is entered");
           return;
      }
      if (isNaN(price)){
        setMessages("Please enter number for price")
        return;
      } 
      const response = fetch(url, options);
      console.log(response);
      
      setMessages("Menu Added Successfully");
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* <ScrollView contentContainerStyle={styles.container}> */}
      <ScrollView>
        <View style={styles.container}>
          <Header></Header>
          <View style={styles.pageTitleContainer}>
            <Text style={styles.titleText}>Add Menu</Text>
            <TouchableOpacity
              style={styles.goldContainer}
              onPress={() => navigation.navigate("MenuList")}
            >
              <Text style={styles.darkText}>Menu List</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actualFormContainerWithSpacing}>
            <TextInput
              placeholder="Name"
              style={styles.textInput}
              onChangeText={(name) => setName(name)}
            ></TextInput>
            <TextInput
            multiline
            numberOfLines={4}
              placeholder="Description"
              style={styles.textInputMultiLine}
              onChangeText={(description) => SetDescription(description)}
            ></TextInput>
            <TextInput
              placeholder="Price"
              style={styles.textInput}
              onChangeText={(price) => SetPrice(price)}
            ></TextInput>
            {/* <TextInput
              placeholder="Availability"
              style={styles.textInput}
              onChangeText={(availability) => SetAvailability(availability)}
            ></TextInput> */}
            <View style={styles.dietaryContainer}>
              <View style={styles.dietaryBox}>
            <Text>Availability</Text>
            <CheckBox value={availability} onValueChange={()=>setAvailability(!availability)}></CheckBox>
            </View>
            <View style={styles.dietaryBox}>
            <Text>Special</Text>
            <CheckBox value={special} onValueChange={()=>setSpecial(!special)}></CheckBox>
            </View>
            </View>
            <TextInput
              placeholder="photo name"
              style={styles.textInput}
              onChangeText={(photo) => SetPhoto(photo)}
            ></TextInput>
            <View style={styles.dietaryContainer}>
              {Object.keys(dietaryFlags).map((item) => { return(
                <View key={item} style={styles.dietaryBox}>
                <Text>{item}</Text>
                <CheckBox value={dietaryFlags[item]} style={styles.checkBox}
                    onValueChange={() => toggleDietaryFlag(item)}></CheckBox>
                  
                </View>);
              })}

              {/* <TextInput placeholder="diataryFlags" style={styles.textInput} onChangeText={(diataryFlags)=>setDiataryFlags(diataryFlags)}></TextInput> */}
            </View>
            {/* <Picker style={styles.textInput}>
                                <Picker.Item label="Samsung" value="Samsung"></Picker.Item>
                                <Picker.Item label="iPhone" value="iPhone"></Picker.Item>
                                <Picker.Item label="oppo" value="oppo"></Picker.Item>
                            </Picker> */}
            <Picker
              style={[styles.textInput,{height:(Platform.OS==="ios"?180:40),justifyContent:"center"}]}
              onValueChange={(id) => {
             const findCategory = categoryData.find(category=>category._id===id);

             if(findCategory){
              setCategoryName(findCategory.name);
              setCategoryId(id);
             }

                
               
              }}
            >
              {/* <Picker.Item label="Select a category" value=""/> */}
              {categoryData?.map((item, key) => (
                <Picker.Item
                  label={item.name}
                  value={item._id}
                  key={key}
                ></Picker.Item>
              ))}
            </Picker>
            <TouchableOpacity style={styles.loginButton} onPress={addMenuItem}>
              <Text style={styles.loginButtonText}>Add menu item</Text>
            </TouchableOpacity>
            <View style={styles.alignCenter}>
              <Text style={[styles.blueMessage,{color:(message.includes("Please")?"red":Colours.BeanLightBlue)}]}>{message}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
