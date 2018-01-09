import {Alert, AsyncStorage, Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {NotificationsAndroid} from "react-native-notifications/index.android";
import NotificationsIOS from "react-native-notifications/index.ios";
import {handleNotificationOpenApp, handleRegistrationToken} from "./notifcations/androidHandler";
import {registerScreens} from "./screens";

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
            Navigation.startTabBasedApp({
                tabs: [
                    {
                        label: 'One',
                        icon: require('../img/one.png'),
                        screen: 'example.Home', // this is a registered name for a screen
                        title: 'Screen One'
                    },
                    {
                        label: 'Two',
                        icon: require('../img/one.png'),
                        screen: 'example.Details',
                        title: 'Screen Two'
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
