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
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Modal } from "react-native";

import Header from "../../layout/Header"

import styles from "../../styles/MainStyle"

import { Ionicons, AntDesign } from "@expo/vector-icons"

import Colours from "../../constants/Colours";

import { useIsFocused } from "@react-navigation/native";
import CategoryBar from "../../layout/CategoryBar";

export default function MenuList({ props, navigation }) {
    const [menuData, setMenuData] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [selectedItem, setSelectedItem]=useState(null)
    const [categorySelected, setCategorySelected] = useState("");


    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getMenu()
        }
    }, [props, isFocused])

    const getMenu = async () => {


        // var url = 'https://192.168.0.129:7044/MenuItems';
        var url = 'https://localhost:7044/MenuItems';
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

console.log(ItemsByCategory);





    const showDeleteModal = (item) => {
        console.log(item);
        setSelectedItem(item);
        setModalVisibility(true);
    }

    const hideDeleteModal=()=>{
        setModalVisibility(false)
        setSelectedItem(null);
    }

    const deleteConfirmed = async()=>{
        console.log("delete button is clicked")

        // var url = `https://192.168.0.129:7044/MenuItems/${selectedItem._id}`;
        var url = `https://localhost:7044/MenuItems/${selectedItem._id}`;
        var header = new Headers({});
        header.append("Content-Type","application/json")
        
        var options = {
            method: "Delete",
            headers: header,
            // body:JSON.stringify(product)
        }
        try{
const response= await fetch(url,options);
console.log(response);
if(response.ok){
    hideDeleteModal();
    getMenu();
}

        }catch(error){
            console.log("Error:" + error.message);
        }
    }



    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.container}>
                    <Header/>
                    <CategoryBar navigation={navigation} categorySelected={categorySelected} setCategorySelected={setCategorySelected} managerView={true} />
                    <View style={styles.pageTitleContainer}>
                        <Text style={styles.titleText}>Menu List</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("AddMenu")}>
                            <Ionicons name={"ios-add-circle"} size={30} color={Colours.BeanLightBlue} />
                        </TouchableOpacity>
                    </View>


                    
                    <FlatList data={categorySelected?ItemsByCategory:menuData} renderItem={({ item,index }) => (

                        <View style={(index%2===0)?styles.itemListContainer:styles.itemListContainerGrey}>
                            <Text style={styles.fontBold} numberOfLines={1}>{item.name}</Text>
                            <View style={styles.rowHorizotal} >
                                <TouchableOpacity onPress={() => navigation.navigate("EditMenu", { item })}>
                                    <AntDesign name="edit" size={18} color={Colours.BeanLightBlue}></AntDesign>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => showDeleteModal(item)}>
                                    <AntDesign name="delete" size={18} color={Colours.BeanLightBlue}></AntDesign>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}>

                    </FlatList>

                    <Modal visible ={modalVisibility} transparent>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Are you sure you want to delete this {selectedItem?.name}?</Text>
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity style={styles.modalButton} onPress={hideDeleteModal}>
                                        <Text style={styles.darkText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.modalButton, styles.deleteModalButton]} onPress={deleteConfirmed}>
                                        <Text style={styles.darkText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}