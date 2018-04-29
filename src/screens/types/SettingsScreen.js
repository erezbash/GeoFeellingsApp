import _ from 'lodash';
import React from 'react';
import {View, TextInput, Text, Button, Picker, Image, Avatar, Colors} from 'react-native-ui-lib';
import {handleMaximalQuestionnairesUpdate} from "../../notifcations/androidHandler";
import tagIcon from '../../../img/edit.png';
import PropTypes from 'prop-types';

export default class SettingsScreen extends React.Component {


    updateMaximalQuestionnaires(item) {
        handleMaximalQuestionnairesUpdate(item.value);
        this.props.onClick(item);
    }

    static propTypes = {
        onClick: PropTypes.any.isRequired
    };

    render() {
        return (
            <View center>
                <Text text50 center>Notifications Settings</Text>
                <Picker
                    value={this.props.maximalQuestionnaires}
                    enableModalBlur={false}
                    onChange={item => this.updateMaximalQuestionnaires(item)}
                    topBarProps={{title: 'Select Value'}}
                    renderPicker={({label}) => {
                        return (
                            <View row>
                                <Text>Max Questionnaires:</Text>
                                <Image
                                    style={{height: 16, width: 18, resizeMode: 'contain'}}
                                    source={tagIcon}
                                />
                                <Text>{label}</Text>
                            </View>
                        );
                    }}
                >
                    <Picker.Item
                        key="Unlimited"
                        value={{label: "Unlimited", value: null}}
                    />
                    {_.range(2, 24).map(option =>
                        <Picker.Item
                            key={option}
                            value={{label: option, value: option}}
                        />,
                    )}

                </Picker>
            </View>
        );
    }
}
