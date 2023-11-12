import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiState = {
  loading: 'LOADING',
  fail: 'FAILED',
  success: 'SUCCESS',
  initial: 'INITIAL',
}

class About extends Component {
  state = {
    faqs: [],
    currentApiState: apiState.initial,
  }

  componentDidMount() {
    this.fetchDataUrl()
  }

  fetchDataUrl = async () => {
    this.setState({currentApiState: apiState.loading})
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const {faq} = data
      this.setState({faqs: faq, currentApiState: apiState.success})
    } else {
      this.setState({currentApiState: apiState.fail})
    }
  }

  runningCurrentApi = () => {
    const {faqs} = this.state
    return (
      <>
        <Header />
        <div>
          <h1>About</h1>
          <p className="about-para-element">Last update on march 28th 2021.</p>
          <p className="about-para-element2">
            COVID-19 vaccines be ready for distribution
          </p>
          <ul
            testid="faqsUnorderedList"
            className="about-unorderlist-container1"
          >
            {faqs.map(eachItem => (
              <li key={eachItem.qno}>
                <p>{eachItem.question}</p>
                <p>{eachItem.answer}</p>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  failedApiComponent = () => (
    <div className="page-not-found-main-container1">
      <img
        src="https://res.cloudinary.com/dg9wsic7j/image/upload/v1692707270/Group_7484_1_rcjldt.png"
        alt="covid-error"
        className="page-not-found-image"
      />
      <p className="page-not-found-heading">PAGE NOT FOUND</p>
      <p className="page-not-found-element-paragraph1">
        we’re sorry, the page you requested could not be found Please go back to
        the homepage
      </p>
      <button
        type="button"
        onClick={this.returnToHome}
        className="page-not-found-element-button"
      >
        Home
      </button>
    </div>
  )

  loadingComponent = () => (
    <div testid="aboutRouteLoader">
      <Header />
      <div className="products-loader-container">
        <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    const {currentApiState} = this.state
    switch (currentApiState) {
      case apiState.fail:
        return this.failedApiComponent()
      case apiState.success:
        return this.runningCurrentApi()
      case apiState.loading:
        return this.loadingComponent()
      default:
        return null
    }
  }
}
export default About
