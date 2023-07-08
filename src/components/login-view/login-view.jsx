import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";

export const LoginView = ({onLoggedIn, onClickRegister}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            access: username,
            secret: password
        };
        fetch(`https://ba-movie-api.herokuapp.com/user/login?Username=${data.access}&Password=${data.secret}`,
        {method: "POST", headers: {"Content-Type": "application/json"}}).then((response)=>response.json()).then((data)=>{
            console.log(data);
            if(data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.token));
                onLoggedIn(data.user, data.token);
            } else {
                alert("No such user!");
            }
        }).catch((e)=>{
            alert("Something went wrong!");
        });
    };
    const changeToRegister = () =>{
        onClickRegister();
    };
    return(
        <Col md={3} className="mt-5rem">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group inline className="mt-1rem">
                    <Button type="submit">Login</Button>
                    <span> OR: </span>
                    <Button onClick={changeToRegister}>Register</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}