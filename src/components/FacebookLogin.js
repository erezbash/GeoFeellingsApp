import React from "react";
import {auth} from "react-native-twitter";
import {awaitFetchDeleteWithToken, awaitFetchGetWithToken, awaitFetchPostWithToken} from "../javascript/htmlFetch";
import {View} from "react-native-ui-lib";
import {AccessToken, LoginButton} from 'react-native-fbsdk'
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

    render() {
        return (
            <View>
                <LoginButton
                    readPermissions={["user_posts"]}
                    onLoginFinished={
                        (error, result) => {
                            console.log(JSON.stringify(error) + "\n" + JSON.stringify(result));
                            if (error) {
                                Alert.alert("Login failed with error: " + result.error);
                            } else if (result.isCancelled) {
                                Alert.alert("Login was cancelled");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        awaitFetchPostWithToken('user/facebook', {token: data.accessToken}, false);
                                    });
                                // alert("Login was successful with permissions: " + result.grantedPermissions)
                            }
                        }
                    }
                    onLogoutFinished={() => Alert.alert("User logged out")}/>
            </View>)
    }
}