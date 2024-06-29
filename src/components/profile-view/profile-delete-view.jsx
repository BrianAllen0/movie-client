import { useEffect, useState } from "react";
import { Col, Button, Row, Form } from "react-bootstrap";
import { MovieListingFavorite } from "../movie-listing/movie-listing-favorite";

export const ProfileDeleteView = ({ user }) => {
    const convert = new Date(user.Birthday);
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const prettyBirthday = convert.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });

    const deleteAccount = (event) => {
        event.preventDefault();
        let data = { Password: confirmedPassword }; // api will check this for us

        fetch("https://ba-movie-api.herokuapp.com/user/", {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then((response) => {
            if (response.ok) {
                alert("Account deleted successfully!");
                localStorage.clear(); // wipe the slate
                navigate("/");
            } else {
                alert("Something went wrong!");
            }
        });
    };

    return (
        <div>
            <Row className="mt-5rem centered">
                <h1 className="font-white centered-text">Are you sure you want to delete your account?</h1>
                <Col md={2} className="mt-1rem font-white user-info p-3">
                    <p>Username: {user.Username}</p>
                    <p>Email: {user.Email}</p>
                    <p>Birthday: {prettyBirthday}</p>
                    <Row className="centered">
                        <Button className="w-80p" href="/profile">
                            Go Back
                        </Button>
                        <p className=" mt-1rem centered-text">OR: </p>
                        <Form onSubmit={deleteAccount}>
                            <Form.Group>
                                <Form.Label>Enter Password to Confirm:</Form.Label>
                                <Form.Control type="password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="centered">
                                <Button className="w-80p mt-1rem" type="submit">
                                    Delete My Account
                                </Button>
                            </Form.Group>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};
