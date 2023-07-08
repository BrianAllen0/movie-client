import { Col, Button } from "react-bootstrap";

export const ProfileView = ({user}) => {
    const convert = new Date(user.Birthday);
    const prettyBirthday = convert.toLocaleDateString(undefined, {day: 'numeric', month: 'long', year: 'numeric'});

    return (
        <Col className="mt-5rem font-white">
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <p>Birthday: {prettyBirthday}</p>
            <Button href="/profile/update" >Update Info</Button>
        </Col>
    );
}