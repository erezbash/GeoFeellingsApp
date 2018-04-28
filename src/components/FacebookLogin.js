import React from "react";
import {awaitFetchDeleteWithToken, awaitFetchGetWithToken, awaitFetchPostWithToken} from "../javascript/htmlFetch";
import {Button, View} from "react-native-ui-lib";
import {AccessToken, LoginManager} from 'react-native-fbsdk'

const facebook = require('../../img/facebook.png');

export default class FacebookLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {label: ""};
    }

    componentDidMount() {
        awaitFetchGetWithToken('user/tokens')
            .then(res => {
                if (res.facebook !== null) {
                    this.disconnectState();
                } else {
                    this.connectState();
                }
            })
    }

    connectState() {
        this.setState({label: "Connect Facebook"})
    }

    disconnectState() {
        this.setState({label: "Disconnect Facebook"})
    }

    disconnectFunction() {
        awaitFetchDeleteWithToken('user/facebook')
            .then(() => this.connectState())
    }

    connectFunction() {
        LoginManager.logInWithReadPermissions(['public_profile', 'user_posts']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled')
                } else {
                    AccessToken.getCurrentAccessToken()
                        .then(function(data) {
                            awaitFetchPostWithToken('user/facebook', {token: data.accessToken}, false)
                                .then(() => this.disconnectState())
                        }.bind(this));
                }
            }.bind(this),
            function (error) {
                console.log('Login fail with error: ' + error)
            }
        )
    }

    handleFacebookLogin() {
        if (this.state.label === "Disconnect Facebook")
            this.disconnectFunction();
        else
            this.connectFunction();
    }

    render() {
        return (
            <View>
                <Button
                    onPress={() => this.handleFacebookLogin()}
                    label={this.state.label}
                    text90
                    labelStyle={{fontWeight: '500'}}
                    style={{marginBottom: 20, width: 200}}
                    size="small"
                    enableShadow
                    iconSource={facebook}
                    white/>
            </View>)
    }
}