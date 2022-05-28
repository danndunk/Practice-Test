import { Link, useNavigate } from "react-router-dom";

import { Navbar, Container, Nav, Button } from "react-bootstrap";

import { useContext } from "react";
import { UserContext } from "../../context/userContext";

import Logo from "../../assets/image/kopi-logo.png";

export default function NavbarComponent() {
  const [_, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <Navbar className="fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/products">
          <img
            src={Logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
