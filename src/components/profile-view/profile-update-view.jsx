import { Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

export const ProfileUpdateView = ({ user }) => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  console.log(user);

  const updateInfo = (event) => {
    event.preventDefault();

    let info = {
      Username: user.Username,
    };
    if (newPassword.trim().length > 0) {
      info.Password = newPassword;
    }
    if (newEmail.trim().length > 0 && newEmail.includes("@")) {
      info.Email = newEmail;
    }
    if (!info.Password && !info.Email) {
      alert("No info to update!");
      return;
    }

    axios
      .patch("https://ba-movie-api.herokuapp.com/user/update", info)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        alert("Updated successfully!");
        window.location = "/profile";
      })
      .catch((e) => {
        console.log(e);
        alert("Update failed!");
      });
  };

  return (
    <Col md={3} className="mt-5rem font-white">
      <Form onSubmit={updateInfo}>
        <Form.Group>
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>New Email:</Form.Label>
          <Form.Control
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group inline className="mt-1rem">
          <Button className="" type="submit">
            Update
          </Button>
          <span> OR: </span>
          <Button href="/profile">Cancel</Button>
        </Form.Group>
      </Form>
    </Col>
  );
};
