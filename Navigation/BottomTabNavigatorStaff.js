import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import TabBarIcon from "../components/TabBarIcon";
import Colours from "../constants/Colours";
import Styles from "../styles/MainStyle"



import SearchNavigator from "./SearchNavigator";
import OrderNavigator from "./OrderNavigator";
import MenuNavigatorStaff from "./MenuNavigatorStaff";
import ScreenOptionStyle from "./ScreenOptionStyle";

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

export default function BottomTabNavigatorManager (){
    return(
<BottomTabs.Navigator screenOptions={ScreenOptionStyle}>
<BottomTabs.Screen name="MenuStaff" component={MenuNavigatorStaff} options={{title:"Menu",unmountOnBlur:true,tabBarIcon:({focused})=>(
    <TabBarIcon focused={focused} name="silverware-variant"/>
)}}/>
<BottomTabs.Screen name="ShowOrder" component={OrderNavigator} options={{title:"Order",unmountOnBlur:true,tabBarIcon:({focused})=>(
    <TabBarIcon focused={focused} name="cart"/>
)}}/>
<BottomTabs.Screen name="Search" component={SearchNavigator} options={{title:"Search",unmountOnBlur:true,tabBarIcon:({focused})=>(
    <TabBarIcon focused={focused} name="magnify"/>
)}}/>
</BottomTabs.Navigator>)
}
