import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";

export const RegisterView = ({ onClickLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };

        fetch("https://ba-movie-api.herokuapp.com/user/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            if (response.ok) {
                alert("Registered successfully!");
                window.location.reload(); // go back to the login screen after registering
            } else {
                alert("Registration failed!");
            }
        });
    };
    const changeToLogin = () => {
        onClickLogin();
    };

    return (
        <Col md={3} className="mt-5rem">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => {
                            setBirthday(e.target.value);
                        }}
                        required
                    />
                </Form.Group>
                <Form.Group inline className="mt-1rem">
                    <Button className="" type="submit">
                        Register
                    </Button>
                    <span> OR: </span>
                    <Button className="" onClick={changeToLogin}>
                        Login
                    </Button>
                </Form.Group>
            </Form>
        </Col>
    );
};
