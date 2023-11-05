import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import Header from "../layout/Header";
import styles from "../styles/MainStyle";
import { TextInput } from "react-native-gesture-handler";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Url from "../constants/Url";
import Colours from "../constants/Colours";

export default function Checkout({ route, navigation }) {
  const [orderDetails, setOrderDetails] = useState(
    route.params.orderDetails || []
  );
  // console.log(orderDetails);

  const [currentDateTime, setCurrentDateTime] = useState();
  const [areaData, setAreaData] = useState([]);
  const [area, setArea] = useState("");
  const [table, setTable] = useState("");
  const [tableData, setTableData] = useState([]);

  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [note,setNote] = useState("");
  const [selectNote, setSelectNote] = useState(null);


  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  // useEffect(() =>{ orderDetails.length === 0&&navigation.navigate("TakeOrder")},[orderDetails])
  useEffect(() => {
    if (orderDetails.length === 0) {
      // console.log(orderDetails);
      navigation.navigate("TakeOrder");
    }
  }, [orderDetails]);

  useEffect(() => {
    // const formattedDataTime = new Date().toLocaleDateString("en-US", options);
    const formattedDataTime = new Date();
    // console.log(formattedDataTime);
    setCurrentDateTime(formattedDataTime);
    getArea();
  }, []);

  
  const addQuantity = (orderedItem) => {
    // console.log("add button is clicked");

    const checkIfItemAlreadyExist = orderDetails.find(
      (product) => product._id == orderedItem._id
    );
    //if product does not exist in the order details, increase the quantity of that product by 1
    if (checkIfItemAlreadyExist) {
      checkIfItemAlreadyExist.quantity += 1;
      setOrderDetails([...orderDetails]);
    } else {
      //if product does not exist in the order details
      setOrderDetails([...orderDetails, { ...orderedItem, quantity: 1 }]);
    }
  };

  const reduceQuantity = (orderedItem) => {
    // console.log("reduce button is clicked");

    const checkIfItemAlreadyExist = orderDetails.find(
      (menuItem) => menuItem._id == orderedItem._id
    );

    //if product exist in the order details, reduce the quantity of that product by 1
    if (checkIfItemAlreadyExist) {
      // console.log("if reduce Quantity");
      if (checkIfItemAlreadyExist.quantity > 0) {
        checkIfItemAlreadyExist.quantity -= 1;
        // setOrderDetails([...orderDetails]);
        setOrderDetails((orderDetails) =>
          orderDetails.filter((item) => item.quantity > 0)
        );
      }
    }
  };

  
  const getProductQuantity = (productId) => {
    const result = orderDetails.find((product) => product._id === productId);
    return result ? result.quantity : 0;
  };


  const addToOrder = async () => {
    // console.log("add order when method is clicked");

    var order = {
      name: name,
      note: notes,
      dateTime: currentDateTime,
      status: "Pending",
      table: table,
      area: area,
      productIds: orderDetails.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        name: item.name,
        note: item.note,
      })),
    };

    var url = `${Url.url}/orders`;
    var header = new Headers({});
    header.append("Content-Type", "application/json");
    var options = {
      method: "POST",
      headers: header,
      body: JSON.stringify(order),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log(data);
      // console.log("order added successfully");
     navigation.navigate("TakeOrder",{clear:true});
    } catch (error) {}
  };

  const getArea = async () => {
    var url = `${Url.url}/Areas`;
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
      setAreaData(data);
      setArea(data[0].areaName);
      setTableData(data[0].tables);
      setTable(data[0].tables[0]);
      // console.log(data);
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };
  const toggleSelectedNote = (item)=>{
    if(selectNote!==item._id){
      setSelectNote(item._id)

    }else setSelectNote(null);
  }

 const addNote = (note,item)=>{

  const findItem = orderDetails.find((order)=>order._id === item._id);

  if(findItem){
    findItem.note = note;
    setOrderDetails([...orderDetails])

 }

}
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Header></Header>
        <View style={styles.pageTitleContainer}>
          <Text style={styles.titleText}>Order List</Text>
          <TouchableOpacity
            style={styles.goldContainer}
            onPress={() => navigation.goBack()}
            // onPress={() => navigation.navigate("TakeOrder", { orderDetails })}
          >
            <Text style={styles.darkText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.contentContainer}>
            <Text style={styles.darkTextLarge}>Items in Cart</Text>
            <View style={styles.height10}></View>
            {orderDetails.map((item) => (
            <View key={item._id}>
              <View  style={styles.cartContainerList}>
                <View
                  style={[styles.orderListLeftColumn, { flexDirection: "row" }]}
                >
                  <Text style={styles.whiteText}>{item.name}</Text>
                  <TouchableOpacity onPress={()=>{toggleSelectedNote(item)}}>
                    <Entypo
                      name="edit"
                      size={23}
                      color={Colours.BeanLightBlue}
                    ></Entypo>
                  </TouchableOpacity>
                </View>
                <View style={styles.orderListRightColumn}>
                  <View style={styles.rowHorizotal}>
                    <TouchableOpacity
                      style={styles.minusContainer}
                      onPress={() => {
                        reduceQuantity(item);
                        // console.log(orderDetails);
                      }}
                    >
                      <Entypo
                        name="minus"
                        size={23}
                        color={Colours.White}
                      ></Entypo>
                    </TouchableOpacity>
                    <Text style={styles.itemQuantity}>
                      {getProductQuantity(item._id)}
                    </Text>
                    <TouchableOpacity
                      style={styles.minusContainer}
                      onPress={() => addQuantity(item)}
                    >
                      <MaterialIcons
                        name="add"
                        size={25}
                        color={Colours.White}
                      ></MaterialIcons>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {selectNote===item._id&&<TextInput placeholder={`note for ${item.name} (optional)`} style={styles.textInput} value={item.note??""} onChangeText={(note)=>addNote(note,item)} ></TextInput>}
              </View>
            ))}
            <View>
              <Text>Note: continue shopping will reset below info</Text>
            </View>
            <TextInput
              multiline
              placeholder="notes for the entire order (optional)"
              numberOfLines={4}
              value={notes}
              style={styles.textInputMultiLine}
              onChangeText={(notes) => setNotes(notes)}
            ></TextInput>
            <TextInput
            value={name}
              placeholder="name (optional)"
              style={styles.textInput}
              onChangeText={(name) => setName(name)}
            ></TextInput>

            <Picker
              style={[
                styles.textInput,
                {
                  height: Platform.OS === "ios" ? 180 : 40,
                  justifyContent: "center",
                },
              ]}
              onValueChange={(name) => {
                const findArea = areaData.find(
                  (area) => area.areaName === name
                );

                if (findArea) {
                  setArea(findArea.areaName);
                  setTableData(findArea.tables);
                }
              }}
            >
              {/* <Picker.Item label="Select a category" value=""/> */}
              {areaData?.map((item, key) => (
                <Picker.Item
                  label={item.areaName}
                  value={item.areaName}
                  key={key}
                ></Picker.Item>
              ))}
            </Picker>

            <Picker
              style={[
                styles.textInput,
                {
                  height: Platform.OS === "ios" ? 180 : 40,
                  justifyContent: "center",
                },
              ]}
              value={table}
              onValueChange={(name) => {
                const findTable = tableData.find((table) => table === name);

                if (findTable) {
                  setTable(findTable);
                }
              }}
            >
              {/* <Picker.Item label="Select a category" value=""/> */}
              {tableData?.map((item, key) => (
                <Picker.Item label={item} value={item} key={key}></Picker.Item>
              ))}
            </Picker>

            <View>
              <Pressable style={styles.loginButton} onPress={addToOrder}>
                <Text style={styles.loginButtonText}>Place Order</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
