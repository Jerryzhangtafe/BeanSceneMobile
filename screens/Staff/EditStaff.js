// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';

// import styles from '../../styles/MainStyle';

// export default function EditMenu() {
//   return (
//     <View style={styles.container}>
//       <Text>EditStaff</Text>
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
  TextInput,
  Platform
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import Header from "../../layout/Header";
import styles from "../../styles/MainStyle";
import { useIsFocused } from "@react-navigation/native";
import Colours from "../../constants/Colours";
import Url from "../../constants/Url";
Colours;

export default function EditStaff({ route, navigation }) {
  console.log(route.params);
  console.log(route.params.item);
  const staff = route.params.item;

  // const [roleData, setRoleData] = useState([]);
  const [username, setUsername] = useState(staff.username);
  const [email, setEmail] = useState(staff.email);
  const [firstname, setFirstname] = useState(staff.firstName);
  const [lastname, setLastname] = useState(staff.lastName);
  const [password, setPassword] = useState(staff.password);
  const [role, setRole] = useState(staff.role);
  const [message, setMessages] = useState("");
  const [phone, setPhone] = useState(staff.phone);
  const id = staff._id;

  const roleData = ["staff", "manager"];

  const isFocused = useIsFocused();

  //I added [] dependancy
  // useEffect(() => {
  //     if (isFocused) {
  //         getCategories()
  //     }
  // }, [props, isFocused])

  // useEffect(() => {
  //             getRoles();
  //      }, [])

  // const getRoles = async () => {
  //     console.log("getCategories method is called")

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
  //         // console.log(data[0]);
  //         // setCategory(data[0].name);
  //     }
  //     catch (error) {
  //         console.log("Error:" + error.message);
  //     }
  // }

  const editStaff = async () => {
    console.log(" edit staff when method is clicked");

    var staff = {
      _id: id,
      username: username,
      email: email,
      firstName: firstname,
      lastName: lastname,
      password: password,
      role: role,
      phone: phone,
    };

    console.log(staff);
    //         var url = 'http://localhost:5172/product';
    //         var header = new Headers({});
    //         header.append("Content-Type","application/json")
    //         var options = {
    //             method: "POST",
    //             headers: header,
    //             body:JSON.stringify(product)
    //         }
    //         try{
    // const response=fetch(url,options);
    // console.log(response);
    // setMessages("Product Added Successfully");

    //         }catch(error){

    //         }

    var url = `${Url.url}/staff`;
    var header = new Headers({});
    header.append("Content-Type", "application/json");
    var options = {
      method: "PUT",
      headers: header,
      body: JSON.stringify(staff),
    };
    try {
      const values = Object.values(staff);
      const check = values.every((value) => value !== "");
      if (!check) {
        setMessages("Please make sure that every field is entered");
        return;
      }
      const response = await fetch(url, options);
      console.log(response);
      if (response.ok) {
        setMessages("Staff Updated Successfully");
      }
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Header></Header>
          <View style={styles.pageTitleContainer}>
            <Text style={styles.titleText}>Edit List</Text>
            <TouchableOpacity
              style={styles.goldContainer}
              onPress={() => navigation.navigate("StaffList")}
            >
              <Text style={styles.orangeButtonText2}>Staff List</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actualFormContainerWithSpacing}>
            <TextInput
              placeholder="Email"
              value={email}
              style={styles.textInput}
              onChangeText={(email) => setEmail(email)}
            ></TextInput>
            <TextInput
              placeholder="firstname"
              value={firstname}
              style={styles.textInput}
              onChangeText={(firstname) => setFirstname(firstname)}
            ></TextInput>
            <TextInput
              placeholder="lastname"
              value={lastname}
              style={styles.textInput}
              onChangeText={(lastname) => setLastname(lastname)}
            ></TextInput>
            <TextInput
              placeholder="password"
              value={password}
              style={styles.textInput}
              onChangeText={(password) => setPassword(password)}
            ></TextInput>
            <TextInput
              placeholder="username"
              value={username}
              style={styles.textInput}
              onChangeText={(username) => setUsername(username)}
            ></TextInput>
            <TextInput
              placeholder="phone"
              value={phone}
              style={styles.textInput}
              onChangeText={(phone) => setPhone(phone)}
            ></TextInput>
            {/* <Picker style={styles.textInput}>
                                <Picker.Item label="Samsung" value="Samsung"></Picker.Item>
                                <Picker.Item label="iPhone" value="iPhone"></Picker.Item>
                                <Picker.Item label="oppo" value="oppo"></Picker.Item>
                            </Picker> */}
            <Picker
              style={[styles.textInput,{height:(Platform.OS==="ios"?120:40),justifyContent:"center"}]}
              onValueChange={(role) => setRole(role)}
              selectedValue={role}
            >
              {/* <Picker.Item label="Select a category" value=""/> */}
              {roleData?.map((item, key) => (
                <Picker.Item label={item} value={item} key={key}></Picker.Item>
              ))}
            </Picker>
            <TouchableOpacity style={styles.loginButton} onPress={editStaff}>
              <Text style={styles.loginButtonText}>Update Staff</Text>
            </TouchableOpacity>
            <View style={styles.alignCenter}>
              <Text
                style={[
                  styles.blueMessage,
                  {
                    color: message.includes("Please")
                      ? "red"
                      : Colours.BeanLightBlue,
                  },
                ]}
              >
                {message}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
