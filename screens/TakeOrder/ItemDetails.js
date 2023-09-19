import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import styles from '../../styles/MainStyle';


export default function ItemDetails() {
  return (
    <View style={styles.container}>
      <Text>ItemDetails</Text>
      <StatusBar style="auto" />
    </View>
  );
}