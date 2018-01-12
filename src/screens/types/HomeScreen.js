import React from 'react';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {startApp, clearToken} from "../../app";
import TwitterLogin from "../../components/TwitterLogin";
import {Image, ScrollView} from "react-native";


export default class HomeScreen extends React.Component {
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
            () => {
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    }

    render() {
        return (
            <ScrollView>
            <View flex paddingT-5 top>
                <View center>
                    <Text blue50 text20>Profile</Text>
                    <Text text30>James Bond</Text>
                    <Image
                        style={{borderRadius:50, width: 100, height: 100}}
                        source={require('../../../img/defaultAvatar.png')} />
                    <Button
                        onPress={() => {
                            clearToken();
                            startApp('login')
                        }}
                        text90
                        labelStyle={{fontWeight: '500'}}
                        style={{marginBottom: 20, width: 100}}
                        size="small"
                        background-red30
                        enableShadow
                        white
                        label="Logout"
                    />
                </View>
                <View padding-10>
                    <Text text50>Details:</Text>
                    <Text>Gender: Male</Text>
                    <Text>Age: 36</Text>
                    <Text>Latitude: {this.state.latitude}</Text>
                    <Text>Longitude: {this.state.longitude}</Text>
                </View>
                <View padding-10>
                    <Text text50>Social Networks:</Text>
                    <TwitterLogin/>
                </View>


            </View>
            </ScrollView>


        );
    }
}