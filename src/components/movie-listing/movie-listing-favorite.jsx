import propTypes from 'prop-types';
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

export const MovieListingFavorite = ({movie}) => {
    return (
    <Col md={3} key={movie.id} className="mb-5">
        <Card className="h-100 movie-card font-white">
            <Card.Img variant="top" src={movie.image}></Card.Img>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Row className="justify-content-between">
                    <Col md={4} className="d-flex justify-content-start">
                        <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                            <Button>See More</Button>
                        </Link>
                    </Col>
                    <Col md={4} className="d-flex justify-content-end">
                        <Button>Remove From Favorites</Button>
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
        director: propTypes.string
    }).isRequired
};