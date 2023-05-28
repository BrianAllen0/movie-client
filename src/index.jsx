import {createRoot} from "react-dom/client";
import { MovieView } from "./components/movie-view/movie-view";
import "./index.scss";

const MyFlixApplication = () => {
    return (
        <div className="my-flix">
            <MovieView/>
        </div>
    );
}

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication/>);
