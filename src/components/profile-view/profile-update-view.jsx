import { Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useState } from "react";

export const ProfileUpdateView = ({user}) => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const updateInfo = (event) => {
        event.preventDefault();
        let info = {}
        if(newPassword) {
            info["Password"] = newPassword;
        }
        if(newEmail)
        {
            info["Email"] = newEmail;
        }
        if(Object.keys(info).length === 0) { 
            alert("No info to update!");
        } else {
            fetch("https://ba-movie-api.herokuapp.com/user/update",{
            method: "PATCH", 
            body: JSON.stringify(info), 
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`},}).then((response)=>{
                if(response.ok) {
                    alert("Updated successfully!");
                } else {
                    alert("Update failed!");
                }
                navigate("/profile");
            });
        }
    }

    return (
        <Col md={3} className="mt-5rem font-white">
            <Form onSubmit={updateInfo}>
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
    );
}