// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';

// import Styles from '../../styles/MainStyle';

// export default function EditCategory({}) {
//   return (
//     <View style={Styles.container}>
//       <Text>EditCategory</Text>
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
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import Header from "../../layout/Header";

import Colours from "../../constants/Colours";

import styles from "../../styles/MainStyle";
import { useIsFocused } from "@react-navigation/native";
import Url from "../../constants/Url";


export default function EditCategory({ navigation }) {
  // const [categoryData, setCategoryData] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [message, setMessages] = useState("");
  const [name, setName] = useState("");
  const [nameEdit,setNameEdit] = useState(null);
  const [toggle, setToggle] = useState(false);

const isFocused=useIsFocused();

  useEffect(() => {
    if(isFocused)
    getCategories();
  }, [isFocused]);

  const showDeleteModal = (item) => {
    console.log(item);
    setSelectedCategory(item);
    setModalVisibility(true);
  };

  const hideDeleteModal = () => {
    setModalVisibility(false);
    setSelectedCategory(null);
  };

 const toggleEdit = (item) => {

    if (item._id===selectedCategory) {
      return (
        <>
          <TextInput
          placeholder={item.name}
            value={nameEdit===null?item.name:nameEdit}
            style={[styles.textInput, { marginBottom: 0 }]}
            onChangeText={(nameEdit) => setNameEdit(nameEdit)}
          ></TextInput>
           <View style={styles.rowHorizotal}>
          <TouchableOpacity onPress={editCategory}>
            <AntDesign
              name="save"
              size={24}
              color={Colours.BeanLightBlue}
            ></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setSelectedCategory(null);setNameEdit(null)}}>
            <AntDesign
              name="close"
              size={24}
              color={Colours.BeanLightBlue}
            ></AntDesign>
          </TouchableOpacity>
          </View>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.fontBold} numberOfLines={1}>{item.name}</Text>
          <View style={styles.rowHorizotal}>
            <TouchableOpacity
              onPress={() => setSelectedCategory(item._id)}
            >
              <AntDesign
                name="edit"
                size={18}
                color={Colours.BeanLightBlue}
              ></AntDesign>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showDeleteModal(item)}>
              <AntDesign
                name="delete"
                size={18}
                color={Colours.BeanLightBlue}
              ></AntDesign>
            </TouchableOpacity>
          </View>
        </>
      );
    }
  }

  const editCategory = async() => {
    console.log("Edit category when method is clicked");

    var category = {
      _id: selectedCategory,
      name: nameEdit,
    
    };
console.log(category);
    var url = `${Url.url}/categories`;
    var header = new Headers({});
    header.append("Content-Type", "application/json");
    var options = {
      method: "PUT",
      headers: header,
      body: JSON.stringify(category),
    };
    try {
      if (nameEdit==="") {
           setMessages("Please make sure that every field is entered");
           return;
      }
      const response = await fetch(url, options);
      // console.log(response);
      setSelectedCategory(null);
      setNameEdit(null);
      setMessages("Category Edited Successfully");
      getCategories();
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };

  const deleteConfirmed = async () => {
    console.log("delete button is clicked");

    var url = `${Url.url}/Categories/${selectedCategory._id}`;
    var header = new Headers({});
    header.append("Content-Type", "application/json");

    var options = {
      method: "Delete",
      headers: header,
      // body:JSON.stringify(product)
    };
    try {
      const response = await fetch(url, options);
      // const message = await response.json();
      // console.log(response);
      // console.log(message);
      if (response.ok) {
        hideDeleteModal();
        getCategories();
        setMessages(`${selectedCategory.name} has been deleted successfully`);
      } else {
        hideDeleteModal();
        setMessages(
          `Cannot delete "${selectedCategory.name}", it's used by at least one menu item. Please check.`
        );
      }
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };

  const getCategories = async () => {
    console.log("getCategories method is called");

    var url = `${Url.url}/Categories`;
    var header = new Headers({});
    var options = {
      method: "GET",
      headers: header,
    };
    try {
      const response = await fetch(url, options);
      // console.log(response);
      //I added await
      const data = await response.json();
      // console.log(data);
      setCategoryData(data);
      // console.log(data[0]);
      // setCategory(data[0].name);
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };

  const addCategory = async () => {
    console.log("addCategory method is called");

    var category = {
      name: name,
    };

    var url = `${Url.url}/Categories`;
    var header = new Headers({});
    header.append("Content-Type", "application/json");
    var options = {
      method: "POST",
      headers: header,
      body: JSON.stringify(category),
    };
    try {
      if (name === "") {
        setMessages("Please make sure that the name field is entered");
        return;
      }
      if (
        categoryData.find(
          (item) => item.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        setMessages(
          `Please check (case sensitive), duplicate name "${name.toLowerCase()}" found`
        );
        return;
      }
      const response = await fetch(url, options);
      // console.log(response);
      setName("");
      //I added await

      setMessages(`Category ${name} Added Successfully`);
      getCategories();
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      
        
          <Header />
        
          {/* <CategoryBar navigation={navigation} categorySelected={categorySelected} setCategorySelected={setCategorySelected} /> */}
          <View style={styles.pageTitleContainer}>
            <Text style={styles.titleText}>Category List</Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate("AddMenu")}>
                  <Ionicons name={"ios-add-circle"} size={30} color={Colours.BeanLightBlue} />
              </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.goldContainer}
              onPress={() => navigation.navigate("MenuList")}
            >
              <Text style={styles.darkText}>Menu List</Text>
            </TouchableOpacity>
          </View>
          <ScrollView >
          {categoryData.map((item, index ) => (
              <View key={index}
                style={
                  index % 2 === 0
                    ? styles.itemListContainer
                    : styles.itemListContainerGrey
                }
              >
                {toggleEdit(item)}
                {/* <Text style={styles.fontBold}>{item.name}</Text>
                <View style={styles.rowHorizotal}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("EditCategory", { item })
                    }
                  >
                    <AntDesign
                      name="edit"
                      size={18}
                      color={Colours.BeanLightBlue}
                    ></AntDesign>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => showDeleteModal(item)}>
                    <AntDesign
                      name="delete"
                      size={18}
                      color={Colours.BeanLightBlue}
                    ></AntDesign>
                  </TouchableOpacity>
                </View> */}
              </View>
            ))}
          

          <View style={[styles.rowHorizotal, { marginTop: 10 }]}>
            <TextInput
              placeholder="Add a new category"
              value={name}
              style={[styles.textInput, { marginBottom: 0 }]}
              onChangeText={(name) => setName(name)}
            ></TextInput>
            <TouchableOpacity onPress={addCategory}>
              <Ionicons
                name={"ios-add-circle"}
                size={40}
                color={Colours.BeanLightBlue}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.alignCenter, { alignSelf: "center" }]}>
            <Text
              style={[
                styles.blueMessage,
                {
                  color: message.includes("Please")
                    ? "red"
                    : Colours.BeanLightBlue,
                },
              ]}
            >
              {message}
            </Text>
          </View>

          <Modal visible={modalVisibility} transparent>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Are you sure you want to delete this {selectedCategory?.name}?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={hideDeleteModal}
                  >
                    <Text style={styles.darkText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.deleteModalButton]}
                    onPress={deleteConfirmed}
                  >
                    <Text style={styles.darkText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          </ScrollView>
   
       
      
    </SafeAreaView>
  );
}
