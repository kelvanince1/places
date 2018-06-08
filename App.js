import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AuthScreen from './src/Screens/Auth/Auth';
import SharePlaceScreen from './src/Screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/Screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/Screens/PlaceDetail/PlaceDetail';
import SideDrawer from "./src/Screens/SideDrawer/SideDrawer";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AuthScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
