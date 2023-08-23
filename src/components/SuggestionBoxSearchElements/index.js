import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SuggestionBoxSearchElements = props => {
  const {suggestionList} = props
  const {name, stateCode} = suggestionList

  return (
    <Link to={`/state/${stateCode}`}>
      <li className="list-items-container1">
        <p className="state-name1">{name}</p>
        <button type="button" className="suggestion-list-container2">
          {stateCode}
          <BiChevronRightSquare className="suggestion-icon1" />
        </button>
      </li>
    </Link>
  )
}

export default SuggestionBoxSearchElements
