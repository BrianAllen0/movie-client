import propTypes from "prop-types";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieListing = ({ movie }) => {
    return (
        <Col md={3} key={movie._id} className="mb-5">
            <Card className="h-100 movie-card font-white">
                <Card.Img variant="top" src={movie.image}></Card.Img>
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Link to={`/movies/${encodeURIComponent(String(movie._id))}`}>
                        <Button>See More</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    );
};

MovieListing.propTypes = {
    movie: propTypes.shape({
        title: propTypes.string,
        description: propTypes.string,
        genre: propTypes.string,
        director: propTypes.string,
    }).isRequired,
};
