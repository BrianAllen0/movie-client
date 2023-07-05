import { Button, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({movies, onBackButton}) => {
    const { movieTitle } = useParams();
    console.log(movieTitle)
    //console.log(movies.find((m)=> m.title === movieTitle));
    const amovie = movies.find((m)=> m.title === movieTitle);
    return (
    <Col md={6}>
        <div>
            <img className="w-100" src={amovie.image}></img>
        </div>
        <div>
            <p>Title: {amovie.title}</p>
        </div>
        <div>
            <p>Description: {amovie.description}</p>
        </div>
        <div>
            <p>Genre: {amovie.genre}</p>
        </div>
        <div>
            <p>Director: {amovie.director}</p>
        </div>
        <Link to="/">
            <Button onClick={onBackButton}>Back</Button>
        </Link>
    </Col>
    );
};