import { Navbar, Nav } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const NavigationBar = ({setUser, setToken}) => {
    return (
        <Navbar className="myflix-navbar w-100 fixed-top">
            <Navbar.Brand className="font-white fw-bold" href="/">myFlix</Navbar.Brand>
            <Nav>
                <Nav.Link className="font-white" href="/">Home</Nav.Link>
                <Nav.Link className="font-white" href="/profile">My Profile</Nav.Link>
                <Nav.Link className="font-white" onClick={() => {setUser(null);setToken(null);localStorage.clear();console.log("Worked!");}} href="/">Logout</Nav.Link>
            </Nav>
        </Navbar>
    );
}