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
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from "react-native";

import Header from "../layout/Header"
import styles from "../styles/MainStyle"
import Url from "../constants/Url";


import { useIsFocused } from "@react-navigation/native";
import RenderMenuItems from "../layout/RenderMenuItems";
import CategoryBar from "../layout/CategoryBar";



export default function Orders({ props, navigation }) {
  const [categorySelected, setCategorySelected] = useState("");

    const [menuData, setMenuData] = useState([]);
    const [orderDetails,setOrderDetails] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getMenu()
        }
    }, [props, isFocused])

    const getMenu = async () => {


        var url = `${Url.url}/MenuItems`;
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
            setMenuData(data)

        }
        catch (error) {
            console.log("Error:" + error.message);

        }

    }


    const ItemsByCategory = menuData.filter((item)=>item.categoryId===categorySelected);


    return (
        <SafeAreaView style={styles.safeAreaView}>
            
                <View style={styles.container}>
                    <Header></Header>
                    <CategoryBar navigation={navigation} categorySelected={categorySelected} setCategorySelected={setCategorySelected} managerView={false}/>
                    <View style={styles.pageTitleContainer}>
                        <Text style={styles.titleText}>Menu List</Text>
                        <TouchableOpacity style={styles.goldContainer}>
                            <Text style={styles.darkText}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <ScrollView contentContainerStyle={styles.container}> */}
                    <ScrollView >
                    <View>
                        {
                            (categorySelected?ItemsByCategory:menuData).map((menuItem,index) => {
                                return (
                                    <View key={menuItem._id}>
                                        <RenderMenuItems menuItem={menuItem} orderDetails={orderDetails} setOrderDetails={setOrderDetails} index={index}></RenderMenuItems>
                                    </View>
                                )
                            })
                        }
                    </View>
                    </ScrollView>



                </View>
            
        </SafeAreaView>
    )
}