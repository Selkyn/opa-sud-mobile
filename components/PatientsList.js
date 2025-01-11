import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import {
  Card,
  Text,
  Badge,
  Avatar,
  IconButton,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../styles/styles";

export const PatientsList = ({ filter }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={filter}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: patient }) => (
        <Card
          // key={patient.id}
          style={styles.patientCard}
          onPress={() => {
            navigation.navigate("PatientDetails", { id: patient.id });
          }}
        >
          <Card.Title
            title={patient.name}
            subtitle={`${
              patient.client?.sex?.name === "male" ? "Mr." : "Mme."
            } ${patient.client?.lastname} ${patient.client?.firstname}`}
            titleStyle={styles.titleStyle}
            subtitleStyle={styles.subtitleStyle}
            left={(props) => (
              <Avatar.Text
                {...props}
                label={patient.name[0] || "?"}
                style={[
                  styles.avatar,
                  {
                    backgroundColor:
                      patient.sex?.name === "male" ? "#276A99" : "#FF69B4",
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
                {patient.status?.name || "Non défini"}
              </Badge>
              <Badge style={styles.animalTypeBadge}>
                {patient.animalType?.name || "Non défini"}
              </Badge>
            </View>
          </Card.Content>
        </Card>
      )}
      contentContainerStyle={[styles.container, { flexGrow: 1 }]}
      initialNumToRender={10} // Nombre initial d'éléments rendus
      windowSize={5} 
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f3f4f6",
  },
  patientCard: {
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
