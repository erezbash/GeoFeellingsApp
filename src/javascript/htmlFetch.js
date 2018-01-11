import {AsyncStorage} from "react-native";

const BaseUrl = 'http:/132.72.23.65:8080/api/';

export async function awaitFetchPost(suffix, body) {
    let response = await fetch(BaseUrl + suffix, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)});

    return await response.json();
}

export async function awaitFetchGet(suffix) {
    let response = await fetch(BaseUrl + suffix, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }});

    return await response.json();
}

export async function awaitFetchPostWithToken(suffix, body, sendBodyBack) {
    let token = await AsyncStorage.getItem('userID');

    let response = await fetch(BaseUrl + suffix, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            userId: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)});
    return sendBodyBack? await response.json(): response;
}

export async function awaitFetchGetWithToken(suffix) {
    let token = await AsyncStorage.getItem('userID');
    let response = await fetch(BaseUrl + suffix, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            userId: token,
            'Content-Type': 'application/json',
        }});

    return await response.json();
}

export async function awaitFetchDeleteWithToken(suffix) {
    let token = await AsyncStorage.getItem('userID');
    return await fetch(BaseUrl + suffix, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            userId: token,
            'Content-Type': 'application/json',
        }
    });
}