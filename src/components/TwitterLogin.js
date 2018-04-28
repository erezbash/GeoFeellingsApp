import React from "react";
import {auth} from "react-native-twitter";
import {Button} from "react-native-ui-lib";
import {awaitFetchDeleteWithToken, awaitFetchGetWithToken, awaitFetchPostWithToken} from "../javascript/htmlFetch";
const twitter = require('../../img/twitter.png');

export default class TwitterLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {label: ""};
    }

    componentDidMount() {
        awaitFetchGetWithToken('user/twitter')
            .then(res => {
                if (res !== null) {
                    this.disconnectState();
                } else {
                    this.connectState();
                }
            })
    }

    connectState() {
        this.setState({label: "Connect Twitter"})
    }

    disconnectState() {
        this.setState({label: "Disconnect Twitter"})
    }
    doWhatNeedToDo() {
        if(this.state.label === "Disconnect Twitter")
            this.disconnectFunction();
        else
            this.connectFunction();
    }

    disconnectFunction() {
        awaitFetchDeleteWithToken('user/twitter')
            .then(() => this.connectState())
    }

    connectFunction() {
        auth(
            {
                consumerKey: "yRm6u04SFsTgYxDMyqHSrTvWc",
                consumerSecret: "pU1LYQ3o6kfyuDyOlexvckDmjr5EF6q7YE5teLRidsqA43Bkb3"
            },
            "geofellingsapp://home/1")
            .then((tokens) => awaitFetchPostWithToken('user/twitter', tokens, false)
                .then(() => this.disconnectState()))
    }

    render() {
        return (
            <Button
                onPress={() => this.doWhatNeedToDo()}
                text90
                labelStyle={{fontWeight: '500'}}
                style={{marginBottom: 20, width: 150}}
                size="small"
                enableShadow
                iconSource={twitter}
                white
                label={this.state.label}
            />)
    }
}