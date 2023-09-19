import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import Styles from '../../styles/MainStyle';


export default function EditMenu() {
  return (
    <View style={Styles.container}>
      <Text>EditMenu</Text>
      <StatusBar style="auto" />
    </View>
  );
}