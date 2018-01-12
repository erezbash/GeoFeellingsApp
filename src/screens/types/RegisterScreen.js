import React from "react";
import {View, Text, Button, TextInput, Colors, Picker} from 'react-native-ui-lib';
import {Alert, ScrollView} from "react-native";
import _ from 'lodash';

const options = [
    {label: 'Male', value: 'MALE'},
    {label: 'Female', value: 'FEMALE'}
];

function validator(state) {
    let valid = true;
    if (state.age === undefined) {
        valid = false
    }
    if (state.gender === undefined) {
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
            let res = {
                gender: this.state.gender.value,
                age: this.state.age.value,
                userName: this.state.userName,
                password: this.state.password
            };
            this.props.navigator.push({
                screen: 'example.RegisterQuestionnaire',
                passProps: {loginState: res}
            });
        }
        else {
            Alert.alert('Register failed!', 'please correct your details',);
        }
    }

    constructor(props) {
        super(props);
        this.state = {gender: undefined, age: undefined, userName: undefined, password: undefined, passwordAgain:undefined};
    }


    render() {
        return (
            <ScrollView>
                <View flex paddingH-15>
                    <Text blue50 text20>Register</Text>
                    <View marginT-5/>
                    <TextInput
                        containerStyle={{marginBottom: 10}}
                        floatingPlaceholder
                        text50
                        underlineColor={{focus: Colors.orange60, error: Colors.purple50}}
                        placeholder="username"
                        onChangeText={(text) => this.setState({userName: text})}
                    />
                    <TextInput
                        containerStyle={{marginBottom: 10}}
                        text50 dark10 secureTextEntry
                        placeholder="password"
                        underlineColor={{focus: Colors.orange60, error: Colors.purple50}}
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    <TextInput
                        containerStyle={{marginBottom: 10}}
                        text50
                        dark10
                        secureTextEntry
                        placeholder="passwordAgain"
                        underlineColor={{focus: Colors.orange60, error: Colors.purple50}}
                        onChangeText={(text) => this.setState({passwordAgain: text})}
                    />

                    <Picker
                        placeholder="Select Gender"
                        value={this.state.gender}
                        enableModalBlur={false}
                        onChange={item => this.setState({gender: item})}
                        topBarProps={{title: 'Select Your Gender'}}
                    >
                        {_.map(options, option =>
                            <Picker.Item
                                key={option.value}
                                value={option}
                            />,
                        )}
                    </Picker>

                    <Picker
                        placeholder="Select Age"
                        value={this.state.age}
                        enableModalBlur={false}
                        onChange={item => this.setState({age: item})}
                        topBarProps={{title: 'Select Your Age'}}
                    >
                        {_.range(18, 121).map(option =>
                            <Picker.Item
                                key={option}
                                value={{label: option, value:option}}
                            />,
                        )}
                    </Picker>
                    <View marginT-5/>
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

