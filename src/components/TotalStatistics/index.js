import './index.css'

const TotalStatistics = props => {
  const {data} = props
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const confirmedList = []
  const deceasedList = []
  const activeList = []
  const recoveredList = []
  data.forEach(eachItem => confirmedList.push(eachItem.confirmed))
  data.forEach(eachItem => deceasedList.push(eachItem.deceased))
  data.forEach(eachItem => activeList.push(eachItem.active))
  data.forEach(eachItem => recoveredList.push(eachItem.recovered))
  const totalActive = activeList.reduce(reducer)
  const totalDeceased = deceasedList.reduce(reducer)
  const totalRecovered = recoveredList.reduce(reducer)
  const totalConfirmed = confirmedList.reduce(reducer)
  return (
    <ul
      className="list-container-element"
      data-testid="searchResultsUnorderedList"
    >
      <li>
        <div data-testid="countryWideConfirmedCases">
          <p className="text-name-confirmed">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dg9wsic7j/image/upload/v1692414374/check-mark_1_icydke.png"
            alt="country wide confirmed cases pic"
            className="image-covid"
          />
          <p className="values-text-confirmed">{totalConfirmed}</p>
        </div>
      </li>

      <li>
        <div data-testid="countryWideActiveCases">
          <p className="text-name-active">Active</p>
          <img
            src="https://res.cloudinary.com/dg9wsic7j/image/upload/v1692414397/protection_1_f70nnp.png"
            alt="country wide active cases pic"
            className="image-covid"
          />
          <p className="values-text-active">{totalActive}</p>
        </div>
      </li>
      <li>
        <div data-testid="countryWideRecoveredCases">
          <p className="text-name-recovered">Recovered</p>
          <img
            src="https://res.cloudinary.com/dg9wsic7j/image/upload/v1692414410/recovered_1_pb2vsf.png"
            alt="country wide recovered cases pic"
            className="image-covid"
          />
          <p className="values-text-recovered">{totalRecovered}</p>
        </div>
      </li>
      <li>
        <div data-testid="countryWideDeceasedCases">
          <p className="text-name-deceased">Deceased</p>
          <img
            src="https://res.cloudinary.com/dg9wsic7j/image/upload/v1692414425/breathing_1_tezmpw.png"
            alt="country wide deceased cases pic"
            className="image-covid"
          />
          <p className="values-text-deceased">{totalDeceased}</p>
        </div>
      </li>
    </ul>
  )
}
export default TotalStatistics
