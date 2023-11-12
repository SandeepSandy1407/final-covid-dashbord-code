import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {isHome: true, navbar: false}

  changeToHomeState = () => {
    this.setState(prevState => ({isHome: !prevState.isHome}))
  }

  displayNavContents = () => {
    this.setState({navbar: true})
  }

  render() {
    const {isHome, navbar} = this.state
    const finalHide = navbar ? '' : 'hide-content'
    const navHide = navbar ? 'hide-content' : ''
    console.log(isHome)
    const finalDesignHome = isHome ? 'selected-page' : 'para-main1'
    const finalDesignAbout = isHome ? 'para-main1' : 'selected-page'
    return (
      <nav className="main-container">
        <Link to="/">
          <p className="main-heading1">
            COVID19<span className="main-heading2">INDIA</span>
          </p>
        </Link>
        <div className="second-container">
          <Link to="/">
            <button
              type="button"
              onClick={this.changeToHomeState}
              className={`button-design ${finalDesignHome}`}
            >
              Home
            </button>
          </Link>

          <Link to="/about">
            <button
              type="button"
              onClick={this.changeToHomeState}
              className={`button-design ${finalDesignAbout}`}
            >
              About
            </button>
          </Link>
        </div>
        <div className="mobile-navbar">
          <button onClick={this.displayNavContents} className={navHide}>
            <img
              src="https://res.cloudinary.com/dg9wsic7j/image/upload/v1692968421/add-to-queue_1_d3kysg.png"
              alt="nav-mobile"
            />
          </button>
          <div className={`${finalHide}`}>
            <Link to="/">
              <button className={finalDesignHome}>Home</button>
            </Link>
            <Link to="/about">
              <button className={finalDesignAbout}>About</button>
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header
