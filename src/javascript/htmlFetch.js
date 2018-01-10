
const BaseUrl = 'http:/132.72.23.65:8080/api/';

export async function awaitFetch(method, suffix, body) {
    let response = await fetch(BaseUrl + suffix, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: body});

    return await response.json();
}