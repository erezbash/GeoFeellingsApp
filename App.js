import React, { Component } from 'react';
import {Button, Text,View,Alert} from 'react-native';
import {NotificationsAndroid} from 'react-native-notifications';
import {
    StackNavigator,
} from 'react-navigation';

function handleRegistrationToken(deviceToken) {
    fetch('http://172.20.10.2:8080/registerToken', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: deviceToken,
        }),
    }).catch((error) => {
        Alert.alert("Error", error);
    });
}

export class App extends Component {

    componentDidMount() {
        const App = StackNavigator({
            Home: { screen: HomeScreen }
        });
        NotificationsAndroid.setRegistrationTokenUpdateListener(handleRegistrationToken);

        //Listener for cases when the application is open and notification arrive
        NotificationsAndroid.setNotificationReceivedListener((notification) => {
            const { navigate } = this.props.navigation;
            navigate('Home', { name: 'Jane' });
        });
        //Listener for cases when the application is closed
        NotificationsAndroid.setNotificationOpenedListener((notification) => {
            Alert.alert("-- APPLICATION WAS CLOSED --\nReceieved Notification");
        });
    }
    render() {
        return <View><Text> Hello </Text></View>;
    }
}