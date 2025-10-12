import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; // Thay useNavigate bằng Link

export default function AppNavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        {/* Sử dụng as={Link} để chuyển hướng */}
        <Navbar.Brand as={Link} to="/">
          VTIEN
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/account">Accout</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          
        </Nav>

        <Form className="d-flex ms-auto" role="search">
          <Form.Control
            type="search"
            placeholder="Quick search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-info" type="submit" className='d-flex'>
            <i className="bi bi-search-heart ms-2"></i> Search
          </Button>
        </Form>

        <Nav>
          <NavDropdown 
            title={<i className="bi bi-person-circle"></i>} 
            id="accounts-dropdown"
            align="end"
          >
            {/* Sử dụng as={Link} cho dropdown items */}
            <NavDropdown.Item as={Link} to="/profiles">
              Manage Your Profiles
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/account">
              Build your Account
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/password">
              Change Password
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link as={Link} to="/login" className="mx-2">
            <i className="bi bi-box-arrow-in-right"></i> Login
          </Nav.Link>

          <Nav.Link as={Link} to="/favourites">
            <i className="bi bi-heart"></i> Favourites
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}