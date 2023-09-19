import { createStackNavigator } from '@react-navigation/stack';


// Import navigation and screens


import RoleNavigator from './RoleNavigator';
import ScreenOptionStyle from './ScreenOptionStyle';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={ScreenOptionStyle}>
      <Stack.Screen name="Root" component={RoleNavigator} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}