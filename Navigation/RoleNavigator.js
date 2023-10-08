import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigatorManager from './BottomTabNavigatorManager';

import BottomTabNavigatorStaff from './BottomTabNavigatorStaff';

import Login from '../screens/Login';
import ScreenOptionStyle from './ScreenOptionStyle';


const Stack = createStackNavigator();

export default function RoleNavigator() {
  return (
    <Stack.Navigator screenOptions={ScreenOptionStyle}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
      <Stack.Screen name="BottomTabNavigatorManager" component={BottomTabNavigatorManager} options={{ headerShown: false }}/>
      <Stack.Screen name="BottomTabNavigatorStaff" component={BottomTabNavigatorStaff} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

