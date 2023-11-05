import { createStackNavigator } from '@react-navigation/stack';

import Styles from "../styles/MainStyle.js";
import Search from '../screens/Search.js';

import EditMenu from '../screens/Menu/EditMenu.js';
import MenuList from '../screens/Menu/MenuList.js';
import MenuNavigator from './MenuNavigator.js';
import CentralNavigator from './CentralNavigator.js';



const Stack = createStackNavigator();


export default function SearchNavigator(){
    return (
<Stack.Navigator>
    <Stack.Screen name="SearchPage" component={Search} options={{ headerShown: false } }/> 
   
    {/* <Stack.Screen name="EditMenu" component={EditMenu}options={{ headerShown: false }}/> */}
    <Stack.Screen name="Central" component={CentralNavigator}options={{ headerShown: false }}/>
   
    
</Stack.Navigator>
    )
}