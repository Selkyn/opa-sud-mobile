import React from "react";
import { Card, Avatar, List, Text, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from '../styles/styles'
import CustomCardContent from "./CustomCardContent";
import ModalPatientsList from "./ModalPatientList";
import ListAccordion from "./ListAccordion";

export default function CenterSection({ patient, titleAccordion, iconAccordion, entity, staffName, staffEntity, entityLink }) {
  const navigation = useNavigation();

  return (
    <ListAccordion
      titleAccordion={titleAccordion}
      iconAccordion={iconAccordion}
    >
      <CustomCardContent>
        <Text variant="titleMedium">
          {patient?.[entity]?.name || "Non disponible"}
        </Text>

        <Text variant="bodyMedium">
            {patient?.[entity]?.city || "Non disponible"}
        </Text>

        <Button
          mode="contained"
          buttonColor={GlobalStyles.Colors.primary}
          style={{ marginTop: 10 }}
          onPress={() => {
            navigation.navigate(entityLink, {
              id: patient[entity]?.id,
            });
          }}
        >
          Voir
        </Button>
      </CustomCardContent>
    </ListAccordion>
  );
}

const styles = StyleSheet.create({
  noTasksText: {
    padding: 16,
    textAlign: "center",
    color: "gray",
  },
});
