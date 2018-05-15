import {Alert} from "react-native";
import {setToken, startApp} from "../app"
import {
    awaitFetchPost, awaitFetchPatchWithToken, awaitFetchGetWithToken,
    awaitFetchPostWithToken
} from "../javascript/htmlFetch";

export function handleRegistrationToken(deviceToken) {
    awaitFetchPostWithToken('registerToken', {token: deviceToken}, false);
}

export function handleLogin(username, password) {
    awaitFetchPost('user/login', {
        userName: username,
        password: password
    })
        .then(userId => {
            if (userId !== null) {
                setToken(userId).then(() => startApp('after-login'));
            } else {
                Alert.alert('Login Failed!', 'Wrong username or password');
            }
        })
        .catch(e => {
            Alert.alert('Login Failed!', 'Something went wrong');
            console.log(e)
        });
}

export function handleRegister(userDetails, regCallback) {
    awaitFetchPost('user/register', userDetails)
        .then(response => regCallback(response))
        .catch(e => console.log(e));
}

export function handleMaximalQuestionnairesUpdate(newValue){
    awaitFetchPatchWithToken('user', {limitQuestionnaire: {limit:newValue}})
        .catch(e => console.log(e));
}

export function handleGetUserInfo(callback){
    awaitFetchGetWithToken('user')
        .then(userProfile => callback(userProfile))
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
