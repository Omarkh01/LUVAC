import React, {useEffect, useState} from "react"
import "./movieList.css"
import Cards from "../Card/card"
import axios from "../../api/axios"

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        axios
          .get("/api/movies")
          .then((response) => setMovieList(response.data))
          .catch((error) => console.log(error));
    }, [setMovieList]);

    // useEffect(() => {
    //     getData();
    // }, []);

    // const getData = () => {
    //     fetch(`https://api.themoviedb.org/3/movie/popular?api_key=a3b2a1f9ad9be3c8e9cf56f07807044e&page=1`)
    //     .then(res => res.json())
    //     .then(data => {
    //         setMovieList(data.results)
    //         console.log(data.results);
    //     })
    // }

    // const handleBtn = () => {
    //     const genreList = {
    //         28 : "Action",
    //         12 : "Adventure",
    //         16 : "Animation",
    //         99 : "Documentary",
    //         27 : "Horror",
    //         878 : "Science Fiction",
    //         53 : "Thriller",
    //         10752 : "War",
    //         80 : "Crime"
    //     };
        
    //     movieList.map(async (movie) => {
    //         console.log(typeof movie.id);            
    //         await axios.post("/api/movies", {
    //             title: movie.original_title,
    //             tmdbId: movie.id,
    //             genreName: ( genreList[movie.genre_ids[0]] ? genreList[movie.genre_ids[0]] : "Drama" ),
    //             description: movie.overview,
    //             imageUrl: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    //             year: movie.release_date,
    //             rating: movie.vote_average.toFixed(1),
    //         })
    //         .then((response) => console.log(response))
    //         .catch((error) => console.log(error));
    //     })
    // };

    let i=1;

    return (
        <div className="movie__list">
            <h2 className="list__title">POPULAR MOVIES</h2>
            {/* <button className="btn btn-danger" onClick={handleBtn}></button> */}
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} key={i++}/>
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList
