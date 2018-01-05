import React from "react";
import {Alert, AsyncStorage} from 'react-native';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {startApp, setToken} from "../../app";

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View flex paddingH-25 paddingT-120>
                <Text blue50 text20>Welcome</Text>
                <View marginT-30 />
                <TextInput
                    text50 dark10
                    placeholder="username"
                    onChangeText={(text) => this.setState({username: text})}
                />
                <TextInput
                    text50 dark10 secureTextEntry
                    placeholder="password"
                    onChangeText={(text) => this.setState({password: text})}
                />
                <View marginT-100 center>
                    <Button
                        onPress={async () => {
                            try {
                                //token = GET request login(this.username, this.password)
                                var _token = 'adasd-123213dad-adasd3213-adad';
                                setToken(_token)
                                //await AsyncStorage.setItem('userID', 'erezbash');
                                await AsyncStorage.setItem('userID', _token);
                                startApp('after-login');
                            } catch (error) {
                                // Error saving data
                            }
                        }}
                        text70
                        white
                        background-orange30
                        label="Login"/>
                    <Button
                        onPress={() =>
                            this.props.navigator.push({
                                screen: 'example.RegisterScreen'
                            })
                        }
                        link
                        text70
                        orange30
                        label="Sign Up"
                        marginT-20
                    />
                </View>
            </View>
        );
    }
}

