import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import styles from '../styles/MainStyle';


export default function Orders() {
  return (
    <View style={styles.container}>
      <Text>Orders</Text>
      <StatusBar style="auto" />
    </View>
  );
}