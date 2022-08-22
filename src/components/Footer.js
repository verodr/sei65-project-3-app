import { Link } from 'react-router-dom'
import image from '../styles/images/LI-In-Bug.png'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Footer = () => {
  return (
    <div className="footer-main">
      
      <p>Brought to you by:</p>
      
      <div className="footer-container"> 
        <div className="Mark" href="https://github.com/markmuy40" target="_blank" rel="noreferrer">Mark Muyuela
          <div className="Logo" href="https://www.linkedin.com/in/mark-muyuela/" target="_blank" rel="noreferrer" src={image}></div>
        </div>
        <div className="Rokas" href="https://github.com/rokster112" target="_blank" rel="noreferrer">Rokas Arlauskas</div>
        <div className="Veronica" href="https://github.com/verodr" target="_blank" rel="noreferrer">Veronica DeRonzi</div>
      </div>
    </div>  
      
  )
  
}

export default Footer