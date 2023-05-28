export const MovieView = ({movie, onBackButton}) => {
    return (
    <div>
        <div>
            <img src = {movie.image}></img>
        </div>
        <div>
            <p>Title: {movie.title}</p>
        </div>
        <div>
            <p>Director: {movie.director}</p>
        </div>
        <div>
            <button onClick={onBackButton}>Back</button>
        </div>
    </div>
    );
};