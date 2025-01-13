import React from "react";
import GlobalStyles from "../styles/styles";
import CustomCardContent from "../components/CustomCardContent";
import { Avatar, List } from "react-native-paper";
import { View, Text } from "react-native";

export default function ListAccordion({ iconAccordion, children, titleAccordion }) {
  return (
    <List.Accordion
    style={{marginBottom: 0}}
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
      // left={(props) => (
      //   <Avatar.Icon
      //     {...props}
      //     icon={icon}
      //     color="white"
      //     style={{
      //       backgroundColor: GlobalStyles.Colors.primary,
      //       marginLeft: 10,
      //     }}
      //   />
      // )}
    >
      {children}
    </List.Accordion>
  );
}
