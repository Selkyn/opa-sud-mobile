import React from "react";
import { Appbar } from "react-native-paper";
import GlobalStyles from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import BadgeCustom from "./BadgeCustom";

export default function HeaderEntityDetails({ entity, latitude, longitude }) {
  const navigation = useNavigation();

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const _goBack = () => navigation.goBack();

  return (
    <Appbar.Header
      style={{
        backgroundColor: GlobalStyles.Colors.primary,
        height: 120, // Augmente la hauteur pour plus d'espace
      }}
    >
      <Appbar.BackAction color="white" onPress={_goBack} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{entity?.name || "Non disponible"}</Text>
        <Text style={styles.subtitle}>
          Ajouté le {formatDate(entity?.createdAt) || "Non disponible"}
        </Text>
        <View style={styles.badgeContainer}>
          <BadgeCustom
            title={
              entity?.status?.name || entity?.contact?.name || "Non disponible"
            }
            color="#ff9800"
          />
        </View>
      </View>
      <Appbar.Action
        icon="map-marker"
        color="white"
        onPress={() =>
          navigation.navigate("Map", {
            latitude: latitude,
            longitude: longitude,
            uniqueId: new Date().getTime(),
          })
        }
      />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center", // Centre verticalement le contenu
    marginLeft: 10, // Décale légèrement à gauche
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
  badgeContainer: {
    marginTop: 10,
    alignSelf: "flex-start", // Badge aligné à gauche
  },
});
