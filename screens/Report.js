import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import styles from '../styles/MainStyle';


export default function Report() {
  return (
    <View style={styles.container}>
      <Text>Report</Text>
      <StatusBar style="auto" />
    </View>
  );
}