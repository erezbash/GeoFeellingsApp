import React from 'react';
import RadioButton from 'react-native-radio-button';
import PropTypes from 'prop-types';
import {Text, View} from "react-native-ui-lib";
import {FlatList} from "react-native";

class RadioButtonGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {currentSelected: Array.apply(false, {length: this.props.numberOfRadios})};
    }

    select = function (i) {
        this.props.onUpdate({id : this.props.id, answer : (i +1)});
        this.setState(() => {
            let selected = Array.apply(false, {length: this.props.numberOfRadios});
            selected[i] = true;
            return {currentSelected: selected}
        });
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        numberOfRadios: PropTypes.string.isRequired
    };


    render() {
        const {name} = this.props;
        return (
            <View flex paddingT-15>
                <Text text40 center>{name}</Text>
                <View padding-20 style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View left><Text text75>Not at all</Text></View>
                    <View right><Text text75 right>Extremely</Text></View>
                </View>
                <View center paddingB-5>
                    <FlatList
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={() => <View padding-10/>}
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