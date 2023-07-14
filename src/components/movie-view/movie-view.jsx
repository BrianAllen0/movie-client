import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ user, movies, onBackButton }) => {
  const { movieTitle } = useParams();
  const currentMovie = movies.find((m) => m.title === movieTitle);

  const data = {
    User: user,
  };

  const addFavorite = (event) => {
    event.preventDefault();

    axios
      .psot(`/movies/favorites/add/${movieTitle}`, data)
      .then((response) => {
        console.log(`Added favorite: ${movieTitle}`);
      })
      .catch((e) => {
        alert("Something went wrong!");
      });
  };

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
          <Button className="h-100" href="/" nClick={onBackButton}>
            Back
          </Button>
        </Col>
        <Col md={4} className="d-flex justify-content-end">
          <Button className="h-100" onClick={addFavorite}>
            Add to Favorites
          </Button>
        </Col>
      </Row>
    </Col>
  );
};
