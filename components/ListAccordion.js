import React from "react";
import GlobalStyles from "../styles/styles";
import CustomCardContent from "../components/CustomCardContent";
import { Avatar, List } from "react-native-paper";
import { View, Text } from "react-native";

export default function ListAccordion({ iconAccordion, children, titleAccordion }) {
  return (
<View
  style={{
    // borderWidth: 1,
    // borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2
  }}
>
  <List.Accordion
    // style={{ borderRadius: 20 }}
    title={
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Icon
          icon={iconAccordion}
          size={50}
          style={{
            marginRight: 10,
            backgroundColor: GlobalStyles.Colors.primary,
          }}
        />
        <Text style={{ fontSize: 16, color: "#333" }}>{titleAccordion}</Text>
      </View>
    }
  >
    {children}
  </List.Accordion>
</View>

  );
}
