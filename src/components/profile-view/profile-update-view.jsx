import { Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useState } from "react";

export const ProfileUpdateView = ({user}) => {
    let oldPassword = "";
    let confirmed = false;
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const updateInfo = (event) => {
        event.preventDefault();
        
        const data = {
            Username: newUsername,
            Password: newPassword,
            Email: newEmail
        }
        
        fetch("https://ba-movie-api.herokuapp.com/user/update",{
        Method: "PATCH", 
        body: JSON.stringify(data), 
        headers: {"Content-Type": "application/json"}}).then((response)=>{
            if(response.ok) {
                alert("Updated successfully!");
            } else {
                alert("Update failed!");
            }
            navigate("/profile");
        });
    }
    function finalize() {
        
    }


    return (
        <div>
            {!confirmed ? (
                <Col md={3} className="mt-5rem font-white">
                    <Form onSubmit={finalize}>
                        <Form.Group>
                            <Form.Label>New Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={(e)=>setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>New Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={newEmail}
                                onChange={(e)=>setNewEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group inline className="mt-1rem">
                            <Button className="" type="submit">Update</Button>
                            <span> OR: </span>
                            <Button href="/profile">Cancel</Button>
                        </Form.Group>
                    </Form>
                </Col>
            ) : (
                <Col md={3}>
                    <Form onSubmit={updateInfo}>
                        <Form.Label>Enter Current Password: </Form.Label>
                        <Form.Control
                            type="password"
                            value={currentPassword}
                            onChange={(e)=>setCurrentPassword(e.target.value)}
                        />
                    </Form>
                </Col>
            )}
            
        </div>
        
    );
}