import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../styles/MainStyle";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import Colours from "../constants/Colours";
import Url from "../constants/Url";

export default function CategoryBar({
  setCategorySelected,
  categorySelected,
  navigation,
  managerView,
  specialSelected,
  setSpecialSelected,
}) {
  const [categoryData, setCategoryData] = useState([]);
  

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getCategories();
  }, [isFocused]);

  const getCategories = async () => {
    console.log("getCategories method is called");

   
    var url = `${Url.url}/Categories`;
    var header = new Headers({});
    var options = {
      method: "GET",
      headers: header,
    };
    try {
      const response = await fetch(url, options);
      // console.log(response);
      //I added await
      const data = await response.json();
      // console.log(data);
      setCategoryData(data);
      // console.log(data[0]);
      // setCategory(data[0].name);
    } catch (error) {
      console.log("Error:" + error.message);
    }
  };

  return (
    <View style={{ backgroundColor: Colours.BeanPaleGold }}>
      <ScrollView horizontal={true}>
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={[
              styles.categoryTab,
              {
                backgroundColor:
                  (categorySelected === ""&specialSelected==false)
                    ? Colours.BeanGold
                    : Colours.BeanLightGrey,
              },
            ]}
            onPress={() => {setCategorySelected("");setSpecialSelected(false)}}
          >
            <Text style={styles.darkText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[
              styles.categoryTab,
              {
                backgroundColor:
                  specialSelected? Colours.BeanGold: Colours.BeanLightGrey,
              },
            ]}
            onPress={() => {setSpecialSelected(true);setCategorySelected("")}}>
            <Text style={styles.darkText}>Sale🔥</Text>
          </TouchableOpacity>
          {categoryData.map((category, key) => {
            return (
              <TouchableOpacity
                style={[
                  styles.categoryTab,
                  {
                    backgroundColor:
                      categorySelected === category._id
                        ? Colours.BeanGold
                        : Colours.BeanLightGrey,
                  },
                ]}
                key={key}
                onPress={() => {
                  setCategorySelected(category._id);
                  setSpecialSelected(false);
                  console.log(category._id);
                }}
              >
                <Text style={styles.darkText}>{category.name}</Text>
              </TouchableOpacity>
            );
          })}
         
          {managerView ? (
            <>
              <TouchableOpacity
                style={[styles.categoryTab, styles.categoryTabEdit]}
                onPress={() => {
                  navigation.navigate("EditCategory", { categoryData });
                  setCategorySelected("");
                }}
              >
                <Text style={styles.darkText}>Edit Category</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
