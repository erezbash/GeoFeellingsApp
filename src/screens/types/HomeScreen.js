import React from 'react';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {startApp, clearToken, token} from "../../app";
import twitter, {auth} from 'react-native-twitter';
import {Alert, Linking} from "react-native";


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
                <Text>id: {token}</Text>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                <Button
                    onPress={() => {
                        const to = 'hidden';
                        clearToken();
                        startApp('login')
                    }}
                    text70
                    white
                    background-orange30
                    label="Logout"
                />

                <Button
                    onPress={() =>
                        auth({consumerKey: "yRm6u04SFsTgYxDMyqHSrTvWc", consumerSecret: "pU1LYQ3o6kfyuDyOlexvckDmjr5EF6q7YE5teLRidsqA43Bkb3"}, "geofellingsapp://home/1")
                            .then((accessToken, accessTokenSecret, id, name) => this.setState({accessToken:accessToken,accessTokenSecret: accessTokenSecret,id: id,name: name}))}
                    text70
                    white
                    background-orange30
                    label="Connect Twitter"
                />
            </View>



        );
    }
}