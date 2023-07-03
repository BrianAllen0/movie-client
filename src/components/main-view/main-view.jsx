import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { MovieListing } from "../movie-listing/movie-listing";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../register-view/register-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [registering, setRegistering] = useState(null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(()=> {
        fetch("https://ba-movie-api.herokuapp.com/movies",{headers: {Authorization: `Bearer ${token}`}}).then((response)=>response.json()).then((json)=>{
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

    return(
        <Row>
            {!user ? (!registering ? 
                (<LoginView 
                onLoggedIn={(user, token)=>{
                setUser(user)
                setToken(token)
                }}
                onClickRegister={()=>setRegistering(1)}
                />) : 
                (<RegisterView 
                onClickLogin={()=>setRegistering(null)}
                />)
                ) : 
                (movies.length === 0 ? (<div>The List is Empty!</div>) : 
                (!selectedMovie ? 
                    (<Row>
                        {movies.map((movie)=> {
                            return(<MovieListing key={movie.id} movie={movie} onMovieClick={(newSelectedMovie)=>{setSelectedMovie(newSelectedMovie)}}/>);
                        })}
                        <button onClick={() => {setUser(null);setToken(null);localStorage.clear()}}>Logout</button>
                    </Row>) : 
                    (<MovieView movie={selectedMovie} onBackButton={()=>{setSelectedMovie(null)}}/>)
                ))
            }
        </Row>
    )

    // if(!user) {
    //     if(registering) {
    //         return <RegisterView
    //         onClickLogin={()=>setRegistering(null)}
    //         />
    //     }
    //     return <LoginView 
    //     onLoggedIn={(user, token)=>{
    //         console.log("USER")
    //         console.log(user)
    //         console.log("TOKEN")
    //         console.log(token)
    //         setUser(user)
    //         setToken(token)
    //     }}
    //     onClickRegister={()=>setRegistering(1)}
    //     />
    // }
    // if(movies.length === 0) {
    //     return <div>The List is Empty!</div>;
    // }
    // if(selectedMovie) {
    //     return (<MovieView movie={selectedMovie} onBackButton={()=>{setSelectedMovie(null)}}/>)
    // }
    // return (
    //     <Row>
    //         {movies.map((movie)=> {
    //             return(<MovieListing key={movie.id} movie={movie} onMovieClick={(newSelectedMovie)=>{setSelectedMovie(newSelectedMovie)}}/>);
    //         })}
    //         <button onClick={() => {setUser(null);setToken(null);localStorage.clear()}}>Logout</button>
    //     </Row>
    // );
};