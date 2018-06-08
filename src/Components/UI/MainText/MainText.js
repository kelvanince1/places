import React from 'react';
import { Text, StyleSheet } from 'react-native';

const mainText = (props) => (
  <Text style={styles.styleText}>{props.children}</Text>
);

const styles = StyleSheet.create({
  styleText: {
    color: 'black',
    backgroundColor: 'transparent'
  }
});

export default mainText;
