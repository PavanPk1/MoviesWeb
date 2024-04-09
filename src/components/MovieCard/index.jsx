import "./index.css";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'


const MovieCard = (props) => {
  const { details } = props;
  const {id, posterPath, title, voteAverage } = details;
  return (
    <li className="movie-card" key={id}>
      <Link to={`/movie/${id}`} className="link">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt="movie-poster"
          className="movie-pic"
        />
        <div className="movie-details">
          <h3 className="movie-title">{title}</h3>
          <p className="movie-raing">Rating {voteAverage}</p>
        </div>
      </Link>
    </li>
  );
};

MovieCard.propTypes = {
  details: PropTypes.shape({
    posterPath: PropTypes.string,
    title: PropTypes.string,
    voteAverage: PropTypes.number,
    id: PropTypes.number.isRequired,
  }),
};

export default MovieCard;
