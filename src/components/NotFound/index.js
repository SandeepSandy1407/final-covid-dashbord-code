import './index.css'

const NotFound = props => {
  const returnToHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="page-not-found-main-container1">
      <img
        src="https://res.cloudinary.com/dg9wsic7j/image/upload/v1692707270/Group_7484_1_rcjldt.png"
        alt="covid-error"
        className="not-found-pic"
      />
      <h1 className="page-not-found-heading">PAGE NOT FOUND</h1>
      <p className="page-not-found-element-paragraph1">
        we are sorry, the page you requested could not be found
      </p>
      <button
        type="button"
        onClick={returnToHome}
        className="page-not-found-element-button"
      >
        Home
      </button>
    </div>
  )
}
export default NotFound
