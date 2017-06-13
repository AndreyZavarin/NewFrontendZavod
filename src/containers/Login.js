import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {login, onLoginSubmitSuccess} from '../api/auth'


const renderField = ({placeholder, input, label, type, maxlength, id, meta: {touched, error}}) => {
    const val =input.value

    function handleChange(e) {
        if (id === 'username') {
            document.getElementById('username').focus()
        }
        if (id === 'password') {
            document.getElementById('password').focus()
        }

        input.onChange(e)
    }

    return (
        <span style={{position: 'relative'}}>
      {label && <label htmlFor={id}>{label}</label>}

          <input
              {...input} value={val} placeholder={placeholder} id={id} type={type} onChange={handleChange}
              maxLength={maxlength} className="form-control"/>

            {touched && error &&
            <div><span className="error-text">{error}</span></div>}
    </span>
    )
}
class LoginForm extends Component {
    render() {
        const {error, handleSubmit, submitting} = this.props
        return (<div className="container">
              <div className="row">
                <div className="col-md-6 col-md-offset-3">
                  <div className="panel panel-login">
                    <div className="panel-body">
                      <div className="row">
                        <div className="col-lg-12">
                          <form onSubmit={handleSubmit(login)}>
                            <h2>Авторизация</h2>
                            <div className="form-group">
                              <Field id="username" placeholder="Логин" type="text" maxlength="15" name="username" component={renderField}/>
                            </div>
                            <div className="form-group">

                              <Field id="password" placeholder="Пароль" type="text" maxlength="15" name="password" component={renderField}/>
                            </div>
                            <div className="col-xs-12 form-group pull-right">
                              <input  type="submit" name="login-submit" id="login-submit" tabIndex="4" className="form-control btn btn-login" style={{color: '#ffffff'}} value="Войти" />
                            </div>
                              {error && <span className="error-text">{error}</span>}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
        )
    }
}

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Обязательное поле'
    } else if (values.username.length < 3) {
        errors.username = 'Поле заполнено не до конца'
    }

    if (!values.password) {
        errors.password = 'Обязательное поле'
    } else if (values.password.length < 5) {
        errors.password = 'Поле заполнено не до конца'
    }
    return errors
}

export default reduxForm({
  form: 'loginForm',
  onSubmitSuccess: onLoginSubmitSuccess,
  validate,
})(LoginForm)

