import React from "react";
import { Card, Avatar, List, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import GlobalStyles from "../styles/styles"

export default function PaymentSection({ patient}) {
    return(
            <List.Accordion
              title="Tâches"
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="hammer"
                  color="white"
                  style={{ backgroundColor: GlobalStyles.Colors.primary, marginLeft: 10 }}
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
                    <Card key={workSchedule.id} style={{ marginBottom: 10 }}>
                    <Card.Content>
                        <Text style={{ fontWeight: "bold" }}>
                        {startDate === endDate
                            ? `${startDate} - ${startTime} à ${endTime}`
                            : `Du ${startDate} - ${startTime}\nau ${endDate} - ${endTime}`}
                        </Text>
                        <Text>{workSchedule.task?.name || "Non disponible"}</Text>
                    </Card.Content>
                    </Card>
                  );
                })
              ) : (
                <Text style={styles.noTasksText}>Aucune tâche</Text>
              )}
            </List.Accordion>
          );
    
}