import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderEntityDetails from "./HeaderEntityDetails";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Avatar, List } from "react-native-paper";
import GlobalStyles from "../styles/styles";
import CustomCardContent from "./CustomCardContent";
import ModalPatientsList from "./ModalPatientList";
import IconText from "./IconText";
import AppointmentsSection from "./AppointmentsSection";

export default function CenterDetails({
  title,
  entityType,
  icon,
  staffs,
  staffName,
  appointment,
}) {
  const navigation = useNavigation();
  const LeftContentAnimal = (props) => (
    <Avatar.Icon
      {...props}
      icon={icon}
      style={{ backgroundColor: GlobalStyles.Colors.primary }}
    />
  );

  return (
    <View style={styles.container}>
      <HeaderEntityDetails
        entity={entityType}
        latitude={entityType?.latitude || "Non disponible"}
        longitude={entityType?.longitude || "Non disponible"}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={{ flex: 1 }}
      >
        <Card style={styles.card} elevation={0}>
          <Card.Title title={title} left={LeftContentAnimal} />
          <Card.Content>
            <IconText
              icon="email"
              text={entityType.email}
              emailOrPhone={entityType.email}
            />
            <IconText
              icon="phone"
              text={entityType.phone}
              emailOrPhone={entityType.phone}
            />
            <Text variant="bodyMedium">
              {`${entityType.adress || "Non disponible"}, 
                ${entityType.postal || "Non disponible"} 
                ${entityType.city || "Non disponible"}
              `}
            </Text>
          </Card.Content>
        </Card>
        {entityType?.[staffs] && entityType?.[staffs].length > 0 ? (
          <List.Accordion
            title={staffName}
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="human"
                color="white"
                style={{
                  backgroundColor: GlobalStyles.Colors.primary,
                  marginLeft: 10,
                }}
              />
            )}
          >
            {entityType?.[staffs].map((staff) => (
              // <Card
              //   key={staff.id}
              //   style={{
              //     marginTop: 10,
              //     marginHorizontal: 10,
              //     borderRadius: 10,
              //     backgroundColor: GlobalStyles.Colors.backgroundLight
              //   }}
              // >
              <CustomCardContent key={staff.id} style={{ marginTop: 5 }}>
                {/* <View
                                      style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 5,
                                      }}>
                  <Avatar.Icon
                      size={24}
                      icon="stethoscope"
                      color={GlobalStyles.Colors.primary}
                      style={{
                        backgroundColor: "transparent",
                        marginRight: 10,
                      }}
                    /> */}

                <Text
                  variant="titleMedium"
                  style={{ fontWeight: "bold", marginBottom: 5 }}
                >
                  Dr {staff.lastname || "Non disponible"}{" "}
                  {staff.firstname || "Non disponible"}
                </Text>
                {/* </View> */}
                <IconText
                  icon="email"
                  text={staff.email}
                  emailOrPhone={staff.email}
                />
                <IconText
                  icon="phone"
                  text={staff.phone}
                  emailOrPhone={staff.phone}
                />
              </CustomCardContent>
            ))}
          </List.Accordion>
        ) : null}
        <AppointmentsSection
          entity={entityType}
          entityAppointments={appointment}
        />
        <ModalPatientsList selectedEntity={entityType} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 16,
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
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: GlobalStyles.Colors.backgroundLight,
  },
  mapButton: {
    margin: 20,
    borderRadius: 5,
  },
  scrollContent: {
    padding: 16,
  },
});
