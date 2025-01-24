
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import moment from "moment";
import axios from "axios";
import api from "./api"; // Ton instance axios avec intercepteurs (si applicable)

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
        trigger: null, // Notification immédiate
      });
    }
  }
};

export const fetchAndScheduleEvents = async () => {
  try {
    const appointmentsResponse = await api.get("/appointments");
    const appointments = appointmentsResponse.data;

    // Planifie les notifications pour les rendez-vous d'aujourd'hui
    appointments.forEach((event) => {
      scheduleNotificationForToday(event);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous :", error);
  }
};


