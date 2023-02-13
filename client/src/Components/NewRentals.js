import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { StarFill } from "react-bootstrap-icons";

// import { useStateContext } from "../context/StateContext";
import axios from "../api/axios";
import "./style.css";

import image from "../images/hero-bg-4.jpg";

const NewRental = () => {
  // const { movies } = useStateContext();
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // const [exist, setExist] = useState(false);

  useEffect(() => {
    axios
      .get("/api/movies")
      .then((response) => setMovies(response.data))
      .catch((error) => console.log(error));
  }, [setMovies]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    document.querySelector(".error-msg-container").style.display = "none";
  };

  const onSearch = (searchTerm) => {
    setInputValue(searchTerm);

    console.log(searchTerm);
  };

  const handleSearchBtn = () => {
    setInputValue("");

    let childElement = document.querySelector(".button-container");
    let parentDiv = childElement.parentNode;
    let movieExists = false;
    let rentalLimit = 0;

    movies.forEach((movie) => {
      if (movie.title === inputValue) {
        movieExists = true;
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("selected-movies-container");
        
        let selectedCard = `<div class="selected-card"><img src="${movie.imageUrl}"/><div class="details-container"><h3>${movie.title}</h3><p>${movie.genre.name} ${movie.year},<span>IMDB</span><StarFill class="icon"/>${movie.rating}</p></div></div>`;

        cardContainer.innerHTML = selectedCard;
        parentDiv.insertBefore(cardContainer, childElement);
        rentalLimit++;
      }
    });
    
    if (!movieExists) {
      document.querySelector(".error-msg-container").style.display = "block";
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="rental-form-container">
        <div className="inner-container">
          <div className="search-form">
            <label htmlFor="movieName" className="form-label label-text">
              Search a Movie
            </label>
            <div className="input-group mt-2">
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                value={inputValue}
                onChange={handleInputChange}
                id="movieName"
                placeholder="Ex: The Pianist"
              />
              <button
                class="btn btn-outline-secondary search-btn"
                type="button"
                onClick={handleSearchBtn}
              >
                Select
              </button>
            </div>
            <div className="error-msg-container">
              <p>Movie Not Found</p>
            </div>
          </div>

          <ul className="result-dropdown">
            {movies
              .filter((movie) => {
                const searchTerm = inputValue.toLowerCase();
                const movieName = movie.title.toLowerCase();

                return (
                  searchTerm &&
                  movieName.startsWith(searchTerm) &&
                  movieName !== searchTerm
                );
              })
              .slice(0, 3)
              .map((movie) => (
                <li
                  onClick={() => onSearch(movie.title)}
                  className="dropdown-item"
                  key={movie.title}
                >
                  {movie.title}
                </li>
              ))}
          </ul>

          {/* <div className="selected-movies-container">
            <div className="selected-card">
                <img src={image} />
                <div className="details-container">
                  <h3>The Boys</h3>
                  <p>Action 2021,<span>IMDB</span><StarFill className="icon"/> 9.6</p>
                </div>
            </div>
          </div> */}

          <div className="button-container">
            <button className="btn btn-danger">Rent $14.99</button>
            <button className="btn btn-primary">Buy $24.99</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRental;
