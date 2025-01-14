import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Portal,
  Modal,
  Button,
  IconButton,
  Text,
  List,
  Checkbox,
  Badge,
  Avatar,
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import ButtonCustom from "./ButtonCustom";
import GlobalStyles from "../styles/styles";

export default function FilterModalEntity({
  title,
  options,
  onSelectionChange,
  icon
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); // IDs des éléments sélectionnés

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  // const toggleCheckbox = (id) => {
  //   setSelectedItems((prev) =>
  //     prev.includes(id)
  //       ? prev.filter((itemId) => itemId !== id) // Retirer si déjà sélectionné
  //       : [...prev, id] // Ajouter si non sélectionné
  //   );
  // };

  // Appliquer le filtre et transmettre les éléments sélectionnés au parent
  // const applyFilter = () => {
  //   onSelectionChange(selectedItems); // Transmet les éléments sélectionnés au parent
  //   hideModal(); // Ferme la modale
  // };

  const toggleCheckbox = (id) => {
    const updatedSelection = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id) // Retirer si déjà sélectionné
      : [...selectedItems, id]; // Ajouter si non sélectionné

    setSelectedItems(updatedSelection);
    onSelectionChange(updatedSelection); // Appliquer immédiatement le filtre
  };

  return (
    <View>
      <View>
        <IconButton
          icon="filter-variant"
          iconColor="white"
          size={24}
          onPress={showModal}
          style={{ position: "relative" }}
        />
        {selectedItems.length > 0 && (
          <Badge
            style={{
              position: "absolute",
              top: -1,
              right: 1,
            }}
          >
            {selectedItems.length}
          </Badge>
        )}
      </View>
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <ScrollView>
            <List.Accordion
              title={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Avatar.Icon
                    icon={icon}
                    size={24}
                    style={{
                      marginRight: 10,
                      backgroundColor: GlobalStyles.Colors.primary,
                    }}
                  />
                  <Text style={{ fontSize: 16, color: "#333" }}>
                    {title}
                  </Text>
                </View>
              }
            >
              {options.map((option) => (
                <View key={option.id} style={styles.checkboxContainer}>
                  <Checkbox
                    color={GlobalStyles.Colors.primary}
                    status={
                      selectedItems.includes(option.id)
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => toggleCheckbox(option.id)}
                  />
                  <Text style={styles.optionText}>{option.name}</Text>
                </View>
              ))}
            </List.Accordion>
            
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    width: "60%",
    alignSelf: "flex-end",
    borderRadius: 8,
    elevation: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  optionText: {
    marginLeft: 8,
    fontSize: 12,
  },
});
