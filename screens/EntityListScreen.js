import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  SegmentedButtons,
  Searchbar,
  IconButton,
  Text,
  Badge,
} from "react-native-paper";
import axios from "axios";
import { PatientsList } from "../components/PatientsList";
import { EntityList } from "../components/EntityList";
import GlobalStyles from "../styles/styles";
import SearchBarEntity from "../components/SearchBarEntity";
import FilterModalEntity from "../components/FilterModalEntity";
import HeaderEntityList from "../components/HeaderEntityList";
import api from "../utils/api";

export default function EntityListScreen() {
  const [selectedList, setSelectedList] = useState("patients");
  const [patients, setPatients] = useState([]);
  const [vetCenters, setVetCenters] = useState([]);
  const [osteoCenters, setOsteoCenters] = useState([]);
  const [status, setStatus] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedStatuses, setCheckedStatuses] = useState([]);
  const [checkedContacts, setCheckedContacts] = useState([]);

  useEffect(() => {
    fetchStatus();
    fetchContacts();
  }, []);

  useEffect(() => {
    if (selectedList === "patients") {
      fetchPatients();
      setSearchTerm("");
      // fetchStatus();
    } else if (selectedList === "vetCenters") {
      fetchVetCenters();
      setSearchTerm("");
      // fetchContacts();
    } else if (selectedList === "osteoCenters") {
      fetchOsteoCenters();
      setSearchTerm("");
      // fetchContacts();
    }
  }, [selectedList]);

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");
      setPatients(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Erreur lors de la récupération des patients :", error);
    }
  };

  const fetchVetCenters = async () => {
    try {
      const response = await api.get("/vet-centers");
      setVetCenters(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des centres vétérinaires :",
        error
      );
    }
  };

  const fetchOsteoCenters = async () => {
    try {
      const response = await api.get(
        "/osteo-centers"
      );
      setOsteoCenters(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des centres ostéopathes :",
        error
      );
    }
  };

  const fetchStatus = async () => {
    try {
      const response = await api.get(
        "/patients/status"
      );
      setStatus(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des statuts :", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await api.get("/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des contacts :", error);
    }
  };

  // const filteredPatients = patients.filter((patient) =>
  //   patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredEntities = (entities, checkedFilterType, filtertypeId) => 
    entities.filter((entity) => {
      const matchesSearchTerm = entity.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilterType =
        checkedFilterType.length === 0 ||
        checkedFilterType.includes(entity[filtertypeId]);
      return matchesSearchTerm && matchesFilterType;
    });
  
  const filteredPatients = filteredEntities(patients, checkedStatuses, "statusId");
  const filteredVetCenters = filteredEntities(vetCenters, checkedContacts, "contactId");
  const filteredOsteoCenters = filteredEntities(osteoCenters, checkedContacts, "contactId");
    
  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={selectedList}
        onValueChange={(value) => {
          // setSearchTerm(""); // Réinitialisation de la barre de recherche
          setCheckedStatuses([]); // Réinitialisation des statuts sélectionnés
          setCheckedContacts([]); // Réinitialisation des contacts sélectionnés
          setSelectedList(value);
        }}
        buttons={[
          {
            icon: "paw",
            value: "patients",
            label: "Patients",
            style:
              selectedList === "patients"
                ? styles.selectedButton
                : styles.unselectedButton,
          },
          {
            icon: "medical-bag",
            value: "vetCenters",
            label: "Vétos",
            style:
              selectedList === "vetCenters"
                ? styles.selectedButton
                : styles.unselectedButton,
          },
          {
            icon: "meditation",
            value: "osteoCenters",
            label: "Ostéos",
            style:
              selectedList === "osteoCenters"
                ? styles.selectedButton
                : styles.unselectedButton,
          },
        ]}
        density="small"
        style={{ marginHorizontal: 16, marginTop: 16 }}
        // theme={{
        //   colors: {
        //     primary: "white", // Texte et icône du bouton sélectionné
        //     secondaryContainer: "#2196F3", // Fond du bouton sélectionné
        //     surfaceVariant: "#f0f0f0", // Fond des boutons non sélectionnés
        //   },
        // }}
        elevation={5}
      />
      {selectedList === "patients" && (
        <HeaderEntityList
          value={searchTerm}
          onChangeText={setSearchTerm}
          entity={patients}
          entityName="patient"
          title="Statuts"
          options={status}
          onSelectionChange={setCheckedStatuses}
          filteredEntities={filteredPatients}
          icon="hammer"
        />
      )}

      {selectedList === "vetCenters" && (
        <HeaderEntityList
          value={searchTerm}
          onChangeText={setSearchTerm}
          entityName="véto"
          entity={vetCenters}
          title="Contacts"
          options={contacts}
          onSelectionChange={setCheckedContacts}
          filteredEntities={filteredVetCenters}
          icon="handshake"
        />
      )}
      {selectedList === "osteoCenters" && (
        <HeaderEntityList
          value={searchTerm}
          onChangeText={setSearchTerm}
          entityName="ostéo"
          entity={osteoCenters}
          title="Contacts"
          options={contacts}
          onSelectionChange={setCheckedContacts}
          filteredEntities={filteredOsteoCenters}
          icon="handshake"
        />
      )}

      <View style={styles.listContainer}>
        {selectedList === "patients" && (
          <EntityList
            centers={patients}
            title="Patients"
            entityType="patient"
            filter={filteredPatients}
          />
          // <PatientsList patients={patients} filter={filteredPatients} />
        )}
        {selectedList === "osteoCenters" && (
          <EntityList
            centers={osteoCenters}
            title="Centres ostéopathes"
            entityType="osteoCenter"
            filter={filteredOsteoCenters}
          />
        )}
        {selectedList === "vetCenters" && (
          <EntityList
            centers={vetCenters}
            title="Centres vétérinaires"
            entityType="vetCenter"
            filter={filteredVetCenters}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.Colors.greenLight,
    paddingTop: 24,
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
  // button: {
  //   backgroundColor: "white",
  //   color: GlobalStyles.Colors.white,
  // },
  selectedButton: {
    backgroundColor: GlobalStyles.Colors.backgroundVeryLight,
  },
  unselectedButton: {
    backgroundColor: "white",
  },
});
