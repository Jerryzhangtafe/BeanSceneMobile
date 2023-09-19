import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import styles from '../../styles/MainStyle';


export default function CheckOut() {
  return (
    <View style={styles.container}>
      <Text>CheckOut</Text>
      <StatusBar style="auto" />
    </View>
  );
}