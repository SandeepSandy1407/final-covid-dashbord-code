import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="background-color-container">
    <p className="header-element1">
      COVID19<span className="header-element2">INDIA</span>
    </p>
    <p className="paragraph-element">
      we stand with everyone fighting on the front lines
    </p>
    <div>
      <VscGithubAlt className="footer-image" />
      <FiInstagram className="footer-image" />
      <FaTwitter className="footer-image" />
    </div>
  </div>
)
export default Footer
