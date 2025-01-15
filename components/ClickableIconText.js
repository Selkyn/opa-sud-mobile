import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Text } from "react-native-paper";
import GlobalStyles from "../styles/styles";
import { Linking } from "react-native";

export default function ClickableIconText({ icon, text, emailOrPhone, onPressAction }) {
  const makePhoneCall = (phoneNumber) => {
    const formattedNumber = `tel:${phoneNumber}`;
    Linking.openURL(formattedNumber).catch((err) =>
      console.error("Failed to make a call:", err)
    );
  };

  const openEmailApp = (emailAddress) => {
    const emailUrl = `mailto:${emailAddress}`;
    Linking.openURL(emailUrl).catch((err) =>
      console.error("Failed to open email app:", err)
    );
  };

  const handlePress = () => {
    if (emailOrPhone) {
      if (emailOrPhone.includes("@")) {
        openEmailApp(emailOrPhone);
      } else {
        makePhoneCall(emailOrPhone);
      }
    } else if (onPressAction) {
      onPressAction();
    }
  };

  const isDisabled = !emailOrPhone || 
    (emailOrPhone.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone)) ||
    (!emailOrPhone.includes("@") && !/^\+?\d{7,15}$/.test(emailOrPhone));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={isDisabled}
        style={{ opacity: isDisabled ? 0.5 : 1 }}
      >
        <Avatar.Icon
          size={45}
          icon={icon}
          color={GlobalStyles.Colors.primary}
          style={styles.icon}
        />
      </TouchableOpacity>
      {text && (
              <Text variant="bodyMedium" style={styles.text}>
              {text || "Non disponible"}
            </Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    backgroundColor: "transparent",
    marginRight: 10,
  },
  text: {
    color: "#333",
  },
});
