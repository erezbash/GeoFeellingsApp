import React from "react";
import PropTypes from 'prop-types';
import {awaitFetchGetWithToken} from "../javascript/htmlFetch";
import {FlatList} from "react-native";
import {Button, Text, View} from "react-native-ui-lib";
import Question from "./Question";


export default class Questionnaire extends React.Component {

    static propTypes = {
        pathToFetch: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {data: [], answers: {}, name: "", id: "", location: null}
    }

    onAnswer = (ans) => {
        this.state.answers[ans.id] = ans.answer;
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({location: {latitude: position.coords.latitude, longitude: position.coords.longitude}})
            },
            () => console.log("failed get location"),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )
    }

    componentWillMount() {
        let fetch = awaitFetchGetWithToken(this.props.pathToFetch);
        fetch
            .then(json => {
                this.setState({data: json.questions, id: json.id, name: json.name})
            })
            .catch(e => console.log(e))
    }

    sendWithLocation(msg) {
        msg['location'] = this.state.location;
        this.props.onSubmit(msg);
    }

    render() {
        return (
            <View flex padding-5>
                <Text text40>{this.state.name}</Text>
                <FlatList
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View padding-10/>}
                    data={this.state.data}
                    renderItem={({item}) =>
                        <Question question={item} onUpdate={this.onAnswer}/>
                    }
                />

                <Button
                    onPress={() => {
                        let answers = Object.keys(this.state.answers).map((index) => {
                            return {id: index, answer: this.state.answers[index]}
                        });
                        this.sendWithLocation({id: this.state.id, answers: answers});
                    }}
                    text70
                    white
                    background-orange30
                    label="Submit"
                />
            </View>
        );
    }
}