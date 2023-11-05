import { createStackNavigator } from "@react-navigation/stack";



import Styles from "../styles/MainStyle.js";
import ShowOrders from "../screens/ShowOrders.js";

import OrderDetails from "../screens/Menu/OrderDetails.js";

const Stack = createStackNavigator();


export default function OrderNavigator(){
    return (
<Stack.Navigator>
    <Stack.Screen name="ShowOrders" component={ShowOrders} options={{ headerShown: false }}/>
    <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: false }}/>
</Stack.Navigator>
    )
}