import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../styles/MainStyle"
import { useEffect, useState } from "react";


import Colours from "../constants/Colours";




export default function CategoryBar({setCategorySelected,categorySelected,navigation}) {
    const [categoryData, setCategoryData] = useState([]);

    
    useEffect(() => {      
        getCategories();
 }, [])



    const getCategories = async () => {
        console.log("getCategories method is called")
    
        var url = 'https://localhost:7044/Categories';
        var header = new Headers({});
        var options = {
            method: "GET",
            headers: header
        }
        try {
            const response = await fetch(url, options);
            console.log(response);
            //I added await 
            const data = await response.json();
            console.log(data);
            setCategoryData(data)
            // console.log(data[0]);
            // setCategory(data[0].name);
        }
        catch (error) {
            console.log("Error:" + error.message); 
        }
    }
 



return (
    <View style={{backgroundColor:Colours.BeanPaleGold}}>
    <ScrollView horizontal={true}>
<View style={styles.categoryContainer} >
<TouchableOpacity style={[styles.categoryTab,{backgroundColor:(categorySelected===""?Colours.BeanGold:Colours.BeanLightGrey)}]} onPress={()=>setCategorySelected("")}>
        <Text style={styles.darkText} >All</Text>
    </TouchableOpacity>

    {categoryData.map((category,key)=>{return(
        <TouchableOpacity style={[styles.categoryTab,{backgroundColor:(categorySelected===category._id)?Colours.BeanGold:Colours.BeanLightGrey}]} key={key} onPress={()=>{setCategorySelected(category._id); console.log(category._id)}} >
        <Text style={styles.darkText}>{category.name}</Text>
    </TouchableOpacity>)   
    })}

    <TouchableOpacity style={[styles.categoryTab,styles.categoryTabEdit]}  onPress={()=>navigation.navigate("EditCategory")}>
        <Text style={styles.darkText}>Edit Category</Text>
    </TouchableOpacity>    
</View>
</ScrollView>
</View>
)
}