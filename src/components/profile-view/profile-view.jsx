import { Col, Button, Row } from "react-bootstrap";
import { MovieListingFavorite } from "../movie-listing/movie-listing-favorite";

export const ProfileView = ({user}) => {
    const convert = new Date(user.Birthday);
    const prettyBirthday = convert.toLocaleDateString(undefined, {day: 'numeric', month: 'long', year: 'numeric'});

    const data = {
        Username: user.Username
    }

    return (
        <div>
            <Row>
                <Col md={2} className="mt-5rem font-white user-info p-3">
                    <p>Username: {user.Username}</p>
                    <p>Email: {user.Email}</p>
                    <p>Birthday: {prettyBirthday}</p>
                    <Button href="/profile/update" >Update My Info</Button>
                </Col>
            </Row>
            <Row className="mt-1rem">
                <h2>Favorite Movies: </h2>
                {user.FavoriteMovies.length === 0 ? (
                    <p>No Favorites Yet!</p>
                ) : (
                    user.FavoriteMovies.map((movie)=>{
                        return (<MovieListingFavorite key={movie.id} movie={movie}/>)
                    })
                )}
            </Row>
        </div>
    );
}