import React from "react";
import PropTypes from 'prop-types';
import {Colors, Text, TextArea, View} from "react-native-ui-lib";
import RadioButtonGroup from "./RadioButtonGroup";
import {Alert} from "react-native";

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
                            name={this.props.question.questionString}
                            numberOfRadios={this.props.question.numOfOptions}
                            id={this.props.question.id}
                            onUpdate={this.props.onUpdate}
                        />
                    </View>);
            case 'OPEN':
                return (
                    <View style={{backgroundColor: Colors.dark80, borderWidth: 1.5, borderRadius: 20}}>
                        <View padding-15>
                            <Text text40>{this.props.question.questionString}</Text>
                            <TextArea
                                placeholder="write something.."
                                onEndEditing={(event) => {
                                    this.props.onUpdate({
                                        id : this.props.question.id,
                                        answer : event.nativeEvent.text
                                    });
                                }
                                }
                            />
                        </View>
                    </View>);
        }
    }
}