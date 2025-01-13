import React from 'react';
import { Card } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import GlobalStyles from '../styles/styles';

export default function CustomCardContent({ children, style }) {
  return (
    <View style={[styles.defaultStyle, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: GlobalStyles.Colors.backgroundLight,
    padding: 10,
    borderRadius: 5,
  },
});