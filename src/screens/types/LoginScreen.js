import React from "react";
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {startApp} from "../../app";

export default class LoginScreen extends React.Component {

    render() {
        return (
            <View flex paddingH-25 paddingT-120>
                <Text blue50 text20>Welcome</Text>
                <TextInput text50 placeholder="username" dark10/>
                <TextInput text50 placeholder="password" secureTextEntry dark10/>
                <View marginT-100 center>
                    <Button
                        onPress={() => startApp('after-login')}
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

