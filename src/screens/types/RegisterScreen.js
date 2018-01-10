import React from "react";
import {View, TextInput, Text, Button} from 'react-native-ui-lib';
import {Alert, Picker, ScrollView} from "react-native";


function validator(state) {
    let valid = true;
    if (parseInt(state.age) < 1) {
        valid = false
    }
    if (state.gender === "gender") {
        valid = false
    }
    if ((state.password !== state.passwordAgain) ||
        (state.password === undefined) ||
        (state.passwordAgain === undefined)) {
        valid = false
    }
    if (state.userName === undefined) {
        valid = false
    }
    return valid


}

export default class RegisterScreen extends React.Component {

    handleSubmit() {
        let valid = validator(this.state);
        if (valid === true) {
            this.props.navigator.push({
                screen: 'example.RegisterQuestionnaire',
                passProps: {loginState: this.state}
            });
        }
        else {
            Alert.alert('Register failed!', 'please correct your details',);
        }
    }

    constructor(props) {
        super(props);
        this.state = {gender: "MALE", age: "25"};
    }


    render() {
        let temp = [];
        temp.push("0");
        for (let i = 18; i < 120; i++) {
            temp.push(i.toString());
        }
        let serviceItems = temp.map((s, i) => {
            if (i === 0) {
                return <Picker.Item key={i} value={s} label={"select age"}/>
            }
            else {
                return <Picker.Item key={i} value={s} label={s}/>
            }
        });
        return (
            <ScrollView>
                <View flex paddingH-15>
                    <Text blue50 text20>Register</Text>
                    <View marginT-15/>
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
                        style={{height: 120}} itemStyle={{height: 120}}
                        selectedValue={this.state.gender}
                        onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
                        <Picker.Item label="select gender" value="gender"/>
                        <Picker.Item label="male" value="MALE"/>
                        <Picker.Item label="female" value="FEMALE"/>
                    </Picker>
                    <View marginT-5/>
                    <Picker
                        style={{height: 120}} itemStyle={{height: 120}}
                        selectedValue={this.state.age}
                        onValueChange={(itemValue, itemIndex) => this.setState({age: itemValue})}>
                        {serviceItems}
                    </Picker>
                    <View marginT-15/>
                    <View center>
                        <Button
                            onPress={() => {
                                this.handleSubmit();
                            }}
                            text70
                            white
                            background-orange30
                            label="Next"/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

