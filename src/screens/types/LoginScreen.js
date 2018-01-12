import React from "react";
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {handleLogin} from "../../notifcations/androidHandler";

export default class LoginScreen extends React.Component {

    isValidLogin(){
        let valid = true;
        if(this.state.username === undefined || this.state.username === ""){
            this.setState({usernameError: 'This field is required'});
            valid = false
        }
        if(this.state.password === undefined || this.state.password === ""){
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
        }
    }

    render() {
        return (
            <View flex paddingH-25 paddingT-20>
                <Text blue50 text20>Welcome</Text>
                <View marginT-30 />
                <TextInput
                    text50 dark10
                    placeholder="username"
                    error={this.state.usernameError}
                    onChangeText={(text) => this.setState({username: text, usernameError:''})}
                />
                <TextInput
                    text50 dark10 secureTextEntry
                    placeholder="password"
                    error={this.state.passwordError}
                    onChangeText={(text) => this.setState({password: text, passwordError:''})}
                />
                <View marginT-50 center>
                    <Button
                        onPress={() => {
                            if(this.isValidLogin())
                                handleLogin(this.state.username, this.state.password);
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

