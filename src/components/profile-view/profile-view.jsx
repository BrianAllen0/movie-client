import { useEffect } from "react";
import { Col, Button, Row } from "react-bootstrap";
import { MovieListingFavorite } from "../movie-listing/movie-listing-favorite";

export const ProfileView = ({ user, setUser, allMovies }) => {
    let convert = new Date(user.Birthday); // convert from unix timestamp to human speak
    let prettyBirthday = convert.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
    let favoriteMovies = allMovies.filter((m) => user.FavoriteMovies.includes(m.id));

    useEffect(() => {
        favoriteMovies = allMovies.filter((m) => user.FavoriteMovies.includes(m.id));
    }, [`${user}`]);

    return (
        <div>
            <Row>
                <Col md={2} className="mt-5rem font-white user-info p-3">
                    <p>Username: {user.Username}</p>
                    <p>Email: {user.Email}</p>
                    <p>Birthday: {prettyBirthday}</p>
                    <Row className="centered">
                        <Button className="w-80p" href="/profile/update">
                            Update My Info
                        </Button>
                        <Button className="w-80p mt-1rem" href="/profile/delete">
                            Delete My Account
                        </Button>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-1rem">
                <h2>Favorite Movies: </h2>
                {user.FavoriteMovies.length === 0 ? (
                    <p>No Favorites Yet!</p>
                ) : (
                    favoriteMovies.map((movie) => {
                        return <MovieListingFavorite user={user} setUser={setUser} key={movie.id} movie={movie} />;
                    })
                )}
            </Row>
        </div>
    );
};
