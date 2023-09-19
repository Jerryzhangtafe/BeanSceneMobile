import { createStackNavigator } from "@react-navigation/stack";



import Styles from "../styles/MainStyle.js";

import StaffList from "../screens/Staff/StaffList.js";
import EditStaff from "../screens/Staff/EditStaff.js";
import AddStaff from "../screens/Staff/AddStaff.js";

const Stack = createStackNavigator();


export default function StaffNavigator(){
    return (
<Stack.Navigator>
    <Stack.Screen name="StaffList" component={StaffList} options={{ headerShown: false }}/>
    <Stack.Screen name="EditStaff" component={EditStaff} options={{ headerShown: false }}/>
    <Stack.Screen name="AddStaff" component={AddStaff} options={{ headerShown: false }}/>
</Stack.Navigator>
    )
}