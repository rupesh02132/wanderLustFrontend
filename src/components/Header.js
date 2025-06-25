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
// console.log('user', user.user.role);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="bg-white shadow-md py-2" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-red-500 font-bold text-xl">
            Wanderlust
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto flex items-center gap-2">

            {/* Admin Dashboard Link */}
            {user?.user?.role === 'admin' && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}

            {/* Host Dashboard Link */}
            {user?.user?.role === 'host' && (
              <LinkContainer to="/host">
                <Nav.Link className="text-gray-700 hover:text-red-500 transition">
                  Host Dashboard
                </Nav.Link>
              </LinkContainer>
            )}

            {/* Regular User Dashboard Link */}
            {user?.user?.role === 'user' && (
              <LinkContainer to="/dashboard">
                <Nav.Link className="text-gray-700 hover:text-red-500 transition">
                  Dashboard
                </Nav.Link>
              </LinkContainer>
            )}

            {/* Authenticated User Dropdown */}
            {auth?.jwt ? (
              <NavDropdown
                id="username"
                title={
                  <span className="text-gray-700 hover:text-red-500 transition">
                    Menu
                  </span>
                }
                className="custom-dropdown"
              >
                <LinkContainer to="/userProfile">
                  <NavDropdown.Item className="hover:bg-gray-100">
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/my-bookings">
                  <NavDropdown.Item className="hover:bg-gray-100">
                    My Bookings
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item
                  onClick={logoutHandler}
                  className="hover:bg-gray-100 text-red-500"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="text-gray-700 hover:text-red-500 transition">
                    Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="text-gray-700 hover:text-red-500 transition">
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
