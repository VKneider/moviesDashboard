import { useEffect, useState } from "react";
import config from "../../../config.js";
import Card from "../Card/Card";
import "./Landing.css";
import useAxios from "../../Hooks/useAxios.js";

export default function Landing() {
    const [actualPage, setActualPage] = useState(1);
    const [movies, setMovies] = useState([]);


    // eslint-disable-next-line
    const {response, refetch} = useAxios(
        {
        url:`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${actualPage}&sort_by=popularity.desc`,
        method: "GET",
        requestConfig:{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.API_KEY}`
        }
        }
    });

    useEffect(() => {
        if (response) setMovies(response.results);
    }, [response]);


    console.log("render component")
    
    const nextPage = () => {
      setActualPage(actualPage + 1);
      return refetch();
        
    };

    const previousPage = () => {
      setActualPage(actualPage - 1);
      return refetch();
    };

    return (
        <div>
            <h1 className="center">My Movies App</h1>
            <p className="center">Discover the most recent movies </p>
            <div className="center" style={{ "marginBottom": 20 }}>
                <h4>Actual Page number: {actualPage}</h4>
                <button onClick={previousPage}>Next Page </button>
                <button onClick={nextPage}>Next Page </button>
            </div>

            {movies!=null && (
                <section className="landing">
                    <div className="movies">
                        {movies.map(movie => (
                            <Card key={movie.id} poster={"http://image.tmdb.org/t/p/w500" + movie.poster_path} title={movie.original_title} description={movie.overview} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
