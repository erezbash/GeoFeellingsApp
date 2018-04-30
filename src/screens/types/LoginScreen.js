import React from "react";
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {handleLogin} from "../../notifcations/androidHandler";

export default class LoginScreen extends React.Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true
    };

    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Sign Up',
                id: 'SignUp',
                buttonFontSize: 14,
                buttonColor: 'orange',
                buttonFontWeight: '600'
            },
        ]
    };

    isValidLogin() {
        let valid = true;
        if (this.state.username === undefined || this.state.username === "") {
            this.setState({usernameError: 'This field is required'});
            valid = false
        }
        if (this.state.password === undefined || this.state.password === "") {
            this.setState({passwordError: 'This field is required'});
            valid = false
        }
        return valid;
    }

    constructor(props) {
        super(props);
        this.state = {
            password: undefined,
            passwordError: '',
            username: undefined,
            usernameError: ''
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type === 'NavBarButtonPress' && event.id === 'SignUp') {
            this.props.navigator.push({
                screen: 'example.RegisterScreen'
            })
        }
    }

    render() {
        return (
            <View flex paddingH-25 paddingT-20>

                <Text blue50 text20 center>GeoFeelings</Text>
                <TextInput
                    text50 dark10
                    placeholder="username"
                    error={this.state.usernameError}
                    onChangeText={(text) => this.setState({username: text, usernameError: ''})}
                />
                <TextInput
                    text50 dark10 secureTextEntry
                    placeholder="password"
                    error={this.state.passwordError}
                    onChangeText={(text) => this.setState({password: text, passwordError: ''})}
                />
                <Button
                    onPress={() => {
                        if (this.isValidLogin())
                            handleLogin(this.state.username, this.state.password);
                    }}
                    text70
                    white
                    label="Login"/>
            </View>
        );
    }
}

