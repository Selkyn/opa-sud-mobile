import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import GlobalStyles from '../styles/styles';

export const PatientsList = ({ patients }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const navigation = useNavigation();

    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <View style={styles.container}>
          {/* Barre de recherche */}
          <Searchbar
            placeholder="Rechercher un patient..."
            value={searchTerm}
            onChangeText={setSearchTerm} // Mettre à jour le terme de recherche
            style={{
              marginBottom: 10,
              backgroundColor: GlobalStyles.Colors.backgroundLight,
            }}
          />
    
          {/* Liste des patients filtrés */}
          <ScrollView>
            {filteredPatients.map((patient) => (
              <TouchableOpacity
                key={patient.id}
                style={styles.patientItem}
                onPress={() => {
                    navigation.navigate('PatientDetails', { id: patient.id }); // Naviguer vers l'écran "PatientDetail" avec l'ID
                  }}
              >
                <Text style={styles.patientName}>{patient.name}</Text>
                <Text style={styles.patientStatus}>
                  Statut : {patient.status?.name || 'Non défini'}
                </Text>
                <Text style={styles.patientStatus}>
                  Client : {patient.client?.lastname} {patient.client?.firstname}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );
    };
    
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      },
      searchBar: {
        marginBottom: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
      },
      patientItem: {
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      patientName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      patientStatus: {
        fontSize: 14,
        color: '#555',
      },
    });