import { createStackNavigator } from "@react-navigation/stack";



import Styles from "../styles/MainStyle.js";


import EditMenu from "../screens/Menu/EditMenu.js";

import ScreenOptionStyle from "./ScreenOptionStyle.js";
import ItemDetails from "../screens/Menu/ItemDetails.js";

const Stack = createStackNavigator();


export default function CentralNavigator(){
    return (
<Stack.Navigator screenOptions={ScreenOptionStyle}>
    <Stack.Screen name="EditMenu" component={EditMenu} options={{ headerShown: false }}/>
    <Stack.Screen name="ItemDetails" component={ItemDetails}options={{ headerShown: false }}/> 
</Stack.Navigator>
    )
}