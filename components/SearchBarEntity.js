import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import GlobalStyles from "../styles/styles";

export default function SearchBarEntity({ value, onChangeText, entityName }) {
  // const [searchQueryLocal, setSearchQueryLocal] = useState(searchQuery);

  return (
    <Searchbar
      placeholder={`Rechercher un ${entityName}...`}
      value={value}
      onChangeText={onChangeText}
      style={{
        // marginTop: 16,
        // marginHorizontal: 16,
        width: "85%",
        backgroundColor: "white",
        fontSize: 12,
        height: 40,
      }}
      inputStyle={{
        fontSize: 14, 
        color: "black",
        paddingVertical: 0,
        alignSelf: "center",
      }}
      elevation={5}
    />
  );
}
