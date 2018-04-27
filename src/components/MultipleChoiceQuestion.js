import React from 'react';
import { RadioButtons } from 'react-native-radio-buttons'
import PropTypes from 'prop-types';
import { Text, View, Colors } from "react-native-ui-lib";
import { TouchableWithoutFeedback, Alert } from 'react-native';

class MultipleChoiceQuestion extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        questionName: PropTypes.string.isRequired,
        answers: PropTypes.array.isRequired
    };

    state = {}

    render(){
        function handleSelectedOption(selectedOption){
            this.props.onUpdate({id : this.props.id, answer : selectedOption});

            this.setState({
                selectedOption,
            });
        }

        function renderOption( option, selected, onSelect, index) {
            var style;
            var checkMark;

            const textStyle = {
                paddingTop: 10,
                paddingBottom: 10,
                color: 'black',
                flex: 1,
                fontSize: 14,
            };
            const baseStyle = {
                flexDirection: 'row',
            };

            if (index > 0) {
                style = [baseStyle, {
                    borderTopColor: '#eeeeee',
                    borderTopWidth: 1,
                }];
            } else {
                style = baseStyle;
            }

            if (selected) {
                checkMark = <Text style={{
                    flex: 0.1,
                    color: '#007AFF',
                    fontWeight: 'bold',
                    paddingTop: 8,
                    fontSize: 20,
                    alignSelf: 'center',
                }}>✓</Text>;
            }

            return (
                <TouchableWithoutFeedback onPress={onSelect} key={index}>
                    <View style = {style}>
                        <Text style = {textStyle}>{option}</Text>
                        {checkMark}
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        function renderContainer(options){
            return (
                <View center style = {{paddingLeft: 20}}>
                    {options}
                </View>
            );
        }

        return(
            <View style = {{marginTop: 5}}>
                <View style = {{
                    paddingTop: 5,
                    paddingBottom: 5}}>

                    <Text text40 center>
                        { this.props.questionName }
                    </Text>

                    <RadioButtons
                        options = { this.props.answers }
                        onSelection = { handleSelectedOption.bind(this) }
                        selectedOption = { this.state.selectedOption }
                        renderOption = { renderOption }
                        renderContainer = { renderContainer }
                    />
                </View>
            </View>
        );
    };
}

export default MultipleChoiceQuestion