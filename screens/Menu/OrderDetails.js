import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import Colours from "../../constants/Colours";

import Header from "../../layout/Header";

import styles from "../../styles/MainStyle";

export default function OrderDetails({ navigation, route, props }) {
  const details = route.params.item;
  const items = details.productIds;
  // const dietary = object.keys(details.dietary)
  // const dietaryCheck= object.values(details.dietary)

  const renderDetails = (items) => {
    return items.map((item, i) => {
      return (
        <View style={[styles.marginBottom10, { borderBottomWidth: 2 }]} key={i}>
          <View style={[styles.modalButtons, { gap: 10 }]}>
            <Text>Name: {item["name"]}</Text>
            <Text>Quantity: {item["quantity"]}</Text>
          </View>
          <Text>Note: {item["note"]}</Text>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Header></Header>
        <View style={styles.pageTitleContainer}>
          <Text style={styles.titleText}>Order Details</Text>
          <TouchableOpacity
            style={styles.goldContainer}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.darkText}>Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={[styles.padding20]}>
            <View style={[styles.modalButtons, { gap: 10 }]}>
              <View style={styles.modalButtons}>
                <Text style={styles.marginBottom10}>Order No.: </Text>
                <Text>{details.orderNo}</Text>
              </View>
              <View style={styles.modalButtons}>
                <Text style={styles.marginBottom10}>Status: </Text>
                <Text>{details.status}</Text>
              </View>
            </View>
            <View style={styles.modalButtons}>
              <Text style={styles.marginBottom10}>Time: </Text>
              <Text>
                {new Date(details.dateTime).toLocaleString("en-AU", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
           
              <Text style={styles.marginBottom10}>
                Note for the entire order:{" "}
              </Text>
              <Text style={[styles.marginBottom10,{fontWeight:"normal"}]}>{details.note}</Text>
            
            <View style={[styles.modalButtons, { gap: 10 }]}>
              <View style={styles.modalButtons}>
                <Text style={styles.marginBottom10}>Area: </Text>
                <Text>{details.area}</Text>
              </View>
              <View style={styles.modalButtons}>
                <Text style={styles.marginBottom10}>Table: </Text>
                <Text>{details.table}</Text>
              </View>
            </View>
            <Text style={styles.marginBottom10}>List of items:</Text>
            {renderDetails(items)}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
