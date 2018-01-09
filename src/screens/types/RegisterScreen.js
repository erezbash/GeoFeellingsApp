import React from "react";
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {Alert, Picker} from "react-native";
import {handleRegister} from "../../notifcations/androidHandler";


var radio_props = [
    {label: 'male', value: 0 },
    {label: 'female', value: 1 }
];

function validator(state){
    let valid = true;
    if(parseInt(state.age) < 1){
        valid = false
    }
    if(state.gender === "gender"){
        valid = false
    }
    if((state.password !== state.passwordAgain) ||
        (state.password === undefined) ||
        (state.passwordAgain === undefined)){
        valid = false
    }
    if(state.userName === undefined){
        valid = false
    }
    return valid


}
export default class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        //this.state.gender = "gender";
        //this.state.age = "0"
        this.state.gender = "MALE";
        this.state.age = "25"
    }


    render() {
        let temp = [];
        temp.push("0");
        for (i = 18; i < 120; i++) {
            temp.push(i.toString());
        }
        let serviceItems = temp.map( (s, i) => {
            if(i === 0){
                return <Picker.Item key={i} value={s} label={"select age"} />
            }
            else{
                return <Picker.Item key={i} value={s} label={s} />
            }
        });
        return (
            <View flex paddingH-25 paddingT-20>
                <Text blue50 text20>Register</Text>
                <View marginT-30 />
                <TextInput
                    text50 dark10
                    placeholder="username"
                    onChangeText={(text) => this.setState({userName: text})}
                />
                <TextInput
                    text50 dark10 secureTextEntry
                    placeholder="password"
                    onChangeText={(text) => this.setState({password: text})}
                />
                <TextInput
                    text50 dark10 secureTextEntry
                    placeholder="passwordAgain"
                    onChangeText={(text) => this.setState({passwordAgain: text})}
                />
                <Picker
                    selectedValue={this.state.gender}
                    onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
                    <Picker.Item label="select gender" value="gender" />
                    <Picker.Item label="male" value="MALE" />
                    <Picker.Item label="female" value="FEMALE" />
                </Picker>
                <Picker
                    selectedValue={this.state.age}
                    onValueChange={(itemValue, itemIndex) => this.setState({age: itemValue})}>
                    {serviceItems}
                </Picker>
                <View center>
                    <Button
                        onPress={() => {
                            let valid = validator(this.state)
                            if (valid === true){
                                let tempState = JSON.parse(JSON.stringify(this.state));
                                delete tempState.passwordAgain;
                                handleRegister(JSON.stringify(tempState),(responseJson) => {
                                    if (responseJson.status === 'CREATED'){
                                        Alert.alert(
                                            'Thanks!',
                                            'Register successfully',
                                            [{text: 'OK', onPress: () => {
                                                        this.props.navigator.pop({
                                                            animated: true,
                                                            animationType: 'fade'})}}],
                                            {cancelable: false}
                                        );
                                    }
                                    else if(responseJson.status === 'CONFLICT'){
                                        Alert.alert( 'CONFLICT!', 'Register fail',);
                                    }

                                });
                            }
                            else{
                                Alert.alert('Unvalid!', 'please correct your details',);
                            }
                        }}
                        text70
                        white
                        background-orange30
                        label="Register"/>
                </View>
            </View>
        );
    }




}

