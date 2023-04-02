import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDesc,
    location,
    ctc,
    rating,
    title,
  } = details

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="jobCard">
        <div className="topContainer">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
              <p className="span">{employmentType}</p>
            </div>
          </div>
          <div className="rightMid">{ctc}</div>
        </div>
        <hr />
        <div className="descContainer">
          <h1 className="descHeading">Description</h1>
          <p className="desc">{jobDesc}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobCard
