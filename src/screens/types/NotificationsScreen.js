import React from 'react';
import {FlatList} from "react-native";
import {Button, Text, View} from "react-native-ui-lib";
import {awaitFetchGetWithToken} from "../../javascript/htmlFetch";

export default class NotificationsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {haveWaitingQuestionnaire: undefined, qIds: undefined};
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
            if (response.ids.length === 0)
                this.setState({haveWaitingQuestionnaire: undefined, qIds: undefined});
            else
                this.setState({haveWaitingQuestionnaire: response.ids.length, qIds: response.ids});
        })
    }

    render() {
        if (this.state.haveWaitingQuestionnaire !== undefined) {
            this.props.navigator.setTabBadge({
                tabIndex: 2,
                badge: this.state.haveWaitingQuestionnaire
            });
            return (
                <FlatList
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View padding-10/>}
                    data={this.state.qIds}
                    renderItem={({item}) =>
                        <Button
                            onPress={() => {
                                this.props.navigator.push({
                                    screen: 'example.QuestionnaireScreen',
                                    passProps: {qId: item}
                                });
                            }}
                            text70
                            white
                            background-orange30
                            label={item}/>}
                />
                // <Questionnaire
                //     pathToFetch={'user/questionnaire/' + this.state.qIds}
                //     onSubmit={(res) => DetailsScreen.onSubmit(res)
                //     }/>
            );
        } else {
            return (<Text>Not have no new notifications</Text>)
        }
    }
}