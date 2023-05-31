import { useState, useEffect } from "react";
import { MovieListing } from "../movie-listing/movie-listing";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [movies, setMovies] = useState([]);
    useEffect(()=> {
        fetch('https://ba-movie-api.herokuapp.com/movies').then((response)=>response.json()).then((json)=>{
            console.log('RESPONSEDATA: ' + json);
            const movieFetchData = json.map((doc)=>{
                return {
                    id: doc._id,
                    title: doc.Title,
                    description: doc.Description,
                    genre: doc.Genre.Name,
                    director: doc.Director.Name,
                    image: doc.ImagePath,
                    featured: doc.Featured
                };
            });
            setMovies(movieFetchData);
        });
    }, []);
    if(!user) {
        return <LoginView/>
    }
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
            })}
        </div>
    );
};