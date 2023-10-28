import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity,Image } from "react-native";

import styles from "../styles/MainStyle";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";


export default function Header({}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    loadDetails();
  });

  const logout = () => {
    navigation.navigate("Login");
  };

  const loadDetails = async () => {
    const details = await AsyncStorage.getItem("loginDetails");
    // console.log(details);
    var jsonDetails = JSON.parse(details);
    setName(jsonDetails.firstName + " " + jsonDetails.lastName);
    setRole(jsonDetails.role);
  };

  return (
    <View style={styles.headerContainer}>
      <Image source={require("../assets/images/logo/png/logo-primary-transparent.png")} style={styles.logoSmall}/>
      <Text style={styles.darkText}>Welcome: {name},</Text>
      <Text style={styles.darkText}>Role: {role},</Text>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.darkText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
