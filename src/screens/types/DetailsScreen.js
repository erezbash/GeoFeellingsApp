import React from 'react';
import Questionnaire from "../../components/Questionnaire";
import {awaitFetchPostWithToken} from "../../javascript/htmlFetch";
import {Alert} from "react-native";
import {startApp} from "../../app";


export default class DetailsScreen extends React.Component {
    render() {
        return (
            <Questionnaire
                pathToFetch='user/defaultQuestionnaire'
                onSubmit={(res) => DetailsScreen.onSubmit(res)}
            />
        );
    }

    static onSubmit(res) {
        awaitFetchPostWithToken('user/questionnaire/submit', res, false).then(() => {
            Alert.alert("Submitted", "Have a Great Day :)");
            startApp('after-login');
        });
    }
}