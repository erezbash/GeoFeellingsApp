import {Alert} from "react-native";
import {setToken} from "../app"
import {awaitFetchPost} from "../javascript/htmlFetch";

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
    awaitFetchPost('user/login', {
        userName: username,
        password: password
    })
        .then(userId => setToken(userId.id))
        .catch(e => console.log(e));
}

export function handleRegister(userDetails, regCallback) {
    awaitFetchPost('user/register', userDetails)
        .then(response => regCallback(response))
        .catch(e => console.log(e));
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
