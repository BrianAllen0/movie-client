import propTypes from 'prop-types';
import { Button, Card, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

export const MovieListing = ({movie, onMovieClick}) => {
    return (
    //<div onClick={()=>{onMovieClick(movie);}}>{movie.title}</div>
    <Col md={3} key={movie.id} className="mb-5">
        <Card className='h-100 movie-card'>
            <Card.Img variant="top" src={movie.image}></Card.Img>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                    <Button>See More</Button>
                </Link>
                {/* <Button onClick={()=>{onMovieClick(movie);}}>See More</Button> */}
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
        director: propTypes.string
    }).isRequired,
    onMovieClick: propTypes.func.isRequired
};