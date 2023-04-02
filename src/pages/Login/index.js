import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
    isFetching: false,
  }

  onLoginFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true, isFetching: false})
  }

  onLoginSuccess = jwtToken => {
    this.setState({isFetching: false})
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLogin = async event => {
    event.preventDefault()
    this.setState({isFetching: true})

    const {username, password} = this.state
    const userCredential = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userCredential),
    }

    const res = await fetch(url, options)
    const data = await res.json()
    if (res.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          id="password"
          className="input"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          id="username"
          className="input"
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {errorMsg, showSubmitError, isFetching} = this.state

    return (
      <div className="loginMainContainer">
        <div className="loginWrapper">
          <div className="loginFormContainer">
            <form className="loginForm" onSubmit={this.onLogin}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="logoImg"
              />
              <div className="inputContainer">{this.renderUsernameField()}</div>
              <div className="inputContainer">{this.renderPasswordField()}</div>
              <button type="submit" className="submitBtn">
                {isFetching ? (
                  <AiOutlineLoading3Quarters className="loadingIcon" />
                ) : (
                  'Login'
                )}
              </button>
              {showSubmitError && <p className="errorMsgPara">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
