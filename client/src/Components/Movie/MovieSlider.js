import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import MovieCard from "./MovieCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";

import "../style.css";

const MovieSlider = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("/api/movies")
      .then((response) => setMovies(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container-fluid d-flex h-75">
      <div className="container-xxl d-flex px-4 py-4 align-self-center">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            757: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1020: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 25,
            },
            1400: {
              slidesPerView: 6,
            },
          }}
          navigation
          loop={true}
          speed={500}
          className="mySwiper align-self-center "
        >
          {movies.map((movie) => {
            return (
              <SwiperSlide key={movie.title}>
                <MovieCard
                  movieTitle={movie.title}
                  movieDescription={movie.description}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieSlider;
