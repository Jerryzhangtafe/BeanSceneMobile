// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';

// import styles from '../../styles/MainStyle';

// export default function MenuList() {
//   return (
//     <View style={styles.container}>
//       <Text>MenuList</Text>
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
} from "react-native";

import Header from "../../layout/Header";

import styles from "../../styles/MainStyle";

import { BeanSceneGetMenuItems } from "../../utils/Api";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import Colours from "../../constants/Colours";

import { useIsFocused } from "@react-navigation/native";
import CategoryBar from "../../layout/CategoryBar";
import Url from "../../constants/Url";
import Sort from "../../components/Sort";

export default function MenuList({ props, navigation }) {
  const [menuData, setMenuData] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categorySelected, setCategorySelected] = useState("");
  const [specialSelected, setSpecialSelected] = useState(false);
  const [selected, setSelected] = useState("Sequence");

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getMenu();
    }
  }, [props, isFocused]);

  const getMenu = async () => {
    var url = `${Url.url}/MenuItems`;
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
      setMenuData(data);
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };

  const itemsByCategory = menuData.filter(
    (item) => item.categoryId === categorySelected
  );
  const special = menuData.filter((item) => item.special == true);
  const outputBeforeSort = specialSelected
    ? special
    : categorySelected !== ""
    ? itemsByCategory
    : menuData;
  const copy1 = outputBeforeSort.slice();
  const copy2 = outputBeforeSort.slice();
  const orderDescending = copy1.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return 1;
    if (nameA > nameB) return -1;
    return 0;
  });
  const orderAscending = copy2.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  function output() {
    if (selected === "A-Z") return orderAscending;
    if (selected === "Z-A") return orderDescending;
    if (selected === "Sequence") return outputBeforeSort;
  }

  const showDeleteModal = (item) => {
    // console.log(item);
    setSelectedItem(item);
    setModalVisibility(true);
  };

  const hideDeleteModal = () => {
    setModalVisibility(false);
    setSelectedItem(null);
  };

  const deleteConfirmed = async () => {
    // console.log("delete button is clicked");

    var url = `${Url.url}/MenuItems/${selectedItem._id}`;
    var header = new Headers({});
    header.append("Content-Type", "application/json");

    var options = {
      method: "Delete",
      headers: header,
      // body:JSON.stringify(product)
    };
    try {
      const response = await fetch(url, options);
      // console.log(response);
      if (response.ok) {
        hideDeleteModal();
        getMenu();
      }
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Header />
        <CategoryBar
          navigation={navigation}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
          managerView={true}
          specialSelected={specialSelected}
          setSpecialSelected={setSpecialSelected}
        />

        <View style={styles.pageTitleContainer}>
          <Text style={styles.titleText}>Menu List</Text>
          <Sort selected={selected} setSelected={setSelected}></Sort>
          <TouchableOpacity onPress={() => navigation.navigate("AddMenu")}>
            <Ionicons
              name={"ios-add-circle"}
              size={30}
              color={Colours.BeanLightBlue}
            />
          </TouchableOpacity>
        </View>
        {/* <ScrollView contentContainerStyle={styles.container}> */}

        <FlatList
          data={output()}
          renderItem={({ item, index }) => (
            <View
              style={
                index % 2 === 0
                  ? styles.itemListContainer
                  : styles.itemListContainerGrey
              }
            >
              <Text style={styles.fontBold} numberOfLines={1}>
                {item.special ? "🔥" : ""}
                {!item.availability && "❌"} {item.name}
              </Text>
              <View style={styles.rowHorizotal}>
                {/* <TouchableOpacity onPress={() => navigation.navigate("EditMenu", { item })}> */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Central", {
                      screen: "EditMenu",
                      params: { item },
                    })
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
              </View>
            </View>
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
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
}
