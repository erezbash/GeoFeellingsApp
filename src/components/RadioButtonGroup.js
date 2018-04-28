import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from "react-native-ui-lib";
import {AirbnbRating} from 'react-native-ratings';

class RadioButtonGroup extends React.Component {

    constructor(props) {
        super(props);
    }

    select(i) {
        this.props.callBackOnUpdate({id: this.props.id, answer: i});
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        numberOfRadios: PropTypes.number.isRequired,
        callBackOnUpdate: PropTypes.any.isRequired
    };

    render() {
        const {name} = this.props;
        const reviews5 = ["Bad", "OK", "Hmm...", "Very Good", "Amazing"];
        const reviews7 = ["Terrible", "Bad", "OK", "Hmm...", "Very Good", "Amazing", "Unbelievable"];
        return (
            <View flex paddingT-15>
                <Text text40 center>{name}</Text>
                <AirbnbRating
                    count={this.props.numberOfRadios}
                    reviews={this.props.numberOfRadios > 5 ? reviews7 : reviews5}
                    size={25}
                    defaultRating={this.props.numberOfRadios === 5? 3 : 4}
                    onFinishRating={function (data) {
                        this.select(data)
                    }.bind(this)}
                />
            </View>
        );
    }
}

export default RadioButtonGroup