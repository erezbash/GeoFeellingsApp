import React from 'react';
import Questionnaire from "../../components/Questionnaire";
import {awaitFetchPostWithToken} from "../../javascript/htmlFetch";
import {Alert} from "react-native";
import {startApp} from "../../app";
import PropTypes from 'prop-types';

export default class QuestionnaireScreen extends React.Component {

    static propTypes = {
        questionnaire: PropTypes.any,
    };

    render() {
        const path = 'user/questionnaire/' + this.props.questionnaire.id;
        return (
            <Questionnaire
                pathToFetch={path}
                onSubmit={(res) => QuestionnaireScreen.onSubmit(res)}
            />
        );
    }

    static onSubmit(res) {
        awaitFetchPostWithToken('user/questionnaire/submit', res, false).then(() => {
            Alert.alert(
                "Submitted",
                "Have a Great Day :)",
                [
                    {text: 'Back Home', onPress: () => startApp('after-login')},
                ],
                { cancelable: false }
            );
        });
    }
}