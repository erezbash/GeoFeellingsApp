import React from "react";
import PropTypes from 'prop-types';
import {awaitFetchGet} from "../javascript/htmlFetch";
import {FlatList} from "react-native";
import {Button, View} from "react-native-ui-lib";
import Question from "./Question";

export default class Questionnaire extends React.Component {

    static propTypes = {
        pathToFetch: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {data: []}
    }

    componentWillMount() {
        let fetch = awaitFetchGet(this.props.pathToFetch);
        fetch.then(json => this.setState({data: json.questions}))
    }

    render() {
        return (
            <View flex padding-5>
                <FlatList
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View padding-10/>}
                    data={this.state.data}
                    renderItem={({item}) =>
                        <Question question={item}/>
                    }
                />
                <Button
                    onPress={() => this.props.onSubmit("myMessage")}
                    text70
                    white
                    background-orange30
                    label="Submit"
                />
            </View>
        );
    }
}