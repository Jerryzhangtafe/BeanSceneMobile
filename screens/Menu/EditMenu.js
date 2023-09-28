// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';

// import Styles from '../../styles/MainStyle';


// export default function EditMenu() {
//   return (
//     <View style={Styles.container}>
//       <Text>EditMenu</Text>
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
  Picker,
} from "react-native";

import CheckBox from "expo-checkbox";

import Header from "../../layout/Header";
import styles from "../../styles/MainStyle";
import Colours from "../../constants/Colours";


export default function EditMenu({ route, navigation }) {

const menuItem = route.params.item;

  const [categoryData, setCategoryData] = useState([]);
  const [name, SetName] = useState(menuItem.name);
  const [description, SetDescription] = useState(menuItem.description);
  const [price, SetPrice] = useState(menuItem.price);
  const [photo, SetPhoto] = useState(menuItem.photo);
  const [availability, SetAvailability] = useState(menuItem.availability);
  const [categoryId, setCategoryId] = useState(menuItem.categoryId);
  const [categoryName, setCategoryName] = useState(menuItem.categoryName);
  const [message, setMessages] = useState("");
  const [dietaryFlags, setDietaryFlags] = useState(menuItem.dietaryFlags);
  const id = menuItem._id;




  const toggleDietaryFlag = (item) => {
    setDietaryFlags((currentState) => ({
      ...currentState,
      [item]: !currentState[item],
    }));
  };
  

  //I added [] dependancy
  useEffect(() => {
    
      getCategories();
      // getMenu();
    
  }, []);

  const getCategories = async () => {
    console.log("getCategories method is called");

    var url = "https://localhost:7044/categories";
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
      // console.log(data[0]);
      // setCategoryName(data[0].name);
      // setCategoryId(data[0]._id);
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };

  // const getMenu = async () => {
  //   var url = "https://localhost:7044/MenuItems";
  //   var header = new Headers({});
  //   var options = {
  //     method: "GET",
  //     headers: header,
  //   };
  //   try {
  //     const response = await fetch(url, options);
  //     console.log(response);
  //     //I added await
  //     const data = await response.json();
  //     const dietaryNames = Object.keys(data[0].dietaryFlags).reduce((acc, key) => {
  //       acc[key] = false;
  //       return acc;
  //     }, {});
  //     console.log(data);
  //     console.log(dietaryNames);
  //     setDietaryFlags(dietaryNames);
  //   } catch (error) {
  //     console.log("Error:" + error.message);
  //   }
  // };

  const editMenuItem = () => {
    console.log("add menu item when method is clicked");

    var menuItem = {
      _id:id,
      name: name,
      description: description,
      price: price,
      photo: photo,
      availability: availability,
      dietaryFlags: dietaryFlags,
      categoryId: categoryId,
      categoryName: categoryName,
  
    };
console.log(menuItem);
    var url = "https://localhost:7044/menuitems";
    var header = new Headers({});
    header.append("Content-Type", "application/json");
    var options = {
      method: "PUT",
      headers: header,
      body: JSON.stringify(menuItem),
    };
    try {
      //
      const values = Object.values(menuItem);
     const check = values.every(value=>value!==""); 
      if (!check) {
           setMessages("Please make sure that every field is entered");
           return;
      }
      //
      if (isNaN(price)){
        setMessages("Please enter number for price")
        return
      } 
      const response = fetch(url, options);
      console.log(response);
      setMessages("Menu Edited Successfully");
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Header></Header>
          <View style={styles.pageTitleContainer}>
            <Text style={styles.titleText}>Edit Menu</Text>
            <TouchableOpacity
              style={styles.goldContainer}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.darkText}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actualFormContainerWithSpacing}>
            <TextInput
              placeholder="Name"
              value={name}
              style={styles.textInput}
              onChangeText={(name) => SetName(name)}
            ></TextInput>
            <TextInput
              placeholder="Description"
              value={description}
              style={styles.textInput}
              onChangeText={(description) => SetDescription(description)}
            ></TextInput>
            <TextInput
              placeholder="Price"
              value={price}
              style={styles.textInput}
              onChangeText={(price) => SetPrice(price)}
            ></TextInput>
            {/* <TextInput
              placeholder="Availability"
              style={styles.textInput}
              onChangeText={(availability) => SetAvailability(availability)}
            ></TextInput> */}
            <View style={styles.dietaryContainer}>
            <Text>Availability</Text>
            <CheckBox value={availability} onValueChange={()=>SetAvailability(!availability)}></CheckBox>
            </View>
            <TextInput
              placeholder="photo name"
              value={photo}
              style={styles.textInput}
              onChangeText={(photo) => SetPhoto(photo)}
            ></TextInput>
            <View style={styles.dietaryContainer}>
              {Object.keys(dietaryFlags).map((item) => { return(
                <View key={item} style={styles.dietaryBox}>
                <CheckBox value={dietaryFlags[item]} style={styles.checkBox}
                    onValueChange={() => toggleDietaryFlag(item)}></CheckBox>
                  <Text>{item}</Text>
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
              style={styles.textInput}
              selectedValue={categoryId}
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
            <TouchableOpacity style={styles.loginButton} onPress={editMenuItem}>
              <Text style={styles.loginButtonText}>Update menu item</Text>
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
