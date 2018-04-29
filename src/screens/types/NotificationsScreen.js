import React from 'react';
import {FlatList} from "react-native";
import {Button, Text, View} from "react-native-ui-lib";
import {awaitFetchGetWithToken} from "../../javascript/htmlFetch";

export default class NotificationsScreen extends React.Component {
    static navigatorStyle = {
        navBarTitleTextCentered: true
    };

    constructor(props) {
        super(props);
        this.state = {haveWaitingQuestionnaire: undefined, questionnaires: undefined};
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent() {
        if (this.state.haveWaitingQuestionnaire === undefined)
            this.checkForNotification();
    }

    componentWillMount() {
        this.checkForNotification();
    }

    checkForNotification() {
        awaitFetchGetWithToken('user/questionnaire/waiting').then(response => {
            if (response.questionnaires.length === 0)
                this.setState({haveWaitingQuestionnaire: undefined, questionnaires: undefined});
            else
                this.setState({haveWaitingQuestionnaire: response.questionnaires.length, questionnaires: response.questionnaires});
        })
    }

    render() {
        if (this.state.haveWaitingQuestionnaire !== undefined) {
            this.props.navigator.setTabBadge({
                tabIndex: 2,
                badge: this.state.haveWaitingQuestionnaire
            });
            return (
                <View paddingH-25 paddingT-20>
                <FlatList
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View padding-10/>}
                    data={this.state.questionnaires}
                    renderItem={({item}) =>
                        <Button
                            onPress={() => {
                                this.props.navigator.push({
                                    title: item.name,
                                    screen: 'example.QuestionnaireScreen',
                                    passProps: {questionnaire: item}
                                });
                            }}
                            text70
                            white
                            background-orange30
                            label={item.name}/>}
                />
                </View>
            );
        } else {
            return (<Text>Nothing new</Text>)
        }
    }
}