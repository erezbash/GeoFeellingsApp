import {Navigation} from 'react-native-navigation';
import {DetailsScreen, HomeScreen} from "../../MainScreen";

export function registerScreens() {
    Navigation.registerComponent('example.Home', () => HomeScreen);
    Navigation.registerComponent('example.Details', () => DetailsScreen);
}