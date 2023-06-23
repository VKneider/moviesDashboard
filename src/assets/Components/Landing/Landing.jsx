import { useEffect, useState } from "react";
import config from "../../../config.js";
import Card from "../Card/Card";
import "./Landing.css";

export default function Landing() {
  const [actualPage, setActualPage] = useState(1);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${config.API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${actualPage}&sort_by=popularity.desc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${config.API_KEY}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
        } else {
          throw new Error("Error fetching movies");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [actualPage]);



  const nextPage = () => {
    return setActualPage(actualPage + 1);
    }

    const previousPage = () => {
        return setActualPage(actualPage - 1);
    }

  return (
    <div >
      <h1 className="center">My Movies App</h1>
      <p className="center">Search for your favorite movies and TV shows</p>
      <div className="center" style={{'margin-bottom':20}}>
        <button  onClick={previousPage}>Next Page </button>
        <button  onClick={nextPage}>Next Page </button>
      </div>
      
      <section className="landing">
        <div className="movies" >
          {movies && movies.map((movie) => (
            <Card key={movie.id} poster={"http://image.tmdb.org/t/p/w500" + movie.poster_path} title={movie.original_title} description={movie.overview}/>
          ))}
        </div>
      </section>
    </div>
  );
}
