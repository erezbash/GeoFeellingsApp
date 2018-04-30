import React from "react";
import {awaitFetchDeleteWithToken, awaitFetchGetWithToken, awaitFetchPostWithToken} from "../javascript/htmlFetch";
import {Button, View} from "react-native-ui-lib";
import {AccessToken, LoginManager} from 'react-native-fbsdk'
import PropTypes from 'prop-types';

const facebook = require('../../img/facebook.png');

export default class FacebookLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {label: ""};
    }

    static propTypes = {
        onClick: PropTypes.any.isRequired
    };

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
            .then(() => {
                this.connectState();
                this.props.onClick();
            })
    }

    async connectFunction() {
        try {
            const {isCancelled} = await LoginManager.logInWithReadPermissions(['public_profile', 'user_posts'])
            if (isCancelled) {
                console.log('Login cancelled')
            } else {
                const data = await AccessToken.getCurrentAccessToken();
                await awaitFetchPostWithToken('user/facebook', {token: data.accessToken}, false);
                this.disconnectState();
                this.props.onClick();
            }
        } catch (e) {
            console.log('Login fail with error: ' + error)
        }
    }


    handleFacebookLogin() {
        if (this.state.label === "Disconnect Facebook")
            this.disconnectFunction();
        else
            this.connectFunction();
    }

    render() {
        return (
            <View padding-5 style={{alignSelf: 'stretch'}}>
                <Button
                    onPress={() => this.handleFacebookLogin()}
                    label={this.state.label}
                    text90
                    labelStyle={{fontWeight: '500'}}
                    style={{marginBottom: 20, backgroundColor: '#3b5998'}}
                    enableShadow
                    iconSource={facebook}
                    white/>
            </View>)
    }
}