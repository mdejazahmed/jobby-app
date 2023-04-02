/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {Link} from 'react-router-dom'

import Header from '../../components/Header'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const res = await fetch(url, options)
    if (res.ok) {
      const data = await res.json()
      this.setState({
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderFailureView = () => (
    <div className="jobListWrapper">
      <div className="noJobViewContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="noJobImg"
        />
        <h1 className="noJobHeading">Oops! Something Went Wrong</h1>
        <p className="noJobPara">
          We cannot seem to find the page you are looking for
        </p>
        <button type="button" className="retryBtn" onClick={this.getJobDetails}>
          Retry
        </button>
      </div>
    </div>
  )

  renderSimilarJobs = () => {
    const {similarJobs} = this.state

    return (
      <>
        <h1 className="similarJobHeading">Similar Jobs</h1>
        <ul className="similarJobsCardContainer">
          {similarJobs.map(each => {
            const {
              company_logo_url,
              employment_type,
              job_description,
              id,
              location,
              rating,
              title,
            } = each

            return (
              <li key={id} className="jobCard similarJobCard">
                <div className="topContainer">
                  <img
                    src={company_logo_url}
                    alt="similar job company logo"
                    className="companyLogo"
                  />
                  <div className="topLeft">
                    <h1 className="jobRole">{title}</h1>
                    <p className="rating">
                      <AiFillStar color="goldenrod" />
                      {rating}
                    </p>
                  </div>
                </div>

                <div className="midContainer">
                  <div className="leftMid">
                    <div className="midPara">
                      <MdLocationOn />
                      <p className="span">{location}</p>
                    </div>
                    <div className="midPara">
                      <BsFillBriefcaseFill />
                      <p className="span">{employment_type}</p>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="descContainer">
                  <h1 className="descHeading">Description</h1>
                  <p className="desc">{job_description}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  renderJobDetailsCard = () => {
    const {jobDetails} = this.state

    const {
      company_logo_url,
      company_website_url,
      employment_type,
      job_description,
      id,
      life_at_company,
      location,
      package_per_annum,
      rating,
      skills,
      title,
    } = jobDetails

    return (
      <>
        <div className="topContainer">
          <img
            src={company_logo_url}
            alt="job details company logo"
            className="companyLogo"
          />
          <div className="topLeft">
            <h1 className="jobRole">{title}</h1>
            <p className="rating">
              <AiFillStar color="goldenrod" />
              {rating}
            </p>
          </div>
        </div>

        <ul className="midContainer">
          <li className="leftMid">
            <div className="midPara">
              <MdLocationOn />
              <p className="span">{location}</p>
            </div>
            <div className="midPara">
              <BsFillBriefcaseFill />
              <p className="span">{employment_type}</p>
            </div>
          </li>
          <p className="rightMid">{package_per_annum}</p>
        </ul>
        <hr />

        <div className="descContainer">
          <div className="headingLinkContainer">
            <h1 className="descHeading">Description</h1>
            <a href={company_website_url} className="anchor">
              Visit
              <BiLinkExternal />
            </a>
          </div>
          <p className="desc">{job_description}</p>
        </div>

        <div className="skillsContainer">
          <h1 className="descHeading">Skills</h1>
          <ul className="skillItemContainer">
            {skills.map(each => (
              <li key={each.name} className="skillItem">
                <img
                  src={each.image_url}
                  alt={each.name}
                  className="skillImg"
                />
                <p className="skillName">{each.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lifeAtCompanyContainer">
          <h1 className="descHeading">Life at Company</h1>
          <div className="lifeAtComParaContainer">
            <p className="lifeAtComPara">{life_at_company.description}</p>
            <img src={life_at_company.image_url} alt="life at company" />
          </div>
        </div>
      </>
    )
  }

  renderSuccessView = () => (
    <>
      <div className="topCard">{this.renderJobDetailsCard()}</div>
      <div className="similarJobsContainer">{this.renderSimilarJobs()}</div>
    </>
  )

  renderInProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderInProgressView()
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobDetailsContainer">
          <div className="jobDetailsWrapper">{this.renderJobDetails()}</div>
        </div>
      </>
    )
  }
}
export default JobDetails
