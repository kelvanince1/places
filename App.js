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
Navigation.registerComponent(
  "places.SharePlaceScreen",
  () => SharePlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "places.FindPlaceScreen",
  () => FindPlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "places.PlaceDetailScreen",
  () => PlaceDetailScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "places.SideDrawer",
  () => SideDrawer,
  store,
  Provider
);

export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: 'places.AuthScreen',
    title: 'Login'
  }
});
