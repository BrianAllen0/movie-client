import { Col, Button, Row } from "react-bootstrap";
import { MovieListingFavorite } from "../movie-listing/movie-listing-favorite";

export const ProfileView = ({user, allMovies}) => {
    const convert = new Date(user.Birthday);
    const prettyBirthday = convert.toLocaleDateString(undefined, {day: 'numeric', month: 'long', year: 'numeric'});
    let favoriteMovies = allMovies.filter(m => user.FavoriteMovies.includes(m.id));
    const data = {
        Username: user.Username
    }
    console.log(allMovies);
    console.log(user.FavoriteMovies);
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
                    favoriteMovies.map((movie)=>{
                        return (<MovieListingFavorite key={movie.id} movie={movie}/>)
                    })
                )}
            </Row>
        </div>
    );
}