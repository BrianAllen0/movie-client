import { useState } from "react";
import { MovieListing } from "../movie-listing/movie-listing";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movies, setMovies] = useState([
        {id: 1, title: "Test Movie 1", description: "description 1", director: "Director 1", image: "testimage1.png"},
        {id: 2, title: "Test Movie 2", description: "description 2", director: "Director 2", image: "testimage2.png"},
        {id: 3, title: "Test Movie 3", description: "description 3", director: "Director 3", image: "testimage3.png"}
    ]);
    if(movies.length === 0) {
        return <div>The List is Empty!</div>;
    }
    if(selectedMovie) {
        return (<MovieView movie={selectedMovie} onBackButton={()=>{setSelectedMovie(null)}}/>)
    }
    return (
        <div>
            {movies.map((movie)=> {
                return(<MovieListing key={movie.id} movie={movie} onMovieClick={(newSelectedMovie)=>{setSelectedMovie(newSelectedMovie)}}/>);
            })};
        </div>
    );
};