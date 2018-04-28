import React from "react";
import {auth} from "react-native-twitter";
import {awaitFetchDeleteWithToken, awaitFetchGetWithToken, awaitFetchPostWithToken} from "../javascript/htmlFetch";
import {Button, View} from "react-native-ui-lib";
import {AccessToken, LoginManager} from 'react-native-fbsdk'
const facebook = require('../../img/facebook.png');
import {Alert} from "react-native";

export default class FacebookLogin extends React.Component {

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
        if (this.state.label === "Disconnect Twitter")
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

    handleFacebookLogin () {
        LoginManager.logInWithReadPermissions(['public_profile', 'user_posts']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled')
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            awaitFetchPostWithToken('user/facebook', {token: data.accessToken}, false);
                        });
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error)
            }
        )
    }

    render() {
        return (
            <View>
                <Button
                    onPress={this.handleFacebookLogin}
                    label="Connect Facebook"
                    text90
                    labelStyle={{fontWeight: '500'}}
                    style={{marginBottom: 20, width: 150}}
                    size="small"
                    enableShadow
                    iconSource={facebook}
                    white/>
            </View>)
    }
}