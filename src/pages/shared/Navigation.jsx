import { signOut } from 'firebase/auth';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import './Nav.css'
// import classes from './'
function Navigation() {
  const [user] = useAuthState(auth)
  
  const handleSignOut = () =>{
    signOut(auth);
}

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand className='nav-text-color' ><Link to="/">OneStepSolution</Link></Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link><Link to="/">Home</Link></Nav.Link>
          <Nav.Link> <Link to="/services">Services</Link></Nav.Link>
          <Nav.Link> <Link to="/blog">Blog</Link></Nav.Link>
          </Nav>
         <span style={{color: 'white'}}>{user?.email}</span>
         {
          user ? <Nav>
          <Link  to="/manage">Manage</Link>
          <Link  to="/addProduct">Add</Link>
          <Link  to="/order">order</Link>
          <Link  to="/deshboard">Deshboard</Link>
          </Nav>:''}
          <Nav>
          {user ? <Button onClick={handleSignOut}>Sign Out</Button> :
          <Link  onClick={handleSignOut}  to="/login">Login</Link>
        }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;