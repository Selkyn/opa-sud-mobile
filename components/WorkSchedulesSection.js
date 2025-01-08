import React from "react";
import { Card, Avatar, List, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import Globalstyles from "../styles/styles";
import CustomCardContent from "./CustomCardContent";

export default function WorkSchedulesSection({ patient }) {
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(timeString).toLocaleTimeString("fr-FR", options);
  };

  return (
    <List.Accordion
      title="Tâches"
      left={(props) => (
        <Avatar.Icon
          {...props}
          icon="hammer"
          color="white"
          style={{ backgroundColor: Globalstyles.Colors.primary, marginLeft: 10 }}
        />
      )}
    >
      {patient?.workSchedules && patient.workSchedules.length > 0 ? (
        patient.workSchedules.map((workSchedule) => {
          const startDate = formatDate(workSchedule.start_time);
          const endDate = formatDate(workSchedule.end_time);
          const startTime = formatTime(workSchedule.start_time);
          const endTime = formatTime(workSchedule.end_time);

        //   const title =
        //     startDate === endDate
        //       ? `${startDate} - ${startTime} à ${endTime}` // Même jour
        //       : `Du ${startDate} de ${startTime}\nau ${endDate} à ${endTime}`; // Jours différents

          return (
            <Card.Content
                key={workSchedule.id} style={{ marginBottom: 10, backgroundColor: Globalstyles.Colors.backgroundLight, paddingTop: 5, paddingBottom: 5 }}>
                <Text style={{ fontWeight: "bold" }}>
                {startDate === endDate
                    ? `${startDate} - ${startTime} à ${endTime}`
                    : `Du ${startDate} - ${startTime}\nau ${endDate} - ${endTime}`}
                </Text>
                <Text>{workSchedule.task?.name || "Non disponible"}</Text>
            </Card.Content>
          );
        })
      ) : (
        <Text style={styles.noTasksText}>Aucune tâche</Text>
      )}
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  noTasksText: {
    padding: 16,
    textAlign: "center",
    color: "gray",
    backgroundColor: Globalstyles.Colors.backgroundLight
  },
});
