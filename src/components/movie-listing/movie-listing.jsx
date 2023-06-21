import propTypes from 'prop-types';

export const MovieListing = ({movie, onMovieClick}) => {
    return (<div onClick={()=>{onMovieClick(movie);}}>{movie.title}</div>)
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