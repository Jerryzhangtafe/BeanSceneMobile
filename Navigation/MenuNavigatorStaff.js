import { createStackNavigator } from "@react-navigation/stack";



import Styles from "../styles/MainStyle.js";
import ItemDetails from "../screens/TakeOrder/ItemDetails.js";
import Checkout from "../screens/Checkout.js";
import Orders from "../screens/Orders.js";


const Stack = createStackNavigator();


export default function MenuNavigatorStaff(){
    return (
<Stack.Navigator>
    <Stack.Screen name="TakeOrder" component={Orders} options={{ headerShown: false }}/>
    <Stack.Screen name="ItemDetails" component={ItemDetails} options={{ headerShown: false }}/>
    <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }}/>
</Stack.Navigator>
    )
}