import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {NotificationsAndroid} from 'react-native-notifications';
import RadioButton from 'react-native-radio-button';
import PropTypes from 'prop-types';

class RadioButtonGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {currentSelected: Array.apply(false, {length: this.props.numberOfRadios})};
    }

    select = function (i) {
        this.setState(() => {
            let selected = Array.apply(false, {length: this.props.numberOfRadios});
            selected[i] = true;
            return {currentSelected: selected}
        });
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        numberOfRadios: PropTypes.number.isRequired
    };


    render() {
        const {name} = this.props;
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, padding: 20}}>{name}</Text>
                <View style={{flexDirection: 'row'}}>
                    <FlatList
                        keyExtractor={(item, index) => index}
                        style={{padding: 10}}
                        ItemSeparatorComponent={() => <View style={{width: 10}}/> }
                        horizontal={true}
                        data={this.state.currentSelected.map((b, i) => {
                            return {key: i, isNeedToShow: b}
                        })}

                        renderItem={({item}) =>
                            <RadioButton
                                animation={'bounceIn'}
                                isSelected={item.isNeedToShow}
                                onPress={() => this.select(item.key)}/>}
                    />
                </View>
            </View>
        );
    }
}

export default RadioButtonGroup