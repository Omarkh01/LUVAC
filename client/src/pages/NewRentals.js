import React, { useState, useEffect, useRef } from "react";
import NavigationBar from "../Components/NavBar/navbar";
import Popup from "./../Components/Popup/Popup";
import Decimal from "decimal.js";

// import { useStateContext } from "../context/StateContext";
import axios from "../api/axios";
import "./style.css";

const NewRental = () => {
  // const { movies } = useStateContext();
  const errRef = useRef("");
  const movieRef = useRef("");
  const btnRef = useRef();

  const [movies, setMovies] = useState([]);

  const [movieInput, setMovieInput] = useState("");
  const [movieLimit, setMovieLimit] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [rentalFee, setRentalFee] = useState(new Decimal(0));
  const [success, setSuccess] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsOpen(true);
  };

  const handlePopupClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    axios
      .get("/api/movies")
      .then((response) => setMovies(response.data))
      .catch((error) => console.log(error));
  }, [setMovies]);

  useEffect(() => {
    setErrMsg("");
  }, [movieInput]);

  useEffect(() => {
    if (movieLimit === 5) {
      setErrMsg("Movie limit reached");
      movieRef.current.setAttribute("disabled", "");
      btnRef.current.setAttribute("disabled", "");
    }
  }, [movieLimit]);

  const handleRemoveCardBtn = (e) => {
    let container = e.target.parentNode;
    container.remove();

    let parentEle = e.target.parentElement;
    let movieTitle = parentEle.querySelector(".movieTitle");
    setSelectedMovies((prevSelectedMovies) => {
      let newArray = prevSelectedMovies.filter(
        (selectedMovie) => selectedMovie !== movieTitle.innerHTML
      );
      return newArray;
    });

    setMovieLimit((prevMovieLimit) => {
      if (prevMovieLimit === 5) {
        setErrMsg("");
        movieRef.current.removeAttribute("disabled");
        btnRef.current.removeAttribute("disabled");
      }
      return prevMovieLimit - 1;
    });

    setRentalFee((prevRentalFee) => prevRentalFee.minus(14.99));
  };

  const handleAddCardBtn = () => {
    let childElement = document.querySelector(".button-container");
    let parentDiv = childElement.parentNode;

    let isMovieExist = false;
    let isMovieSelected = false;

    movies.forEach((movie) => {
      if (movie.title === movieInput) {
        if (selectedMovies.includes(movie.title)) {
          setErrMsg(`'${movie.title}' already selected`);
          isMovieSelected = true;
        } else {
          setMovieInput("");
          setSelectedMovies([...selectedMovies, movie.title]);
          setMovieLimit(movieLimit + 1);
          setRentalFee(rentalFee.plus(14.99));

          isMovieExist = true;
          let cardContainer = document.createElement("div");
          cardContainer.classList.add("selected-movies-container");

          let selectedCard = `<div class="selected-card"><img src="${movie.imageUrl}"/><div class="details-container"><h3 class="movieTitle">${movie.title}</h3><p>${movie.genreName} ${movie.year},<span class="IMDB">IMDB</span><span><i class="fas fa-star"></i> ${movie.rating}</span></p></div></div>`;

          cardContainer.innerHTML = selectedCard;

          let removeBtn = document.createElement("span");
          removeBtn.classList.add("removeBtn");
          removeBtn.innerText = "Remove";
          removeBtn.addEventListener("click", handleRemoveCardBtn);
          cardContainer.appendChild(removeBtn);

          parentDiv.insertBefore(cardContainer, childElement);
        }
        return;
      }
    });

    if (isMovieSelected) {
      return;
    } else if (!isMovieExist) {
      setErrMsg("Movie Not Found");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      handlePopupOpen();
      return;
    }

    try {
      let userEmail = window.localStorage.getItem("email");

      const response = await axios.post("/api/customers", {
        email: userEmail,
        movieTitle: selectedMovies,
        rentExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      const movieCards = document.querySelectorAll(
        ".selected-movies-container"
      );
      movieCards.forEach((movieCard) => movieCard.remove());

      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  const goBack = () => {
    setSelectedMovies([]);
    setRentalFee(new Decimal(0));
    setMovieLimit(0);
    setSuccess(false);
  };

  return (
    <div>
      <NavigationBar />
      {success ? (
        <div className="rental-form-container">
          <div className="inner-container">
            <p>
              <span className="backBtn" onClick={goBack}>
                back
              </span>
            </p>
            <h3>Your order has successfully been placed!</h3>
            <br />
            <p>Here is your receipt.</p>
            <br />
            <p className="rentedMovies">Rented Movies</p>
            {selectedMovies.map((movie) => {
              return (
                <div key={movie} className="movie-cont">
                  <p className="movieName">{movie}</p>
                  <p className="moviePrice">$14.99</p>
                </div>
              );
            })}
            <div className="subT-cont">
              <p className="subTotalText">Subtotal: </p>
              <p className="subTotal">${rentalFee.toFixed(2)}</p>
            </div>
            <div className="tax-cont">
              <p className="taxText">Tax: </p>
              <p className="tax">
                ${((rentalFee.toFixed(2) / 100) * 8.25).toFixed(2)}
              </p>
            </div>
            <div className="total-cont">
              <p className="totalText">Tax: </p>
              <p className="total">
                ${((rentalFee.toFixed(2) * 108.25) / 100).toFixed(2)}
              </p>
            </div>
            <br />
            <br />
            <div style={{ textAlign: "center" }}>
              <h4>Enjoy Your Movies</h4>
              <h5>
                Thank you!
                <br />
              </h5>
            </div>
          </div>
        </div>
      ) : (
        <div className="rental-form-container">
          <form
            className="inner-container clearfix"
            onSubmit={handleFormSubmit}
          >
            <div className="searchBox">
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
                  onClick={handleAddCardBtn}
                >
                  Select
                </button>
              </div>
              <p ref={errRef} className={errMsg ? "errmsg" : "hide"}>
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
            <div
              className={`button-container ${
                rentalFee.isZero() ? "hide" : "show"
              }`}
            >
              <button className="btn btn-danger">
                Rent for ${rentalFee.toFixed(2)}
              </button>
            </div>
          </form>
          <Popup
            isOpen={isOpen}
            onClose={handlePopupClose}
            title="Not Allowed"
            message="You must sign in to do any operations"
          />
        </div>
      )}
    </div>
  );
};

export default NewRental;
