import React from "react";
import {View, TextInput, Text, Button} from 'react-native-ui-lib';

export default class RegisterScreen extends React.Component {

    render() {
        return (
                <View flex paddingH-25 paddingT-120>
                    <Text blue50 text20>Register</Text>
                    <TextInput text50 placeholder="username" dark10/>
                    <TextInput text50 placeholder="password" secureTextEntry dark10/>
                    <TextInput text50 placeholder="password" secureTextEntry dark10/>
                    <View marginT-100 center>
                        <Button
                            onPress={() => this.props.navigator.pop({
                                animated: true,
                                animationType: 'fade'
                            })}
                            text70
                            white
                            background-orange30
                            label="Register"/>
                    </View>
                </View>
        );
    }
}

