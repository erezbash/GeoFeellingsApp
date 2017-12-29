import React from 'react';
import {Button, View, Text, Alert} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {NotificationsAndroid} from 'react-native-notifications';
import RadioButtonGroup from './RadioButtonGroup'

function handleRegistrationToken(deviceToken) {
    fetch('http://172.20.10.2:8080/registerToken', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: deviceToken,
        }),
    }).catch((error) => {
        Alert.alert("Error", error);
    });
}

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        NotificationsAndroid.setRegistrationTokenUpdateListener(handleRegistrationToken);

        //Listener for cases when the application is open and notification arrive
        NotificationsAndroid.setNotificationReceivedListener((notification) => {
            Alert.alert(
                'New Message',
                'You want to answer new query?',
                [
                    {
                        text: 'Yes', onPress: () => {
                        const {navigate} = this.props.navigation;
                        navigate('Details');
                    }
                    },
                    {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                ],
                {cancelable: false}
            );

        });
        //Listener for cases when the application is closed
        NotificationsAndroid.setNotificationOpenedListener((notification) => {
            Alert.alert(
                'New Message',
                'You want to answer new query?',
                [
                    {
                        text: 'Yes', onPress: () => {
                        const {navigate} = this.props.navigation;
                        navigate('Details');
                    }
                    },
                    {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                ],
                {cancelable: false}
            );
        });
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 33}}>Home Screen</Text>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
            </View>
        );
    }
}


class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 3, alignItems: 'flex-end', padding: 20}}>
                <RadioButtonGroup name={"Happiness"}/>
                <RadioButtonGroup name={"Sadness"}/>
                <RadioButtonGroup name={"Surprise"}/>
                <RadioButtonGroup name={"Fear"}/>
                <RadioButtonGroup name={"Disgust"}/>
                <RadioButtonGroup name={"Anger"}/>
                <Button
                    onPress={() => Alert.alert(
                        'Thanks!',
                        'Have a great day!',
                        [
                            {
                                text: 'Back Home', onPress: () => {
                                const {navigate} = this.props.navigation;
                                navigate('Home');}
                            }
                        ],
                        {cancelable: false}
                    )}
                    title="Submit"
                />
            </View>
        );
    }
}

const RootNavigator = StackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: 'Home',
        },
    },
    Details: {
        screen: DetailsScreen,
        navigationOptions: {
            headerTitle: 'Details',
        },
    },
});

export default RootNavigator;