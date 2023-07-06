import { useState, useEffect } from "react";
import { Row, Button, Col } from "react-bootstrap";
import { MovieListing } from "../movie-listing/movie-listing";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../register-view/register-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
        <BrowserRouter>
            <Row>
                <NavigationBar/>
            </Row>
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                    path="/register"
                    element={
                        <div>
                            {registering ? (
                            <RegisterView 
                            onClickLogin={()=>setRegistering(null)}
                            />) : (
                                <Navigate to="/login"/>
                            )}
                        </div>
                    }
                    />
                    <Route
                    path="/login"
                    element={
                        <div>
                            {!registering ? (
                                <LoginView 
                                onLoggedIn={(user, token)=>{
                                setUser(user)
                                setToken(token)
                                }}
                                onClickRegister={()=>setRegistering(1)}
                                />
                            ) : (
                                <Navigate to="/register"/>
                            )}
                        </div>
                    }
                    />
                    <Route
                    path="/"
                    element={
                        <div>
                            {movies.length === 0 ? (
                                <div>The List is Empty!</div>
                            ) : (
                                <Row className="mt-5rem">
                                    {movies.map((movie)=> {
                                        return(<MovieListing key={movie.id} movie={movie} onMovieClick={(newSelectedMovie)=>{setSelectedMovie(newSelectedMovie)}}/>);
                                    })}
                                    {/* <Button className="justify-content-md-center" onClick={() => {setUser(null);setToken(null);localStorage.clear()}}>Logout</Button> */}
                                </Row>
                            )}
                        </div>
                    }
                    />
                    <Route
                    path="/movies/:movieTitle"
                    element={
                        <div>
                            {!user ? (
                                <Navigate to="/login"/>
                            ) : (
                                <Row className="justify-content-md-center mb-1rem mt-5rem">
                                    <MovieView movies={movies}/>
                                </Row>
                            )}
                        </div>
                    }
                    />
                </Routes>
                
                
                {/* {!user ? (!registering ? 
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
                                return(
                                    <Col md={3} key={movie.id} className="mb-5">
                                        <MovieListing key={movie.id} movie={movie} onMovieClick={(newSelectedMovie)=>{setSelectedMovie(newSelectedMovie)}}/>
                                    </Col>
                                );
                            })}
                            <Button onClick={() => {setUser(null);setToken(null);localStorage.clear()}}>Logout</Button>
                        </Row>) : 
                        (<MovieView movie={selectedMovie} onBackButton={()=>{setSelectedMovie(null)}}/>)
                    ))
                } */}
            </Row>
        </BrowserRouter>
    );
};