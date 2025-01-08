import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import "react-native-reanimated";
import { Chip, Portal, Modal, Button } from "react-native-paper";

export default function ModalPatientsList({ selectedEntity }) {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.headerText}>Patients</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Chip>{`${selectedEntity.patients.length} patients`}</Chip>
        <Button mode="contained" onPress={showModal}>
          Voir patients
        </Button>
      </View>

      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Liste des Patients</Text>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {selectedEntity.patients
              .filter((patient) => patient.name)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((patient) => (
                <TouchableOpacity
                  key={patient.id}
                  style={styles.patientCard}
                  onPress={() => {
                    setIsVisible(false);
                    navigation.navigate("List", {
                      screen: "PatientDetails",
                      params: { id: patient.id },
                    });
                  }}
                >
                  <Text style={styles.patientName}>{patient.name}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>

          <Button
            mode="contained"
            onPress={hideModal}
            style={styles.closeButton}
          >
            Fermer
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContainer: {
    padding: 10,
  },
  patientCard: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  patientName: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
});
