import React from 'react';
import Questionnaire from "../../components/Questionnaire";
import {awaitFetchPostWithToken} from "../../javascript/htmlFetch";
import {Alert} from "react-native";
import {startApp} from "../../app";


export default class DetailsScreen extends React.Component {
    static navigatorStyle = {
        navBarTitleTextCentered: true
    };
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Questionnaire
                pathToFetch='user/defaultQuestionnaire'
                setTitle={(title2) => {
                    this.props.navigator.setTitle({title: title2})
                }}
                onSubmit={(res) => DetailsScreen.onSubmit(res)}
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