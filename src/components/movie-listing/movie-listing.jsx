import propTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";

export const MovieListing = ({movie, onMovieClick}) => {
    return (
    //<div onClick={()=>{onMovieClick(movie);}}>{movie.title}</div>
    <Card className='h-100'>
        <Card.Img variant="top" src={movie.image}></Card.Img>
        <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
            <Button onClick={()=>{onMovieClick(movie);}}>See More</Button>
        </Card.Body>
    </Card>
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