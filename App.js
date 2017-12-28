import React, {Component} from 'react';
import {Text, View, Alert} from 'react-native';
import {NotificationsAndroid} from 'react-native-notifications';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    componentDidMount() {


        NotificationsAndroid.setRegistrationTokenUpdateListener((deviceToken) => {
            //change the ip address to yair's server
            fetch('http://172.20.10.2:8080/registerToken', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: deviceToken,
                }),
            })
        });

        //Listener for cases when the application is open and notification arrive
        NotificationsAndroid.setNotificationReceivedListener((notification) => {

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetch('http://172.20.10.2:8080/sendLocation', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        }),
                    })
                }
            );

            Alert.alert("-- APPLICATION IS OPEN --\nReceieved Notification");
        });
        //Listener for cases when the application is closed
        NotificationsAndroid.setNotificationOpenedListener((notification) => {
            Alert.alert("-- APPLICATION WAS CLOSED --\nReceieved Notification");
        });
    }

    render() {
        return (
            <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
            </View>
        );
    }


}
