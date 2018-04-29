import React from 'react';
import {ScrollView, Platform} from "react-native";
import {startApp, clearToken} from "../../app";
import TwitterLogin from "../../components/TwitterLogin";
import {View, TextInput, Text, Button, Picker, Image, Avatar, Colors} from 'react-native-ui-lib';
import {handleMaximalQuestionnairesUpdate, handleGetUserInfo} from "../../notifcations/androidHandler";
import LocationExample from '../../NativeMethod';
import FacebookLogin from "../../components/FacebookLogin";
import StarRating from 'react-native-star-rating';

export default class HomeScreen extends React.Component {
    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Logout',
                id: 'Logout',
                buttonFontSize: 14,
                buttonColor: 'red',
                buttonFontWeight: '600'
            },
        ],
        leftButtons: [
            {
                id: 'accept',
                icon: require('../../../img/settings.png'),
                buttonFontSize: 14,
                buttonColor: 'red',
                buttonFontWeight: '600'
            },
        ],
    };

    static navigatorStyle = {
        navBarTitleTextCentered: true
    };

    constructor(props) {
        super(props);

        this.state = {
            latitude: "",
            longitude: "",
            error: "",
            maximalQuestionnaires: {label: "", value: ""},
            age: "",
            name: "",
            gender: "",
            image: ""
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type === 'NavBarButtonPress' && event.id === 'Logout')
            this.pressLogout();
        if (event.type === 'NavBarButtonPress' && event.id === 'accept') {
            const f = (value) => this.setState({maximalQuestionnaires: value})
            this.props.navigator.push({
                passProps: {
                    maximalQuestionnaires: this.state.maximalQuestionnaires,
                    onClick: f
                },
                screen: "example.SettingsScreen",
                title: "Settings"
            });
        }
    }

    componentDidMount() {
        this.getAndUpdateUserProfile();
    }

    getAndUpdateUserProfile() {
        handleGetUserInfo(
            (userProfile) => {
                this.setState({
                    image: userProfile.image === null ? "" : userProfile.image,
                    age: userProfile.age,
                    name: userProfile.userName,
                    gender: userProfile.gender === 'MALE' ? 'Male' : 'Female',
                    maximalQuestionnaires: userProfile.limitQuestionnaire === null ?
                        {label: "Unlimited", value: null} : {
                            label: userProfile.limitQuestionnaire,
                            value: userProfile.limitQuestionnaire
                        }
                })
            }
        );
    }

    updateMaximalQuestionnaires(item) {
        this.setState({maximalQuestionnaires: item});
        handleMaximalQuestionnairesUpdate(item.value);
    }

    pressLogout() {
        clearToken();
        if (Platform.OS === 'android') {
            LocationExample.stopLocation();
        }
        startApp('login')
    }

    render() {
        const imageSource = this.state.image === "" ? require('../../../img/defaultAvatar.png') : {uri: this.state.image};
        return (
            <ScrollView>
                <View flex top>
                    <View center>
                        <View padding-10 center style={{alignSelf: 'stretch'}}>
                            <Avatar
                                isOnline={true}
                                size={150}
                                imageSource={imageSource}/>
                            <Text text30>{this.state.name}</Text>
                            <StarRating
                                fullStarColor={'gold'}
                                disabled={true}
                                maxStars={7}
                                rating={3.5}
                            />
                        </View>
                    </View>
                    <View padding-10 center>
                        <Text text50 >Personal Information</Text>
                        <Text>Gender: {this.state.gender}</Text>
                        <Text>Age: {this.state.age}</Text>
                    </View>
                    <View padding-10/>
                    <Text text50 center>Social Networks</Text>
                    <TwitterLogin/>
                    <FacebookLogin onClick={() => this.getAndUpdateUserProfile()}/>
                </View>
            </ScrollView>
        );
    }
}
