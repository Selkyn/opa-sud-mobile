import React from "react";
import { Badge, Text } from "react-native-paper";
import GlobalStyles from "../styles/styles";
import { StyleSheet } from "react-native";

export default function BadgeCustom({ title, color }) {
  return (
    <Badge style={[styles.badgeStyle, { backgroundColor: color || GlobalStyles.Colors.primary }]}>
      <Text style={{ color: "white" }}>{title}</Text>
    </Badge>
  );
}

const styles = StyleSheet.create({
  badgeStyle: {
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    textAlign: "center",
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
