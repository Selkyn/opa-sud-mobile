import React, { useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Card, Text, Badge, Avatar, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import GlobalStyles from "../styles/styles";
import BadgeCustom from "./BadgeCustom";

export const EntityList = ({ centers, title, entityType, filter }) => {
  // const [searchTerm, setSearchTerm] = useState('');

  const navigation = useNavigation();

  // const filteredCenters = centers.filter((center) =>
  //     center.name.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  return (
    <FlatList
      data={filter}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: entity }) => (
        <Card
          // key={center.id}
          style={styles.centerCard}
          onPress={() => {
            entityType === "vetCenter"
              ? navigation.navigate("VetCenterDetails", { id: entity.id })
              : entityType === "osteoCenter"
              ? navigation.navigate("OsteoCenterDetails", { id: entity.id })
              : entityType === "patient"
              ? navigation.navigate("PatientDetails", { id: entity.id })
              : console.log(
                  `Navigation vers les détails de : ${entityType}, id: ${entity.id}`
                );
          }}
        >
          <Card.Title
            title={entity.name}
            subtitle={
              entityType === "patient"
                ? `${entity.client?.sex?.name === "male" ? "Mr." : "Mme."} ${
                    entity.client?.lastname || "Nom"
                  } ${entity.client?.firstname || "Prénom"}`
                : entity.city || "Ville inconnue"
            }
            titleStyle={styles.titleStyle}
            subtitleStyle={styles.subtitleStyle}
            left={(props) => (
              <Avatar.Text
                {...props}
                label={entity.name[0] || "?"}
                style={[
                  styles.avatar,
                  {
                    backgroundColor:
                      entityType === "patient"
                        ? entity?.sex?.name === "male"
                          ? "#276A99"
                          : "#FF69B4"
                        : GlobalStyles.Colors.primary,
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
            <View style={styles.badgeContainer}>
              <BadgeCustom
                title={entityType === "patient"
                  ? entity.status?.name || "Non défini"
                  : entity.contact?.name || "Non défini"}
                color="#ff9800"
              />
              <BadgeCustom
                // color= {GlobalStyles.Colors.primary}
                title={entityType === "patient"
                  ? entity.animalType?.name || "Non défini"
                  : `${entity.patients.length} patients`}
              />

            </View>
          </Card.Content>
        </Card>
      )}
      contentContainerStyle={[styles.container, { flexGrow: 1 }]}
      initialNumToRender={10} // Nombre initial d'éléments rendus
      windowSize={5}
      // getItemLayout={(data, index) => ({
      //   length: 100, // Hauteur de chaque item
      //   offset: 100 * index, // Position calculée
      //   index,
      // })}
    />
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
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    justifyContent: "space-between",
  },
  // badgeStyle: {
  //   backgroundColor: "#ff9800",
  //   color: "white",
  //   fontSize: 12,
  //   paddingHorizontal: 6,
  //   paddingVertical: 2,
  //   borderRadius: 8,
  //   textAlign: "center",
  //   height: 24,
  // },
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
