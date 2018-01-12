import React from 'react';
import Questionnaire from "../../components/Questionnaire";
import {Alert} from "react-native";


export default class DetailsScreen extends React.Component {

    render() {
        Alert.alert("enter details")
        return (
            <Questionnaire
                pathToFetch='admin/question'
                //on submit send by post to server
                onSubmit={(res) => Alert.alert(JSON.stringify(res))}/>
        );
    }
}