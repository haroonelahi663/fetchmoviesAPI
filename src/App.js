import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoding] = useState(false);

  const fetchMoviesHandler = async () => {
    setIsLoding(true);
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    const transformMovies = data.results.map((movieData) => ({
      id: movieData.episode_id,
      title: movieData.title,
      openingText: movieData.opening_crawl,
      releaseDate: movieData.release_date,
    }));
    setMovies(transformMovies);
    setIsLoding(false);
  };

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Not Found</p>}
        {isLoading && <p>Loading.....</p>}
      </section>
    </>
  );
}

export default App;
