import _ from 'lodash';
import React from 'react';
import {Image, ScrollView} from "react-native";
import {startApp, clearToken} from "../../app";
import TwitterLogin from "../../components/TwitterLogin";
import {View, TextInput, Text, Button, Picker} from 'react-native-ui-lib';
import {handleMaximalQuestionnairesUpdate, handleGetUserInfo} from "../../notifcations/androidHandler";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: "",
            longitude: "",
            error: "",
            maximalQuestionnaires: "",
            age: "",
            name: "",
            gender: ""
        };
    }

    componentDidMount() {
        this.getAndUpdateUserProfile();
    }

    getAndUpdateUserProfile(){
        handleGetUserInfo(
            (userProfile) =>{
                this.setState({
                    age: userProfile.age,
                    name: userProfile.userName,
                    gender: userProfile.gender,
                    maximalQuestionnaires: userProfile.limitQuestionnaire === null ? "Unlimited" : userProfile.limitQuestionnaire
                })
            }
        );
    }

    updateMaximalQuestionnaires(item) {
        this.setState({maximalQuestionnaires: item.label});
        handleMaximalQuestionnairesUpdate(item.value);
    }

    render() {
        return (
            <ScrollView>
            <View flex paddingT-5 top>
                <View center>
                    <Text blue50 text20>Profile</Text>
                    <Text text30>{this.state.name}</Text>
                    <Image
                        style={{borderRadius:50, width: 100, height: 100}}
                        source={require('../../../img/defaultAvatar.png')} />
                    <Button
                        onPress={() => {
                            clearToken();
                            startApp('login')
                        }}
                        text90
                        labelStyle={{fontWeight: '500'}}
                        style={{marginBottom: 20, width: 100}}
                        size="small"
                        background-red30
                        enableShadow
                        white
                        label="Logout"
                    />
                </View>
                <View padding-10>
                    <Text text50>Details:</Text>
                    <Text>Gender: {this.state.gender}</Text>
                    <Text>Age: {this.state.age}</Text>
                    <Text>Minimal Questionnaires : {this.state.maximalQuestionnaires} </Text>
                    <Picker
                        containerStyle={{marginBottom: 5}}
                        placeholder="Update Maximal Questionnaires Amount"
                        //value={this.state.maximalQuestionnaires} //todo: casuing error right now
                        enableModalBlur={false}
                        onChange={item => this.updateMaximalQuestionnaires(item)}
                        topBarProps={{title: 'Select Value'}}
                    >
                        <Picker.Item
                            key = "Unlimited"
                            value={{label: "Unlimited", value: null}}
                        />
                        {_.range(2, 24).map(option =>
                            <Picker.Item
                               key = {option}
                               value = {{label: option, value: option}}
                            />,
                        )}

                    </Picker>
                </View>
                <View padding-10>
                    <Text text50>Social Networks:</Text>
                    <TwitterLogin/>
                </View>
            </View>
            </ScrollView>
        );
    }
}