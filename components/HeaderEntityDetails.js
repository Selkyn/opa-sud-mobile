import React from "react";
import { Appbar } from "react-native-paper";
import GlobalStyles from "../styles/styles";
import { useNavigation } from "@react-navigation/native";

export default function HeaderEntityDetails({ entity, latitude, longitude }) {
  const navigation = useNavigation();

  const _goBack = () => navigation.goBack();

  return (
    <Appbar.Header style={{ backgroundColor: GlobalStyles.Colors.primary }}>
      <Appbar.BackAction color="white" onPress={_goBack} />
      <Appbar.Content color="white" title={entity?.name || "Non disponible"} />
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
