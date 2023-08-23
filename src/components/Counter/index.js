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

class Home extends Component {
  state = {
    currentApiState: apiState.initial,
    totalValues: {confirmed: 0, active: 0, recovered: 0, deceased: 0},
    fetchedData: {},
  }

  componentDidMount() {
    this.startFetchingData()
  }

  startFetchingData = async () => {
    this.setState({currentApiState: apiState.success})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({fetchedData: data})

      this.setState({currentApiState: apiState.success})
    } else {
      this.setState({currentApiState: apiState.fail})
    }
  }

  runningApiComponent = () => {
    const {fetchedData} = this.state
    console.log(fetchedData)
    console.log(fetchedData.map(eachItem => eachItem.total.confirmed > 0))
    return (
      <>
        <Header />
        <div className="background-color-container">
          <input type="search" />
          <div>para1</div>
          <div>para2</div>
        </div>
        <Footer />
      </>
    )
  }

  failedApiComponent = () => (
    <>
      <Header />
      <div>
        <img src="" alt="" />
        <p>PAGE NOT FOUND</p>
        <p>
          we’re sorry, the page you requested could not be found Please go back
          to the homepage
        </p>
        <button type="button" onClick={this.returnToHome}>
          Home
        </button>
      </div>
      <Footer />
    </>
  )

  loadingComponent = () => (
    <div className="products-loader-container">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {currentApiState} = this.state
    switch (currentApiState) {
      case apiState.success:
        return this.runningApiComponent()
      case apiState.loading:
        return this.loadingComponent()
      case apiState.fail:
        return this.failedApiComponent()
      default:
        return null
    }
  }
}

export default Home
