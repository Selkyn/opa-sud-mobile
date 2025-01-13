import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import CenterDetails from '../components/CenterDetails';

export default function OsteoCenterDetails({ route }) {
    const { id } = route.params
    const [osteoCenter, setOsteoCenter] = useState(null)
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

        useEffect(() => {
          if (id) {
            fetchOsteoCenterDetails(id);
          }
        }, [id]);

      const fetchOsteoCenterDetails = async (osteoCenterId) => {
        try {
            const response = await axios.get(`http://192.168.1.79:4000/osteo-centers/${osteoCenterId}`);
            setOsteoCenter(response.data)
        } catch (err) {
            console.error('Erreur lors de la récupération du center ostéopathe :', err);
            setError('Impossible de récupérer les détails du center ostéopathe.');
          } finally {
            setLoading(false);
          }
        };


        if (loading) {
        return (
            <View style={styles.container}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text>Chargement des détails du centre ostéopathe...</Text>
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
                title = "Centre ostéopathe"
                entityType={osteoCenter}
                icon="meditation"
                staffs="osteos"
                staffName="Ostéopathes"
                appointment="osteoCenterAppointments"
                // iconAccordion="calendar"
                // titleAccordion="Rendez-vous"
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