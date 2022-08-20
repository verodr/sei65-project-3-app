import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

const PageNavbar = () => {
  return (
    <Navbar expand="sm">
      <Container as="section">
        <Navbar.Brand as={Link} to="/">🤖</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav.Link as={Link} to="/">HOME</Nav.Link>
          <Nav.Link as={Link} to="/topic">ALL TOPICS</Nav.Link>
          <Nav.Link as={Link} to="/login">LOGIN</Nav.Link>
          <Nav.Link as={Link} to="/register">REGISTER</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PageNavbar

