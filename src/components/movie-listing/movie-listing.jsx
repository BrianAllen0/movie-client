export const MovieListing = ({movie, onMovieClick}) => {
    return (<div onClick={()=>{onMovieClick(movie);}}>{movie.title}</div>)
};