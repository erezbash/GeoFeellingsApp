import _ from 'lodash';
import React from 'react';
import {ScrollView, Platform} from "react-native";
import {startApp, clearToken} from "../../app";
import TwitterLogin from "../../components/TwitterLogin";
import {View, TextInput, Text, Button, Picker, Image, Avatar, Colors} from 'react-native-ui-lib';
import {handleMaximalQuestionnairesUpdate, handleGetUserInfo} from "../../notifcations/androidHandler";
import tagIcon from '../../../img/edit.png';
import LocationExample from '../../NativeMethod';
import FacebookLogin from "../../components/FacebookLogin";
import {StarRating} from "react-native-star-rating";

export default class HomeScreen extends React.Component {
    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Logout',
                id: 'Logout',
                buttonFontSize: 14,
                buttonColor: 'red',
                buttonFontWeight: '600'
            }
        ]
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
            this.pressLogout()
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
                    gender: userProfile.gender,
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
                        <View padding-10 center bg-red50 style={{alignSelf: 'stretch'}}>
                            <Avatar
                                size={150}
                                imageSource={imageSource}/>
                            <Text white text30>{this.state.name}</Text>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={2}
                            />
                        </View>
                    </View>
                    <View padding-10>
                        <Text text50>Details:</Text>
                        <Text>Gender: {this.state.gender}</Text>
                        <Text>Age: {this.state.age}</Text>
                        <Picker
                            value={this.state.maximalQuestionnaires}
                            enableModalBlur={false}
                            onChange={item => this.updateMaximalQuestionnaires(item)}
                            topBarProps={{title: 'Select Value'}}
                            renderPicker={({label}) => {
                                return (
                                    <View row>
                                        <Text>Max Questionnaires:</Text>
                                        <Image
                                            style={{height: 16, width: 18, resizeMode: 'contain'}}
                                            source={tagIcon}
                                        />
                                        <Text>{label}</Text>
                                    </View>
                                );
                            }}
                        >
                            <Picker.Item
                                key="Unlimited"
                                value={{label: "Unlimited", value: null}}
                            />
                            {_.range(2, 24).map(option =>
                                <Picker.Item
                                    key={option}
                                    value={{label: option, value: option}}
                                />,
                            )}

                        </Picker>
                    </View>
                    <View padding-10>
                        <Text text50>Social Networks:</Text>
                        <TwitterLogin/>
                        <FacebookLogin/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
