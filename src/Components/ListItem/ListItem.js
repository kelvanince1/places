import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const listItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Image resizeMode='cover' style={styles.placeImage} source={props.PlaceImage} />
      <Text>{props.placeName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee"
  },
  placeImage: {
    marginRight: 8,
    height: 30,
    width: 30
  }
});

export default listItem;
