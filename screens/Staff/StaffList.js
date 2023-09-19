import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import styles from '../../styles/MainStyle';


export default function StaffList() {
  return (
    <View style={styles.container}>
      <Text>staffList</Text>
      <StatusBar style="auto" />
    </View>
  );
}