import "./index.css";
import PropTypes from "prop-types";

const MemberCard = (props) => {
  const { details } = props;
  const { id,profilePath, name, department } = details;
  // console.log(profilePath, name, department)
  return (
    <li className="movie-card" key={id}>
      <img
        src={`https://image.tmdb.org/t/p/w500${profilePath}`}
        alt="movie-poster"
        className="movie-pic"
      />
      <div className="movie-details">
        <h3 className="movie-title">{name}</h3>
        <p className="movie-raing">Department {department}</p>
      </div>
    </li>
  );
};

MemberCard.propTypes = {
  details: PropTypes.shape({
    profilePath: PropTypes.string,
    name: PropTypes.string,
    department: PropTypes.string,
    id: PropTypes.number.isRequired,
  }),
};

export default MemberCard;
