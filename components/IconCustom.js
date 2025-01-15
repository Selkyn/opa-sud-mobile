import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import GlobalStyles from "../styles/styles";
import { StyleSheet } from "react-native";

export default function IconCustom({ icon }) {
  return (
    <FontAwesome5
      name={icon}
      style={styles.iconStyle}
      color={GlobalStyles.Colors.primary}
      size={22}
    />
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    marginRight: 10,
  },
});
