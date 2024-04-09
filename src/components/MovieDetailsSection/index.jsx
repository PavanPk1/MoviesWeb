import "./index.css";
import React from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import MemberCard from "../MemberCard";

function MovieDetailsSection() {
  const params = useParams();
  const id = params.id;

  const [movieDetails, setDetails] = React.useState([]);
  const [ccDetails, setccDetails] = React.useState([]);

  React.useEffect(() => {
    const getCastDetails = async () => {
      const castResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=670a2ba7410ae5c9dd25d236b7d7ce05&language=en-US`
      );
      const castData = await castResponse.json();
      const data = {
        cast: castData.cast.map((item) => ({
          adult: item.adult,
          gender: item.gender,
          id: item.id,
          department: item.known_for_department,
          name: item.name,
          originalName: item.original_name,
          popularity: item.popularity,
          profilePath: item.profile_path,
          castId: item.cast_id,
          character: item.character,
          creditId: item.credit_id,
          order: item.order,
        })),
        crew: castData.crew.map((item) => ({
          adult: item.adult,
          gender: item.gender,
          id: item.id,
          knownForDepartment: item.known_for_department,
          name: item.name,
          originalName: item.original_name,
          popularity: item.popularity,
          profilePath: item.profile_path,
          castId: item.cast_id,
          creditId: item.credit_id,
          department: item.department,
          job: item.job,
        })),
        id: castData.id,
      };

      setccDetails(data);
    };
    
    getCastDetails();

    const getMovieDetails = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=670a2ba7410ae5c9dd25d236b7d7ce05&language=en-US`
      );
      const data = await response.json();
      const movieDetails = {
        adult: data.adult,
        backdropPath: data.backdrop_path,
        belongsToCollection: data.belongs_to_collection,
        budget: data.budget,
        genres: data.genres,
        homePage: data.homepage,
        id: data.id,
        imdbId: data.imdb_id,
        originalLanguage: data.original_language,
        originalTitle: data.original_title,
        overview: data.overview,
        popularity: data.popularity,
        posterPath: data.poster_path,
        productionCompanies: data.production_companies,
        productionCountries: data.production_countries,
        revenue: data.revenue,
        runtime: data.runtime,
        spokenLanguages: data.spoken_languages,
        status: data.status,
        tagline: data.tagline,
        title: data.title,
        releaseDate: data.release_date,
        video: data.video,
        voteAverage: data.vote_average,
        voteCount: data.vote_count,
      };
      setDetails(movieDetails);
    };

    getMovieDetails();
  }, [id]);

  const renderMovieDetails = () => (
    <div className="specific-movie-details">
      <div>
        <div className="container1">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.posterPath}`}
            alt=""
            className="poster-img"
          />
          <div>
            <h1 className="detail-title">{movieDetails.title}</h1>
            <p className="detail">Rating {movieDetails.voteAverage}</p>
            <p className="detail">Duration: {movieDetails.runtime}</p>
            <p className="detail">{movieDetails.status}</p>
            <p className="detail">Release Date: {movieDetails.releaseDate}</p>
          </div>
        </div>
        <div className="container2">
          <h1>Overview</h1>
          <p className="overview">{movieDetails.overview}</p>
        </div>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.backdropPath}`}
        alt=""
        className="backdrop-img"
      />
    </div>
  );

  const renderCastMembers = () => (
    <ul className="castmembers-container">
      {ccDetails.cast &&
        ccDetails.cast.map((item) => (
          <MemberCard details={item} key={item.id} />
        ))}
    </ul>
  );

  // const renderCrewMembers = () => (
  //   <ul className="castmembers-container">
  //     {ccDetails.crew &&
  //       ccDetails.crew.map((item) => (
  //         <MemberCard details={item} key={item.id} />
  //       ))}
  //   </ul>
  // );


  return (
    <div className="Main-container">
      <Navbar />
      <div className="movie-details-container">
        {renderMovieDetails()}
        <div className="movie-cast-container">
          <h1>Cast Members</h1>
          {renderCastMembers()}
          {/* <h1>Crew Members</h1>
          {renderCrewMembers()} */}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsSection;
