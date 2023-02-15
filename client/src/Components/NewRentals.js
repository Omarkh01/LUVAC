import React, { useState, useEffect, useRef } from "react";
import NavigationBar from "./NavigationBar";

// import { useStateContext } from "../context/StateContext";
import axios from "../api/axios";
import "./style.css";

const NewRental = () => {
  // const { movies } = useStateContext();
  const errRef = useRef("");
  const movieRef = useRef("");
  const btnRef = useRef();

  const [movieInput, setMovieInput] = useState("");
  const [movieLimit, setMovieLimit] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  const [selectedMovies, setSelectedMovies] = useState([]);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("/api/movies")
      .then((response) => setMovies(response.data))
      .catch((error) => console.log(error));
  }, [setMovies]);

  useEffect(() => {
    setErrMsg("");
  }, [movieInput])

  useEffect(() => {
    console.log(selectedMovies);
  }, [selectedMovies])

  useEffect(() => {
    console.log(movieLimit);
    if (movieLimit === 5) {
      setErrMsg("Movie limit reached");
      movieRef.current.setAttribute('disabled', '');
      btnRef.current.setAttribute('disabled', '');
    }
  }, [movieLimit])

  const removeCard = (e) => {
    let container = e.target.parentNode;
    container.remove();
    
    let parentEle = e.target.parentElement;
    let movieTitle = parentEle.querySelector('.movieTitle');    
    setSelectedMovies(prevSelectedMovies => {
      let newArray = prevSelectedMovies.filter(selectedMovie => selectedMovie !== movieTitle.innerHTML);
      return newArray;
    });

    setMovieLimit(prevMovieLimit => { 
      if (prevMovieLimit === 5) {
        setErrMsg("");
        movieRef.current.removeAttribute('disabled');
        btnRef.current.removeAttribute('disabled');
      }
      return prevMovieLimit - 1;
    });
  };

  const handleSearchBtn = () => {
    
    let childElement = document.querySelector(".button-container");
    let parentDiv = childElement.parentNode;
    
    // let selectedMovies = [];
    let isMovieExist = false;
    let isMovieSelected = false;

    movies.forEach((movie) => {
      if (movie.title === movieInput) {
        if (selectedMovies.includes(movie.title)) {
          setErrMsg(`Movie ${movie.title} already selected`);
          isMovieSelected = true;
        }
        else {
          setMovieInput("");
          // selectedMovies.push(movie.title);
          setSelectedMovies([...selectedMovies, movie.title]);
          setMovieLimit(movieLimit + 1);
  
          isMovieExist = true;
          let cardContainer = document.createElement("div");
          cardContainer.classList.add("selected-movies-container");
  
          let selectedCard = `<div class="selected-card"><img src="${movie.imageUrl}"/><div class="details-container"><h3 class="movieTitle">${movie.title}</h3><p>${movie.genre.name} ${movie.year},<span class="IMDB">IMDB</span>${movie.rating}</p></div></div>`;
  
          cardContainer.innerHTML = selectedCard;
  
          let removeBtn = document.createElement("span");
          removeBtn.classList.add("removeBtn");
          removeBtn.innerText = "Remove";
          removeBtn.addEventListener("click", removeCard);
          cardContainer.appendChild(removeBtn);
  
          parentDiv.insertBefore(cardContainer, childElement);
        }
        return;
      }
    });

    if (isMovieSelected) {
      return;
    }
    else if (!isMovieExist) {
      setErrMsg("Movie Not Found");
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
                id="movieName"
                autoComplete="off"
                className="form-control"
                ref={movieRef}
                value={movieInput}
                onChange={(e) => setMovieInput(e.target.value)}
                placeholder="Ex: The Pianist"
              />
              <button
                class="btn btn-outline-secondary search-btn"
                type="button"
                ref={btnRef}
                onClick={handleSearchBtn}
              >
                Select
              </button>
            </div>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "hide"}
            >
              {errMsg}
            </p>
          </div>
          <ul className="result-dropdown">
            {movies
              .filter((movie) => {
                const searchTerm = movieInput.toLowerCase();
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
                  onClick={() => setMovieInput(movie.title)}
                  className="dropdown-item"
                  key={movie.title}
                >
                  {movie.title}
                </li>
              ))}
          </ul>
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
