import React, { useContext, useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "../screens/AuthScreen";
import TabNavigator from "./TabNavigator";
import { AuthContext } from "../context/AuthContext";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { fetchAndScheduleEvents } from "../utils/notifications"; // Déplace la logique des notifications ici
import * as Notifications from "expo-notifications";


const Stack = createStackNavigator();

export default function AppNavigator() {
  const { userLoggedIn, loading } = useContext(AuthContext);
  const navigationRef = useRef();
  // Gestion des notifications quand l'utilisateur est connecté
  useEffect(() => {
    if (userLoggedIn) {
      fetchAndScheduleEvents(); // Récupère et planifie les notifications
    }
  }, [userLoggedIn]);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const { date } = response.notification.request.content.data; // Récupérer la date depuis la notification
      if (date && navigationRef.current) {
        navigationRef.current.navigate("Calendar", { date }); // Naviguer vers la page calendrier avec la date
      }
    });

    return () => subscription.remove();
  }, []);

  // Affichage d'un écran de chargement pendant la vérification
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userLoggedIn ? (
          // Navigation principale si connecté
          <Stack.Screen name="MainApp" component={TabNavigator} />
        ) : (
          // Redirection vers l'écran d'authentification si non connecté
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
