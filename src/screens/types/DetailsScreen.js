import React from 'react';
import Questionnaire from "../../components/Questionnaire";
import {awaitFetchPostWithToken} from "../../javascript/htmlFetch";


export default class DetailsScreen extends React.Component {

    render() {
        return (
            <Questionnaire
                pathToFetch='user/defaultQuestionnaire'
                onSubmit={(res) =>
                    awaitFetchPostWithToken('user/questionnaire/submit', res, false)
                }/>
        );
    }
}