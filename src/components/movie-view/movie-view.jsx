import { Button, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({movies, onBackButton}) => {
    const { movieTitle } = useParams();
    const currentMovie = movies.find((m)=> m.title === movieTitle);
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
        <Link to="/">
            <Button onClick={onBackButton}>Back</Button>
        </Link>
    </Col>
    );
};