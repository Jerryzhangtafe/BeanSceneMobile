// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';

// import styles from '../styles/MainStyle';

// export default function Search() {
//   return (
//     <View style={styles.container}>
//       <Text>Search</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import Colours from "../constants/Colours";

import Header from "../layout/Header";

import styles from "../styles/MainStyle";

export default function Search({ navigation }) {
  const [menuData, setMenuData] = useState([]);
  const [input, setInput] = useState("");

  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const showDeleteModal = (item) => {
    console.log(item);
    setSelectedItem(item);
    setModalVisibility(true);
  };

  const hideDeleteModal = () => {
    setModalVisibility(false);
    setSelectedItem(null);
  };

  const deleteConfirmed = async () => {
    console.log("delete button is clicked");

    var url = `https://localhost:7044/MenuItems/${selectedItem._id}`;
    var header = new Headers({});
    header.append("Content-Type", "application/json");

    var options = {
      method: "Delete",
      headers: header,
      // body:JSON.stringify(product)
    };
    try {
      const response = await fetch(url, options);
      console.log(response);
      if (response.ok) {
        hideDeleteModal();
        searchMenu(input);
      }
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };

  const searchMenu = async (text) => {
    if (text.length < 2) {
      setMenuData("");
      return;
    }
    console.log("searchProduct method is called" + text);

    var url = "https://localhost:7044/MenuItems/" + text;
    var header = new Headers({});

    var options = {
      method: "GET",
      headers: header,
    };
    try {
      const response = await fetch(url, options);
      console.log(response);
      const data = await response.json();
      console.log(data);
      setMenuData(data);
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Header></Header>
          <View style={styles.alignCenterSearch}>
            <TextInput
              value={input}
              placeholder="Serach product by name"
              style={styles.textInput}
              onChangeText={(text) => {
                searchMenu(text), setInput(text);
              }}
            ></TextInput>
          </View>
          <FlatList
            data={menuData}
            renderItem={({ item, index }) => (
              <View
                style={
                  index % 2 === 0
                    ? styles.itemListContainer
                    : styles.itemListContainerGrey
                }
              >
                <Text style={styles.fontBold}>{item.name}</Text>
                <View style={styles.rowHorizotal}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("EditMenu", { item });
                      setInput("");
                      setMenuData([]);
                    }}
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
              </View>

              // <View style={styles.SearchResult}>
              //     <Text>{item.name}</Text>
              // </View>
            )}
          ></FlatList>
          <Modal visible={modalVisibility} transparent>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Are you sure you want to delete this {selectedItem?.name}?
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
