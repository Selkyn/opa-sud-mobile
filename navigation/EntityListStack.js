import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EntityListScreen from '../screens/EntityListScreen';
import PatientDetailsScreen from '../screens/PatientDetailsScreen';
import VetCenterDetailsScreen from '../screens/VetCenterDetailsScreen';
import OsteoCenterDetailsScreen from '../screens/OsteoCenterDetailsScreen';

const Stack = createStackNavigator();

export default function EntityListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="EntityList" 
        component={EntityListScreen} 
        options={{ title: 'Liste des Entités' }} 
      />
      <Stack.Screen 
        name="PatientDetails" 
        component={PatientDetailsScreen} 
        options={{ 
          title: 'Détails du Patient', 
          headerShown: false // Cache le header
        }} 
      
      />
      <Stack.Screen
        name="VetCenterDetails"
        component={VetCenterDetailsScreen}
        options={({ title: 'Détails du centre vétérinaire', headerShown: false})}
      />
      <Stack.Screen
        name="OsteoCenterDetails"
        component={OsteoCenterDetailsScreen}
        options={({ title: 'Détails du centre ostéopathe', headerShown: false})}
      />
    </Stack.Navigator>
  );
}
