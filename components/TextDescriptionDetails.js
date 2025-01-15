import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TextBoldCustom from "./TextBoldCustom";
import TextCustom from "./TextCustom";
import IconCustom from "./IconCustom";

export default function TextDescriptionDetails({contentBold, contentText, icon}) {
    return (
        <View style={styles.container}>
            <IconCustom icon={icon}/>
            <TextBoldCustom contentBold={contentBold}/>
            <TextCustom contentText={contentText} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignContent:"center"
    }
})