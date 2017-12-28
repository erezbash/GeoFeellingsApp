import React from 'react';
import {Button, View, Text, Alert} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {NotificationsAndroid} from 'react-native-notifications';

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
    componentDidMount() {
        NotificationsAndroid.setRegistrationTokenUpdateListener(handleRegistrationToken);

        //Listener for cases when the application is open and notification arrive
        NotificationsAndroid.setNotificationReceivedListener((notification) => {
            Alert.alert(
                'New Message',
                'You want to answer new query?',
                [
                    {text: 'Yes', onPress: () => {
                        const {navigate} = this.props.navigation;
                        navigate('Details');
                    }},
                    {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                ],
                {cancelable: false}
            );

        });
        //Listener for cases when the application is closed
        NotificationsAndroid.setNotificationOpenedListener((notification) => {
            Alert.alert("-- APPLICATION WAS CLOSED --\nReceieved Notification");
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Home Screen</Text>
                <Button
                    onPress={() => navigate('Details')}
                    title="Go to details"
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Details Screen</Text>
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