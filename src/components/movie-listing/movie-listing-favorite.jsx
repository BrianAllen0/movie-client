import propTypes from "prop-types";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

export const MovieListingFavorite = ({ movie, setUser, user }) => {
    const removeFavorite = (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        const uri = "https://ba-movie-api.herokuapp.com";
        const data = { movieId: movie.id };

        fetch(`${uri}/movies/favorites`, {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                console.log(`Removed favorite: ${movie.title}`);
                alert(`Removed favorite: ${movie.title}`);
                const removeIndex = user.FavoriteMovies.indexOf(data.movieId.toString());
                user.FavoriteMovies.splice(removeIndex, 1);
                localStorage.setItem("user", JSON.stringify(user));
                // trigger profile useeffect
                setUser({
                    ...user,
                    FavoriteMovies: user.FavoriteMovies,
                });
            } else {
                console.log(`Movie: ${movie.title} is not in favorites!`);
            }
        });
    };

    return (
        <Col md={3} key={movie.id} className="mb-5">
            <Card className="h-100 movie-card font-white">
                <Card.Img variant="top" src={movie.image}></Card.Img>
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Row className="justify-content-between">
                        <Col md={4} className="d-flex justify-content-start">
                            <Link to={`/movies/${encodeURIComponent(String(movie.id))}`}>
                                <Button>See More</Button>
                            </Link>
                        </Col>
                        <Col md={4} className="d-flex justify-content-end">
                            <Button onClick={removeFavorite}>Remove From Favorites</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
};

MovieListingFavorite.propTypes = {
    movie: propTypes.shape({
        title: propTypes.string,
        description: propTypes.string,
        genre: propTypes.string,
        director: propTypes.string,
    }).isRequired,
};
