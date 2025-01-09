import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import CenterDetails from '../components/CenterDetails';

export default function VetCenterDetails({ route }) {
    const { id } = route.params
    const [vetCenter, setVetCenter] = useState(null)
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

        useEffect(() => {
          if (id) {
            fetchVetCenterDetails(id);
          }
        }, [id]);

      const fetchVetCenterDetails = async (vetCenterId) => {
        try {
            const response = await axios.get(`http://192.168.1.79:4000/vet-centers/${vetCenterId}`);
            setVetCenter(response.data)
        } catch (err) {
            console.error('Erreur lors de la récupération du center vétérinaire :', err);
            setError('Impossible de récupérer les détails du center vétérinaire.');
          } finally {
            setLoading(false);
          }
        };

        if (loading) {
        return (
            <View style={styles.container}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text>Chargement des détails du centre vétérinaire...</Text>
            </View>
        );
        }
    
        if (error) {
        return (
            <View style={styles.container}>
            <Text style={styles.errorText}>{error}</Text>
            </View>
        );
        }

        return (
            <CenterDetails
                title = "Centre vétérinaire"
                entityType={vetCenter}
                icon="medical-bag"
                staffs="vets"
                staffName="Vétérinaires"
                appointment="vetCenterAppointments"
            />
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});