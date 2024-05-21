import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: 'henry',
    password: 'henry_the_developer',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD<span className="spanel">*</span>
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME<span className="spanel">*</span>
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="divcontainer">
              <h1 className="helloheader">
                Hello <br />
                <span className="againel">Again!</span>
              </h1>
              <p className="parael">Welcome back you’ve been missed</p>
            </div>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <div className="checkboxcontainer">
              <div>
                <input type="checkbox" id="checkbox" />
                <label>Remember Me</label>
              </div>
              <a href="#" className="forgot">
                Forgot the password?
              </a>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <p>or continue with</p>
            <div className="iconsconatiner">
              <button className="iconsbutton">
                <img
                  src="https://static-00.iconduck.com/assets.00/facebook-color-icon-2048x2048-bfly1vxr.png"
                  height="20px"
                  width="20px"
                />
                facebook
              </button>
              <button className="iconsbutton">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
                  height="20px"
                  width="20px"
                />
                Google
              </button>
            </div>
            <p>
              don’t have an account ? <a href="#">Sign Up</a>
            </p>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </>
    )
  }
}

export default LoginForm
