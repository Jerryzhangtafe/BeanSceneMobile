import { createStackNavigator } from "@react-navigation/stack";



import Styles from "../styles/MainStyle.js";
import ItemDetails from "../screens/TakeOrder/ItemDetails.js";
import CheckOut from "../screens/TakeOrder/CheckOut.js";


const Stack = createStackNavigator();


export default function MenuNavigator(){
    return (
<Stack.Navigator>
    <Stack.Screen name="ItemDetails" component={ItemDetails} options={{ headerShown: false }}/>
    <Stack.Screen name="Checkout" component={CheckOut} options={{ headerShown: false }}/>
</Stack.Navigator>
    )
}