import {Link} from 'react-router-dom'
import './index.css'

const StateWiseStatistics = props => {
  const {fetchedData} = props
  const {
    name,
    stateCode,
    confirmed,
    deceased,
    recovered,
    active,
    population,
  } = fetchedData

  return (
    <Link to={`/state/${stateCode}`}>
      <li className="list-items-container">
        <p className="list-state-name">{name}</p>
        <p className="list-confirmed">{confirmed}</p>
        <p className="list-active">{active}</p>
        <p className="list-recovered">{recovered}</p>
        <p className="list-deceased">{deceased}</p>
        <p className="list-population">{population}</p>
      </li>
    </Link>
  )
}

export default StateWiseStatistics
