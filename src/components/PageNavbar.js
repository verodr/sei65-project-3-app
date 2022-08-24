import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { authUser } from './auth'
import { useEffect } from 'react'


const PageNavbar = () => {
  
  const location = useLocation()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userName')
    window.location.reload(navigate('/login'))
  }

  return (
    <Navbar className='navbar' expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">🤖</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav.Link as={Link} to="/">HOME</Nav.Link>
          <Nav.Link as={Link} to="/topic">ALL TOPICS</Nav.Link>
          <Nav.Link as={Link} to="/topic/create">CREATE TOPIC</Nav.Link>
          <Nav.Link as={Link} to="/login">LOGIN</Nav.Link>
          <Nav.Link as={Link} to="/register">REGISTER</Nav.Link>
          { authUser() 
            ?
            <Nav.Link><span onClick={handleLogout}>LOGOUT</span></Nav.Link>
            :
            <>
              <Nav.Link as={Link} to="/login">LOGIN</Nav.Link>
              <Nav.Link as={Link} to="/register">REGISTER</Nav.Link>
            </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PageNavbar

