import { StatusBar } from 'expo-status-bar';
import { Text, View,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ScreenOrientation from "expo-screen-orientation"
import React from 'react';
import {useState,useEffect} from "react";
import RootNavigator from './Navigation/RootNavigator';
import * as Font from "expo-font";


import styles from './styles/MainStyle';



export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        "OpenSans-Light": require('./assets/font/OpenSans-Light.ttf'),
        "OpenSans-Regular": require('./assets/font/OpenSans-Regular.ttf'),
        "OpenSans-Bold": require('./assets/font/OpenSans-Bold.ttf'),
        "OpenSans-Italic": require('./assets/font/OpenSans-Italic.ttf'),
        "Tangerine-Bold": require('./assets/font/Tangerine-Bold.ttf'),
        "Tangerine-Regular": require('./assets/font/Tangerine-Regular.ttf'),
        
      });
      setFontLoaded(true);
    } catch (error) {
      console.log("Error loading fonts", error);
    }
  };



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
    loadFonts();
  }, []);
  if (!fontLoaded) {
    return <View />;
  }
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

