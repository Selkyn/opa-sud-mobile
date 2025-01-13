import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-paper";
import GlobalStyles from "../styles/styles";

export default function IconText({ icon, text }) {
  return (
    <View style={styles.container}>
      <Avatar.Icon
        size={45}
        icon={icon}
        color={GlobalStyles.Colors.primary}
        style={styles.icon}
      />
      <Text variant="bodyMedium" style={styles.text}>
        {text || "Non disponible"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    backgroundColor: "transparent",
    marginRight: 10,
  },
  text: {
    color: "#333",
  },
});
