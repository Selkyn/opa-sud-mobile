import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import des icônes
import CalendarScreen from '../screens/CalendarScreen';
import MapScreen from '../screens/MapScreen';
import EntityListStack from './EntityListStack'; // Import du Stack Navigator pour EntityList
import TestScreen from '../screens/TestScreen';
import GlobalStyles from '../styles/styles'


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'List') {
              iconName = focused ? 'list-circle' : 'list-circle-outline';
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: GlobalStyles.Colors.primary,
          tabBarInactiveTintColor: 'black',
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            height: 60, // Définissez une hauteur personnalisée
            paddingBottom: 10,
          },
        })}
      >
        <Tab.Screen 
          name="List" 
          component={EntityListStack} // Utilisation du Stack Navigator
          options={{ title: 'Liste' }} 
        />
        <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Carte' }} />
        <Tab.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Calendrier' }} />
        {/* <Tab.Screen name='Test' component={TestScreen} options ={{ tittle: 'test'}} /> */}
      </Tab.Navigator>
    </NavigationContainer>

  );
}
