import PropTypes from 'prop-types';

export const MovieListing = ({movie, onMovieClick}) => {
    return (<div onClick={()=>{onMovieClick(movie);}}>{movie.title}</div>)
};

MovieListing.PropTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        genre: PropTypes.string,
        director: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};