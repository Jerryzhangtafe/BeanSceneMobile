import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import styles from '../../styles/MainStyle';


export default function MenuListStaff() {
  return (
    <View style={styles.container}>
      <Text>MenuListStaff</Text>
      <StatusBar style="auto" />
    </View>
  );
}