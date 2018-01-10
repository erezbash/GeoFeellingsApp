import React from "react";
import PropTypes from 'prop-types';
import {Colors, Text, TextArea, View} from "react-native-ui-lib";
import RadioButtonGroup from "./RadioButtonGroup";

export default class Question extends React.Component {

    static propTypes = {
        question: PropTypes.any.isRequired
    };

    render() {
        switch (this.props.question.questionType) {
            case 'RADIO':
                return (
                    <View style={{backgroundColor: Colors.dark80, borderWidth: 1.5, borderRadius: 20}}>
                        <RadioButtonGroup
                            name={this.props.question.data.questionString}
                            numberOfRadios={this.props.question.data.numOfOptions}/>
                    </View>);
            case 'OPEN':
                return (
                    <View style={{backgroundColor: Colors.dark80, borderWidth: 1.5, borderRadius: 20}}>
                        <View padding-15>
                            <Text text40>{this.props.question.data.questionString}</Text>
                            <TextArea placeholder="write something.." />
                        </View>
                    </View>)
        }
    }
}