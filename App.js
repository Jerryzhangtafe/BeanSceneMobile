import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './Navigation/RootNavigator';
import styles from './styles/MainStyle';


export default function App() {
  return (
    <SafeAreaProvider>
    {/* <NavigationContainer linking={LinkingConfiguration}>*/}
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
    <StatusBar style="auto" />
  </SafeAreaProvider>
  );
}

