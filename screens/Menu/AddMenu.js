import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import styles from '../../styles/MainStyle';


export default function AddMenu() {
  return (
    <View style={styles.container}>
      <Text>AddMenu</Text>
      <StatusBar style="auto" />
    </View>
  );
}