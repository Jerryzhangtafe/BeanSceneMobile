import { createStackNavigator } from '@react-navigation/stack';

import Styles from "../styles/MainStyle.js";
import Search from '../screens/Search.js';
import ItemDetails from '../screens/TakeOrder/ItemDetails.js';
import EditMenu from '../screens/Menu/EditMenu.js';


const Stack = createStackNavigator();


export default function SearchNavigator(){
    return (
<Stack.Navigator>
    <Stack.Screen name="SearchPage" component={Search} options={{ headerShown: false }}/> 
    <Stack.Screen name="ItemDetails" component={ItemDetails}options={{ headerShown: false }}/> 
    <Stack.Screen name="EditMenu" component={EditMenu} options={{ headerShown: false }}/> 
</Stack.Navigator>
    )
}