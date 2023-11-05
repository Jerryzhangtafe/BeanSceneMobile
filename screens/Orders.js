// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';

// import styles from '../styles/MainStyle';

// export default function Orders() {
//   return (
//     <View style={styles.container}>
//       <Text>Orders</Text>
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
} from "react-native";
import Sort from "../components/Sort";
import Header from "../layout/Header";
import styles from "../styles/MainStyle";
import Url from "../constants/Url";

import { useIsFocused } from "@react-navigation/native";
import RenderMenuItems from "../layout/RenderMenuItems";
import CategoryBar from "../layout/CategoryBar";
import MessageModal from "../components/MessageModal";

export default function Orders({ props, navigation,route}) {
  const [categorySelected, setCategorySelected] = useState("");
  const [specialSelected, setSpecialSelected] = useState(false);
  const [selected, setSelected] = useState("Sequence");

  const [menuData, setMenuData] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);

const reset= route.params?.clear;
// console.log(checkEmpty);
  const isFocused = useIsFocused();
 
  // console.log(orderDetails)

  useEffect(() => {
// console.log(orderDetails)
setOrderDetails([...orderDetails.filter(item=>item.quantity > 0)]);
if(reset){
  setOrderDetails([])
  navigation.setParams({ clear: null });
}
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

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Header></Header>
        <CategoryBar
          navigation={navigation}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
          specialSelected={specialSelected}
          setSpecialSelected={setSpecialSelected}
          managerView={false}
        />
        <View style={styles.pageTitleContainer}>
          <Text style={styles.titleText}>Menu List</Text>
          <Sort selected={selected} setSelected={setSelected}></Sort>
          <TouchableOpacity style={styles.goldContainer} onPress={()=>orderDetails.length!==0?navigation.navigate("Checkout",{orderDetails}):setModalVisibility(true)}>
            <Text style={styles.darkText}>Checkout</Text>
          </TouchableOpacity>
        </View>
        {/* <ScrollView contentContainerStyle={styles.container}> */}
        <ScrollView>
          <View>
            {output().map((menuItem, index) => {
              return (
                <View key={menuItem._id}>
                  <RenderMenuItems
                    menuItem={menuItem}
                    orderDetails={orderDetails}
                    setOrderDetails={setOrderDetails}
                    index={index}
                    navigation={navigation}
                  ></RenderMenuItems>
                </View>
              );
            })}
          </View>
          <MessageModal message="No item was added" modalVisibility={modalVisibility} setModalVisibility={setModalVisibility}/>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
