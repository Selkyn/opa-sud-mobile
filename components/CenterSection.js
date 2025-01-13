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
        {/* <Text variant="bodyMedium">
          Email : {patient?.[entity]?.email || "Non disponible"}
        </Text>
        <Text variant="bodyMedium">
          Téléphone : {patient?.[entity]?.phone || "Non disponible"}
        </Text> */}
        <Text variant="bodyMedium">
            {patient?.[entity]?.city || "Non disponible"}
        </Text>
        {/* <List.Section>
          {patient?.[entity]?.[staffEntity] &&
          patient?.[entity]?.[staffEntity].length > 0 ? (
            patient[entity]?.[staffEntity].map((staff) => (
              <List.Item
                key={staff.id}
                title={
                  `Dr ${staff.lastname} ${staff.firstname}` || "Non disponible"
                }
                left={(props) => (
                  <List.Icon {...props} icon="stethoscope" />
                )}
              />
            ))
          ) : (
            <Text>{`Aucun ${staffName}`}</Text>
          )}
        </List.Section> */}
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
