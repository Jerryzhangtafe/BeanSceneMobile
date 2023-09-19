import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import styles from '../styles/MainStyle';


export default function Search() {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
      <StatusBar style="auto" />
    </View>
  );
}