import { Navbar, Nav } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
    return (
        <Navbar className="myflix-navbar w-100 fixed-top">
            <Navbar.Brand className="font-white fw-bold" href="/">myFlix</Navbar.Brand>
            <Nav>
                <Nav.Link className="font-white" href="/">Home</Nav.Link>
                <Nav.Link className="font-white justify-content-end" href="/profile">My Profile</Nav.Link>
            </Nav>
        </Navbar>
    );
}