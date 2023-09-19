import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import Styles from '../../styles/MainStyle';


export default function EditCategory({}) {
  return (
    <View style={Styles.container}>
      <Text>EditCategory</Text>
      <StatusBar style="auto" />
    </View>
  );
}