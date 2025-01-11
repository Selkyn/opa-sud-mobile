import React from "react";
import { Button } from "react-native-paper";
import GlobalStyles from "../styles/styles";

export default function ButtonCustom({ content, onPress }) {
  return (
    <Button
      mode="contained"
      style={{ backgroundColor: GlobalStyles.Colors.primary }}
      onPress={onPress}
    >
      {content}
    </Button>
  );
}
