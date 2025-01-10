import React from "react";
import { Button } from "react-native-paper";
import GlobalStyles from "../styles/styles";

export default function ButtonCustom({ content, onPress }) {
  return ( // Ajout du mot-clé `return` pour retourner le JSX
    <Button
      mode="contained"
      style={{ backgroundColor: GlobalStyles.Colors.primary }}
      onPress={onPress}
    >
      {content}
    </Button>
  );
}
