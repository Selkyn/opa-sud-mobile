import React, { useEffect, useState, useRef } from "react";
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
import "moment/locale/fr";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import BadgeCustom from "../components/BadgeCustom";
import IconText from "../components/IconText";
import GlobalStyles from "../styles/styles";
import * as Notifications from "expo-notifications";
import ButtonCustom from "../components/ButtonCustom";

const scheduledNotifications = new Set();

// const scheduleNotificationForToday = async (event) => {
//   const eventDate = moment(event.start).format("YYYY-MM-DD"); // Date de l'événement
//   const today = moment().format("YYYY-MM-DD"); // Date d'aujourd'hui

//   // Vérifie si l'événement a lieu aujourd'hui
//   if (eventDate === today) {
//     const eventTime = moment(event.start); // Heure de l'événement
//     const now = moment(); // Heure actuelle

//     if (eventTime.isAfter(now)) {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: "Rappel d'événement",
//           body: `Événement : ${event.title} commence bientôt !`,
//           data: { date: eventDate },
//         },
//         trigger: {
//           date: eventTime.toDate(), // Planifie la notification pour l'heure exacte
//         },
//       });
//     }
//   }
// };


export default function CalendarScreen() {
  const [events, setEvents] = useState({}); // Pour stocker les dates marquées dans le calendrier
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  // Date actuellement sélectionnée
  const [selectedEvents, setSelectedEvents] = useState([]); // Événements pour la date sélectionnée

  const route = useRoute();
  const navigation = useNavigation();
  moment.locale("fr");

  const today = moment().format("YYYY-MM-DD");

  const markedDates = {
    ...events,
    [today]: {
      selected: true,
      selectedColor: "#FF5722",
      selectedTextColor: "#FFFFFF",
    },
  };

  const reloadPage = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: route.name }], // Réinitialise la même page
    });
  };
  // const today = moment().format("YYYY-MM-DD");
  // console.log("today" + today)

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const today = moment().format("YYYY-MM-DD");
  //     setSelectedDate(today); // Réinitialiser la date à aujourd'hui
  //     fetchEventsForDate(today); // Recharger les événements d'aujourd'hui
  //   }, [])
  // );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const today = moment().format("YYYY-MM-DD");
  //     const dateToFetch = route.params?.date && moment(route.params.date, "YYYY-MM-DD", true).isValid()
  //       ? route.params.date
  //       : today;

  //     setSelectedDate(dateToFetch); // Mettre à jour la date sélectionnée
  //     fetchEventsForDate(dateToFetch); // Charger les événements pour la date sélectionnée
  //   }, [route.params])
  // );

  useEffect(() => {
    const initializeEvents = async () => {
      const today = moment().format("YYYY-MM-DD");
      let dateToFetch = today; // Par défaut, on charge les événements d'aujourd'hui

      if (
        route.params?.date &&
        moment(route.params.date, "YYYY-MM-DD", true).isValid()
      ) {
        dateToFetch = route.params.date; // Si une date est passée, on l'utilise
      }

      setSelectedDate(dateToFetch); // Mettre à jour la date sélectionnée
      await fetchEventsForDate(dateToFetch); // Charger les événements pour cette date
    };

    initializeEvents();
  }, [route.params]);

  // const backToToday = async (date) => {
  //   setSelectedDate(date);
  //   await fetchEventsForDate(date);
  // };

  const fetchEventsForDate = async (date) => {
    try {
      const appointmentsResponse = await axios.get(
        "http://192.168.1.79:4000/appointments"
      );
      const workSchedulesResponse = await axios.get(
        "http://192.168.1.79:4000/work-schedules"
      );

      const appointments = appointmentsResponse.data;
      const workSchedules = workSchedulesResponse.data;

      const combinedEvents = [...appointments, ...workSchedules];
      const eventsForDay = combinedEvents.filter((event) => {
        const startDate = moment(event.start.split("T")[0]);
        const endDate = event.end ? moment(event.end.split("T")[0]) : startDate;
        return moment(date).isBetween(startDate, endDate, null, "[]");
      });

      setSelectedEvents(eventsForDay);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des événements pour la date :",
        error
      );
    }
  };
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

      // Planifier uniquement les notifications pour les événements d'aujourd'hui
      // [...appointments, ...workSchedules].forEach((event) => {
      //   scheduleNotificationForToday(event);
      // });

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
              dots: [{ color: "#32CD32", key: `appointment-${date}` }],
            };
          } else if (
            !formattedEvents[date].dots.find(
              (dot) => dot.key === `appointment-${date}`
            )
          ) {
            formattedEvents[date].dots.push({
              color: "#32CD32",
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
      {/* <Text style={styles.text}>Calendrier</Text> */}

      <Calendar
        style={styles.calendar}
        markedDates={events} // Ajout des dates marquées
        markingType={"multi-dot"} // Activer les dots multiples
        onDayPress={handleDayPress} // Gestion de la sélection d'un jour
        monthFormat={"MMMM yyyy"}
        firstDay={1}
        current={selectedDate}
      />

      <View style={{ marginTop: 5 }}>
        <ButtonCustom content="Revenir à aujourd'hui" onPress={reloadPage} />
      </View>

      <View style={styles.eventsContainer}>
        <Text style={styles.selectedDateText}>
          Événements pour le{" "}
          {selectedDate
            ? moment(selectedDate).format("DD/MM/YYYY")
            : "aucune date sélectionnée"}{" "}
          :
        </Text>

        {selectedEvents.length > 0 ? (
          <FlatList
            data={selectedEvents}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => choseTargetUrl(item)}>
                <View
                  style={[
                    styles.eventItemLeft,
                    item.eventType === "workSchedule"
                      ? styles.workScheduleBackgroundLeft
                      : styles.appointmentBackgroundLeft,
                  ]}
                >
                  <View
                    style={[
                      styles.eventItem,
                      // item.eventType === "workSchedule"
                      //   ? styles.workScheduleBackground
                      //   : styles.appointmentBackground,
                    ]}
                  >
                    <View
                      style={{
                        width: "20%",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 30,
                      }}
                    >
                      <Text> {moment(item.start).format("HH:mm")}</Text>
                      <Text> {moment(item.end).format("HH:mm")}</Text>
                    </View>
                    <View style={{ width: "80%" }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={styles.eventTitle}>{item.title}</Text>
                        <BadgeCustom
                          title={
                            item.eventType === "workSchedule"
                              ? "Travail"
                              : "Rendez-vous"
                          }
                          color={
                            item.eventType === "workSchedule"
                              ? GlobalStyles.Colors.blueLight
                              : GlobalStyles.Colors.greenLight
                          }
                        />
                      </View>
                      {/* <Text style={styles.eventDetails}>
                      Début : {moment(item.start).format("HH:mm")}
                    </Text>
                    {item.end && (
                      <Text style={styles.eventDetails}>
                        Fin : {moment(item.end).format("HH:mm")}
                      </Text>
                    )} */}

                      {item.extendedProps.entityType &&
                        (item.extendedProps.entityType === "patient" ? (
                          <Text style={styles.eventDetails}>
                            {"Patient" || "Non défini"}
                          </Text>
                        ) : item.extendedProps.entityType === "vetCenter" ? (
                          <Text style={styles.eventDetails}>
                            {"Vétérinaire" || "Non défini"}
                          </Text>
                        ) : (
                          <Text style={styles.eventDetails}>
                            {"Ostéopathe" || "Non défini"}
                          </Text>
                        ))}
                      {/* <Text style={styles.eventDetails}>
                    {item.extendedProps?.entityType || "Non défini"}
                  </Text> */}

                      {/* <IconText
                        icon="medical-bag"
                        text={item.extendedProps?.entityName || "Non défini"}
                      /> */}

                      <Text style={styles.entityName}>
                        {item.extendedProps?.entityName || "Non défini"}
                      </Text>
                    </View>
                  </View>
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
    backgroundColor: "#f3f4f6",
    marginTop: 24,
  },
  calendar: {
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  eventItemLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    position: "relative",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  workScheduleBackgroundLeft: {
    backgroundColor: GlobalStyles.Colors.blueLight,
  },
  appointmentBackgroundLeft: {
    backgroundColor: GlobalStyles.Colors.greenLight,
  },
  eventItem: {
    padding: 10,
    // marginBottom: 10,
    // borderRadius: 8,
    marginLeft: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,

    // width: "100%",
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
    fontStyle: "italic",
  },
  noEventsText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  entityName: {
    fontSize: 14,
    color: "#555",
    // fontWeight: "bold",
  },
});
