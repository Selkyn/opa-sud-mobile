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
import AppointmentsSection from "../components/AppointmentsSection";
import WorkSchedulesSection from "../components/WorkSchedulesSection";
import CenterSection from "../components/CenterSection";
import GlobalStyles from "../styles/styles";
import CustomCardContent from "../components/CustomCardContent";
import HeaderEntityDetails from "../components/HeaderEntityDetails";
import ClickableIconText from "../components/ClickableIconText";
import ListAccordion from "../components/ListAccordion";
import IconText from "../components/IconText";

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

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
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

  const calculateAge = (birthYear) => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const age =
  patient && patient.birthYear
    ? calculateAge(patient.birthYear)
    : "Non spécifié";

 

  // const _goBack = () => navigation.goBack();

  // const _handleSearch = () => console.log("Searching");

  // const _handleMore = () => console.log("Shown more");
  // const LeftContentAnimal = (props) => <Avatar.Icon {...props} icon="dog" />;
  // const LeftContentClient = (props) => <Avatar.Icon {...props} icon="human" />;

  const LeftContent = (props) => <Avatar.Icon {...props} icon="dog" />;
  return (
    <View style={styles.container}>
      <HeaderEntityDetails
        entity={patient}
        latitude={patient?.client?.latitude || "Non disponible"}
        longitude={patient?.client?.longitude || "Non disponible"}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={{ flex: 1 }}
      >


        {/*  Détails du patient */}
        <ListAccordion
          titleAccordion="Détails du patient"
          iconAccordion="dog"
          style={styles.accordion}
        >
          <CustomCardContent>
            {/* Informations unifiées */}
            <View style={styles.infoBlock}>

              <View style={styles.infoRow}>
                <List.Icon
                  icon="calendar"
                  color="#4CAF50"
                  style={styles.icon}
                />
                <Text style={styles.infoText}>
                  Age : {age < 1 ? "Moins d'un an" : `${age} ans`}
                </Text>
              </View>
              <View style={styles.separator} />

              <View style={styles.infoRow}>
                <List.Icon icon="dog" color="#42A5F5" style={styles.icon} />
                <Text style={styles.infoText}>
                  Espèce : {patient?.animalType?.name || "Non disponible"}
                </Text>
              </View>
              <View style={styles.separator} />

              <View style={styles.infoRow}>
                <List.Icon icon="weight" color="#FBC02D" style={styles.icon} />
                <Text style={styles.infoText}>
                  Poids :{" "}
                  {patient?.weight
                    ? `${patient?.weight / 1000} kg`
                    : "Non disponible"}
                </Text>
              </View>
              <View style={styles.separator} />

              <View style={styles.infoRow}>
                <List.Icon
                  icon="stethoscope"
                  color="#E91E63"
                  style={styles.icon}
                />
                <Text style={styles.infoText}>
                  Pathologie : {patient?.pathology || "Non disponible"}
                </Text>
              </View>
              <Text variant="bodyMedium">Membres affectés :</Text>
              <List.Section>
                {patient?.Limbs && patient?.Limbs.length > 0 ? (
                  patient.Limbs.map((limb) => (
                    // <IconText icon={"paw"} text={limb.name}/>
                    <List.Item
                      key={limb.id}
                      title={limb.name || "Non disponible"}
                      left={(props) => <List.Icon {...props} icon="paw" />}
                    />
                  ))
                ) : (
                  <Text>Aucun membre affecté</Text>
                )}
              </List.Section>
            </View>
          </CustomCardContent>
        </ListAccordion>

        {/* Détails du Client */}
        <ListAccordion titleAccordion="Détails du client" iconAccordion="human">
          <CustomCardContent>
            <Text variant="titleMedium">
              {patient?.client?.sex?.name === "male" ? "M." : "Mme"}{" "}
              {patient?.client?.lastname || "Non disponible"}{" "}
              {patient?.client?.firstname || "Non disponible"}
            </Text>
            <ClickableIconText
              icon="email"
              text={patient?.client?.email}
              emailOrPhone={patient?.client?.email}
            />
            <ClickableIconText
              icon="phone"
              text={patient?.client?.phone}
              emailOrPhone={patient?.client?.phone}
            />
            <Text variant="bodyMedium">
              {`${patient?.client?.adress || "Non disponible"}, 
                ${patient?.client?.postal || "Non disponible"} 
                ${patient?.client?.city || "Non disponible"}
              `}
            </Text>
          </CustomCardContent>
        </ListAccordion>

        {/* Détail du veterinaire */}
        {patient?.vetCenter ? (
          <CenterSection
            patient={patient}
            titleAccordion={"Centre Vétérinaire"}
            iconAccordion="medical-bag"
            entity={"vetCenter"}
            staffName="vétérinaire"
            entityLink="VetCenterDetails"
            staffEntity="vets"
          />
        ) : null}

        {/* Détail du centre ostéo */}
        {patient?.osteoCenter ? (
          <CenterSection
            patient={patient}
            titleAccordion={"Centre Ostéopathe"}
            iconAccordion="meditation"
            entity={"osteoCenter"}
            staffName="osteopathe"
            entityLink="OsteoCenterDetails"
            staffEntity="osteos"
          />
        ) : null}

        {/*  RDV */}
        <AppointmentsSection
          entity={patient}
          entityAppointments={"patientAppointments"}
          titleAccordion="Rendez-vous"
          iconAccordion="calendar"
        />

        {/* Taches */}
        <WorkSchedulesSection
          patient={patient}
          titleAccordion="Tâches"
          iconAccordion="clipboard-list"
        />

        {/* Paiement */}
        <ListAccordion titleAccordion="Paiement" iconAccordion="currency-eur">
          <CustomCardContent>
            <Text variant="bodyMedium">
              Type : {patient?.payment?.paymentType.name || "Non disponible"}
            </Text>
            <Text variant="bodyMedium">
              Mode : {patient?.payment?.paymentMode.name || "Non disponible"}
            </Text>
            <Text variant="bodyMedium">
              Date :{" "}
              {patient?.payment?.date
                ? formatDate(patient.payment.date)
                : "Non disponible"}
            </Text>
          </CustomCardContent>
        </ListAccordion>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  accordion: {
    marginBottom: 16,
    backgroundColor: "#F9F9F9", // Fond clair et doux pour l'accordéon
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  infoBlock: {
    padding: 16,
    backgroundColor: "#FFFFFF", // Fond blanc pour un contraste
    borderRadius: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
});
