import { Col, Button, Row } from "react-bootstrap";

export const ProfileView = ({user}) => {
    const convert = new Date(user.Birthday);
    const prettyBirthday = convert.toLocaleDateString(undefined, {day: 'numeric', month: 'long', year: 'numeric'});

    const data = {
        Username: user.Username
    }

    function hasFavorites() {
        fetch("https://ba-movie-api.herokuapp.com/movies/favorites",{
        body: JSON.stringify(data),
        headers: {Authorization: `Bearer ${token}`}}).then((response)=>response.json()).then((json)=>{
            if(json.length === 0) {
                return false;
            }
            return true;
        });
    }

    return (
        <div>
            <Row>
                <Col md={4} className="mt-5rem font-white">
                <p>Username: {user.Username}</p>
                <p>Email: {user.Email}</p>
                <p>Birthday: {prettyBirthday}</p>
                <Button href="/profile/update" >Update Info</Button>
                </Col>
            </Row>
            <Row>
                {user.FavoriteMovies.length === 0}
            </Row>
        </div>
    );
}