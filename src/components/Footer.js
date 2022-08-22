import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Footer = () => {
  return (
    <div className="footer-main">
      
      <p>Brought to you by:</p>
      
      <div className="footer-container"> 
        <div><a href="https://github.com/markmuy40" target="_blank" rel="noreferrer">Mark Muyuela</a></div>
        <div><a href="https://github.com/rokster112" target="_blank" rel="noreferrer">Rokas Arlauskas</a></div>
        <div><a href="https://github.com/verodr" target="_blank" rel="noreferrer">Veronica DeRonzi</a></div>
      </div>
    </div>  
      
      
  )
  
}

export default Footer