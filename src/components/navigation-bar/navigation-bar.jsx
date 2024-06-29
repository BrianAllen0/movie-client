import { useState } from "react";
import { Navbar, Nav, Row, Form, Col } from "react-bootstrap";

export const NavigationBar = ({ setUser, setToken, allMovies, setSearchedMovies }) => {
    const handleSearch = (event) => {
        event.preventDefault();
        let query = event.target.searchField.value;
        let searchedMovies = [];
        for (let index = 0; index < allMovies.length; index++) {
            // convert everything to the same case before comparing
            if (allMovies[index].title.toUpperCase().includes(query.toUpperCase())) {
                searchedMovies.push(allMovies[index]);
            }
        }
        setSearchedMovies(searchedMovies);
    };

    return (
        <Row className="fixed-top w-100 tight navbar-bg">
            <Col md={4} className="tight">
                <Navbar className="myflix-navbar">
                    <Navbar.Brand className="font-white fw-bold" href="/">
                        myFlix
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link className="font-white" href="/">
                            Home
                        </Nav.Link>
                        <Nav.Link className="font-white" href="/profile">
                            My Profile
                        </Nav.Link>
                        <Nav.Link
                            className="font-white"
                            onClick={() => {
                                setUser(null);
                                setToken(null);
                                localStorage.clear();
                                console.log("Worked!");
                            }}
                            href="/"
                        >
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </Col>
            <Col md={4} className="justify-content-center">
                <Row className="h-100">
                    <Col md={12} className="align-items-center">
                        <Form
                            className="align-items-center"
                            onSubmit={(e) => {
                                handleSearch(e);
                            }}
                        >
                            <Form.Control name="searchField" className="mt-1-2rem" type="text" placeholder="Search" />
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
