import React from "react";
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {startApp} from "../../app";
import {handleLogin} from "../../notifcations/androidHandler";
import {Alert} from "react-native";

function validator(state){
    let valid = true;
    if(state.username === undefined){
        valid = false
    }
    else if(state.username === ""){
        valid = false
    }
    if(state.password === undefined){
        valid = false
    }
    else if(state.password === ""){
        valid = false
    }
    return valid;
}
export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View flex paddingH-25 paddingT-20>
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
                <View marginT-50 center>
                    <Button
                        onPress={() => {
                            if(validator(this.state) === true){
                                handleLogin(this.state.username, this.state.password)
                                startApp('after-login');
                            }
                            else{
                                Alert.alert('Unvalid!', 'empty cells',);
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

