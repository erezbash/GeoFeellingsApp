import React from 'react';
import Questionnaire from "../../components/Questionnaire";
import {awaitFetchGetWithToken} from "../../javascript/htmlFetch";
import {Text} from "react-native-ui-lib";
import DetailsScreen from "./DetailsScreen";


export default class NotificationsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {haveWaitingQuestionnaire: undefined, qId: undefined};
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
            if (response.id === null)
                this.setState({haveWaitingQuestionnaire: undefined, qId: undefined});
            else
                this.setState({haveWaitingQuestionnaire: 1, qId: response.id});
        })
    }

    render() {
        if (this.state.haveWaitingQuestionnaire !== undefined) {
            this.props.navigator.setTabBadge({
                tabIndex: 2,
                badge: this.state.haveWaitingQuestionnaire
            });
            return (
                <Questionnaire
                    pathToFetch={'user/questionnaire/' + this.state.qId}
                    onSubmit={(res) => DetailsScreen.onSubmit(res)
                    }/>
            );
        } else {
            return (<Text>Not have no new notifications</Text>)
        }
    }
}