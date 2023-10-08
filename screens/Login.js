import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from 'react';
import styles from '../styles/MainStyle';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BeanSceneGetIdentity } from '../utils/Api';
import Url from '../constants/Url';

    // "orientation": "portrait",

export default function Login({navigation}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    console.log(username);
    console.log(password);

    const submit = async () => {


        //navigation.navigate("ProductList");
        console.log("login button is clicked");




        if (username.length == 0) {
            console.log("username is empty")
            setError("please enter username")
        }
        else if (password.length == 0) {
            console.log("password is empty")
            setError("please enter password")
        }
        else {
            
            var url = `${Url.url}/Staff/${username}/${password}`;
           
            var header = new Headers({});
            header.append("Content-Type", "application/json")
            var options = {
                method: "Get",
                headers: header,
                // body:JSON.stringify(product)
            }
            try {
                
                const response = await fetch(url, options);
                // console.log(response);
                
                if (response.ok) {
                    
                    const data = await response.json();
                    console.log(data)

                    setUsername("");
                    setPassword("");

                    await AsyncStorage.setItem("loginDetails", JSON.stringify(data));

                    if (data.role == "manager") {
                        console.log("manager is logged in")
                        navigation.navigate("BottomTabNavigatorManager")
                    } else if (data.role == "staff") {
                        console.log("staff is logged in")
                        navigation.navigate("BottomTabNavigatorStaff")
                    }
                    // navigation.navigate("MenuList");
                }else {throw new Error("username and password does not exist")}
            } catch (error) {
                console.log("username and password does not exist");
                setError(error.message);
            }
        }

    }

  return (
    // <View style={styles.container}>
    //   <Text>Login</Text>
    //   <StatusBar style="auto" />
    // </View>
    <SafeAreaView style={styles.safeAreaView}>
    <ScrollView  contentContainerStyle={styles.container}>
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require("../assets/images/logo/png/logo-primary-transparent.png")} style={styles.logo}></Image>
                <Text style={styles.logoTitle}>Order System</Text>
                {/* <Text style={styles.logoSubTitle}>Order System</Text> */}
            </View>
            <View style={styles.formContainer}>
                <TextInput placeholder="username" style={styles.textInput} onChangeText={(username) => setUsername(username)} value={username}></TextInput>
                <TextInput placeholder="Password" style={styles.textInput} secureTextEntry={true} onChangeText={(password) => setPassword(password)} value={password}></TextInput>
                <TouchableOpacity style={styles.loginButton} onPress={submit}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </View>

        </View>
    </ScrollView>
</SafeAreaView>
  );
}