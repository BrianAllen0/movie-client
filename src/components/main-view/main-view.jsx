import { useState, useEffect } from "react";
import { Row, Button, Col } from "react-bootstrap";
import { MovieListing } from "../movie-listing/movie-listing";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../register-view/register-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileUpdateView } from "../profile-view/profile-update-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [registering, setRegistering] = useState(null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const [allMovies, setallMovies] = useState([]);
    const [searchedMovies, setSearchedMovies] = useState([]);
    let currentMovies = [];
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
            setallMovies(movieFetchData);
            currentMovies = movieFetchData;
        });
    }, []);

    function currentMoviesFromSearch() {
        for (let index = 0; index < searchedMovies.length; index++) {
            for (let index2 = 0; index2 < allMovies.length; index2++) {
                if(allMovies[index2].title.includes(searchedMovies[index])) {
                    currentMovies.push(allMovies[index2]);
                }
            }
        }
    }

    return(
        <BrowserRouter>
            <Row>
                <NavigationBar
                setUser={setUser}
                setToken={setToken}
                allMovies={allMovies}
                setSearchedMovies={setSearchedMovies}
                />
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
                            { user ? (
                                <Navigate to="/"/>
                            ) : !registering ? (
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
                            {allMovies.length === 0 ? (
                                <div>The List is Empty!</div>
                            ) : !user ? (
                                <Navigate to="/login"/>
                            ) : (
                                <Row className="mt-5rem">
                                    {currentMovies.map((movie)=> {
                                        return(<MovieListing key={movie.id} movie={movie}/>);
                                    })}
                                </Row>
                            )}
                        </div>
                    }
                    />
                    <Route
                    path="/profile"
                    element={
                        <div>
                            {!user ? (
                                <Navigate to="/login"/>
                            ) : (
                                <ProfileView user={user}/>
                            )}
                        </div>
                    }
                    />
                    <Route
                    path="/profile/update"
                    element={
                        <div>
                            {!user ? (
                                <Navigate to="/login"/>
                            ) : (
                                <ProfileUpdateView user={user}/>
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
                                    <MovieView user={user} movies={currentMovies}/>
                                </Row>
                            )}
                        </div>
                    }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};