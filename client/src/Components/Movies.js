import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import axios from "../api/axios";
import "./style.css";

import image1 from "../images/hero-bg-1.jpg";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
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

      <div class="card" style={{width: "18rem"}}>
        <img src={image1} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>`
    </>
  );
};

export default Movies;
