import { Col, Button, Form } from "react-bootstrap";
import { useState } from "react";

export const ProfileUpdateView = ({user}) => {
    let oldPassword = "";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function updateInfo(newuser, oldpass, newpass, newemail) {
        
    }

    return (
        <Col md={3} className="mt-5rem font-white">
            <Form>
                <Form.Group>
                    <Form.Label>New Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Old Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={oldPassword}
                        onChange={(e)=>oldPassword = e.target.value}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>New Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>New Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit">Update</Button>
            </Form>
        </Col>
    );
}