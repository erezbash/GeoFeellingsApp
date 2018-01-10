import React from "react";
import PropTypes from 'prop-types';
import Questionnaire from "../../components/Questionnaire";
import {Alert} from "react-native";
import {handleRegister} from "../../notifcations/androidHandler";

export default class RegisterQuestionnaire extends React.Component {

    static propTypes = {
        loginState: PropTypes.any,
    };

    render() {
        return (
            <Questionnaire
                pathToFetch='admin/question'
                onSubmit={(msg) => {
                    const loginState = {
                        questionnaireAnswer: msg,
                        userName: this.props.loginState.userName,
                        password: this.props.loginState.password,
                        gender: this.props.loginState.gender,
                        age: this.props.loginState.age
                    };
                    handleRegister(JSON.stringify(loginState), (responseJson) => {
                        if (responseJson.status === 'CREATED') {
                            Alert.alert(
                                'Thanks!',
                                'Register successfully',
                                [{
                                    text: 'OK', onPress: () => {
                                        this.props.navigator.popToRoot({
                                            animated: true,
                                            animationType: 'fade',
                                        });
                                    }
                                }],
                                {cancelable: false}
                            );
                        }
                        else if (responseJson.status === 'CONFLICT') {
                            Alert.alert('Register failed', 'User name taken',);
                        }

                    });
                }
                }/>)
    }
}