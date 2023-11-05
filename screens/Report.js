// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';

// import styles from '../styles/MainStyle';

// export default function Report() {
//   return (
//     <View style={styles.container}>
//       <Text>Report</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";

import Header from "../layout/Header";

import { useIsFocused } from "@react-navigation/native";

import styles from "../styles/MainStyle";

import { BarChart } from "react-native-chart-kit";

import Url from "../constants/Url";

export default function Report({ props, navigation }) {
  const [orders, setOrders] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getOrders();
    }
  }, [props, isFocused]);

  const getOrders = async () => {
    // console.log("getorders method is called")
    var url = `${Url.url}/orders`;
    var header = new Headers({});
    var options = {
      method: "GET",
      headers: header,
    };
    try {
      const response = await fetch(url, options);
      // console.log(response);
      //I added await
      const data = await response.json();
      // console.log(data);
      setOrders(data);
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };

  const calculateOrdersStatusCount = (status) => {
    const count = orders.filter((order) => order.status === status).length;
    // console.log(count);
    return count;
  };

  const cancelledCount = calculateOrdersStatusCount("Cancelled");
  const pendingCount = calculateOrdersStatusCount("Pending");
  const completedCount = calculateOrdersStatusCount("Completed");
  const inProgresscount = calculateOrdersStatusCount("In Progress");

  const data = {
    labels: ["Cancelled", "Pending", "Completed", "In Progress"],
    datasets: [
      {
        data: [
          cancelledCount,
          pendingCount,
          completedCount,
          inProgresscount,
        ],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    decimalPlaces: 0,
    // barPercentage: 0.5,
    // useShadowColorFromDataset: false, // optional
    propsForLabels: {
      fontSize: 14,
    },
    backgroundcolor: "#fff",
    style: {
    borderRadius: 16,
    },
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerStyleTextBlack}>Order Activity</Text>
          </View>
          <View style={styles.padding20}>
            <View style={[styles.rowHorizotal, styles.height20]}>
              <Text style={styles.chartLabel}>
                Cancelled :{" "}
                <Text style={styles.orangeText}>{cancelledCount}</Text>
              </Text>
              <Text style={styles.chartLabel}>
                Pending : <Text style={styles.orangeText}>{pendingCount}</Text>
              </Text>
              <Text style={styles.chartLabel}>
                Completed :{" "}
                <Text style={styles.orangeText}>{completedCount}</Text>
              </Text>
              <Text style={styles.chartLabel}>
                In Progress :{" "}
                <Text style={styles.orangeText}>{inProgresscount}</Text>
              </Text>
            </View>

            <BarChart
              // style={graphStyle}
              data={data}
              width={Dimensions.get("window").width}
              height={350}
              chartConfig={chartConfig}
              yAxisSuffix=""
              fromZero
            />
          </View>
            
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
