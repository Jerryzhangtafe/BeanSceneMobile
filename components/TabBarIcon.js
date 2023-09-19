import { MaterialCommunityIcons } from "@expo/vector-icons";

import react from "react";

import Colours from "../constants/Colours";

import Styles from "../styles/MainStyle"

export default function TabBarIcon(props){
return(
    <MaterialCommunityIcons
    name={props.name}
    size={28}
    style={Styles.navBarIcon}
    color={props.focused?Colours.tabIconSelected:Colours.tabIcon}
    />

   
)

}