import React from 'react';
import { Card } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import GlobalStyles from '../styles/styles';

export default function CustomCardContent({ children}) {
  return (
    <View style={[styles.defaultStyle]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    // backgroundColor: GlobalStyles.Colors.backgroundLight,
    padding: 16,
    backgroundColor: "#FFFFFF",
    // borderRadius: 5,
  },
});