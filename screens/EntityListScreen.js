import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { PatientsList } from "../components/PatientsList";
import { CentersList } from "../components/CentersList";
import { useNavigation } from "@react-navigation/native";

export default function EntityListScreen() {
  const [selectedList, setSelectedList] = useState("patients");
  const [patients, setPatients] = useState([]);
  const [vetCenters, setVetCenters] = useState([]);
  const [osteoCenters, setOsteoCenters] = useState([]);

  useEffect(() => {
    fetchPatients();
    fetchVetCenters();
    fetchOsteoCenters();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://192.168.1.79:4000/patients");
      setPatients(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Erreur lors de la récupération des patients :", error);
    }
  };

  const fetchVetCenters = async () => {
    try {
      const response = await axios.get("http://192.168.1.79:4000/vet-centers");
      setVetCenters(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des centres vétérinaires :",
        error
      );
    }
  };

  const fetchOsteoCenters = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.79:4000/osteo-centers"
      );
      setOsteoCenters(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des centres ostéopathes :",
        error
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Boutons de navigation */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedList === "patients" && styles.selectedButton,
          ]}
          onPress={() => setSelectedList("patients")}
        >
          <Text style={styles.buttonText}>Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedList === "vetCenters" && styles.selectedButton,
          ]}
          onPress={() => setSelectedList("vetCenters")}
        >
          <Text style={styles.buttonText}>Vétérinaires</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedList === "osteoCenters" && styles.selectedButton,
          ]}
          onPress={() => setSelectedList("osteoCenters")}
        >
          <Text style={styles.buttonText}>Ostéopathes</Text>
        </TouchableOpacity>
      </View>

      {/* Affichage de la liste sélectionnée */}
      {selectedList === "patients" && <PatientsList patients={patients} />}
      {selectedList === "osteoCenters" && (
        <CentersList
          centers={osteoCenters}
          title="Centres ostéopathes"
          entityType="osteoCenter"
        />
      )}
      {selectedList === "vetCenters" && (
        <CentersList
          centers={vetCenters}
          title="Centres vétérinaires"
          entityType="vetCenter"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 24,
  },
  buttonContainer: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  selectedButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});
