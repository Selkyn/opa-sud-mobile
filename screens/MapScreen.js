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
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import axios from "axios";
import BottomSheetMap from "../components/BottomSheetMap";
import useFindMarker from "../hooks/useFindMarker";

export default function MapScreen() {
  const [initialRegion, setInitialRegion] = useState({
    latitude: 44.125, // Latitude d'Alès
    longitude: 4.082,
    latitudeDelta: 10, // Zoom rapproché
    longitudeDelta: 10,
  });

  // const [initialRegion, setInitialRegion] = useState(null);

  const [clientMarkers, setClientMarkers] = useState([]);
  const [vetMarkers, setVetMarkers] = useState([]);
  const [osteoMarkers, setOsteoMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedVet, setSelectedVet] = useState(null);
  const [selectedOsteo, setSelectedOsteo] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  // const [reloadKey, setReloadKey] = useState(0);

  const navigation = useNavigation();
  const mapRef = useRef(null);
  const route = useRoute();
  const { latitude, longitude, uniqueId } = route.params || {};

  const sheetRef = useRef(null);

  const onMapReady = () => {
    setIsMapReady(true);
  };

  // Ouverture du bottom sheet
  const openSheet = (item, type) => {
    if (type === "vet") {
      setSelectedVet(item);
      setSelectedOsteo(null);
      setSelectedClient(null);
    } else if (type === "osteo") {
      setSelectedOsteo(item);
      setSelectedVet(null);
      setSelectedClient(null);
    } else if (type === "client") {
      setSelectedClient(item);
      setSelectedVet(null);
      setSelectedOsteo(null);
    }

    if (sheetRef.current) {
      sheetRef.current.expand();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBottomSheet(true); // Affiche le BottomSheet après 1 seconde
    }, 1000);

    return () => clearTimeout(timeout); // Nettoie le timeout
  }, []);
  // useEffect(() => {

  //   setReloadKey((prevKey) => prevKey + 1);
  // }, [clientMarkers, vetMarkers, osteoMarkers]);

  useEffect(() => {
    if ((selectedClient || selectedVet || selectedOsteo) && sheetRef.current) {
      if (sheetRef.current) {
        sheetRef.current.expand();
      }
    }
  }, [selectedClient, selectedVet, selectedOsteo]);

  useEffect(() => {
    setClientMarkers([]); // Réinitialise les markers
    setVetMarkers([]);
    setOsteoMarkers([]);
    fetchClients(); // Recharge les données
    fetchOsteoCenters();
    fetchVetCenters();
  }, []);

  const snapPoints = useMemo(() => ["3%", "45%"], []);

  useEffect(() => {
    if (latitude && longitude && isMapReady && mapRef.current) {
      // Dézoom initial
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 2, // Dézoom
          longitudeDelta: 0.05,
        },
        1000 // Durée de l'animation de dézoom
      );

      // zoom
      setTimeout(() => {
        mapRef.current.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 0.005, // Zoom rapproché
            longitudeDelta: 0.005,
          },
          1000 // Durée de l'animation de zoom
        );
      }, 1200);

    } else if (currentPosition && isMapReady && mapRef.current) {
      // Zoom sur la position actuelle
      mapRef.current.animateToRegion(
        {
          ...currentPosition,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        1000
      );
    }
  }, [latitude, longitude, uniqueId, currentPosition, isMapReady]);

  // useEffect(() => {
  //   if (latitude && longitude && mapRef.current) {
  //     mapRef.current.animateToRegion({
  //       latitude,
  //       longitude,
  //       latitudeDelta: 0.005, // Zoom plus proche
  //       longitudeDelta: 0.005,
  //     });
  //   }
  // }, [latitude, longitude, uniqueId]);

  useEffect(() => {
    if (!isLoading && latitude && longitude) {
      const matchingMarker = clientMarkers.find(
        (marker) =>
          marker.coordinate.latitude === latitude &&
          marker.coordinate.longitude === longitude
      );

      if (matchingMarker) {
        openSheet(matchingMarker, "client");
      }
    }
  }, [latitude, longitude, clientMarkers, uniqueId]);

  useEffect(() => {
    if (!isLoading && latitude && longitude) {
      const matchingMarker = vetMarkers.find(
        (marker) =>
          marker.coordinate.latitude === latitude &&
          marker.coordinate.longitude === longitude
      );

      if (matchingMarker) {
        openSheet(matchingMarker, "vet");
      }
    }
  }, [latitude, longitude, vetMarkers, uniqueId]);

  useEffect(() => {
    if (!isLoading && latitude && longitude) {
      const matchingMarker = osteoMarkers.find(
        (marker) =>
          marker.coordinate.latitude === latitude &&
          marker.coordinate.longitude === longitude
      );

      if (matchingMarker) {
        openSheet(matchingMarker, "osteo");
      }
    }
  }, [latitude, longitude, osteoMarkers, uniqueId, isLoading]);

  const findMarker = (marker, entity) => {
    useEffect(() => {
      if (latitude && longitude) {
        const matchingMarker = marker.find(
          (marker) =>
            marker.coordinate.latitude === latitude &&
            marker.coordinate.longitude === longitude
        );

        if (matchingMarker) {
          openSheet(matchingMarker, entity);
        }
      }
    }, [latitude, longitude, marker, uniqueId]);
  };

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       Alert.alert("Erreur", "Permission refusée. La localisation est nécessaire.");
  //       console.error("Permission refusée pour la localisation");
  //       return;
  //     }
  //     let currentLocation = await Location.getCurrentPositionAsync({});
  //     // console.log("Localisation actuelle :", currentLocation);
  //     setLocation(currentLocation);
  //   })();
  // }, []);
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Erreur",
            "Permission refusée. La localisation est nécessaire pour afficher votre position."
          );
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setCurrentPosition({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      } catch (error) {
        console.error("Erreur lors de l'obtention de la localisation :", error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   if (currentPosition && mapRef.current) {
  //     mapRef.current.animateToRegion({
  //       latitude: currentPosition.latitude,
  //       longitude: currentPosition.longitude,
  //       latitudeDelta: 0.005,
  //       longitudeDelta: 0.005,
  //     }, 1000); // Animation d'une seconde
  //   }
  // }, [currentPosition]);

  // useEffect(() => {
  const fetchClients = async () => {
    try {
      const response = await axios.get("http://192.168.1.79:4000/clients");
      const clients = response.data;

      const newMarkers = clients
        .filter(
          (client) =>
            client.latitude &&
            client.longitude &&
            client.patients &&
            client.patients.length > 0
        )
        .map((client) => ({
          id: client.id,
          title: client?.lastname + " " + client?.firstname,
          description: `${client.adress} ${client.postal} ${client.city}`,
          patients: client.patients,
          coordinate: {
            latitude: client.latitude,
            longitude: client.longitude,
          },
        }));
      setClientMarkers(newMarkers);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les clients.");
      console.error("Erreur lors de la récupération des clients :", error);
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  //   fetchClients();
  // }, []);

  // useEffect(() => {
  const fetchVetCenters = async () => {
    try {
      const response = await axios.get("http://192.168.1.79:4000/vet-centers");
      const vetCenters = response.data;

      const newVetMarkers = vetCenters
        .filter((center) => center.latitude && center.longitude)
        .map((center) => ({
          id: center.id,
          title: center.name,
          description: `${center.adress} ${center.postal} ${center.city}`,
          patients: center.patients,
          coordinate: {
            latitude: center.latitude,
            longitude: center.longitude,
            ...center,
          },
        }));

      setVetMarkers(newVetMarkers);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les centres vétérinaires.");
      console.error(
        "Erreur lors de la récupération des centres vétérinaires :",
        error
      );
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  //   fetchVetCenters();
  // }, []);

  // useEffect(() => {
  const fetchOsteoCenters = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.79:4000/osteo-centers"
      );
      const osteoCenters = response.data;

      const newOsteoMarkers = osteoCenters
        .filter((center) => center.latitude && center.longitude)
        .map((center) => ({
          id: center.id,
          title: center.name,
          description: `${center.adress} ${center.postal} ${center.city}`,
          patients: center.patients,
          coordinate: {
            latitude: center.latitude,
            longitude: center.longitude,
          },
        }));

      setOsteoMarkers(newOsteoMarkers);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les centres d'ostéopathie.");
      console.error(
        "Erreur lors de la récupération des centres d'ostéopathie :",
        error
      );
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  //   fetchOsteoCenters();
  // }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Chargement des clients...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        //  key={reloadKey}
        ref={mapRef}
        style={styles.map}
        pointerEvents="box-none"
        onMapReady={onMapReady}
        // initialRegion={location ? location : region}
        // region={initialRegion}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        // onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {clientMarkers.length > 0 &&
          clientMarkers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              onPress={() => openSheet(marker, "client")}
            />
          ))}

        {vetMarkers.length > 0 &&
          vetMarkers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              pinColor="blue"
              onPress={() => openSheet(marker, "vet")}
            />
          ))}

        {osteoMarkers.length > 0 &&
          osteoMarkers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              pinColor="green"
              onPress={() => openSheet(marker, "osteo")}
            />
          ))}
      </MapView>

      {isMapReady && (
        <BottomSheet
          // key={`${selectedClient?.id || selectedVet?.id || selectedOsteo?.id}`}
          style={{ paddingHorizontal: 20 }}
          ref={sheetRef}
          index={1}
          snapPoints={snapPoints}
          // enablePanDownToClose={true}
          // onChange={(index) => {
          //   if (index === -1) sheetRef.current?.close(); // Gère la fermeture si nécessaire
          // }}
        >
          {selectedClient ? (
            <BottomSheetMap
              selectedEntity={selectedClient}
              adress={selectedClient.adress}
              screen={"ClientCenterDetails"}
              titleName={"Client"}
              bgColor={"#fee2e2"}
              colorText={"#b91c1c"}
              showDetails={false}
            />
          ) : selectedVet ? (
            <BottomSheetMap
              selectedEntity={selectedVet}
              screen={"VetCenterDetails"}
              titleName={"Centre Vétérinaire"}
              bgColor={"#dbeafe"}
              colorText={"#1e40af"}
              showDetails={true}
            />
          ) : selectedOsteo ? (
            <BottomSheetMap
              selectedEntity={selectedOsteo}
              screen={"OsteoCenterDetails"}
              titleName={"Centre Ostéopathe"}
              bgColor={"#d1fae5"}
              colorText={"#065f46"}
              showDetails={true}
            />
          ) : null}
        </BottomSheet>
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
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "relative",
  },
});
