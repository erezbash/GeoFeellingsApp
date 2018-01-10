
const BaseUrl = 'http:/132.72.23.65:8080/api/';

export async function awaitFetchPost(suffix, body) {
    let response = await fetch(BaseUrl + suffix, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: body});

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