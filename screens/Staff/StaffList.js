// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';

// import styles from '../../styles/MainStyle';


// export default function StaffList() {
//   return (
//     <View style={styles.container}>
//       <Text>staffList</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }


import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Modal } from "react-native";

import Header from "../../layout/Header"

import styles from "../../styles/MainStyle"

import { Ionicons, AntDesign } from "@expo/vector-icons"

import { useIsFocused } from "@react-navigation/native";
import Colours from "../../constants/Colours";

export default function StaffList({ props, navigation }) {
    const [staffData, setStaffData] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [selectedStaff, setSelectedStaff]=useState(null)

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getStaff()
        }
    }, [props, isFocused])

    const getStaff = async () => {


        var url = 'https://localhost:7044/Staff';
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
            setStaffData(data)

        }
        catch (error) {
            console.log("Error:" + error.message);

        }

    }

    const showDeleteModal = (staff) => {
        console.log(staff);
        setSelectedStaff(staff);
        setModalVisibility(true);
    }

    const hideDeleteModal=()=>{
        setModalVisibility(false)
        setSelectedStaff(null);
    }

    const deleteConfirmed = async()=>{
        console.log("delete button is clicked")

        var url = `https://localhost:7044/staff/${selectedStaff._id}`;
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
    getStaff();
}

        }catch(error){
          console.log("Error:" + error.message);
        }
    }



    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.container}>
                    <Header></Header>
                    <View style={styles.pageTitleContainer}>
                        <Text style={styles.titleText}>Staff List</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("AddStaff")}>
                            <Ionicons name={"ios-add-circle"} size={35} color={Colours.BeanLightBlue} />
                        </TouchableOpacity>
                    </View>



                    <FlatList data={staffData} renderItem={({ item,index }) => (

                        <View style={(index%2===0)?styles.itemListContainer:styles.itemListContainerGrey}>
                            <Text style={styles.fontBold}>{item.firstName + " " + item.lastName}</Text>
                            <View style={styles.rowHorizotal}>
                                <TouchableOpacity onPress={() => navigation.navigate("EditStaff", { item })}>
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
                                <Text style={styles.modalText}>Are you sure you want to delete this {selectedStaff?.firstName + " " + selectedStaff?.lastName}?</Text>
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity style={styles.modalButton} onPress={hideDeleteModal}>
                                        <Text style={styles.whiteText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.modalButton, styles.deleteModalButton]} onPress={deleteConfirmed}>
                                        <Text style={styles.whiteText}>Delete</Text>
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



