import './index.css'

const CovidTabSelected = props => {
  const {eachItem, changeTab, allData, presentTab} = props
  const {tab, imgUrl} = eachItem
  const {active, recovered, deceased, confirmed} = allData[0]
  const changeSelectedTab = () => {
    console.log(tab)
    changeTab(tab)
  }
  const returnCount = () => {
    switch (tab) {
      case 'confirmed':
        return confirmed
      case 'recovered':
        return recovered
      case 'deceased':
        return deceased
      case 'active':
        return active
      default:
        return null
    }
  }
  let backgroundTheme = 'normal-theme'
  if (tab === presentTab && tab === 'confirmed') {
    backgroundTheme = 'confirmedTheme'
  } else if (tab === presentTab && tab === 'recovered') {
    backgroundTheme = 'recoveredTheme'
  } else if (tab === presentTab && tab === 'active') {
    backgroundTheme = 'activeTheme'
  } else if (tab === presentTab && tab === 'deceased') {
    backgroundTheme = 'deceasedTheme'
  } else {
    backgroundTheme = 'normal-background-theme'
  }

  const returnTabCount = () => {
    switch (tab) {
      case 'confirmed':
        return 'confirmedCount'
      case 'recovered':
        return 'recoveredCount'
      case 'deceased':
        return 'deceasedCount'
      case 'active':
        return 'activeCount'
      default:
        return null
    }
  }

  const returnBackgroundText = () => {
    switch (tab) {
      case 'confirmed':
        return 'confirmedText'
      case 'recovered':
        return 'recoveredText'
      case 'deceased':
        return 'deceasedText'
      case 'active':
        return 'activeText'
      default:
        return null
    }
  }
  const finalCount = returnCount()
  const finalText = returnBackgroundText()
  const finaltabCount = returnTabCount()
  let altText = ''
  let testIdName = ''
  if (tab === 'confirmed') {
    altText = 'state specific confirmed cases pic'
    testIdName = 'stateSpecificConfirmedCasesContainer'
  } else if (tab === 'recovered') {
    altText = 'state specific recovered cases pic'
    testIdName = 'stateSpecificRecoveredCasesContainer'
  } else if (tab === 'active') {
    altText = 'state specific active cases pic'
    testIdName = 'stateSpecificActiveCasesContainer'
  } else if (tab === 'deceased') {
    altText = 'state specific deceased cases pic'
    testIdName = 'stateSpecificDeceasedCasesContainer'
  }

  return (
    <li className={backgroundTheme}>
      <button type="button" onClick={changeSelectedTab} className="tabButton">
        <p className={finalText}>{tab}</p>
        <img src={imgUrl} alt={altText} />
        <p className={finaltabCount}>{finalCount}</p>
      </button>
    </li>
  )
}
export default CovidTabSelected
