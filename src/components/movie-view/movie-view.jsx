export const MovieView = ({movie, onBackButton}) => {
    <div>
        <div>
            <img src = {movie.image}></img>
        </div>
        <div>
            <p>Title: {movie.title}</p>
        </div>
        <div>
            <p>Director: {movie.Director}</p>
        </div>
        <div>
            <button onClick={onBackButton}>Back</button>
        </div>
    </div>
};