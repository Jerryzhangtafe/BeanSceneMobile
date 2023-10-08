import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import TabBarIcon from "../components/TabBarIcon";
import Colours from "../constants/Colours";
import Styles from "../styles/MainStyle"

import MenuNavigator from "./MenuNavigator";
import StaffNavigator from "./StaffNavigator";


import Report from "../screens/Report";


import OrderNavigator from "./OrderNavigator";
import SearchNavigator from "./SearchNavigator";
import ScreenOptionStyle from "./ScreenOptionStyle";

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Menu";

export default function BottomTabNavigatorManager (){
    return(
<BottomTabs.Navigator initialRouteName={INITIAL_ROUTE_NAME} screenOptions={ScreenOptionStyle}>
<BottomTabs.Screen name="Menu" component={MenuNavigator} options={{title:"Menu",unmountOnBlur:true,tabBarIcon:({focused})=>(
    <TabBarIcon focused={focused} name="silverware-variant"/>
)}} />
<BottomTabs.Screen name="Staff" component={StaffNavigator}  options={{title:"Staff",unmountOnBlur:true,tabBarIcon:({focused})=>(
    <TabBarIcon focused={focused} name="account-circle"/>
)}}  />
<BottomTabs.Screen name="Order" component={OrderNavigator}  options={{title:"Order",unmountOnBlur:true,tabBarIcon:({focused})=>(
    <TabBarIcon focused={focused} name="cart"/>
)}} />
<BottomTabs.Screen name="Report" component={Report}  options={{title:"Report",unmountOnBlur:true,tabBarIcon:({focused})=>(
    <TabBarIcon focused={focused} name="format-list-bulleted"/>
)}} />
<BottomTabs.Screen name="Search" component={SearchNavigator}  options={{title:"Search",unmountOnBlur:true,tabBarIcon:({focused})=>(
    <TabBarIcon focused={focused} name="magnify"/>
)}} />
</BottomTabs.Navigator>)
}




