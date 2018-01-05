import React from 'react';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {startApp} from "../../app";


export default class HomeScreen extends React.Component  {
    constructor(props) {
        super(props);

        this.state = {
            latitude: "",
            longitude: "",
            error: "",
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: "",
                });
            },
            () => {},
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    render() {
        return (
            <View flex paddingH-25 paddingT-120>
                <Text blue50 text20>Home Screen</Text>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                <Button
                    onPress={() => {
                        const to = 'hidden';
                        startApp('login')
                    }}
                    text70
                    white
                    background-orange30
                    label="Logout"
                />
            </View>



        );
    }
}