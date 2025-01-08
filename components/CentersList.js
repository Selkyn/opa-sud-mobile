import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import GlobalStyles from '../styles/styles';

export const CentersList = ({ centers, title, entityType }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const navigation = useNavigation();

    const filteredCenters = centers.filter((center) =>
        center.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <View style={styles.container}>
          {/* Barre de recherche */}
          <Searchbar
            placeholder="Rechercher un centre..."
            value={searchTerm}
            onChangeText={setSearchTerm} // Mettre à jour le terme de recherche
            style={{
              marginBottom: 10,
              backgroundColor: GlobalStyles.Colors.backgroundLight,
            }}
          />
    
          {/* Titre de la liste */}
          <Text style={styles.title}>{title}</Text>
    
          {/* Liste des centres filtrés */}
          <ScrollView>
            {filteredCenters.map((center) => (
              <TouchableOpacity
                key={center.id}
                style={styles.centerItem}
                onPress={() => {
                  entityType === "vetCenter" ? navigation.navigate('VetCenterDetails', { id: center.id })
                  : entityType === "osteoCenter" ? navigation.navigate('OsteoCenterDetails', { id: center.id })
                  : console.log(`Navigation vers les détails de : ${entityType}, id: ${center.id}`);
                }}
                
              >
                <Text style={styles.centerName}>{center.name}</Text>
                <Text style={styles.centerAddress}>{center.city}</Text>
                {center.patients && center.patients.length > 0 ?(
                  center.patients.length === 1 ? (
                    <Text>{`${center.patients.length} patient`}</Text>
                  ) : (
                    <Text>{`${center.patients.length} patients`}</Text>
                  )
                ) : (
                  <Text>Aucun patient</Text>
                )}
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
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      centerItem: {
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
      centerName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      centerAddress: {
        fontSize: 14,
        color: '#555',
      },
    });