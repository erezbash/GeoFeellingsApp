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
                pathToFetch='user/registerQuestionnaire'
                onSubmit={msg => {
                    Alert.alert(JSON.stringify(msg));
                    const loginState = {
                        questionnaireAnswer: msg,
                        userName: this.props.loginState.userName,
                        password: this.props.loginState.password,
                        gender: this.props.loginState.gender,
                        age: this.props.loginState.age
                    };
                    handleRegister(loginState, (responseJson) => {
                        switch (responseJson.status) {
                            case 'CREATED' :
                                this.handleCreated();
                                break;
                            case 'CONFLICT' :
                                RegisterQuestionnaire.handleConflict();
                                break;
                            default :
                                RegisterQuestionnaire.handleError();
                        }
                    });
                }}/>)
    }

    static handleError() {
        Alert.alert('Register failed', 'Something went wrong');
    }

    static handleConflict() {
        Alert.alert('Register failed', 'User name taken');
    }

    handleCreated() {
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
}