import { createStackNavigator } from "@react-navigation/stack";



import Styles from "../styles/MainStyle.js";

import MenuList from "../screens/Menu/MenuList.js";
import EditMenu from "../screens/Menu/EditMenu.js";
import AddMenu from "../screens/Menu/AddMenu.js";
import ScreenOptionStyle from "./ScreenOptionStyle.js";
import EditCategory from "../screens/Menu/EditCategory.js";
import Search from "../screens/Search.js";

const Stack = createStackNavigator();


export default function MenuNavigator(){
    return (
<Stack.Navigator screenOptions={ScreenOptionStyle}>
    <Stack.Screen name="MenuList" component={MenuList} options={{ headerShown: false}}/>
    <Stack.Screen name="EditMenu" component={EditMenu} options={{ headerShown: false }}/>
    <Stack.Screen name="AddMenu" component={AddMenu} options={{ headerShown: false }}/>
    <Stack.Screen name="EditCategory" component={EditCategory} options={{ headerShown: false }}/>
</Stack.Navigator>
    )
}