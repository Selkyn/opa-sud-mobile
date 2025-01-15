import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TextBoldCustom({contentBold}) {
    return (
        <Text style={styles.text}>{contentBold} : </Text>
    )
}

const styles = StyleSheet.create({
    text : {
        fontWeight: "bold",
    }
})