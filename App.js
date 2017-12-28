import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Alert} from 'react-native';
import {NotificationsAndroid} from 'react-native-notifications';

export default class App extends Component {
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
                 }).then((response) => response.json())
                    .then((responseJson) => {
                      Alert.alert("Token sent to server succesfully!");
                    })
                    .catch((error) => {
                      Alert.alert("Token sending failed.");
                    });;
            });

          //Listener for cases when the application is open and notification arrive
          NotificationsAndroid.setNotificationReceivedListener((notification) => {
                Alert.alert("-- APPLICATION IS OPEN --\nReceieved Notification");
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