import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../state/auth/Action';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const user = auth?.user;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar
      expand="lg"
      className="bg-gradient-to-r from-white via-red-50 to-white shadow-md py-2 transition-all duration-300"
      collapseOnSelect
    >
      <Container>
        {/* Logo */}
        <LinkContainer to="/">
          <Navbar.Brand className="text-red-500 font-extrabold text-2xl tracking-wide hover:scale-105 transition-transform duration-300">
            Wanderlust
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="focus:outline-none focus:ring-2 focus:ring-red-300" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto flex items-center gap-2">

            {/* Admin Dashboard */}
            {user?.user?.role === 'admin' && (
              <NavDropdown
                title={<span className="font-medium text-gray-700 hover:text-red-500 transition-colors">Admin</span>}
                id="adminmenu"
                className="custom-dropdown"
              >
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item className="hover:bg-red-50 transition-colors">Admin Dashboard</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}

            {/* Host Dashboard */}
            {user?.user?.role === 'host' && (
              <LinkContainer to="/host">
                <Nav.Link className="font-medium text-gray-700 hover:text-red-500 transition-colors">
                  Host Dashboard
                </Nav.Link>
              </LinkContainer>
            )}

            {/* User Dashboard */}
            {user?.user?.role === 'user' && (
              <LinkContainer to="/dashboard">
                <Nav.Link className="font-medium text-gray-700 hover:text-red-500 transition-colors">
                  Dashboard
                </Nav.Link>
              </LinkContainer>
            )}

            {/* Authenticated User Menu */}
            {auth?.jwt ? (
              <NavDropdown
                id="username"
                title={<span className="font-medium text-gray-700 hover:text-red-500 transition-colors">Menu</span>}
                className="custom-dropdown"
              >
                <LinkContainer to="/userProfile">
                  <NavDropdown.Item className="hover:bg-red-50 transition-colors">Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/my-bookings">
                  <NavDropdown.Item className="hover:bg-red-50 transition-colors">My Bookings</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item
                  onClick={logoutHandler}
                  className="hover:bg-red-50 transition-colors text-red-500"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="font-medium text-gray-700 hover:text-red-500 transition-colors">
                    Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="font-medium text-gray-700 hover:text-red-500 transition-colors">
                    Sign Up
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
