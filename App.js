import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/Screens/Auth/Auth';
import SharePlaceScreen from './src/Screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/Screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/Screens/PlaceDetail/PlaceDetail';
import SideDrawer from "./src/Screens/SideDrawer/SideDrawer";
import configureStore from './src/Store/ConfigureStore';

const store = configureStore();

Navigation.registerComponent(
  'places.AuthScreen', () => AuthScreen,
  store,
  Provider
);

export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: 'places.AuthScreen',
    title: 'Login'
  }
});
