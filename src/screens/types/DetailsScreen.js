import React from 'react';
import Questionnaire from "../../components/Questionnaire";
import {Alert} from "react-native";


export default class DetailsScreen extends React.Component {

    render() {
        return (
            <Questionnaire
                pathToFetch='admin/question'
                onSubmit={(res) => Alert.alert(res)}/>
        );
    }
}