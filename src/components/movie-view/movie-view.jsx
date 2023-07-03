import { Button, Col } from "react-bootstrap";

export const MovieView = ({movie, onBackButton}) => {
    return (
    <Col md={6}>
        <div>
            <img className="w-100" src={movie.image}></img>
        </div>
        <div>
            <p>Title: {movie.title}</p>
        </div>
        <div>
            <p>Description: {movie.description}</p>
        </div>
        <div>
            <p>Genre: {movie.genre}</p>
        </div>
        <div>
            <p>Director: {movie.director}</p>
        </div>
        <div>
            <Button onClick={onBackButton}>Back</Button>
        </div>
    </Col>
    );
};