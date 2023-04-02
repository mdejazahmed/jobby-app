import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import Profile from '../../components/Profile'
import FilterGroup from '../../components/FilterGroup'
import JobCard from '../../components/JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    search: '',
    employmentType: [],
    minimumPackage: '',
    jobList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount = () => {
    this.getJobFeeds()
  }

  getJobFeeds = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {search, employmentType, minimumPackage} = this.state
    const employmentStr = employmentType.join()

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentStr}&minimum_package=${minimumPackage}&search=${search}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const res = await fetch(url, options)
    if (res.ok) {
      const data = await res.json()
      const jobList = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDesc: each.job_description,
        location: each.location,
        ctc: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({apiStatus: apiStatusConstant.success, jobList})
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onChangePackage = rangeId => {
    this.setState({minimumPackage: rangeId}, this.getJobFeeds)
  }

  employmentInputChange = employmentId => {
    const {employmentType} = this.state
    if (!employmentType.includes(employmentId)) {
      this.setState(
        {employmentType: [...employmentType, employmentId]},
        this.getJobFeeds,
      )
    } else {
      this.setState(
        {employmentType: employmentType.filter(each => each !== employmentId)},
        this.getJobFeeds,
      )
    }
  }

  onEnterSearchIcon = searchInput => {
    console.log(searchInput)
    this.getJobFeeds()
  }

  onChangeInput = search => {
    this.setState({search})
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
        <button type="button" className="retryBtn" onClick={this.getJobFeeds}>
          Retry
        </button>
      </div>
    </div>
  )

  renderNoJobs = () => (
    <div className="noJobViewContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="noJobImg"
      />
      <h1 className="noJobHeading">No Jobs Found</h1>
      <p className="noJobPara">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobs = jobList => (
    <div className="jobListWrapper">
      <ul className="jobListContainer">
        {jobList.map(each => (
          <JobCard key={each.id} details={each} />
        ))}
      </ul>
    </div>
  )

  renderSuccessView = () => {
    const {jobList} = this.state

    if (jobList.length !== 0) {
      return this.renderJobs(jobList)
    }
    return this.renderNoJobs()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobFeeds = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {search} = this.state

    return (
      <>
        <Header />
        <div className="mainContainer">
          <div className="mainWrapper">
            <div className="leftContainer">
              <SearchBar
                searchInput={search}
                onChangeInput={this.onChangeInput}
                onEnterSearchIcon={this.onEnterSearchIcon}
              />
              <Profile />
              <FilterGroup
                employmentTypesList={employmentTypesList}
                employmentInputChange={this.employmentInputChange}
                salaryRangesList={salaryRangesList}
                onChangePackage={this.onChangePackage}
              />
            </div>
            <div className="rightContainer">
              <div className="jobFeedWrapper">{this.renderJobFeeds()}</div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
