import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {apiStatus: apiStatusConstant.initial, profileDetails: {}}

  componentDidMount = () => {
    this.getUserProfileDetails()
  }

  getUserProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const res = await fetch(url, options)
    console.log(res)
    if (res.ok) {
      const data = await res.json()
      const profileDetails = {
        name: data.profile_details.name,
        profileImgUrl: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }
      this.setState({profileDetails, apiStatus: apiStatusConstant.success})
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderProfileFailure = () => (
    <div className="profileCard">
      <button
        type="button"
        className="retryBtn"
        onClick={this.getUserProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderProfileSuccess = () => {
    const {profileDetails} = this.state
    const {name, profileImgUrl, bio} = profileDetails

    return (
      <div className="profileCard">
        <img src={profileImgUrl} alt="profile" className="profileImg" />
        <h1 className="name">{name}</h1>
        <p className="bio">{bio}</p>
      </div>
    )
  }

  renderProfileProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderProfileProgress()
      case apiStatusConstant.success:
        return this.renderProfileSuccess()
      case apiStatusConstant.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  render() {
    return <div className="profileContainer">{this.renderProfile()}</div>
  }
}
export default Profile
