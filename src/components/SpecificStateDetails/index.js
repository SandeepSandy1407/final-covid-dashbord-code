import {Component, React} from 'react'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'
import Header from '../Header'
import Footer from '../Footer'
import CovidTabSelected from '../CovidTabSelected'
import './index.css'

const apiState = {
  loading: 'LOADING',
  fail: 'FAILED',
  success: 'SUCCESS',
  initial: 'INITIAL',
}
const allTabs = [
  {
    id: 1,
    tab: 'confirmed',
    imgUrl:
      'https://res.cloudinary.com/dg9wsic7j/image/upload/v1692414374/check-mark_1_icydke.png',
  },
  {
    id: 2,
    tab: 'active',
    imgUrl:
      'https://res.cloudinary.com/dg9wsic7j/image/upload/v1692414397/protection_1_f70nnp.png',
  },
  {
    id: 3,
    tab: 'recovered',
    imgUrl:
      'https://res.cloudinary.com/dg9wsic7j/image/upload/v1692414410/recovered_1_pb2vsf.png',
  },
  {
    id: 4,
    tab: 'deceased',
    imgUrl:
      'https://res.cloudinary.com/dg9wsic7j/image/upload/v1692414425/breathing_1_tezmpw.png',
  },
]
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

class SpecificStateDetails extends Component {
  state = {
    currentApiState: apiState.initial,
    activeTab: allTabs[0].tab,
    districtData: [],
    totalTested: 0,
    allData: [],
    graphData: [],
    barData: [],
    timelineLoader: true,
  }

  componentDidMount() {
    this.getStateDetails()
  }

  convertDistrict = data => {
    const resultList = []

    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        resultList.push({
          name: keyName,
          confirmed,
          deceased,
          recovered,
          tested,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []

    const keyNames = Object.keys(data)
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const {total} = data[stateCode]
    const {districts} = data[stateCode]
    const districtData = this.convertDistrict(districts)
    const confirmed = total.confirmed ? total.confirmed : 0
    const deceased = total.deceased ? total.deceased : 0
    const recovered = total.recovered ? total.recovered : 0
    const tested = total.tested ? total.tested : 0
    const population = data[stateCode].meta.population
      ? data[stateCode].meta.population
      : 0
    resultList.push({
      stateCode,
      confirmed,
      deceased,
      recovered,
      tested,
      population,
      active: confirmed - (deceased + recovered),
      districtData,
    })
    return resultList
  }

  renderLineChart = type => {
    const {graphData} = this.state
    let barColor = '#ffffff'
    if (type === 'confirmed') {
      barColor = '#FF073A'
    } else if (type === 'recovered') {
      barColor = '#27A243'
    } else if (type === 'active') {
      barColor = '#007BFF'
    } else if (type === 'deceased') {
      barColor = '#6C757D'
    } else {
      barColor = '#9673B9'
    }
    const finalname = `line-App-${type}`
    console.log(finalname)
    return (
      <div className={finalname}>
        <LineChart
          width={730}
          height={250}
          data={graphData}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
          fill={barColor}
        >
          <XAxis
            dataKey="date"
            tick={{
              stroke: {barColor},
              strokeWidth: 1,
            }}
          />
          <YAxis
            tick={{
              stroke: {barColor},
              strokeWidth: 1,
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={type}
            stroke={barColor}
            fill={barColor}
          />
        </LineChart>
      </div>
    )
  }

  renderBarChart = type => {
    const {graphData} = this.state
    const l = graphData.length
    const strat = l - 10
    const temData = graphData.slice(strat, l)
    const finalList = []
    temData.forEach(eachItem => {
      const oneDay = eachItem.date
      const date = new Date(oneDay)
      const monthName = date.toLocaleString('en-US', {month: 'short'})
      const dayNum = date.getDate()
      const dateString = `${dayNum} ${monthName}`
      const dataForEach = {
        confirmed: eachItem.confirmed,
        active: eachItem.active,
        deceased: eachItem.deceased,
        recovered: eachItem.recovered,
        date: dateString,
      }
      finalList.push(dataForEach)
    })
    let barColor = '#ffffff'
    if (type === 'confirmed') {
      barColor = '#9A0E31'
    } else if (type === 'recovered') {
      barColor = '#216837'
    } else if (type === 'active') {
      barColor = '#0A4FA0'
    } else if (type === 'deceased') {
      barColor = '#474C57'
    }
    const DataFormatter = number => {
      if (number > 100000) {
        return `${(number / 100000).toString()}L`
      }
      return `${(number / 1000).toString()}K`
    }
    return (
      <div className="bar-graph-container">
        <BarChart width={850} height={431} data={finalList}>
          <XAxis
            dataKey="date"
            tick={{
              stroke: 'none',
              strokeWidth: 2,
            }}
          />
          <YAxis />
          <Tooltip />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar
            dataKey={type}
            fill={barColor}
            label={{
              position: 'top',
              color: 'white',
              tickFormatter: {DataFormatter},
            }}
            barSize="20"
          />
        </BarChart>
      </div>
    )
  }

  getStateDetails = async () => {
    this.setState({currentApiState: apiState.loading, timelineLoader: true})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`,
    )
    const data = await response.json()
    console.log(data)
    const mainResponse = await fetch(
      'https://apis.ccbp.in/covid19-state-wise-data',
    )
    const mainData = await mainResponse.json()
    console.log(mainData)

    if (response.ok) {
      const temData = this.convertObjectsDataIntoListItemsUsingForInMethod(
        mainData,
      )
      const {tested} = temData[0]
      const temDate = data[stateCode]
      const temConfirmed = temData[0].confirmed
      const temRecovered = temData[0].recovered
      const temDeceased = temData[0].deceased
      const temTested = temData[0].tested

      const keyNames = Object.keys(temDate.dates)
      const finalDateList = []

      keyNames.forEach(date => {
        const dateConfirmed = -(
          Number(temDate.dates[date].total.confirmed) - temConfirmed
        )
        const dateRecovered = -(
          Number(temDate.dates[date].total.recovered) - temRecovered
        )
        const dateDeceased = -(
          Number(temDate.dates[date].total.deceased) - temDeceased
        )
        const dateTested = -(
          Number(temDate.dates[date].total.tested) - temTested
        )
        const dateTem = {
          date,
          confirmed: dateConfirmed,
          deceased: dateDeceased,
          recovered: dateRecovered,
          tested: temDate.dates[date].total.tested,
          active:
            dateConfirmed - (dateRecovered + dateDeceased) > 0
              ? dateConfirmed - (dateRecovered + dateDeceased)
              : -(dateConfirmed - (dateRecovered + dateDeceased)),
        }
        finalDateList.push(dateTem)
      })
      this.setState({
        graphData: finalDateList,
      })
      this.setState({
        currentApiState: apiState.success,
        districtData: temData[0].districtData,
        totalTested: tested,
        allData: temData,
        timelineLoader: false,
      })
    } else {
      this.setState({currentApiState: apiState.fail})
    }
  }

  graphDataTimeline = () => {
    const {totalTested, districtData, activeTab, allData} = this.state
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const stateDetails = statesList.find(
      eachItem => eachItem.state_code === stateCode,
    )
    districtData.sort((a, b) => b[activeTab] - a[activeTab])
    const stateName = stateDetails.state_name
    const districtDataSort = districtData.sort(districtData.confirmed)
    const confirmedLineGraph = this.renderLineChart('confirmed')
    const activeLineGraph = this.renderLineChart('active')
    const recoveredLineGraph = this.renderLineChart('recovered')
    const deceasedLineGraph = this.renderLineChart('deceased')
    const finalBarGraph = this.renderBarChart(activeTab)
    const testedBarLineGraph = this.renderLineChart('tested')
    return (
      <>
        <div className="bar-graph-container">{finalBarGraph}</div>
        <h1 className="daily-spread-head">Daily Spread Trends</h1>
        <div>
          <div>{confirmedLineGraph}</div>
          <div>{activeLineGraph}</div>
          <div>{recoveredLineGraph}</div>
          <div>{deceasedLineGraph}</div>
          <div>{testedBarLineGraph}</div>
        </div>
      </>
    )
  }

  changeTab = name => {
    this.setState({activeTab: name})
  }

  loadingComponent = () => (
    <>
      <Header />
      <div className="products-loader-container">
        <Loader type="TailSpin" color="#007BFF" height="80" width="80" />
      </div>
    </>
  )

  timelineLoadingComponent = () => (
    <>
      <Header />
      <div className="products-loader">
        <Loader type="TailSpin" color="#007BFF" height="80" width="80" />
      </div>
    </>
  )

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

  runningApiComponent = () => {
    const {
      totalTested,
      districtData,
      activeTab,
      allData,
      timelineLoader,
    } = this.state
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const stateDetails = statesList.find(
      eachItem => eachItem.state_code === stateCode,
    )
    districtData.sort((a, b) => b[activeTab] - a[activeTab])
    const stateName = stateDetails.state_name
    const districtDataSort = districtData.sort(districtData.confirmed)
    const confirmedLineGraph = this.renderLineChart('confirmed')
    const activeLineGraph = this.renderLineChart('active')
    const recoveredLineGraph = this.renderLineChart('recovered')
    const deceasedLineGraph = this.renderLineChart('deceased')
    const finalBarGraph = this.renderBarChart(activeTab)
    const testedBarLineGraph = this.renderLineChart('tested')
    const finalgraphContent = timelineLoader
      ? this.timelineLoadingComponent()
      : this.graphDataTimeline()
    return (
      <>
        <Header />
        <div className="main-container1">
          <div className="top-container">
            <div className="state-name-container">
              <h1 className="state-name">{stateName}</h1>
              <p className="latest-update-text">
                Last update on march 28th 2021.
              </p>
            </div>
            <div>
              <p className="tested-text">Tested</p>
              <p className="test-count">{totalTested}</p>
            </div>
          </div>
          <ul className="select-case-card">
            {allTabs.map(eachItem => (
              <CovidTabSelected
                key={eachItem.id}
                eachItem={eachItem}
                allData={allData}
                changeTab={this.changeTab}
                presentTab={activeTab}
              />
            ))}
          </ul>
          <h1>Top Districts</h1>
          <ul testid="topDistrictsUnorderedList" className="district-container">
          
            { districtDataSort.map(eachItem => (
              <li key={eachItem.name} className="district-list-container">
                <p className="district-count">{eachItem[activeTab]}</p>
                <p className="district-name">{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <div>{finalgraphContent}</div>
        </div>
        <Footer />
      </>
    )
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
export default SpecificStateDetails
