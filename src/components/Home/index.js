import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Header from '../Header'
import Footer from '../Footer'
import StateWiseStatistics from '../StateWiseStatistics'
import TotalStatistics from '../TotalStatistics'
import SuggestionBoxSearchElements from '../SuggestionBoxSearchElements'

import './index.css'

const apiState = {
  loading: 'LOADING',
  fail: 'FAILED',
  success: 'SUCCESS',
  initial: 'INITIAL',
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    currentApiState: apiState.initial,
    data: {},
    searchElement: '',
    suggestionBox: false,
  }

  componentDidMount() {
    this.startFetchingData()
  }

  startFetchingData = async () => {
    this.setState({currentApiState: apiState.loading})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()

      const listData = this.convertObjectsDataIntoListItemsUsingForInMethod(
        data,
      )
      this.setState({currentApiState: apiState.success, data: listData})
    } else {
      this.setState({currentApiState: apiState.fail})
    }
  }

  changeSearchElement = event => {
    this.setState(
      {searchElement: event.target.value},
      this.suggestionBoxStatusChanger(),
    )
  }

  suggestionBoxStatusChanger = () => {
    const {searchElement} = this.state
    if (searchElement.length > 0) {
      this.setState({suggestionBox: true})
    } else {
      this.setState({suggestionBox: false})
    }
  }

  sortNamesDescending = () => {
    const {data} = this.state
    data.sort((a, b) => {
      const fa = a.name.toLowerCase()
      const fb = b.name.toLowerCase()
      if (fa > fb) {
        return -1
      }
      if (fa < fb) {
        return 1
      }
      return 0
    })
    this.setState(data)
  }

  sortNamesAscending = () => {
    const {data} = this.state
    data.sort((a, b) => {
      const fa = a.name.toLowerCase()
      const fb = b.name.toLowerCase()
      if (fa < fb) {
        return -1
      }
      if (fa > fb) {
        return 1
      }
      return 0
    })
    this.setState(data)
  }

  runningApiComponent = () => {
    const {data, searchElement, suggestionBox} = this.state
    const searchInput = searchElement.toLowerCase()
    const dataTorender = data.filter(eachItem => {
      const temInp = eachItem.name.toLowerCase()
      return temInp.includes(searchInput)
    })
    const suggestBoxContainer = suggestionBox ? (
      <ul className="suggestion-main-container1">
        {dataTorender.map(eachItem => (
          <SuggestionBoxSearchElements
            key={eachItem.stateCode}
            suggestionList={eachItem}
          />
        ))}
      </ul>
    ) : null

    return (
      <>
        <Header />
        <div className="background-color-container">
          <div className="head-container1">
            <div className="searchContainer">
              <label htmlFor="searchInput">
                <BsSearch className="searchIcon1" />
              </label>
              <input
                type="search"
                onChange={this.changeSearchElement}
                placeholder="Enter the State"
                id="searchInput"
                className="searchElement"
              />
            </div>
          </div>
          {suggestBoxContainer}
          <TotalStatistics data={data} />
          <div className="list-container">
            <div className="list-elements list-elements-mobile">
              <div className="sortIcon-para">
                <p>States/UT</p>
                <button
                  type="button"
                  onClick={this.sortNamesAscending}
                  className="sortButtonIcon"
                >
                  <FcGenericSortingAsc className="sortIcons" />
                </button>
                <button
                  type="button"
                  onClick={this.sortNamesDescending}
                  className="sortButtonIcon"
                >
                  <FcGenericSortingDesc className="sortIcons" />
                </button>
              </div>
              <p className="confirmed">Confirmed</p>
              <p className="active">Active</p>
              <p className="recovered">Recovered</p>
              <p className="deceased">Deceased</p>
              <p className="population">Population</p>
            </div>
            <ul className="list-container">
              {data.map(eachItem => (
                <StateWiseStatistics
                  key={eachItem.stateCode}
                  fetchedData={eachItem}
                />
              ))}
            </ul>
          </div>
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
    <div>
      <Header />
      <div testid="homeRouteLoader" className="products-loader-container">
        <Loader type="TailSpin" color="#007BFF" height="80" width="80" />
      </div>
    </div>
  )

  returnToHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []

    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        const temStateName = statesList.find(
          state => state.state_code === keyName,
        )
        if (temStateName !== undefined) {
          const convertData = {
            stateName: temStateName.state_name,
            stateCode: temStateName.state_code,
          }
          const finalName = convertData.stateName
          resultList.push({
            stateCode: keyName,
            name: finalName,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        }
      }
    })
    return resultList
  }

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
