import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import styles from '../styles/MainStyle';


export default function ShowOrders() {
  return (
    <View style={styles.container}>
      <Text>ShowOrders</Text>
      <StatusBar style="auto" />
    </View>
  );
}