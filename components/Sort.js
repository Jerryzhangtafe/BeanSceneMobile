import { SelectList } from "react-native-dropdown-select-list";

import React from "react";


export default function Sort ({selected,setSelected}) {

   const data = ["A-Z","Z-A","Sequence"];
   
    console.log(selected);
    return(
        <SelectList 
            setSelected={(val) => setSelected(val)} 
            data={data} 
            // save="value"
            placeholder="Order by"
            search={false}
            defaultOption={"Sequence"}
            boxStyles={{padding:5}}
        />
      )
}