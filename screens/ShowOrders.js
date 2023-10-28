// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';

// import styles from '../styles/MainStyle';


// export default function ShowOrders() {
//   return (
//     <View style={styles.container}>
//       <Text>ShowOrders</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }




import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Pressable, Picker } from "react-native";
import Url from "../constants/Url";

import { Ionicons, AntDesign } from "@expo/vector-icons"
import Header from "../layout/Header";
import styles from "../styles/MainStyle"
import { useIsFocused } from "@react-navigation/native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Colours from "../constants/Colours";

export default function ShowOrders({ props, navigation }) {
    const [orders, setOrders] = useState([])

    const isFocused = useIsFocused();
    const [editableStatusOrderId, seteditableStatusOrderId] = useState(null);
    const [updatedStatusValue, setUpdatedStatusValue] = useState("");// to store the value that is selected from the picker. 
    useEffect(() => {
        if (isFocused) {
            getOrders()
            setUpdatedStatusValue("Cancelled");
        }
    }, [props, isFocused])

    const getOrders = async () => {


        console.log("getorders method is called")
        var url = `${Url.url}/orders`;
        var header = new Headers({});
        var options = {
            method: "GET",
            headers: header
        }
        try {

            const response = await fetch(url, options);
            console.log(response);
            //I added await 
            const data = await response.json();
            console.log(data);
            setOrders(data)

        }
        catch (error) {
            console.log("Error:" + error.message);

        }
    }

    const updateOrderStatus = async (orderId, status) => {
        console.log(orderId + status)
        console.log("update order status method is clicked");


        var url = `${Url.url}/orders/${orderId}/status`;
        var header = new Headers({});
        header.append("Content-Type", "application/json")
        var options = {
            method: "PUT",
            headers: header,
            body: JSON.stringify(status)
        }
        try {
            const response = await fetch(url, options);
            console.log(response);
            console.log("order status Updated Successfully");
            getOrders();
        } catch (error) {

        }
    }
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.container}>
                    <Header></Header>
                    <View style={styles.pageTitleContainer}>
                        <Text style={styles.titleText}>Order List</Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={[styles.labelItem,styles.flex1]}>Order No</Text>
                        <Text style={[styles.labelItem,styles.flex1]}>Date</Text>
                        <Text style={[styles.labelItem,styles.flex1]}>status</Text>
                    </View>


                    {orders.map((item) => {
                        const isEditable = editableStatusOrderId === item._id

                        return (
                            <View key={item.orderNo} style={styles.labelContainer}>
                                <Text style={[styles.labelItemSmall,styles.flex1]}>{item.orderNo}</Text>
                                <Text style={[styles.labelItemSmall, styles.width30, styles.flex1]}>{new Date(item.dateTime).toLocaleDateString("en-AU")}</Text>
                                {
                                    isEditable ? (
                                        <View style={[styles.dropDownContainer,{marginLeft:10}]}>
                                            <Picker selectedValue={updatedStatusValue} onValueChange={(itemValue) => setUpdatedStatusValue(itemValue)}>
                                                <Picker.Item label="Cancelled" value="Cancelled"></Picker.Item>
                                                <Picker.Item label="Pending" value="Pending"></Picker.Item>
                                                <Picker.Item label="In Progress" value="In Progress"></Picker.Item>
                                                <Picker.Item label="Completed" value="Completed"></Picker.Item>
                                            </Picker>
                                            <View style={styles.rowHorizotal}>
                                                <TouchableOpacity onPress={() => { updateOrderStatus(item._id, updatedStatusValue); seteditableStatusOrderId(null) }}>
                                                    <AntDesign name="save" size={24} color={Colours.BeanLightBlue}></AntDesign>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => seteditableStatusOrderId(null)}>
                                                    <AntDesign name="close" size={24} color={Colours.BeanLightBlue}></AntDesign>
                                                </TouchableOpacity>

                                            </View>

                                        </View>)
                                        : (<TouchableOpacity onPress={() => { seteditableStatusOrderId(item._id); setUpdatedStatusValue(item.status) }} style={[
                                            item.status == "Cancelled" ?
                                                {
                                                    backgroundColor: "#b91c1c",
                                                    padding: 8, alignItems: "center", width: widthPercentageToDP("30%"), height: 40
                                                } : item.status == "Pending" || item.status == "In Progress" ? {
                                                    backgroundColor: "yellow",
                                                    padding: 8,
                                                    alignItems: "center",
                                                    width: widthPercentageToDP("30%"), height: 40

                                                } :
                                                    item.status == "Completed" ? {
                                                        backgroundColor: "green",
                                                        padding: 8,
                                                        alignItems: "center",
                                                        width: widthPercentageToDP("30%"), height: 40
                                                    } : {}

                                        ,styles.flex1]}>
                                            <Text style={styles.labelItemSmall}>{item.status}</Text>
                                        </TouchableOpacity>)


                                }



                            </View>
                        )
                    })}
                </View>

            </ScrollView>
        </SafeAreaView>


    )
}