import {Navigation} from 'react-native-navigation';
import DetailsScreen from "./types/DetailsScreen";
import HomeScreen from "./types/HomeScreen";
import LoginScreen from "./types/LoginScreen";
import RegisterScreen from "./types/RegisterScreen";
import RegisterQuestionnaire from "./types/RegisterQuestionnaire";
import NotificationsScreen from "./types/NotificationsScreen";
import QuestionnaireScreen from "./types/QuestionnaireScreen";

export function registerScreens() {
    Navigation.registerComponent('example.Home', () => HomeScreen);
    Navigation.registerComponent('example.Details', () => DetailsScreen);
    Navigation.registerComponent('example.LoginScreen', () => LoginScreen);
    Navigation.registerComponent('example.RegisterScreen', () => RegisterScreen);
    Navigation.registerComponent('example.RegisterQuestionnaire', () => RegisterQuestionnaire);
    Navigation.registerComponent('example.NotificationsScreen', () => NotificationsScreen);
    Navigation.registerComponent('example.QuestionnaireScreen', () => QuestionnaireScreen);
}