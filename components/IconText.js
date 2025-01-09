import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Avatar, Button, Card, Text, List } from "react-native-paper";
import GlobalStyles from "../styles/styles";
import { Linking } from 'react-native';


export default function IconText({ icon, text, emailOrPhone }) {
    const makePhoneCall = (phoneNumber) => {
        const formattedNumber = `tel:${phoneNumber}`;
        Linking.openURL(formattedNumber).catch((err) =>
          console.error('Failed to make a call:', err)
        );
      };

      const openEmailApp = (emailAddress) => {
        const emailUrl = `mailto:${emailAddress}`;
        Linking.openURL(emailUrl).catch((err) =>
          console.error('Failed to open email app:', err)
        );
      };

      const emailOrPhoneFunction= (emailOrPhone) => {
        if (emailOrPhone.includes("@")) {
          return openEmailApp(emailOrPhone);
        } else {
          return makePhoneCall(emailOrPhone);
        }
      }
      
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
      }}
    >
<TouchableOpacity
  onPress={() => emailOrPhoneFunction(emailOrPhone)}
  disabled={!emailOrPhone || (!emailOrPhone.includes("@") && !/^\+?\d{7,15}$/.test(emailOrPhone)) || (emailOrPhone.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone))}
  style={{
    opacity: !emailOrPhone || 
            (!emailOrPhone.includes("@") && !/^\+?\d{7,15}$/.test(emailOrPhone)) || 
            (emailOrPhone.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone)) 
            ? 0.5 : 1,
  }}
>
      <Avatar.Icon
        size={45}
        icon={icon}
        color={GlobalStyles.Colors.primary}
        style={{
          backgroundColor: "transparent",
          marginRight: 10,
        }}
      />
      </TouchableOpacity>
      <Text variant="bodyMedium">{text || "Non disponible"}</Text>
    </View>
  );
}
