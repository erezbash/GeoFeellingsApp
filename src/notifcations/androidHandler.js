import {Alert} from "react-native";
import {setToken} from "../app"
export function handleRegistrationToken(deviceToken) {
    fetch('http:/132.72.23.65:8080/registerToken', {
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

export function handleLogin(username, password) {
    fetch('http:/132.72.23.65:8080/api/user/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: username,
            password: password
        }),
    }).then((response) => response.json())
        .then((responseJson) => {
            setToken(responseJson.id);
        }).catch((error) => {
        Alert.alert("Error", error);
    });
}

export function handleRegister(userDetails, regCallback){
    fetch('http:/132.72.23.65:8080/api/user/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: userDetails,
    }).then((response) => response.json())
        .then((responseJson) => regCallback(responseJson))
        .catch((error) => {
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
