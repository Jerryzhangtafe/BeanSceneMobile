import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import styles from "../styles/MainStyle"

import { Entypo, MaterialIcons } from "@expo/vector-icons"
import Colours from "../constants/Colours";

const RenderMenuItems = ({ menuItem, orderDetails, setOrderDetails,index,navigation}

) => {
/**
 * increase the quantity by 1 when clicking the plus button
 * @param {object} orderedItem 
 */

    const addQuantity = (orderedItem) => {
        console.log("add button is clicked");

        const checkIfItemAlreadyExist = orderDetails.find((menuItem) => menuItem._id == orderedItem._id)
        //if product does not exist in the order details, increase the quantity of that product by 1 
        if (checkIfItemAlreadyExist) {
            checkIfItemAlreadyExist.quantity += 1;
            setOrderDetails([...orderDetails]);
        }
        else {
            //if product does not exist in the order details
            setOrderDetails([...orderDetails, { ...orderedItem, quantity: 1 }])
        }

    }

/**
 * decrease the quantity by 1 when clicking the minus button
 * @param {object} orderedItem 
 */

    const reduceQuantity = (orderedItem) => {
        console.log("add button is clicked");

        const checkIfItemAlreadyExist = orderDetails.find((menuItem) => menuItem._id == orderedItem._id)
        console.log(checkIfItemAlreadyExist); 
        //if product does not exist in the order details, increase the quantity of that product by 1 
        if (checkIfItemAlreadyExist) {
            console.log("if reduce Quantity");
            if (checkIfItemAlreadyExist.quantity > 0) {
                checkIfItemAlreadyExist.quantity -= 1;
                // setOrderDetails([...orderDetails]);
                setOrderDetails((orderDetails)=>orderDetails.filter(item=>item.quantity > 0));
            } 
        }    
    }

    /**
     * 
     * @param {string} ItemId 
     * @returns integer
     */
    
    const getItemQuantity = (ItemId) => {
        const result = orderDetails.find((menuItem) => menuItem._id === ItemId);
        return result ? result.quantity : 0;
    }




    return (
        <View style={[styles.orderListRow, styles.rowHorizotal,{backgroundColor:(index%2===0)?"white":Colours.BeanLightGrey}]}>
            <View style={styles.orderListLeftColumn}>
                <Text style={styles.fontBold}>{menuItem.special?"🔥":""}{menuItem.name}
                <TouchableOpacity onPress={()=>navigation.navigate("Central",{screen:"ItemDetails",params:{menuItem}})}><Text>📖</Text></TouchableOpacity>
                </Text>
                <Text >{menuItem.description}</Text>
                <Text style={styles.fontBoldSmall}>{menuItem.price}</Text>
            </View>

            <View style={styles.orderListRightColumn}>
                {menuItem.availability?(<View style={styles.rowHorizotal}>
                    <TouchableOpacity style={styles.minusContainer} onPress={()=>{reduceQuantity(menuItem);}}>
                        <Entypo name="minus" size={23} color="#fff"></Entypo>
                    </TouchableOpacity>
                    <Text style={styles.itemQuantity}>{getItemQuantity(menuItem._id)}</Text>
                    <TouchableOpacity style={styles.minusContainer} onPress={() => addQuantity(menuItem)}>
                        <MaterialIcons name="add" size={25} color="#fff"></MaterialIcons>
                    </TouchableOpacity>
                </View>):(<View>
                    <Entypo name="circle-with-cross"size={28} color="red"></Entypo>
                </View>)}

            </View>
        </View>

    )
}

export default RenderMenuItems;



// export default function RenderProduct({navigation}){
//     return(
// <View>
// <Text>This is RenderProduct component</Text>
// </View>
//     )
// }