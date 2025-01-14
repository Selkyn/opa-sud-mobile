import React, { useEffect, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper'; // Import du Provider
import TabNavigator from './navigation/TabNavigator';
import * as Notifications from "expo-notifications";
import axios from "axios";
import moment from "moment";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const scheduleNotificationForToday = async (event) => {
  const eventDate = moment(event.start).format("YYYY-MM-DD");
  const today = moment().format("YYYY-MM-DD");

  if (eventDate === today) {
    const eventTime = moment(event.start);
    const now = moment();

    if (eventTime.isAfter(now)) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Rappel de Rendez-vous",
          body: `RDV : ${event.title}, ${event.extendedProps.entityName}`,
          data: { date: eventDate },
        },
        trigger: {
          data: { date: eventDate, id: event.id },
        },
      });
    }
  }
};

const fetchAndScheduleEvents = async () => {
  try {
    const appointmentsResponse = await axios.get("http://192.168.1.79:4000/appointments");
    const appointments = appointmentsResponse.data;

    
    // Planifier les notifications uniquement pour les événements d'aujourd'hui
    appointments.forEach((event) => {
      scheduleNotificationForToday(event);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des RDV :", error);
  }
};


export default function App() {
  const navigationRef = useRef();

  useEffect(() => {
    // Demander la permission pour les notifications
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission de notifications refusée !");
      }
    })();

    // Récupérer et planifier les notifications au démarrage
    fetchAndScheduleEvents();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const { date } = response.notification.request.content.data; // Récupérer la date depuis la notification
      if (date && navigationRef.current) {
        navigationRef.current.navigate("Calendar", { date }); // Naviguer vers la page calendrier avec la date
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <TabNavigator navigationRef={navigationRef} /> {/* Passe le ref ici */}
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
