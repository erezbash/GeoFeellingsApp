import {AsyncStorage, Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import NotificationsIOS from "react-native-notifications/index.ios";
import {handleRegistrationToken} from "./notifcations/androidHandler";
import {registerScreens} from "./screens";
import Questionnaire from "./components/Questionnaire";
import LocationExample from './NativeMethod';

registerScreens();

if (Platform.OS === 'android') {
    // NotificationsAndroid.setRegistrationTokenUpdateListener(handleRegistrationToken);
    // NotificationsAndroid.setNotificationReceivedListener(handleNotificationOpenApp);
    // NotificationsAndroid.setNotificationOpenedListener(handleNotificationOpenApp);

}

if (Platform.OS === 'ios') {
    NotificationsIOS.addEventListener('remoteNotificationsRegistered', handleRegistrationToken);
    NotificationsIOS.requestPermissions();
}

export var token;

export async function setToken(_token) {
    token = _token;
    await AsyncStorage.setItem('userID', token);
}

export async function clearToken() {
    await AsyncStorage.removeItem('userID');
}

export function startApp(root) {

    switch (root) {
        case 'login':
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'example.LoginScreen',
                    title: 'Login',
                }
            });
            return;
        case 'after-login':
            if (Platform.OS === 'android') {
                LocationExample.startSendLocation(token);
            }
            Navigation.startTabBasedApp({
                tabs: [
                    {
                        label: 'Profile',
                        icon: require('../img/tabs/profile.png'),
                        selectedIcon: require('../img/tabs/profileSelected.png'),
                        screen: 'example.Home',
                        title: 'Profile View'
                    },
                    {
                        label: 'Questionnaire',
                        icon: require('../img/done.png'),
                        screen: 'example.Details',
                        title: 'Questionnaire'
                    },
                    {
                        label: 'Notifications',
                        icon: require('../img/tabs/notifications.png'),
                        selectedIcon: require('../img/tabs/notificationsSelected.png'),
                        screen: 'example.NotificationsScreen',
                        title: 'Notifications'
                    }

                ]
            });
            return;
    }

}

async function check_token(){
    try {
        token = await AsyncStorage.getItem('userID');
        if (token !== null) {
            if (typeof token === 'string') {
                startApp('after-login');
            }
            else{
                startApp('login');
            }
        }
        else{
            startApp('login');
        }
    } catch (error) {
        // Error retrieving data
    }

}

check_token();
