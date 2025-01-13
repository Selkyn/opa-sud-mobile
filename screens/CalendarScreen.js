import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export default function CalendarScreen() {
  const [events, setEvents] = useState({}); // Pour stocker les dates marquées dans le calendrier
  const [selectedDate, setSelectedDate] = useState(""); // Date actuellement sélectionnée
  const [selectedEvents, setSelectedEvents] = useState([]); // Événements pour la date sélectionnée

  const navigation = useNavigation();

  // Fonction pour récupérer les événements depuis le backend
  const fetchEvents = async () => {
    try {
      const appointmentsResponse = await axios.get(
        "http://192.168.1.79:4000/appointments"
      );
      const workSchedulesResponse = await axios.get(
        "http://192.168.1.79:4000/work-schedules"
      );

      const appointments = appointmentsResponse.data;
      const workSchedules = workSchedulesResponse.data;

      // Fusionner les données des deux sources et les convertir pour le format attendu
      const formattedEvents = {};

      workSchedules.forEach((event) => {
        const startDate = moment(event.start.split("T")[0]); // Convertir la date de début
        const endDate = event.end ? moment(event.end.split("T")[0]) : startDate; // Convertir la date de fin ou utiliser la date de début

        // Marquer toutes les dates entre startDate et endDate avec un dot bleu
        let currentDate = startDate.clone();
        while (currentDate.isSameOrBefore(endDate)) {
          const date = currentDate.format("YYYY-MM-DD");
          if (!formattedEvents[date]) {
            formattedEvents[date] = {
              dots: [{ color: "blue", key: `workSchedule-${date}` }],
            };
          } else if (
            !formattedEvents[date].dots.find(
              (dot) => dot.key === `workSchedule-${date}`
            )
          ) {
            formattedEvents[date].dots.push({
              color: "blue",
              key: `workSchedule-${date}`,
            });
          }
          currentDate.add(1, "days");
        }
      });

      appointments.forEach((event) => {
        const startDate = moment(event.start.split("T")[0]); // Convertir la date de début
        const endDate = event.end ? moment(event.end.split("T")[0]) : startDate; // Convertir la date de fin ou utiliser la date de début

        // Marquer toutes les dates entre startDate et endDate avec un dot vert
        let currentDate = startDate.clone();
        while (currentDate.isSameOrBefore(endDate)) {
          const date = currentDate.format("YYYY-MM-DD");
          if (!formattedEvents[date]) {
            formattedEvents[date] = {
              dots: [{ color: "green", key: `appointment-${date}` }],
            };
          } else if (
            !formattedEvents[date].dots.find(
              (dot) => dot.key === `appointment-${date}`
            )
          ) {
            formattedEvents[date].dots.push({
              color: "green",
              key: `appointment-${date}`,
            });
          }
          currentDate.add(1, "days");
        }
      });

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Erreur lors de la récupération des événements :", error);
      Alert.alert("Erreur", "Impossible de charger les événements.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fonction pour gérer la sélection d'un jour
  const handleDayPress = (day) => {
    const date = day.dateString;
    setSelectedDate(date);

    // Rechercher les événements pour cette date
    Promise.all([
      axios.get("http://192.168.1.79:4000/appointments"),
      axios.get("http://192.168.1.79:4000/work-schedules"),
    ])
      .then(([appointmentsResponse, workSchedulesResponse]) => {
        const appointments = appointmentsResponse.data;
        const workSchedules = workSchedulesResponse.data;

        const combinedEvents = [...appointments, ...workSchedules];
        const eventsForDay = combinedEvents.filter((event) => {
          const startDate = moment(event.start.split("T")[0]);
          const endDate = event.end
            ? moment(event.end.split("T")[0])
            : startDate;
          return moment(date).isBetween(startDate, endDate, null, "[]");
        });

        setSelectedEvents(eventsForDay);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des événements du jour :",
          error
        );
      });
  };

  // const goToPatientDetails = (patientId) => {
  //   navigation.navigate("PatientDetails", { id: patientId });
  // }

  // const goToUrl = (item) => {
  //   const targetUrl = choseTargetUrl(item);
  //   navigation.navigate(targetUrl, { id: item.patientId });
  // }

  const choseTargetUrl = (item) => {
    if (item.eventType === "workSchedule") {
      navigation.navigate("List", {
        screen: "PatientDetails",
        params: { id: item.extendedProps.patientId },
      });
    } else if (item.eventType === "appointment") {
      if (item.extendedProps.entityType === "patient") {
        navigation.navigate("List", {
          screen: "PatientDetails",
          params: { id: item.extendedProps.patientId },
        });
      } else if (item.extendedProps.entityType === "vetCenter") {
        navigation.navigate("List", {
          screen: "VetCenterDetails",
          params: { id: item.extendedProps.vetCenterId },
        });
      } else if (item.extendedProps.entityType === "osteoCenter") {
        navigation.navigate("List", {
          screen: "OsteoCenterDetails",
          params: { id: item.extendedProps.osteoCenterId },
        });
      }
    }
    return null;
  };

  // const handleNavigation = (item) => {
  //   const targetUrl = choseTargetUrl(item);
  //   if (targetUrl) {
  //     if (item.extendedProps.patientId) {
  //       navigation.navigate("List", {
  //         screen: "PatientDetails",
  //         params: { id: item.extendedProps.patientId },
  //       });
  //     } else {
  //       Alert.alert(
  //         "Information manquante",
  //         "Aucun patient associé à cet événement."
  //       );
  //     }
  //   } else {
  //     Alert.alert("Erreur", "Impossible de déterminer la destination.");
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calendrier</Text>

      <Calendar
        markedDates={events} // Ajout des dates marquées
        markingType={"multi-dot"} // Activer les dots multiples
        onDayPress={handleDayPress} // Gestion de la sélection d'un jour
      />

      <View style={styles.eventsContainer}>
        <Text style={styles.selectedDateText}>
          Événements pour {selectedDate || "aucune date sélectionnée"} :
        </Text>

        {selectedEvents.length > 0 ? (
          <FlatList
            data={selectedEvents}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => choseTargetUrl(item)}>
              <View
                style={[
                  styles.eventItem,
                  item.eventType === "workSchedule"
                    ? styles.workScheduleBackground
                    : styles.appointmentBackground,
                ]}
              >
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventDetails}>
                  Début : {moment(item.start).format("HH:mm")}
                </Text>
                {item.end && (
                  <Text style={styles.eventDetails}>Fin : {moment(item.end).format("HH:mm")}</Text>
                )}
                <Text style={styles.eventDetails}>
                  Type : {item.eventType || "Non défini"}
                </Text>
                {item.extendedProps.entityType && (
                  <Text style={styles.eventDetails}>
                    {item.extendedProps?.entityType || "Non défini"}
                  </Text>
                )}
                
                  <Text style={styles.eventDetails}>
                    {item.extendedProps?.entityName || "Non défini"}
                  </Text>
                
              </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.noEventsText}>
            Aucun événement pour cette date.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
  },
  eventsContainer: {
    marginTop: 20,
    flex: 1,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventItem: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  workScheduleBackground: {
    backgroundColor: "#d0e8ff", // Bleu clair pour les workSchedules
  },
  appointmentBackground: {
    backgroundColor: "#d4ffd4", // Vert clair pour les appointments
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 14,
    color: "#555",
  },
  noEventsText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});
