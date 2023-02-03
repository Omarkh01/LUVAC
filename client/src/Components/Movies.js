import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import "./style.css";

const client = axios.create({
  baseURL: "http://localhost:8080",
});

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    client
      .get("/api/movies")
      .then((response) => setMovies(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="movies-container">
        {movies.map((movie) => {
          return (
            <div className="movie-card" key={movie._id}>
              <h2>{movie.title}</h2>
              <p>{movie.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Movies;
