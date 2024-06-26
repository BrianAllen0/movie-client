import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { MovieListing } from "../movie-listing/movie-listing";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../register-view/register-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileUpdateView } from "../profile-view/profile-update-view";
import { ProfileDeleteView } from "../profile-view/profile-delete-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [registering, setRegistering] = useState(null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [allMovies, setallMovies] = useState([]);
    const [searchedMovies, setSearchedMovies] = useState([]);

    useEffect(() => {
        fetch("https://ba-movie-api.herokuapp.com/movies", { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => response.json())
            .then((json) => {
                const movieFetchData = json.map((doc) => {
                    return {
                        id: doc._id,
                        title: doc.Title,
                        description: doc.Description,
                        genre: doc.Genre.Name,
                        director: doc.Director.Name,
                        image: doc.ImagePath,
                        featured: doc.Featured,
                    };
                });
                setallMovies(movieFetchData);
                setSearchedMovies(movieFetchData); // main page is technically *always* displaying search results, when no search has been done - set them to all movies
            });
    }, []);

    return (
        <BrowserRouter>
            <Row>
                {/* navigation bar needs setuser and settoken because it contains the logout button*/}
                <NavigationBar setUser={setUser} setToken={setToken} allMovies={allMovies} setSearchedMovies={setSearchedMovies} />
            </Row>
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/register"
                        element={<div>{registering ? <RegisterView onClickLogin={() => setRegistering(null)} /> : <Navigate to="/login" />}</div>}
                    />
                    <Route
                        path="/login"
                        element={
                            <div>
                                {user ? (
                                    <Navigate to="/" />
                                ) : !registering ? (
                                    <LoginView
                                        onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                        }}
                                        onClickRegister={() => setRegistering(1)}
                                    />
                                ) : (
                                    <Navigate to="/register" />
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
                                    <Navigate to="/login" />
                                ) : (
                                    <Row className="mt-5rem">
                                        {searchedMovies.map((movie) => {
                                            return <MovieListing key={movie.id} movie={movie} />;
                                        })}
                                    </Row>
                                )}
                            </div>
                        }
                    />
                    <Route
                        path="/profile"
                        element={<div>{!user ? <Navigate to="/login" /> : <ProfileView user={user} setUser={setUser} allMovies={allMovies} />}</div>}
                    />
                    <Route path="/profile/update" element={<div>{!user ? <Navigate to="/login" /> : <ProfileUpdateView user={user} />}</div>} />
                    <Route path="/profile/delete" element={<div>{!user ? <Navigate to="/login" /> : <ProfileDeleteView user={user} />}</div>} />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <div>
                                {!user ? (
                                    <Navigate to="/login" />
                                ) : (
                                    <Row className="justify-content-md-center mb-1rem mt-5rem">
                                        <MovieView user={user} movies={allMovies} />
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
