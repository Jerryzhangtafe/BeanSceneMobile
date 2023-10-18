import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";

import Header from "../layout/Header";
import styles from "../styles/MainStyle";
import { TextInput } from "react-native-gesture-handler";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Url from "../constants/Url";
import Colours from "../constants/Colours";

export default function Checkout({ route, navigation}) {
  const [orderDetails, setOrderDetails] = useState(
    route.params.orderDetails || []
  );
  console.log(orderDetails);

  const [currentDateTime, setCurrentDateTime] = useState();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  // useEffect(() =>{ orderDetails.length === 0&&navigation.navigate("TakeOrder")},[orderDetails])
  useEffect(() =>{ if(orderDetails.length === 0){console.log(orderDetails);
  
    navigation.goBack()}},[orderDetails])

  useEffect(() => {
    const formattedDataTime = new Date().toLocaleDateString("en-US", options);
    console.log(formattedDataTime);
    setCurrentDateTime(formattedDataTime);
  }, []);

  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");

  const addQuantity = (orderedItem) => {
    console.log("add button is clicked");

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
    console.log("reduce button is clicked");

    const checkIfItemAlreadyExist = orderDetails.find(
      (menuItem) => menuItem._id == orderedItem._id
    );
    
    //if product exist in the order details, reduce the quantity of that product by 1
    if (checkIfItemAlreadyExist) {
      console.log("if reduce Quantity");
      if (checkIfItemAlreadyExist.quantity > 0) {
        checkIfItemAlreadyExist.quantity -= 1;
        // setOrderDetails([...orderDetails]);
        setOrderDetails((orderDetails)=>orderDetails.filter(item=>item.quantity > 0));
        
      }
    }
  };

  const getProductQuantity = (productId) => {
    const result = orderDetails.find((product) => product._id === productId);
    return result ? result.quantity : 0;
  };

  const addToOrder = async () => {
    console.log("add order when method is clicked");

    var order = {
      name: name,
      note: notes,
      dateTime: currentDateTime,
      status: "In Progress",
      productIds: orderDetails.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
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
      const response = fetch(url, options);
      const data = await response.json();
      console.log(data);
      console.log("order added successfully");
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>     
        <View style={styles.container}>
          <Header></Header>
          <View style={styles.pageTitleContainer}>
            <Text style={styles.titleText}>Order List</Text>
            <TouchableOpacity
              style={styles.goldContainer}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.darkText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
          <ScrollView >
          <View style={styles.contentContainer}>
            <Text style={styles.darkTextLarge}>Items in Cart</Text>
            <View style={styles.height10}></View>
            {orderDetails.map((item) => (
            <View key={item._id} style={styles.cartContainerList}>
                <View style={styles.orderListLeftColumn}>
                <Text style={styles.whiteText}>{item.name}</Text>
                </View>
                <View style={styles.orderListRightColumn}>
                  <View style={styles.rowHorizotal}>
                    <TouchableOpacity
                      style={styles.minusContainer}
                      onPress={() => {reduceQuantity(item);console.log(orderDetails)}}
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
            ))}
            <TextInput
              multiline
              placeholder="Enter notes"
              numberOfLines={4}
              style={styles.textInputMultiLine}
              onChangeText={(notes) => setNotes(notes)}
            ></TextInput>
            <TextInput
              placeholder="Enter name here (optional)"
              style={styles.textInput}
              onChangeText={(name) => setName(name)}
            ></TextInput>
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
