import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import styles from '../../styles/MainStyle';


export default function EditMenu() {
  return (
    <View style={styles.container}>
      <Text>EditStaff</Text>
      <StatusBar style="auto" />
    </View>
  );
}