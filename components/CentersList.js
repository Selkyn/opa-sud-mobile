import React, { useState } from 'react';
import { StyleSheet, FlatList, View } from "react-native";
import {
  Card,
  Text,
  Badge,
  Avatar,
  IconButton,
} from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import GlobalStyles from '../styles/styles';

export const CentersList = ({ centers, title, entityType, filter }) => {
    // const [searchTerm, setSearchTerm] = useState('');

    const navigation = useNavigation();

    // const filteredCenters = centers.filter((center) =>
    //     center.name.toLowerCase().includes(searchTerm.toLowerCase())
    // )

    return (

      <FlatList
      data={filter}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: center }) => (
        <Card
          // key={center.id}
          style={styles.centerCard}
          onPress={() => {
            entityType === "vetCenter" ? navigation.navigate('VetCenterDetails', { id: center.id })
            : entityType === "osteoCenter" ? navigation.navigate('OsteoCenterDetails', { id: center.id })
            : console.log(`Navigation vers les détails de : ${entityType}, id: ${center.id}`);
          }}
        >
          <Card.Title
            title={center.name}
            subtitle={center.city}
            titleStyle={styles.titleStyle}
            subtitleStyle={styles.subtitleStyle}
            left={(props) => (
              <Avatar.Text
                {...props}
                label={center.name[0] || "?"}
                style={[
                  styles.avatar,
                  {
                    backgroundColor: GlobalStyles.Colors.primary,
                      
                  },
                ]}
                color="white"
              />
            )}
            right={(props) => (
              <IconButton {...props} icon="chevron-right" color="#888" />
            )}
          />
          <Card.Content>
            <View style={styles.statusContainer}>
              <Badge style={styles.statusBadge}>
                {center.contact?.name || "Non défini"}
              </Badge>
              <Badge style={styles.animalTypeBadge}>
              {`${center.patients.length} patients`}
              </Badge>
            </View>
          </Card.Content>
        </Card>
      )}
      contentContainerStyle={[styles.container, { flexGrow: 1 }]}
      initialNumToRender={10} // Nombre initial d'éléments rendus
      windowSize={5} 
    />
        // <View style={styles.container}>
        //   {/* Barre de recherche */}
        //   {/* <Searchbar
        //     placeholder="Rechercher un centre..."
        //     value={searchTerm}
        //     onChangeText={setSearchTerm} // Mettre à jour le terme de recherche
        //     style={{
        //       marginBottom: 10,
        //       backgroundColor: GlobalStyles.Colors.backgroundLight,
        //     }}
        //   /> */}
    
        //   {/* Titre de la liste */}
        //   {/* <Text style={styles.title}>{title}</Text> */}
    
        //   {/* Liste des centres filtrés */}
        //   <ScrollView>
        //     {filter.map((center) => (
        //       <TouchableOpacity
        //         key={center.id}
        //         style={styles.centerItem}
        //         onPress={() => {
        //           entityType === "vetCenter" ? navigation.navigate('VetCenterDetails', { id: center.id })
        //           : entityType === "osteoCenter" ? navigation.navigate('OsteoCenterDetails', { id: center.id })
        //           : console.log(`Navigation vers les détails de : ${entityType}, id: ${center.id}`);
        //         }}
                
        //       >
        //         <Text style={styles.centerName}>{center.name}</Text>
        //         <Text style={styles.centerAddress}>{center.city}</Text>
        //         <Text style={styles.centerAddress}>{center.contact?.name}</Text>
        //         {center.patients && center.patients.length > 0 ?(
        //           center.patients.length === 1 ? (
        //             <Text>{`${center.patients.length} patient`}</Text>
        //           ) : (
        //             <Text>{`${center.patients.length} patients`}</Text>
        //           )
        //         ) : (
        //           <Text>Aucun patient</Text>
        //         )}
        //       </TouchableOpacity>
        //     ))}
        //   </ScrollView>
        // </View>
      );
    };
    
    const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f3f4f6",
  },
  centerCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#fff",
  },
  avatar: {
    color: "white",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    justifyContent: "space-between",
  },
  statusBadge: {
    backgroundColor: "#ff9800",
    color: "white",
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    textAlign: "center",
    height: 24,
  },
  animalTypeBadge: {
    backgroundColor: GlobalStyles.Colors.primary,
    color: "white",
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    textAlign: "center",
    height: 24,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  subtitleStyle: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
    });