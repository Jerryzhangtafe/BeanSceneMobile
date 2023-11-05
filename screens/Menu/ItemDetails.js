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

export default function ItemDetails({ navigation, route, props }) {
  const details = route.params.menuItem;
  const dietary = details.dietaryFlags;
  // const dietary = object.keys(details.dietary)
  // const dietaryCheck= object.values(details.dietary)

  const renderDetails = (details) => {
    return Object.entries(details).map(([key, value]) => {
      return (
        <View style={styles.modalButtons} key={key}>
          <Text style={styles.marginBottom10}>{key}: </Text>
          <Text>{value ? "Yes" : "No"}</Text>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Header></Header>
        <View style={styles.pageTitleContainer}>
          <Text style={styles.titleText}>Item Details</Text>
          <TouchableOpacity
            style={styles.goldContainer}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.darkText}>Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={[styles.padding20]}>
            <View style={styles.modalButtons}>
              <Text style={styles.marginBottom10}>Name: </Text>
              <Text>{details.name}</Text>
            </View>

            <Text style={styles.marginBottom10}>Description: </Text>
            <Text style={[styles.marginBottom10, { fontWeight: "normal" }]}>
              {details.description}
            </Text>
            <View style={[styles.modalButtons, { gap: 10 }]}>
              <View style={styles.modalButtons}>
                <Text style={styles.marginBottom10}>Price: </Text>
                <Text>{details.price}</Text>
              </View>
              <View style={styles.modalButtons}>
                <Text style={styles.marginBottom10}>Availability: </Text>
                <Text>{details.availability ? "Yes" : "No"}</Text>
              </View>
            </View>
            <View style={[styles.modalButtons, { gap: 10 }]}>
              <View style={styles.modalButtons}>
                <Text style={styles.marginBottom10}>Special: </Text>
                <Text>{details.special ? "Yes" : "No"}</Text>
              </View>
              <View style={styles.modalButtons}>
                <Text style={styles.marginBottom10}>Category: </Text>
                <Text>{details.categoryName}</Text>
              </View>
            </View>

            <View style={styles.modalButtons}></View>
            <Text style={styles.marginBottom10}>Dietary:</Text>
            <View style={styles.dietaryContainer}>{renderDetails(dietary)}</View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
