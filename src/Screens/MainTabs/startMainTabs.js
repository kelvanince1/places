import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';

const wDim = Dimensions.get('window');
const fixedWidth = Math.round(wDim.width * wDim.scale * 0.8);

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-map" : 'ios-map', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : "ios-share", 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : "ios-menu", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "places.FindPlaceScreen",
                    label: "Find Place",
                    title: "Find Place",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "places.SharePlaceScreen",
                    label: "Share Place",
                    title: "Share Place",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                }
            ],

            tabsStyle: {
              tabBarSelectedButtonColor: 'orange'
            },

            appStyle: {
              tabBarSelectedButtonColor: 'orange'
            },

            drawer: {
                left: {
                    screen: "places.SideDrawer",
                    fixedWidth
                }
            }
        });
    });
};

export default startTabs;
