import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import { loginSuccess } from '../actions'
import { get, post } from './'

export const login = (values) => {
    const data = {
        username: values.username,
        password: values.password,
    }
    console.log(data)

    return post('auth', data)
        .then(json => {
            if (json.error) {
                throw new SubmissionError({_error: 'Неверная пара логин пароль!'})
            }
            console.log(json)
            return json
        })
}

export const onLoginSubmitSuccess = (data, dispatch) => {
    dispatch(loginSuccess(data))
    browserHistory.push('/clients')
}

export const logout = () => {
    return get('auth/logout')
        .then(() => {
            browserHistory.push('/login')
        })
}
