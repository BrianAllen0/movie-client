import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";

export const MovieView = ({ user, movies }) => {
    const { movieId } = useParams(); // get id from url
    const currentMovie = movies.find((m) => String(m.id) === String(movieId));
    const token = localStorage.getItem("token");

    const uri = "https://ba-movie-api.herokuapp.com";

    const addFavorite = (event) => {
        event.preventDefault();
        const data = {
            movieId: movieId,
        };
        fetch(`${uri}/movies/favorites/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        }).then((response) => {
            if (response.ok) {
                user.FavoriteMovies.push(data.movieId.toString());
                localStorage.setItem("user", JSON.stringify(user)); // update client data
                alert("Movie added to favorites!");
            } else {
                alert("Movie already in favorites!");
            }
        });
    };

    if (!currentMovie) {
        return <div>Loading...</div>;
    }

    return (
        <Col md={6} className="font-white movie-view">
            <div>
                <img className="w-100" src={currentMovie.image}></img>
            </div>
            <div>
                <p>Title: {currentMovie.title}</p>
            </div>
            <div>
                <p>Description: {currentMovie.description}</p>
            </div>
            <div>
                <p>Genre: {currentMovie.genre}</p>
            </div>
            <div>
                <p>Director: {currentMovie.director}</p>
            </div>
            <Row className="justify-content-between">
                <Col md={4} className="d-flex justify-content-start">
                    <Button className="h-100" href="/">
                        Back
                    </Button>
                </Col>
                <Col md={4} className="d-flex justify-content-end">
                    <Button className="h-100" onClick={addFavorite}>
                        Add to Favorites
                    </Button>
                </Col>
            </Row>
        </Col>
    );
};
