import React from "react";
import GlobalStyles from "../styles/styles";
import CustomCardContent from "../components/CustomCardContent";
import { Avatar, List } from "react-native-paper";

export default function ListAccordion({ icon, children, title }) {
  return (
    <List.Accordion
      title={title}
      left={(props) => (
        <Avatar.Icon
          {...props}
          icon={icon}
          color="white"
          style={{
            backgroundColor: GlobalStyles.Colors.primary,
            marginLeft: 10,
          }}
        />
      )}
    >
      {children}
    </List.Accordion>
  );
}
