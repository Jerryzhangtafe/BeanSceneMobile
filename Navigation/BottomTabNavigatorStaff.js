import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import TabBarIcon from "../components/TabBarIcon";
import Colours from "../constants/Colours";
import Styles from "../styles/MainStyle"


import MenuListStaff from "../screens/TakeOrder/MenuListStaff";
import SearchNavigator from "./SearchNavigator";
import OrderNavigator from "./OrderNavigator";

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

export default function BottomTabNavigatorManager (){
    return(
<BottomTabs.Navigator>
<BottomTabs.Screen name="Menu" component={MenuListStaff}/>
<BottomTabs.Screen name="Order" component={OrderNavigator}/>
<BottomTabs.Screen name="Search" component={SearchNavigator}/>
</BottomTabs.Navigator>)
}
