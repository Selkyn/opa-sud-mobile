import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Linking,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import "react-native-reanimated";
import { Chip, Portal, Modal, Button } from "react-native-paper";
import ModalPatientsList from "./ModalPatientList";

export default function BottomSheetMap({
  selectedEntity,
  screen,
  adress,
  titleName,
  bgColor,
  colorText,
  showDetails,
  distance
}) {
  const navigation = useNavigation();
  
  // const [isVisible, setIsVisible] = useState(false);

  // const showModal = () => setIsVisible(true);
  // const hideModal = () => setIsVisible(false);

  //   const openGoogleMaps = (latitude, longitude) => {
  //     const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  //     Linking.openURL(url).catch((err) =>
  //       console.error("Erreur lors de l'ouverture de Google Maps :", err)
  //     );
  //   };
  const openGoogleMaps = (adress) => {
    const encodedAddress = encodeURIComponent(adress); // Encodage de l'adresse
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    Linking.openURL(url).catch((err) =>
      console.error("Erreur lors de l'ouverture de Google Maps :", err)
    );
  };

  return (
    <BottomSheetView>
      <View style={{ width: "100%", height: 50, flexDirection: "row", justifyContent:"space-between" }}>
        <Chip
          style={{
            backgroundColor: bgColor,
            color: colorText,
            alignSelf: "flex-start",
          }}
        >
          {titleName}
        </Chip>
        <Text>{distance}</Text>
        <View>
          <TouchableOpacity
            style={{
              borderRadius: 50,
              backgroundColor: "#295BA6",
              width: 45,
              height: 45,
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Itinéraire"
            onPress={() => openGoogleMaps(selectedEntity.description)}
          >
            <FontAwesome5 name="directions" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          marginBottom: 5,
          fontSize: 20,
          color: "black",
        }}
      >
        {selectedEntity.title}
      </Text>
      <Text
        style={{
          marginTop: 10,
          marginBottom: 5,
          fontSize: 14,
          color: "black",
        }}
      >
        {selectedEntity.description}
      </Text>
      {selectedEntity &&
      selectedEntity.patients &&
      selectedEntity.patients.length > 0 ? (
        selectedEntity.patients.length === 1 ? (
          <View style={styles.contentContainer}>
            <Text style={styles.headerText}>Patient</Text>
            <TouchableOpacity
              style={styles.patientCard}
              onPress={() =>
                navigation.navigate("List", {
                  screen: "PatientDetails",
                  params: { id: selectedEntity.patients[0].id },
                })
              }
            >
              <Text style={styles.patientName}>
                {selectedEntity.patients[0].name}
              </Text>
            </TouchableOpacity>
            
          </View>
        ) : (
          <ModalPatientsList
            selectedEntity={selectedEntity}
          />
        )
        //   <View style={styles.contentContainer}>
        //     <Text style={styles.headerText}>Patients</Text>
        //     <View style={{ flexDirection: "row", gap: 5 }}>
        //       <Chip>{`${selectedEntity.patients.length} patients`}</Chip>
        //       <Button mode="contained" onPress={showModal}>
        //         Voir patients
        //       </Button>
        //     </View>

        //     <Portal>
        //       <Modal
        //         visible={isVisible}
        //         onDismiss={hideModal}
        //         contentContainerStyle={styles.modalContainer}
        //       >
        //         <Text style={styles.modalTitle}>Liste des Patients</Text>

        //         <ScrollView contentContainerStyle={styles.scrollContainer}>
        //           {selectedEntity.patients
        //             .filter((patient) => patient.name)
        //             .sort((a, b) => a.name.localeCompare(b.name))
        //             .map((patient) => (
        //               <TouchableOpacity
        //                 key={patient.id}
        //                 style={styles.patientCard}
        //                 onPress={() => {
        //                   setIsVisible(false);
        //                   navigation.navigate("List", {
        //                     screen: "PatientDetails",
        //                     params: { id: patient.id },
        //                   });
        //                 }}
        //               >
        //                 <Text style={styles.patientName}>{patient.name}</Text>
        //               </TouchableOpacity>
        //             ))}
        //         </ScrollView>

        //         <Button
        //           mode="contained"
        //           onPress={hideModal}
        //           style={styles.closeButton}
        //         >
        //           Fermer
        //         </Button>
        //       </Modal>
        //     </Portal>
        //   </View>
        // )
      ) : (
        <View style={styles.emptyState}>
          <Text>Aucun patient</Text>
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        {showDetails && (
          <View style={{ width: "80%" }}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                backgroundColor: "#295BA6",
                padding: 8,
              }}
              onPress={() =>
                navigation.navigate("List", {
                  screen: screen,
                  params: { id: selectedEntity.id },
                })
              }
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                Voir Détails
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* <View>
          <TouchableOpacity
            style={{
              borderRadius: 50,
              backgroundColor: "#295BA6",
              width: 45,
              height: 45,
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Itinéraire"
            onPress={() => openGoogleMaps(selectedEntity.description)}
          >
            <FontAwesome5 name="directions" size={30} color="white" />
          </TouchableOpacity>
        </View> */}
      </View>
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1e40af",
  },
  horizontalListContainer: {
    paddingHorizontal: 10,
  },
  patientCard: {
    backgroundColor: "#f0f4f8",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "stretch", // Définit une largeur pour chaque carte
  },
  patientName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  patientDetail: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    maxHeight: Dimensions.get("window").height * 0.7, // Limite la hauteur de la modal
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 10,
    gap: 5,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "center",
  },
});
