import { StatusBar } from 'expo-status-bar';
import { Text, View,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ScreenOrientation from "expo-screen-orientation"
import {useState,useEffect} from "react";
import RootNavigator from './Navigation/RootNavigator';


import styles from './styles/MainStyle';
import react from 'react';


export default function App() {

  useEffect(() => {
    async function setOrientationAsync() {
      // // Lock the orientation to PORTRAIT on startup
      // await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

      // // After a short delay, unlock to default to allow both PORTRAIT and LANDSCAPE
      // setTimeout(async () => {
      //   await ScreenOrientation.unlockAsync();
      // }, 1000);  // 1 second delay, can adjust as per needs

      await ScreenOrientation.unlockAsync();
      
    }

    setOrientationAsync();
  }, []);


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

