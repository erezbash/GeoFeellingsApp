import React from 'react';
import {View, Text} from 'react-native';
import {NotificationsAndroid} from 'react-native-notifications';
import RadioButton from 'react-native-radio-button';
import PropTypes from 'prop-types';

class RadioButtonGroup extends React.Component {

    currentSelected = [true, false, false, false, false];
    select = function (i) {
        this.currentSelected = [false, false, false, false, false];
        this.currentSelected[i] = true;
        this.forceUpdate();
    };

    static propTypes = {
        name: PropTypes.string.isRequired
    };


    render() {
        const {name} = this.props;
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 20, padding: 20}}>{name}</Text>
                <View style={{flexDirection: 'row'}}>
                    <RadioButton
                        animation={'bounceIn'}
                        isSelected={this.currentSelected[0]}
                        onPress={() => this.select(0)}
                    />
                    <Text style={{padding: 5}}/>
                    <RadioButton
                        animation={'bounceIn'}
                        isSelected={this.currentSelected[1]}
                        onPress={() => this.select(1)}
                    />
                    <Text style={{padding: 5}}/>
                    <RadioButton
                        animation={'bounceIn'}
                        isSelected={this.currentSelected[2]}
                        onPress={() => this.select(2)}
                    />
                    <Text style={{padding: 5}}/>
                    <RadioButton
                        animation={'bounceIn'}
                        isSelected={this.currentSelected[3]}
                        onPress={() => this.select(3)}
                    />
                    <Text style={{padding: 5}}/>
                    <RadioButton
                        animation={'bounceIn'}
                        isSelected={this.currentSelected[4]}
                        onPress={() => this.select(4)}
                    />
                </View>
            </View>
        );
    }
}

export default RadioButtonGroup