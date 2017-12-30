import React from "react";
import {StyleSheet, Button, KeyboardAvoidingView, Text, View, Image, ScrollView, TextInput} from "react-native";
import {startApp} from "../../app";
import UserInput from "../../components/UserInput";

export default class LoginScreen extends React.Component {

    render() {
        return (
            <ScrollView style={{paddingTop: 20}}>
                <UserInput source={require("../../../img/username.png")}
                           autoCapitalize={'sentences'}
                           placeholder='Username'/>
                <View style={{margin: 7}}/>
                <UserInput source={require("../../../img/username.png")}
                           autoCapitalize={'none'}
                           placeholder='Password'/>
                <View style={{padding: 20}}>
                <Button
                    onPress={() => startApp('after-login')}
                    title="Submit"
                />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    btnEye: {
        position: 'absolute',
        top: 55,
        right: 28,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(255,255,0,0.2)',
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 20,
    }
});
