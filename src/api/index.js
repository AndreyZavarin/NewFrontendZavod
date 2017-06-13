import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'

/* global API_URL */

export const post = (url, data) => {
    console.debug("send post request on: " + url)
    return fetch(API_URL + url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data),
    }).then(response => response.json())
}

export const get = (url, token) => {
    console.debug("send get request on: " + url)
    return fetch(API_URL + url, {
        method: 'GET',
        headers: {
            'X-Auth-Token': token,
        }
    })
        .then(response => {
            if (response.status === 401) {
                // browserHistory.push('/login')
                const json = response.json()
                throw new Error(json.error)
            }
            return response.json()
        })
}
