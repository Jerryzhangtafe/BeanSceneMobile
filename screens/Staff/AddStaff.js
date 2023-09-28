// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';

// import styles from '../../styles/MainStyle';


// export default function AddMenu() {
//   return (
//     <View style={styles.container}>
//       <Text>AddStaff</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Picker } from "react-native";

import Header from "../../layout/Header";
import styles from "../../styles/MainStyle";
import Colours from "../../constants/Colours";
// import { useIsFocused } from "@react-navigation/native";

export default function AddStaff({ props, navigation }) {

    // const [roleData, setRoleData] = useState([]);
const [username,setUsername]=useState("");
const [email,setEmail]=useState("");
const [firstname,setFirstname]=useState("");
const [lastname,setLastname]=useState("");
const [password,setPassword]=useState("");
const [role, setRole] = useState("staff");
const [message,setMessages]=useState("");
const [phone,setPhone]=useState("");

const roleData = ["staff","manager"];

    // const isFocused = useIsFocused();

    //I added [] dependancy
    // useEffect(() => {
    //     if (isFocused) {
    //         getRoles()
    //     }
    // }, [props, isFocused])


    // const getRoles = async () => {
    //     console.log("getRoles method is called")

    //     var url = 'http://localhost:5172/roles';
    //     var header = new Headers({});
    //     var options = {
    //         method: "GET",
    //         headers: header
    //     }
    //     try {
    //         const response = await fetch(url, options);
    //         console.log(response);
    //         //I added await 
    //         const data = await response.json();
    //         console.log(data);
    //         setRoleData(data)
    //         console.log(data[0]);
    //         setRole(data[0].name);
    //     }
    //     catch (error) {
    //         console.log("Error:" + error.message);
    //     }
    // }

    const addStaff = async () => {
        console.log("add role when method is clicked");

var staff ={
    username:username,
    email:email,
    firstName:firstname,
    lastName:lastname,
    password:password,
    role:role,
    phone:phone,
}

        var url = 'https://localhost:7044/staff';
        var header = new Headers({});
        header.append("Content-Type","application/json")
        var options = {
            method: "POST",
            headers: header,
            body:JSON.stringify(staff)
        }
        try{
            const values = Object.values(staff);
     const check = values.every(value=>value!==""); 
      if (!check) {
           setMessages("Please make sure that every field is entered");
           return;
      }
const response= await fetch(url,options);
console.log(response);
if(response.ok){
setMessages("Staff Added Successfully");}else{

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
                            <Text style={styles.titleText}>Add Staff</Text>
                            <TouchableOpacity style={styles.goldContainer} onPress={() => navigation.navigate("StaffList")}>
                                <Text style={styles.darkText}>Staff List</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actualFormContainerWithSpacing}>
                            <TextInput placeholder="Email" style={styles.textInput} onChangeText={(email)=>setEmail(email)}></TextInput>
                            <TextInput placeholder="firstname" style={styles.textInput} onChangeText={(firstname)=>setFirstname(firstname)}></TextInput>
                            <TextInput placeholder="lastname" style={styles.textInput} onChangeText={(lastname)=>setLastname(lastname)}></TextInput>
                            <TextInput placeholder="password" style={styles.textInput} onChangeText={(password)=>setPassword(password)}></TextInput>
                            <TextInput placeholder="username" style={styles.textInput} onChangeText={(username)=>setUsername(username)}></TextInput>
                            <TextInput placeholder="phone" style={styles.textInput} onChangeText={(phone)=>setPhone(phone)}></TextInput>
                            {/* <Picker style={styles.textInput}>
                                <Picker.Item label="Samsung" value="Samsung"></Picker.Item>
                                <Picker.Item label="iPhone" value="iPhone"></Picker.Item>
                                <Picker.Item label="oppo" value="oppo"></Picker.Item>
                            </Picker> */}
                            <Picker style={styles.textInput} onValueChange={(role)=>setRole(role)}>
                                {/* <Picker.Item label="Select a category" value=""/> */}
                                {roleData?.map((item, key) => (
                                    <Picker.Item label={item} value={item} key={key}></Picker.Item>
                                ))}
                            </Picker>
                            <TouchableOpacity style={styles.loginButton} onPress={addStaff}>
                                <Text style={styles.orangeButtonText}>Add Staff</Text>
                            </TouchableOpacity>
                            <View style={styles.alignCenter}>
                            <Text style={[styles.blueMessage,{color:(message.includes("Please")?"red":Colours.BeanLightBlue)}]}>{message}</Text>
                        </View>
                        </View>
                       
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    
}