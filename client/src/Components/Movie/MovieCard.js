// import image2 from "../../images/hero-bg-1.jpg";

const MovieCard = ({ movieTitle, movieDescription, movieImg, genre }) => {
  return (
    <div className="card shadow overflow-hidden" style={{width: "200px", height: "300px"}}>
      <div className="overflow-hidden p-0 rounded-3 h-100">
        <img src={movieImg} className="movie-img" alt="..." />
      </div>
      <div className="details">
        <h5 className="title">{movieTitle}</h5>
        <p className="desc">`{genre}, 2002</p>
      </div>
    </div>
  );
};

export default MovieCard;
