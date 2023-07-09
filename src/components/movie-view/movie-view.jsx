import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({user, movies, onBackButton}) => {
    const { movieTitle } = useParams();
    const currentMovie = movies.find((m)=> m.title === movieTitle);
    
    const data = {
        User: user
    }

    const addFavorite = (event) => {
        event.preventDefault();

        fetch(`/movies/favorites/add/${movieTitle}`,{
        Method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}}).then((response)=>{
            if(response.ok) {
                console.log(`Added favorite: ${movieTitle}`)
            } else {
                alert("Something went wrong!");
            }
        });
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