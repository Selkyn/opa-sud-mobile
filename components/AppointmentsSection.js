import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, List, Text } from "react-native-paper";
import GlobalStyles from "../styles/styles";
import ListAccordion from "./ListAccordion";

export default function AppointmentsSection({ entity, entityAppointments, titleAccordion, iconAccordion }) {
  return (
    <ListAccordion
      titleAccordion={titleAccordion}
      iconAccordion={iconAccordion}
    >
      {entity?.[entityAppointments] && entity[entityAppointments].length > 0 ? (
        entity[entityAppointments].map((appointment) => (
          <Card.Title
            key={appointment.id}
            style={{
              backgroundColor: GlobalStyles.Colors.backgroundLight,
              marginTop: 5,
            }}
            title={`${formatDate(appointment.start_time)} de ${formatTime(
              appointment.start_time
            )} à ${formatTime(appointment.end_time)}`}
            subtitle={
              appointment.reasonAppointment?.name +
                " - " +
                appointment.statusAppointment?.name || "Non disponible"
            }
            titleStyle={{ fontWeight: "bold", fontSize: 14 }}
          />
        ))
      ) : (
        <Text style={styles.noAppointmentsText}>Aucun rendez-vous</Text>
      )}
    </ListAccordion>
  );
}

// Fonction pour formater la date
const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
};

// Fonction pour formater l'heure
const formatTime = (timeString) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(timeString).toLocaleTimeString("fr-FR", options);
};

const styles = StyleSheet.create({
  noAppointmentsText: {
    padding: 16,
    textAlign: "center",
    color: "gray",
  },
});
