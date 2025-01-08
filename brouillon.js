// {/* <BottomSheetScrollView
// style= {{
//   height: "25px"
// }}
// >
// {data.map(renderItem)}
// </BottomSheetScrollView> 

// import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Alert,
//   Linking,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
// } from "react-native";
// import BottomSheet, {
//   BottomSheetFlatList,
//   BottomSheetView,
//   BottomSheetScrollView 
// } from "@gorhom/bottom-sheet";
// import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import "react-native-reanimated";

// // export default function BottomSheetMap({
// //   selectedEntity,
// //   screen,
// //   adress,
// //   titleName,
// //   bgColor,
// //   colorText,
// //   showDetails,
// // }) {
// //   const navigation = useNavigation();
// // //   const openGoogleMaps = (latitude, longitude) => {
// // //     const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
// // //     Linking.openURL(url).catch((err) =>
// // //       console.error("Erreur lors de l'ouverture de Google Maps :", err)
// // //     );
// // //   };
// // const openGoogleMaps = (adress) => {
// //     const encodedAddress = encodeURIComponent(adress); // Encodage de l'adresse
// //     const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
// //     Linking.openURL(url).catch((err) =>
// //       console.error("Erreur lors de l'ouverture de Google Maps :", err)
// //     );
// //   };
  

// //   return (
// //     <BottomSheetView>
// //       <View style={{ width: "100%", height: 50, position: "relative" }}>
// //         <Text
// //           style={{
// //             fontSize: 18,
// //             position: "absolute",
// //             backgroundColor: bgColor,
// //             color: colorText,
// //             paddingHorizontal: 10,
// //             paddingVertical: 2,
// //             borderRadius: 10,
// //             margin: 10,
// //           }}
// //         >
// //           {titleName}
// //         </Text>
// //       </View>

// //       <Text
// //         style={{
// //           marginTop: 10,
// //           marginBottom: 5,
// //           fontSize: 20,
// //           color: "black",
// //         }}
// //       >
// //         {selectedEntity.title}
// //       </Text>
// //       <Text
// //         style={{
// //           marginTop: 10,
// //           marginBottom: 5,
// //           fontSize: 14,
// //           color: "black",
// //         }}
// //       >
// //         {selectedEntity.description}
// //       </Text>
// //       {selectedEntity &&
// //       selectedEntity.patients &&
// //       selectedEntity.patients.length > 0 ? (
// //         <View style={styles.contentContainer}>
// //           <Text style={styles.headerText}>Patients</Text>
// //           <BottomSheetFlatList
// //             data={selectedEntity.patients}
// //             keyExtractor={(item) => item.id.toString()}
// //             horizontal={true}
// //             showsHorizontalScrollIndicator={true}
// //             renderItem={({ item }) => (
// //               <View
// //                 style={styles.patientCard}
// //                 // onPress={() =>
// //                 //     navigation.navigate("List", {
// //                 //       screen: "PatientDetails",
// //                 //       params: { id: item.id },
// //                 //     })
// //                 //   }
// //                   focusHook={useFocusEffect}
// //                 >
// //                 <Text style={styles.patientName}>{item.name}</Text>
// //               </View>
// //             )}
// //             contentContainerStyle={styles.horizontalListContainer}
// //             style={{ 
// //               width: Dimensions.get("window").width, 
// //               height: 50 // Hauteur en pixels sans guillemets
// //             }}
// //           />
// //         </View>
// //       ) : (
// //         <View style={styles.emptyState}>
// //           <Text>Aucun patient sélectionné</Text>
// //         </View>
// //       )}

// //       <View
// //         style={{
// //           flexDirection: "row",
// //           gap: 10,
// //           marginTop: 10,
// //           alignItems: "center",
// //         }}
// //       >
// //         {showDetails && (
// //           <View style={{ width: "80%" }}>
// //             <TouchableOpacity
// //               style={{
// //                 borderRadius: 10,
// //                 backgroundColor: "#295BA6",
// //                 padding: 8,
// //               }}
// //               onPress={() =>
// //                 navigation.navigate("List", {
// //                   screen: screen,
// //                   params: { id: selectedEntity.id },
// //                 })
// //               }
// //             >
// //               <Text
// //                 style={{
// //                   color: "white",
// //                   textAlign: "center",
// //                   fontSize: 18,
// //                 }}
// //               >
// //                 Voir Détails
// //               </Text>
// //             </TouchableOpacity>
// //           </View>
// //         )}

// //         <View>
// //           <TouchableOpacity
// //             style={{
// //               borderRadius: 50,
// //               backgroundColor: "#295BA6",
// //               width: 45,
// //               height: 45,
// //               alignItems: "center",
// //               justifyContent: "center",
// //             }}
// //             title="Itinéraire"
// //             // onPress={() =>
// //             //   openGoogleMaps(
// //             //     selectedEntity.coordinate.latitude,
// //             //     selectedEntity.coordinate.longitude
// //             //   )
// //             // }
// //             onPress={() => openGoogleMaps(selectedEntity.description)}
// //           ></TouchableOpacity>
// //         </View>
// //       </View>
// //     </BottomSheetView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   contentContainer: {
// //     marginTop: 15,
// //     marginBottom: 10,
// //   },
// //   headerText: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //     marginBottom: 10,
// //     color: "#1e40af",
// //   },
// //   horizontalListContainer: {
// //     flexDirection: "row",
// //     paddingHorizontal: 10,
// //   },
// //   patientCard: {
// //     backgroundColor: "#f0f4f8",
// //     padding: 10,
// //     marginHorizontal: 5,
// //     borderRadius: 8,
// //     alignItems: "center",
// //     // width: 120, // Définit une largeur pour chaque carte
// //   },
// //   patientName: {
// //     fontSize: 14,
// //     fontWeight: "bold",
// //     color: "#333",
// //   },
// //   patientDetail: {
// //     fontSize: 12,
// //     color: "#555",
// //     marginTop: 5,
// //     textAlign: "center",
// //   },
// //   emptyState: {
// //     alignItems: "center",
// //     justifyContent: "center",
// //     paddingVertical: 20,
// //   },
// // });
// export default function BottomSheetMap({ selectedEntity, snapPoints, onClose }) {
//   const sheetRef = useRef(null);

//   useEffect(() => {
//     if (selectedEntity) {
//       sheetRef.current?.expand();
//     }
//   }, [selectedEntity]);

//   const handleClose = () => {
//     sheetRef.current?.close();
//     if (onClose) onClose();
//   };
//   const data = selectedEntity.patients
//   const renderItem = useCallback(
//     (item) => (
//       <View style={styles.patientCard}>
//       <Text style={styles.patientName}>{item.name}</Text>
//     </View>
//     )
//   )

//   return (
//     <BottomSheet ref={sheetRef} snapPoints={snapPoints} index={-1}>
//       <View style={styles.header}>
//         <Text style={styles.title}>{selectedEntity.title}</Text>
//         <TouchableOpacity onPress={handleClose}>
//           <Text style={styles.closeButton}>Fermer</Text>
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.description}>{selectedEntity.description}</Text>
//       <Text style={styles.patientsTitle}>Patients</Text>
//       <BottomSheetScrollView
//         style= {{
//           height: "25px"
//         }}
//       >
//         {data.map(renderItem)}
//         </BottomSheetScrollView> 
//         {/* data={selectedEntity.patients}
//         keyExtractor={(item) => item.id.toString()}
//         horizontal={true}
//         renderItem={({ item }) => (
//           <View style={styles.patientCard}>
//             <Text style={styles.patientName}>{item.name}</Text>
//           </View>
//         )}
//       /> */}
// //     </BottomSheet>
// //   );
// // }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     backgroundColor: "#f8f9fa",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   closeButton: {
//     color: "#007BFF",
//   },
//   description: {
//     paddingHorizontal: 16,
//     marginBottom: 10,
//     color: "#333",
//   },
//   patientsTitle: {
//     paddingHorizontal: 16,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   patientCard: {
//     backgroundColor: "#e9ecef",
//     padding: 10,
//     marginHorizontal: 5,
//     borderRadius: 8,
//   },
//   patientName: {
//     fontSize: 14,
//     color: "#495057",
//   },
// });




// //MAP
// import React, { useState, useEffect, useRef, useMemo } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Alert,
//   Linking,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
//   ActivityIndicator,
// } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import BottomSheet, {
//   BottomSheetFlatList,
//   BottomSheetView,
// } from "@gorhom/bottom-sheet";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import * as Location from "expo-location";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import "react-native-reanimated";

// import axios from "axios";
// import BottomSheetMap from "../components/BottomSheetMap";

// export default function MapScreen() {
//   const [region, setRegion] = useState({
//     latitude: 48.8566, // Paris, par défaut
//     longitude: 2.3522,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

//   const [clientMarkers, setClientMarkers] = useState([]);
//   const [vetMarkers, setVetMarkers] = useState([]);
//   const [osteoMarkers, setOsteoMarkers] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   // const [selectedClient, setSelectedClient] = useState(null);
//   // const [selectedVet, setSelectedVet] = useState(null);
//   // const [selectedOsteo, setSelectedOsteo] = useState(null);
//   const [selectedEntity, setSelectedEntity] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
  
//   const navigation = useNavigation();
//   const mapRef = useRef(null);
//   const route = useRoute();
//   const { latitude, longitude, uniqueId } = route.params || {};

//   const sheetRef = useRef(null);

//   // Ouverture du bottom sheet
//   // const openSheet = (item, type) => {
//   //   if (type === "vet") {
//   //     setSelectedVet(item);
//   //     setSelectedOsteo(null);
//   //     setSelectedClient(null);
//   //   } else if (type === "osteo") {
//   //     setSelectedOsteo(item);
//   //     setSelectedVet(null);
//   //     setSelectedClient(null);
//   //   } else if (type === "client") {
//   //     setSelectedClient(item);
//   //     setSelectedVet(null);
//   //     setSelectedOsteo(null);
//   //   }
//   //   if (sheetRef.current) {
//   //     sheetRef.current.expand();
//   //   } else {
//   //     console.log("sheetRef.current est null !");
//   //   }
//   // };

//   const openSheet = (marker) => {
//     setSelectedEntity(marker); // Stocke l'entité sélectionnée, quel que soit son type
//   };

//   const snapPoints = useMemo(() => ["3%", "45%"], []);

//   useEffect(() => {
//     if (latitude && longitude && mapRef.current) {
//       mapRef.current.animateToRegion({
//         latitude,
//         longitude,
//         latitudeDelta: 0.005, // Zoom plus proche
//         longitudeDelta: 0.005,
//       });
//     }
//   }, [latitude, longitude, uniqueId]);

//   useEffect(() => {
//     if (latitude && longitude) {
//       const matchingMarker = clientMarkers.find(
//         (marker) =>
//           marker.coordinate.latitude === latitude &&
//           marker.coordinate.longitude === longitude
//       );
  
//       if (matchingMarker) {
//         openSheet(matchingMarker);
//       }
//     }
//   }, [latitude, longitude, clientMarkers, uniqueId]);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Erreur", "Permission refusée. La localisation est nécessaire.");
//         console.error("Permission refusée pour la localisation");
//         return;
//       }
//       let currentLocation = await Location.getCurrentPositionAsync({});
//       console.log("Localisation actuelle :", currentLocation);
//       setLocation(currentLocation);
//     })();
//   }, []);
  
  

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get("http://192.168.1.79:4000/clients");
//         const clients = response.data;

//         const newMarkers = clients
//           .filter(
//             (client) =>
//               client.latitude &&
//               client.longitude &&
//               client.patients &&
//               client.patients.length > 0
//           )
//           .map((client) => ({
//             id: client.id,
//             title: client?.lastname + " " + client?.firstname,
//             description: `${client.adress} ${client.postal} ${client.city}`,
//             patients: client.patients,
//             coordinate: {
//               latitude: client.latitude,
//               longitude: client.longitude,
//             },
//           }));
//         setClientMarkers(newMarkers);
//       } catch (error) {
//         Alert.alert("Erreur", "Impossible de charger les clients.");
//         console.error("Erreur lors de la récupération des clients :", error);
//       } finally {
//         setIsLoading(false); // Fin du chargement
//       }
//     };

//     fetchClients();
//   }, []);

//   useEffect(() => {
//     const fetchVetCenters = async () => {
//       try {
//         const response = await axios.get(
//           "http://192.168.1.79:4000/vet-centers"
//         );
//         const vetCenters = response.data;

//         const newVetMarkers = vetCenters
//           .filter((center) => center.latitude && center.longitude)
//           .map((center) => ({
//             id: center.id,
//             title: center.name,
//             description: `${center.adress} ${center.postal} ${center.city}`,
//             patients: center.patients,
//             coordinate: {
//               latitude: center.latitude,
//               longitude: center.longitude,
//               ...center,
//             },
//           }));

//         setVetMarkers(newVetMarkers);
//       } catch (error) {
//         Alert.alert(
//           "Erreur",
//           "Impossible de charger les centres vétérinaires."
//         );
//         console.error(
//           "Erreur lors de la récupération des centres vétérinaires :",
//           error
//         );
//       } finally {
//         setIsLoading(false); // Fin du chargement
//       }
//     };

//     fetchVetCenters();
//   }, []);

//   useEffect(() => {
//     const fetchOsteoCenters = async () => {
//       try {
//         const response = await axios.get(
//           "http://192.168.1.79:4000/osteo-centers"
//         );
//         const osteoCenters = response.data;

//         const newOsteoMarkers = osteoCenters
//           .filter((center) => center.latitude && center.longitude)
//           .map((center) => ({
//             id: center.id,
//             title: center.name,
//             description: `${center.adress} ${center.postal} ${center.city}`,
//             patients: center.patients,
//             coordinate: {
//               latitude: center.latitude,
//               longitude: center.longitude,
//             },
//           }));

//         setOsteoMarkers(newOsteoMarkers);
//       } catch (error) {
//         Alert.alert(
//           "Erreur",
//           "Impossible de charger les centres d'ostéopathie."
//         );
//         console.error(
//           "Erreur lors de la récupération des centres d'ostéopathie :",
//           error
//         );
//       } finally {
//         setIsLoading(false); // Fin du chargement
//       }
//     };

//     fetchOsteoCenters();
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//         <Text>Chargement des clients...</Text>
//       </View>
//     );
//   }

//   // useEffect(() => {
//   //   if (navigator.geolocation) {
//   //     navigator.geolocation.getCurrentPosition(
//   //       (position) => {
//   //         const { latitude, longitude } = position.coords;
//   //         setUserLocation({ latitude, longitude });
//   //         setRegion({
//   //           latitude,
//   //           longitude,
//   //           latitudeDelta: 0.0922,
//   //           longitudeDelta: 0.0421,
//   //         });
//   //       },
//   //       (error) => {
//   //         Alert.alert('Erreur', "Impossible de récupérer votre position.");
//   //         console.error('Erreur de géolocalisation :', error);
//   //       },
//   //       { enableHighAccuracy: true }
//   //     );
//   //   } else {
//   //     Alert.alert('Erreur', "La géolocalisation n'est pas supportée par ce navigateur.");
//   //   }
//   // }, []);

//   const openGoogleMaps = (latitude, longitude) => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
//     Linking.openURL(url).catch((err) =>
//       console.error("Erreur lors de l'ouverture de Google Maps :", err)
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Carte Interactive</Text>
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         initialRegion={location ? location : region}
//         showsUserLocation={true}
//         showsMyLocationButton={true}
//         onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
//       >
//         {clientMarkers.map((marker) => (
//           <Marker
//             key={marker.id}
//             coordinate={marker.coordinate}
//             // title={marker.title}
//             // description={marker.description}
//             // onPress={() => openGoogleMaps(marker.coordinate.latitude, marker.coordinate.longitude)}
//             onPress={() => openSheet(marker, "client")}
//           />
//         ))}

//         {vetMarkers.map((marker) => (
//           <Marker
//             key={marker.id}
//             coordinate={marker.coordinate}
//             // title={marker.title}
//             // description={marker.description}
//             pinColor="blue"
//             // onPress={() => openGoogleMaps(marker.coordinate.latitude, marker.coordinate.longitude)}
//             onPress={() => openSheet(marker, "vet")}
//           />
//         ))}

//         {osteoMarkers.map((osteoMarker) => (
//           <Marker
//             key={osteoMarker.id}
//             coordinate={osteoMarker.coordinate}
//             // title={osteoMarker.title}
//             // description={osteoMarker.description}
//             pinColor="green"
//             // onPress={() => openGoogleMaps(osteoMarker.coordinate.latitude, osteoMarker.coordinate.longitude)}
//             onPress={() => openSheet(osteoMarker, "osteo")}
//           />
//         ))}
//       </MapView>

//       {/* <BottomSheet
//         style={{ paddingHorizontal: 20 }}
//         ref={sheetRef}
//         index={-1}
//         snapPoints={snapPoints}
//       >
//         {selectedClient ? (
//           <BottomSheetMap
//             selectedEntity={selectedClient}
//             adress={selectedClient.adress}
//             screen={"ClientCenterDetails"}
//             titleName={"Client"}
//             bgColor={"#fee2e2"}
//             colorText={"#b91c1c"}
//             showDetails={false}
//           />
//         ) : selectedVet ? (
//           <BottomSheetMap
//             selectedEntity={selectedVet}
//             screen={"VetCenterDetails"}
//             titleName={"Centre Vétérinaire"}
//             bgColor={"#dbeafe"}
//             colorText={"#1e40af"}
//             showDetails={true}
//           />
//         ) : selectedOsteo ? (
//           <BottomSheetMap
//             selectedEntity={selectedOsteo}
//             screen={"OsteoCenterDetails"}
//             titleName={"Centre Ostéopathe"}
//             bgColor={"#d1fae5"}
//             colorText={"#065f46"}
//             showDetails={true}
//           />
//         ) : null}
//       </BottomSheet> */}
//             {selectedEntity && (
//         <BottomSheetMap
//           selectedEntity={selectedEntity}
//           snapPoints={["3%", "45%"]}
//           onClose={() => setSelectedEntity(null)} // Ferme le BottomSheet
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     marginTop: 24,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   map: {
//     flex: 1,
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//     position: "relative",
//   },

// });


// useFindMarker(clientMarkers, latitude, longitude, "client", openSheet, uniqueId);
// useFindMarker(vetMarkers, latitude, longitude, "vet", openSheet, uniqueId);
// useFindMarker(osteoMarkers, latitude, longitude, "osteo", openSheet, uniqueId); */}



import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { Avatar, Button, Card, Text, List } from "react-native-paper";

export default function PatientDetailsScreen({ route }) {
  const { id } = route.params || {};
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    if (id) {
      fetchPatientDetail(id);
    }
  }, [id]);

  const fetchPatientDetail = async (patientId) => {
    try {
      const response = await axios.get(
        `http://192.168.1.79:4000/patients/${patientId}`
      );
      setPatient(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération du patient :", err);
      setError("Impossible de récupérer les détails du patient.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Chargement des détails du patient...</Text>
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

  const _goBack = () => navigation.goBack();

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");
  const LeftContentAnimal = (props) => <Avatar.Icon {...props} icon="dog" />;
  const LeftContentClient = (props) => <Avatar.Icon {...props} icon="human" />;

  const LeftContent = (props) => <Avatar.Icon {...props} icon="dog" />;
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={patient?.name || "Non disponible"} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Map", {
              latitude: patient?.client?.latitude,
              longitude: patient?.client?.longitude,
              uniqueId: new Date().getTime(),
            })
          }
        >
          <Text>Voir sur la map</Text>
        </TouchableOpacity>
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollContent} style={{ flex: 1 }}>
        {/* Card: Détails du patient */}
        <Card style={styles.card}>
          <Card.Title
            title="Détails du Patient"
            // subtitle="Animal"
            left={LeftContentAnimal}
          />
          <Card.Content>
            <Text variant="titleMedium">Nom : {patient?.name}</Text>
            <Text variant="bodyMedium">
              Date de naissance : {patient?.birthYear}
            </Text>
            <Text variant="bodyMedium">
              Espèce : {patient?.animalType.name}
            </Text>
            <Text variant="bodyMedium">Race : {patient?.race.name}</Text>
            <Text variant="bodyMedium">
              Poids : {`${patient?.weight / 1000} kg`}
            </Text>
            <Text variant="bodyMedium">Pathologie : {patient?.pathology}</Text>
            <Text variant="bodyMedium">Membres affectés :</Text>
            <List.Section>
              {patient?.Limbs && patient?.Limbs.length > 0 ? (
                patient.Limbs.map((limb) => (
                  <List.Item
                    key={limb.id}
                    title={limb.name}
                    left={(props) => <List.Icon {...props} icon="paw" />}
                    style={{ flexWrap: "wrap" }}
                  />
                ))
              ) : (
                <Text>Aucun membre affecté</Text>
              )}
            </List.Section>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title="Détails du Client"
            // subtitle="Animal"
            left={LeftContentClient}
          />
          <Card.Content>
            <Text variant="titleMedium">Nom : {patient?.client?.lastname}</Text>
            <Text variant="bodyMedium">
              Prénom : {patient?.client?.firstname}
            </Text>
            <Text variant="bodyMedium">Email : {patient?.client?.email}</Text>
            <Text variant="bodyMedium">
              Téléphone : {patient?.client?.phone}
            </Text>
            <Text variant="bodyMedium">
              Adresse :{" "}
              {`${patient?.client.adress}, ${patient?.client.postal} ${patient?.client.city}`}
            </Text>
          </Card.Content>
        </Card>
        <Text style={styles.title}>Détails du Patient</Text>
        <Text>Patient ID : {id}</Text>
        <Text>Nom du patient : {patient?.name || "Non disponible"}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Map", {
              latitude: patient?.client?.latitude,
              longitude: patient?.client?.longitude,
              uniqueId: new Date().getTime(),
            })
          }
        >
          <Text>Voir sur la map</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  mapButton: {
    margin: 20,
    borderRadius: 5,
  },
  scrollContent: {
    padding: 16,
  },
});

