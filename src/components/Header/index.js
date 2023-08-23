import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {isHome: true}

  changeToHomeState = () => {
    this.setState(prevState => ({isHome: !prevState.isHome}))
  }

  render() {
    const {isHome} = this.state
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
              className="button-design"
            >
              <p className={finalDesignHome}>Home</p>
            </button>
          </Link>

          <Link to="/about">
            <button
              type="button"
              onClick={this.changeToHomeState}
              className="button-design"
            >
              <p className={finalDesignAbout}>About</p>
            </button>
          </Link>
        </div>
      </nav>
    )
  }
}

export default Header
