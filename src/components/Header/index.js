import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navContainer">
      <div className="mobileNavWrapper">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="mobileLogo"
          />
        </Link>
        <ul className="mobileNavItemContainer">
          <Link to="/" className="link">
            <li className="mobileNavItem">
              <button type="button" className="mobileNavBtn">
                <AiFillHome />
              </button>
            </li>
          </Link>
          <Link to="/jobs" className="link">
            <li className="mobileNavItem">
              <button type="button" className="mobileNavBtn">
                <BsFillBriefcaseFill />
              </button>
            </li>
          </Link>
          <li className="mobileNavItem">
            <button type="button" className="mobileNavBtn" onClick={onLogout}>
              <FiLogOut />
            </button>
          </li>
        </ul>
      </div>

      <div className="largeWrapper">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="largeLogo"
          />
        </Link>
        <ul className="lgNavItemContainer">
          <Link to="/" className="link">
            <li className="lgNavItem">
              <button type="button" className="lgNavBtn">
                Home
              </button>
            </li>
          </Link>
          <Link to="/jobs" className="link">
            <li className="lgNavItem">
              <button type="button" className="lgNavBtn">
                Jobs
              </button>
            </li>
          </Link>
        </ul>
        <button type="button" className="lgLogoutBtn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
