import {Alert} from "react-native";

export function handleRegistrationToken(deviceToken) {
    fetch('http:/192.168.1.145:8080/registerToken', {
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

export function handleNotificationOpenApp(notification) {
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

}
