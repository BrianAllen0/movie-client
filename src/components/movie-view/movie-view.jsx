import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({user, movies, onBackButton}) => {
    const { movieTitle } = useParams();
    const currentMovie = movies.find((m)=> m.title === movieTitle);
    const token = localStorage.getItem("token");
    
    const uri = "https://ba-movie-api.herokuapp.com";
    
    const data = {
        Username: user.Username
    }

    const addFavorite = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(data));
        fetch(`${uri}/movies/favorites/add/${movieTitle}`,{
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"},
        Authorization: `Bearer ${token}`
        }).then((response)=>{
            console.log(response);
            if(response.ok) {
                console.log(`Added favorite: ${movieTitle}`)
                user.FavoriteMovies = response;
            } else {
                alert("Something went wrong!");
            }
        });
    }
    
    if(!currentMovie) {
        return(<div>Loading...</div>)
    }
    
    return (
    <Col md={6} className="font-white movie-view">
        <div>
            <img className="w-100" src={currentMovie.image}></img>
        </div>
        <div>
            <p>Title: {currentMovie.title}</p>
        </div>
        <div>
            <p>Description: {currentMovie.description}</p>
        </div>
        <div>
            <p>Genre: {currentMovie.genre}</p>
        </div>
        <div>
            <p>Director: {currentMovie.director}</p>
        </div>
        <Row className="justify-content-between">
            <Col md={4} className="d-flex justify-content-start">
                <Button className="h-100" href="/" nClick={onBackButton}>Back</Button>
            </Col>
            <Col md={4} className="d-flex justify-content-end">
                <Button className="h-100" onClick={addFavorite}>Add to Favorites</Button>
            </Col>
        </Row>
    
    </Col>
    );
};