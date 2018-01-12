import React from "react";
import {View, Text, Button, TextInput, Colors, Picker} from 'react-native-ui-lib';
import {Alert, ScrollView} from "react-native";
import _ from 'lodash';

const options = [
    {label: 'Male', value: 'MALE'},
    {label: 'Female', value: 'FEMALE'}
];


export default class RegisterScreen extends React.Component {

    validator() {
        let valid = true;
        if (this.state.age === undefined) {
            this.setState({ageError: 'This field is required'});
            valid = false
        }
        if (this.state.gender === undefined) {
            this.setState({genderError: 'This field is required'});
            valid = false
        }
        if (this.state.password !== this.state.passwordAgain) {
            this.setState({passwordAgainError: 'Password not match'});
            valid = false
        }
        if (this.state.passwordAgain === undefined || this.state.passwordAgain === '') {
            this.setState({passwordAgainError: 'This field is required'});
            valid = false
        }
        if (this.state.password === undefined || this.state.password === '') {
            this.setState({passwordError: 'This field is required'});
            valid = false
        }
        if (this.state.userName === undefined || this.state.userName === '') {
            this.setState({userNameError: 'This field is required'});
            valid = false
        }

        return valid
    }

    handleSubmit() {
        let valid = this.validator();
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
    }

    constructor(props) {
        super(props);
        this.state = {
            gender: undefined,
            genderError: '',
            age: undefined,
            ageError: '',
            userName: undefined,
            userNameError: '',
            password: undefined,
            passwordError: '',
            passwordAgain: undefined,
            passwordAgainError: ''
        };
    }


    render() {
        return (
                <View flex padding-10>
                    <ScrollView>
                    <Text blue50 text30>Register</Text>
                    <View marginT-5/>
                    <TextInput
                        containerStyle={{marginBottom: 5}}
                        floatingPlaceholder
                        text50
                        underlineColor={{focus: Colors.orange60, error: Colors.red50}}
                        placeholder="username"
                        error={this.state.userNameError}
                        onChangeText={(text) => this.setState({userName: text, userNameError:''})}
                    />
                    <TextInput
                        containerStyle={{marginBottom: 5}}
                        text50
                        dark10
                        floatingPlaceholder
                        secureTextEntry
                        placeholder="password"
                        error={this.state.passwordError}
                        underlineColor={{focus: Colors.orange60, error: Colors.red50}}
                        onChangeText={(text) => this.setState({password: text, passwordError:''})}
                    />
                    <TextInput
                        containerStyle={{marginBottom: 5}}
                        text50
                        dark10
                        floatingPlaceholder
                        secureTextEntry
                        placeholder="passwordAgain"
                        error={this.state.passwordAgainError}
                        underlineColor={{focus: Colors.orange60, error: Colors.red50}}
                        onChangeText={(text) => this.setState({passwordAgain: text, passwordAgainError:''})}
                    />

                    <Picker
                        containerStyle={{marginBottom: 5}}
                        placeholder="Select Gender"
                        value={this.state.gender}
                        enableModalBlur={false}
                        onChange={item => this.setState({gender: item, genderError:''})}
                        topBarProps={{title: 'Select Your Gender'}}
                        error={this.state.genderError}
                    >
                        {_.map(options, option =>
                            <Picker.Item
                                key={option.value}
                                value={option}
                            />,
                        )}
                    </Picker>

                    <Picker
                        containerStyle={{marginBottom: 5}}
                        placeholder="Select Age"
                        value={this.state.age}
                        enableModalBlur={false}
                        onChange={item => this.setState({age: item, ageError:''})}
                        topBarProps={{title: 'Select Your Age'}}
                        error={this.state.ageError}
                    >
                        {_.range(18, 121).map(option =>
                            <Picker.Item
                                key={option}
                                value={{label: option, value: option}}
                            />,
                        )}
                    </Picker>
                    </ScrollView>
                    <View marginT-5 center>
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
        );
    }
}

